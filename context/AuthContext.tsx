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
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  mobile: string | null;        // typed at signup — unverified
  phoneNumber: string | null;   // Firebase-verified via OTP (added later)
  role: "user" | "admin";
  location: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  requirePhoneVerification: boolean;
  signInWithGoogle: () => Promise<User>;
  signupWithEmail: (name: string, email: string, password: string, mobile: string) => Promise<User>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
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

  const establishSessionAndProfile = async (
    currentUser: User,
    extra?: { mobile?: string }
  ) => {
    const { db, auth } = getFirebase();
    if (!db || !auth) {
      setLoading(false);
      return;
    }

    // TODO (Phase 2): re-enable mandatory phone verification here once OTP flow is added back.
    // if (!currentUser.email || !currentUser.phoneNumber) {
    //   setRequirePhoneVerification(true);
    //   setUser(null);
    //   setLoading(false);
    //   throw new Error("INCOMPLETE_PROFILE");
    // }
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
          mobile: extra?.mobile || null,
          phoneNumber: currentUser.phoneNumber,
          role,
          location: "",
        };

        await setDoc(userRef, {
          ...authUser,
          createdAt: new Date().toISOString(),
        });
      } else {
        const data = userSnap.data();
        const mergeData: Partial<AuthUser> = {};
        let needsMerge = false;

        if (currentUser.phoneNumber && currentUser.phoneNumber !== data.phoneNumber) {
          mergeData.phoneNumber = currentUser.phoneNumber;
          needsMerge = true;
        }
        if (currentUser.photoURL && currentUser.photoURL !== data.photoURL) {
          mergeData.photoURL = currentUser.photoURL;
          needsMerge = true;
        }
        if (extra?.mobile && extra.mobile !== data.mobile) {
          mergeData.mobile = extra.mobile;
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
          mobile: mergeData.mobile || data.mobile || null,
          phoneNumber: mergeData.phoneNumber || data.phoneNumber || currentUser.phoneNumber,
          role: data.role || role,
          location: data.location || "",
        };
      }

      setUser(authUser);

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

    const cred = GoogleAuthProvider.credentialFromResult(result);
    if (cred) setPendingGoogleCredential(cred);

    return result.user;
  };

  const signupWithEmail = async (name: string, email: string, password: string, mobile: string) => {
    const { auth } = getFirebase();
    if (!auth) throw new Error("Firebase Auth not initialized");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    // onAuthStateChanged will also fire, but we call this directly first so `mobile` is captured immediately
    await establishSessionAndProfile(cred.user, { mobile });
    return cred.user;
  };

  const loginWithEmail = async (email: string, password: string) => {
    const { auth } = getFirebase();
    if (!auth) throw new Error("Firebase Auth not initialized");
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
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
          const phoneUserResult = await signInWithCredential(auth, credential);
          const mergedResult = await linkWithCredential(phoneUserResult.user, pendingGoogleCredential);
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
        signupWithEmail,
        loginWithEmail,
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