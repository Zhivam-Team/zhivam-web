"use client";

import { useState, useEffect } from "react";
import { getFirebase } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ServiceData } from "@/app/admin/services/page";

export interface FavouriteItem {
  serviceId: string;
  title: string;
  addedAt: number;
}

export function useFavourites() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  useEffect(() => {
    if (authLoading || !user) {
      setFavourites([]);
      return;
    }

    const { db } = getFirebase();
    if (!db) return;

    const unsubscribe = onSnapshot(
      collection(db, `users/${user.uid}/favourites`),
      (snapshot) => {
        const items: FavouriteItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as FavouriteItem);
        });
        items.sort((a, b) => b.addedAt - a.addedAt);
        setFavourites(items);
      },
      (error) => {
        console.error("Firestore favourites listener error:", error);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading]);

  const isFavourited = (serviceId: string) => {
    return favourites.some((item) => item.serviceId === serviceId);
  };

  const toggleFavourite = async (service: ServiceData) => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const { db } = getFirebase();
    if (!db) return;

    const favRef = doc(db, `users/${user.uid}/favourites`, service.id);

    try {
      if (isFavourited(service.id)) {
        await deleteDoc(favRef);
      } else {
        await setDoc(favRef, {
          serviceId: service.id,
          title: service.title,
          addedAt: Date.now(),
        });
      }
    } catch (error) {
      console.error("Failed to toggle favourite", error);
    }
  };

  return {
    favourites,
    toggleFavourite,
    isFavourited,
  };
}
