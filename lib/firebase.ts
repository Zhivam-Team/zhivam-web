import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize once, safe for both client and server (build) contexts
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const authInstance: Auth = getAuth(app);
const dbInstance: Firestore = getFirestore(app);
const googleProviderInstance: GoogleAuthProvider = new GoogleAuthProvider();
const storageInstance: FirebaseStorage = getStorage(app);

// Named exports — for files that import directly (e.g. AuthContext.tsx)
export const auth = authInstance;
export const db = dbInstance;
export const googleProvider = googleProviderInstance;
export const storage = storageInstance;
export { app };

// Function export — for files that use getFirebase()
export function getFirebase() {
    if (typeof window === "undefined") {
        return { app: null, auth: null, db: null, googleProvider: null, storage: null };
    }
    return { app, auth: authInstance, db: dbInstance, googleProvider: googleProviderInstance, storage: storageInstance };
}