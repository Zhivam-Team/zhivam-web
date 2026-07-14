"use client";

import { useEffect, useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { useFavourites } from "@/hooks/useFavourites";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, Share2, Loader2, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourited } = useFavourites();
  const { user } = useAuth();

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => {
        setResolvedId(p.id);
        const fetchService = async () => {
          try {
            const { db } = getFirebase();
            if (!db) return;
            const docRef = doc(db, "services", p.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().isActive) {
              setService({ id: docSnap.id, ...docSnap.data() });
            } else {
              setService(null);
            }
          } catch (error) {
            console.error("Failed to fetch service", error);
            setService(null);
          } finally {
            setLoading(false);
          }
        };
        fetchService();
    });
  }, [params]);

  const handleAddToCart = () => {
    if (!service) return;
    addToCart(service);
    setAddedItems((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [service.id]: false })), 2000);
  };

  const handleShare = async () => {
    if (!service || !resolvedId) return;
    const url = `${window.location.origin}/services/${resolvedId}`;
    
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
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4">Service Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">The service you are looking for does not exist or is no longer active.</p>
        <button onClick={() => router.push("/servicesoffered")} className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 rounded-xl transition-colors">
          Browse Services
        </button>
      </div>
    );
  }

  const favourited = isFavourited(service.id);

  return (
    <main className="min-h-screen bg-[#080c14] text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Image Gallery Column */}
          <div className="space-y-6">
             <div className="relative w-full h-[400px] md:h-[500px] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-cyan-900/10">
                {service.imageUrl ? (
                  <Image src={service.imageUrl} alt={service.title} fill className="object-cover" priority />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">No Image Available</div>
                )}
             </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-2 block">{service.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{service.title}</h1>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ₹{service.price}
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 flex-grow whitespace-pre-wrap">
              {service.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-700/50">
                
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 flex justify-center items-center gap-3 py-4 rounded-xl text-lg font-bold transition-all shadow-lg ${
                  addedItems[service.id]
                    ? "bg-green-500 hover:bg-green-400 text-black shadow-green-500/20"
                    : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20"
                }`}
              >
                {addedItems[service.id] ? <><Check className="w-5 h-5" /> Added to Cart</> : <><ShoppingCart className="w-5 h-5 fill-current" /> Add to Cart</>}
              </motion.button>

              <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavourite(service)}
                    className={`w-14 shrink-0 flex items-center justify-center rounded-xl border transition-colors ${
                      favourited 
                      ? "bg-pink-500/10 border-pink-500/50 text-pink-500" 
                      : "bg-[#0d1520] border-slate-700/50 text-slate-400 hover:text-pink-400 hover:border-pink-500/50"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${favourited ? "fill-pink-500" : ""}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="w-14 shrink-0 relative flex items-center justify-center rounded-xl bg-[#0d1520] border border-slate-700/50 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                  >
                    {copiedLink ? <Check className="w-6 h-6 text-green-400" /> : <Share2 className="w-6 h-6" />}
                  </motion.button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}