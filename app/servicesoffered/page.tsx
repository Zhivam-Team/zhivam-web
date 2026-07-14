"use client";

import { useEffect, useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAdminMode } from "@/app/contexts/AdminModeContext";
import { useCart } from "@/app/contexts/CartContext";
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
    <main className="bg-[#080c14] min-h-screen pt-32 pb-16 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-slate-400 max-w-2xl">
            Explore our professional services. Add them to your cart to checkout, or like them for later.
          </p>
          {isAdminMode && (
            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-full text-sm font-medium">
              <ShieldAlert className="w-4 h-4" />
              Viewing as Admin (showing inactive services as well)
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-20 flex justify-center text-slate-400">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="py-20 text-center bg-[#0d1520] border border-slate-700/60 rounded-3xl text-slate-400">
            No services available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col bg-[#0d1520] border border-slate-700/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_32px_rgba(6,182,212,0.08)] group ${
                  !service.isActive ? "opacity-60 grayscale hover:grayscale-0" : ""
                }`}
              >
                <div className="relative w-full h-48 bg-slate-800/40 overflow-hidden">
                  {service.imageUrl && (
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {isAdminMode && !service.isActive && (
                    <div className="absolute top-2 left-2 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                      INACTIVE
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-cyan-400 text-sm font-bold font-mono z-10">
                    ₹{service.price}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1520] to-transparent" />
                </div>
                
                <div className="flex flex-col flex-grow p-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-500 mb-2">{service.category}</span>
                  <Link href={`/services/${service.id}`} className="hover:text-cyan-400 transition-colors">
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug line-clamp-2">
                      {service.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-grow mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto border-t border-slate-700/50 pt-4">
                    <button 
                      onClick={() => handleAddToCart(service)}
                      className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                        addedItems[service.id] 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-cyan-600 hover:bg-cyan-500 text-white"
                      }`}
                    >
                      {addedItems[service.id] ? (
                        "Added ✓"
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Add
                        </>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => toggleFavourite(service)}
                      className={`p-2.5 rounded-xl transition-colors border ${
                        isFavourited(service.id) 
                          ? "text-pink-500 bg-pink-500/10 border-pink-500/30 hover:border-pink-500/50" 
                          : "text-slate-400 bg-slate-800/50 border-slate-700/50 hover:text-pink-400 hover:border-pink-500/30"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavourited(service.id) ? "fill-pink-500" : ""}`} />
                    </button>

                    <div className="relative">
                      <button 
                        onClick={(e) => handleShare(service, e)}
                        className="p-2.5 text-slate-400 hover:text-blue-400 bg-slate-800/50 hover:bg-blue-500/10 rounded-xl transition-colors border border-slate-700/50 hover:border-blue-500/30"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      
                      {/* Share Popover Fallback */}
                      {sharePopover === service.id && (
                         <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                            <button 
                              onClick={(e) => handleCopyLink(service.id, e)}
                              className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                               {copiedLink === service.id ? <Check className="w-4 h-4 text-green-400" /> : <ShareLink className="w-4 h-4" />}
                               {copiedLink === service.id ? "Copied!" : "Copy URL Link"}
                            </button>
                         </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ServicesSection />
    </main>
  );
}
