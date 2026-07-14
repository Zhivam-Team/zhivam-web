"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";
import { getFirebase } from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function AuthPage() {
  const { user, requirePhoneVerification, signInWithGoogle, sendOTP, linkPhoneNumber } = useAuth();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    if (user && !requirePhoneVerification) {
      router.push("/");
    }
  }, [user, requirePhoneVerification, router]);

  useEffect(() => {
    if (requirePhoneVerification && typeof window !== "undefined" && !window.recaptchaVerifier) {
      const { auth } = getFirebase();
      if (auth) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 
          size: 'invisible' 
        });
      }
    }
  }, [requirePhoneVerification]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      // AuthContext listener will update requirePhoneVerification or set fully authenticated user
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const fullPhoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      const result = await sendOTP(fullPhoneNumber, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6 || !confirmationResult) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await linkPhoneNumber(confirmationResult, otp);
      // context automatically loads user profile & redirects via useEffect
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/credential-already-in-use") {
        setError("This phone number is already linked to another account. Please use a different number.");
      } else {
        setError(err.message || "Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c14] py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-md w-full space-y-8 bg-[#0d1520] p-8 rounded-2xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {!requirePhoneVerification ? "Welcome" : "Secure Your Account"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {!requirePhoneVerification 
              ? "Sign in to your account with Google" 
              : "Please verify a mobile number to complete setup"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="mt-6">
          {!requirePhoneVerification ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Continue with Google
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div id="recaptcha-container"></div>
              
              {!otpSent ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Phone Number</label>
                    <div className="flex bg-slate-800/50 border border-slate-700/60 rounded-xl overflow-hidden focus-within:border-cyan-400/60 transition-colors">
                      <span className="flex items-center justify-center px-4 bg-slate-800 text-slate-300 border-r border-slate-700/60 font-medium select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSendOTP}
                    disabled={loading || phoneNumber.length < 10}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors text-center tracking-[0.5em] text-lg font-medium"
                      placeholder="------"
                      maxLength={6}
                      disabled={loading}
                    />
                    <p className="text-xs text-slate-500 text-center mt-2">
                      OTP sent to +91 {phoneNumber}
                    </p>
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {loading ? "Verifying..." : "Verify OTP & Complete Link"}
                  </button>
                  <button
                    onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                        setConfirmationResult(null);
                        setError("");
                    }}
                    disabled={loading}
                    className="w-full text-slate-400 hover:text-white text-sm mt-4 transition-colors p-2"
                  >
                    Change phone number
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
