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

let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let googleProviderInstance: GoogleAuthProvider | undefined;
let storageInstance: FirebaseStorage | undefined;

export function getFirebase() {
    // Guard against SSR — Firebase client SDK should only run in the browser
    if (typeof window === "undefined") {
        return { app: null, auth: null, db: null, googleProvider: null, storage: null };
    }

    if (!app) {
        app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    }
    if (!authInstance) {
        authInstance = getAuth(app);
    }
    if (!dbInstance) {
        dbInstance = getFirestore(app);
    }
    if (!googleProviderInstance) {
        googleProviderInstance = new GoogleAuthProvider();
    }
    if (!storageInstance) {
        storageInstance = getStorage(app);
    }

    return { app, auth: authInstance, db: dbInstance, googleProvider: googleProviderInstance, storage: storageInstance };
}