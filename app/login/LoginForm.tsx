"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

function mapFirebaseError(code: string) {
    switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Invalid email or password. Please try again.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        default:
            return "Something went wrong. Please try again.";
    }
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { loginWithEmail, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/dashboard";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await loginWithEmail(email, password);
            router.push(redirectTo);
        } catch (err: any) {
            setError(mapFirebaseError(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await signInWithGoogle();
            router.push(redirectTo);
        } catch (err: any) {
            setError(mapFirebaseError(err.code));
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field: string) =>
        `w-full bg-slate-900/50 border rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${error
            ? "border-red-500/70"
            : focused === field
                ? "border-cyan-400/70 shadow-[0_0_0_3px_rgba(34,211,238,0.08)]"
                : "border-slate-700 hover:border-slate-500"
        }`;

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#080c14]">

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
                style={{
                    backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            <video
                src="/images/videos/bg video.mp4"
                autoPlay
                loop
                muted
                preload="none"
                playsInline
                className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-0 opacity-20"
            />

            <div className="absolute inset-0 bg-[#080c14]/60 z-10" />
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full z-10" />

            <div className="relative min-h-screen w-full flex items-center justify-center md:justify-end z-20 p-4 sm:p-8 md:p-16 lg:p-24">
                <div className="w-full max-w-md">

                    <motion.div
                        {...fadeUp(0)}
                        className="bg-[#0d1520] border border-slate-700/60 rounded-2xl p-8 shadow-2xl"
                    >
                        <motion.div {...fadeUp(0.1)} className="mb-8">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="h-px w-8 bg-cyan-500" />
                                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-500">
                                    Secure Access
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                            <p className="text-slate-400 text-sm mt-2">
                                Sign in to access your dashboard.
                            </p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <motion.div {...fadeUp(0.2)} className="relative">
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="email"
                                        placeholder="you@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocused("email")}
                                        onBlur={() => setFocused(null)}
                                        className={inputClass("email")}
                                    />
                                </div>
                            </motion.div>

                            <motion.div {...fadeUp(0.25)} className="relative">
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocused("password")}
                                        onBlur={() => setFocused(null)}
                                        className={`${inputClass("password")} pr-11`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div {...fadeUp(0.3)} className="flex justify-end">
                                <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </motion.div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center gap-2.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl"
                                    >
                                        <AlertTriangle size={14} className="shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div {...fadeUp(0.35)}>
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors duration-200 mt-2 disabled:opacity-60"
                                >
                                    <LogIn size={16} />
                                    {loading ? "Signing in..." : "Sign In"}
                                </motion.button>
                            </motion.div>
                        </form>

                        <motion.div {...fadeUp(0.38)} className="mt-6 flex items-center gap-3">
                            <span className="h-px flex-1 bg-slate-700/50" />
                            <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
                            <span className="h-px flex-1 bg-slate-700/50" />
                        </motion.div>

                        <motion.button
                            {...fadeUp(0.4)}
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full mt-4 border border-slate-700 hover:border-slate-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2.5 text-sm transition-colors duration-200 disabled:opacity-60"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </motion.button>

                        <motion.div {...fadeUp(0.45)} className="mt-6 pt-6 border-t border-slate-700/50 text-center">
                            <p className="text-sm text-slate-400">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                                    Sign Up
                                </Link>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}