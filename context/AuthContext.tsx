"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  PhoneAuthProvider,
  linkWithCredential,
  AuthCredential,
  signInWithCredential
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  role: "user" | "admin";
  location: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  requirePhoneVerification: boolean;
  signInWithGoogle: () => Promise<User>;
  sendOTP: (phoneNumber: string, appVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
  linkPhoneNumber: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [requirePhoneVerification, setRequirePhoneVerification] = useState(false);
  const [pendingGoogleCredential, setPendingGoogleCredential] = useState<AuthCredential | null>(null);

  const establishSessionAndProfile = async (currentUser: User) => {
    const { db, auth } = getFirebase();
    if (!db || !auth) {
        setLoading(false);
        return;
    }
    
    // Strict requirement: User MUST have BOTH a verified email (usually from Google) and a phone number
    if (!currentUser.email || !currentUser.phoneNumber) {
      setRequirePhoneVerification(true);
      setUser(null);
      setLoading(false);
      // Reject any further database or session initialization!
      throw new Error("INCOMPLETE_PROFILE");
    }

    setRequirePhoneVerification(false);

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      const role = currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? "admin" : "user";
      let authUser: AuthUser;

      if (!userSnap.exists()) {
        authUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || null,
          photoURL: currentUser.photoURL || null,
          phoneNumber: currentUser.phoneNumber,
          role: role,
          location: "",
        };

        // Write ONLY after fully vetted
        await setDoc(userRef, {
          ...authUser,
          createdAt: new Date().toISOString()
        });
      } else {
        const data = userSnap.data();
        let needsMerge = false;
        const mergeData: Partial<AuthUser> = {};

        if (currentUser.phoneNumber && currentUser.phoneNumber !== data.phoneNumber) {
          mergeData.phoneNumber = currentUser.phoneNumber;
          needsMerge = true;
        }
        if (currentUser.photoURL && currentUser.photoURL !== data.photoURL) {
          mergeData.photoURL = currentUser.photoURL;
          needsMerge = true;
        }

        if (needsMerge) {
          await setDoc(userRef, mergeData, { merge: true });
        }

        authUser = {
          uid: currentUser.uid,
          email: data.email || currentUser.email,
          displayName: data.displayName || currentUser.displayName || null,
          photoURL: mergeData.photoURL || data.photoURL || null,
          phoneNumber: mergeData.phoneNumber || data.phoneNumber || currentUser.phoneNumber,
          role: data.role || role,
          location: data.location || "",
        };
      }

      setUser(authUser);

      // Establish secure backend session cookie strictly after profile is confirmed
      const idToken = await currentUser.getIdToken();
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      
    } catch (e) {
      console.error("Failed to set session and profile", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { auth } = getFirebase();
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await establishSessionAndProfile(currentUser);
        } catch (e: any) {
          if (e.message !== "INCOMPLETE_PROFILE") console.error(e);
        }
      } else {
        setUser(null);
        setRequirePhoneVerification(false);
        try {
          await fetch("/api/auth/session", { method: "DELETE" });
        } catch (e) {
          console.error("Failed to clear session", e);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { auth } = getFirebase();
    if (!auth) throw new Error("Firebase Auth not initialized");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    
    // Store the Google credential to memory so we can execute a complex merge if the user's phone is taken
    const cred = GoogleAuthProvider.credentialFromResult(result);
    if (cred) setPendingGoogleCredential(cred);
    
    return result.user;
  };

  const sendOTP = async (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
    const { auth } = getFirebase();
    if (!auth) throw new Error("Firebase Auth not initialized");
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  };

  const linkPhoneNumber = async (confirmationResult: ConfirmationResult, otp: string) => {
    const { auth } = getFirebase();
    if (!auth?.currentUser) throw new Error("No active user to link phone to");
    
    const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
    
    try {
      const result = await linkWithCredential(auth.currentUser, credential);
      await establishSessionAndProfile(result.user);
    } catch (error: any) {
      if (error.code === "auth/credential-already-in-use") {
        if (pendingGoogleCredential) {
          console.log("Phone already heavily registered. Executing account merge...");
          // 1. Sign into the existing Phone account
          const phoneUserResult = await signInWithCredential(auth, credential);
          // 2. Link their active Google identity to the legacy phone account instead!
          const mergedResult = await linkWithCredential(phoneUserResult.user, pendingGoogleCredential);
          // 3. Complete auth flow
          await establishSessionAndProfile(mergedResult.user);
        } else {
          throw new Error("Phone number already in use. Please sign in again.");
        }
      } else {
        throw error;
      }
    }
  };

  const signOut = async () => {
    const { auth } = getFirebase();
    if (!auth) return;
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        requirePhoneVerification,
        signInWithGoogle,
        sendOTP,
        linkPhoneNumber,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
