"use client";

import { useEffect, useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAdminMode } from "@/app/context/AdminModeContext";
import { useCart } from "@/app/context/CartContext";
import { useFavourites } from "@/hooks/useFavourites";
import { ServiceData } from "@/app/admin/services/page";
import ServicesSection from "@/app/components/ServicesSection"; // R&D services
import { Share2, Link as ShareLink, Check } from "lucide-react";

export default function ServicesPage() {
  const { isAdminMode } = useAdminMode();
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourited } = useFavourites();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [sharePopover, setSharePopover] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleAddToCart = (service: ServiceData) => {
    addToCart(service);
    setAddedItems((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [service.id]: false }));
    }, 2000);
  };

  const handleShare = async (service: ServiceData, e: React.MouseEvent) => {
    e.preventDefault(); // prevent triggering the card's link route
    const url = `${window.location.origin}/services/${service.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.description,
          url,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      setSharePopover(sharePopover === service.id ? null : service.id);
    }
  };

  const handleCopyLink = (serviceId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/services/${serviceId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(serviceId);
    setTimeout(() => {
      setCopiedLink(null);
      setSharePopover(null);
    }, 2000);
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { db } = getFirebase();
        if (!db) return;
        let q;
        if (isAdminMode) {
          // Admin Mode: Fetch all services
          q = query(collection(db, "services"), orderBy("createdAt", "desc"));
        } else {
          // Customer View: Fetch only active services
          q = query(collection(db, "services"), where("isActive", "==", true), orderBy("createdAt", "desc"));
        }

        const snapshot = await getDocs(q);
        const data: ServiceData[] = [];
        snapshot.forEach((docSnap) => {
          data.push({ id: docSnap.id, ...docSnap.data() } as ServiceData);
        });
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [isAdminMode]);

  return (
    <main className="bg-[#080c14] min-h-screen pt-6 pb-16 px-4 md:px-8">
      <ServicesSection />
    </main>
  );
}
