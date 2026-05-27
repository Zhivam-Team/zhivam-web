import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
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

export function getFirebase() {
  // Prevent SSR crash completely by bailing before initialization
  if (typeof window === "undefined") {
    return { app: undefined, auth: undefined, db: undefined, storage: undefined };
  }

  const win = window as any;

  if (!win.__FIREBASE_APP__) {
    try {
      win.__FIREBASE_APP__ = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      win.__FIREBASE_AUTH__ = getAuth(win.__FIREBASE_APP__);
      win.__FIREBASE_DB__ = getFirestore(win.__FIREBASE_APP__);
      win.__FIREBASE_STORAGE__ = getStorage(win.__FIREBASE_APP__);
    } catch (error) {
      console.error("Firebase SDK init error:", error);
    }
  }

  return { 
    app: win.__FIREBASE_APP__ as FirebaseApp, 
    auth: win.__FIREBASE_AUTH__ as Auth, 
    db: win.__FIREBASE_DB__ as Firestore, 
    storage: win.__FIREBASE_STORAGE__ as FirebaseStorage 
  };
}
