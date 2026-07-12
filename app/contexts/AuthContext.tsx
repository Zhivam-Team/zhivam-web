"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signupWithEmail: (name: string, email: string, password: string, mobile: string) => Promise<User>;
    loginWithEmail: (email: string, password: string) => Promise<User>;
    loginWithGoogle: () => Promise<User>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsub;
    }, []);

    async function signupWithEmail(name: string, email: string, password: string, mobile: string) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });
        await setDoc(doc(db, "users", res.user.uid), {
            name,
            email,
            mobile,
            createdAt: serverTimestamp(),
        });
        return res.user;
    }

    async function loginWithEmail(email: string, password: string) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user;
    }

    async function loginWithGoogle() {
        const res = await signInWithPopup(auth, googleProvider);
        await setDoc(
            doc(db, "users", res.user.uid),
            {
                name: res.user.displayName,
                email: res.user.email,
                createdAt: serverTimestamp(),
            },
            { merge: true }
        );
        return res.user;
    }

    function logout() {
        return signOut(auth);
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, signupWithEmail, loginWithEmail, loginWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}