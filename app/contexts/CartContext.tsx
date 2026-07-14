"use client";

import React, { createContext, useState, useEffect, useContext, useRef, ReactNode } from "react";
import { getFirebase } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export interface CartItem {
  serviceId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  addedAt: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (service: any) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartIconRef = useRef<HTMLButtonElement | null>(null);

  // Sync local cart to Firestore on login
  const syncLocalToFirestore = async (uid: string) => {
    const localCartStr = localStorage.getItem("zhivam_cart");
    if (localCartStr) {
      try {
        const localCart: CartItem[] = JSON.parse(localCartStr);
        if (localCart.length > 0) {
          const { db } = getFirebase();
          if (!db) return;
          const batch = writeBatch(db);
          for (const item of localCart) {
            const itemRef = doc(db, `carts/${uid}/items`, item.serviceId);
            batch.set(itemRef, item);
          }
          await batch.commit();
          localStorage.removeItem("zhivam_cart");
        }
      } catch (e) {
        console.error("Failed to sync local cart", e);
      }
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      syncLocalToFirestore(user.uid);

      const { db } = getFirebase();
      if (!db) return;

      // Listen to Firestore
      const unsubscribe = onSnapshot(
        collection(db, `carts/${user.uid}/items`),
        (snapshot) => {
          const items: CartItem[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as CartItem);
          });
          // Sort by addedAt
          items.sort((a, b) => b.addedAt - a.addedAt);
          setCartItems(items);
        },
        (error) => {
          console.error("Firestore cart listener error:", error);
        }
      );

      return () => unsubscribe();
    } else {
      // User logged out, load from local storage
      const localCartStr = localStorage.getItem("zhivam_cart");
      if (localCartStr) {
        try {
          setCartItems(JSON.parse(localCartStr));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [user, authLoading]);

  // Helper to save strictly to local storage
  const saveToLocal = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("zhivam_cart", JSON.stringify(newCart));
  };

  const addToCart = async (service: any) => {
    // Require login
    if (!user) {
      router.push("/auth");
      return;
    }

    const newItem: CartItem = {
      serviceId: service.id,
      title: service.title,
      price: service.price,
      imageUrl: service.imageUrl,
      quantity: 1, // Currently fixed at 1 per add for simplicity, could increment if exists
      addedAt: Date.now(),
    };

    if (user) {
      const { db } = getFirebase();
      if (!db) return;
      // Check if already exists to increment quantity
      const existing = cartItems.find((item) => item.serviceId === service.id);
      try {
        const itemRef = doc(db, `carts/${user.uid}/items`, service.id);
        if (existing) {
           await setDoc(itemRef, { ...existing, quantity: existing.quantity + 1 }, { merge: true });
        } else {
           await setDoc(itemRef, newItem);
        }
      } catch (err) {
        console.error("Failed to add to cart", err);
      }
    } else {
      const existing = cartItems.find((item) => item.serviceId === service.id);
      if (existing) {
        saveToLocal(
          cartItems.map((item) =>
            item.serviceId === service.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        saveToLocal([...cartItems, newItem]);
      }
    }
  };

  const removeFromCart = async (serviceId: string) => {
    if (user) {
      try {
        const { db } = getFirebase();
        if (!db) return;
        await deleteDoc(doc(db, `carts/${user.uid}/items`, serviceId));
      } catch (err) {
        console.error("Failed to remove from cart", err);
      }
    } else {
      saveToLocal(cartItems.filter((item) => item.serviceId !== serviceId));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { db } = getFirebase();
        if (!db) return;
        const batch = writeBatch(db);
        cartItems.forEach((item) => {
          const itemRef = doc(db, `carts/${user.uid}/items`, item.serviceId);
          batch.delete(itemRef);
        });
        await batch.commit();
      } catch (err) {
        console.error("Failed to clear cart", err);
      }
    } else {
      saveToLocal([]);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    cartIconRef,
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};