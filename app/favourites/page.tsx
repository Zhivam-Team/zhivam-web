"use client";

import { useEffect, useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useFavourites, FavouriteItem } from "@/hooks/useFavourites";
import { useCart } from "@/app/contexts/CartContext";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Loader2, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceData } from "@/app/admin/page";

export default function FavouritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { favourites, toggleFavourite } = useFavourites();
  const { addToCart } = useCart();
  
  const [favouriteServices, setFavouriteServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchFavouriteServices = async () => {
      if (favourites.length === 0) {
        setFavouriteServices([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { db } = getFirebase();
        if (!db) return;
        const serviceIds = favourites.map(f => f.serviceId);
        
        // Firestore 'in' query supports up to 10 elements.
        // For production with >10 likes, chunking the queries would be needed.
        const chunkedIds = [];
        for (let i = 0; i < serviceIds.length; i += 10) {
          chunkedIds.push(serviceIds.slice(i, i + 10));
        }

        const allFetchedServices: ServiceData[] = [];
        for (const chunk of chunkedIds) {
          const q = query(collection(db, "services"), where("__name__", "in", chunk));
          const snapshot = await getDocs(q);
          snapshot.forEach((docSnap) => {
            allFetchedServices.push({ id: docSnap.id, ...docSnap.data() } as ServiceData);
          });
        }
        
        // Sort services to match the chronological order of favourites
        const sortedServices = favourites
           .map(fav => allFetchedServices.find(s => s.id === fav.serviceId))
           .filter((s): s is ServiceData => s !== undefined);
           
        setFavouriteServices(sortedServices);
      } catch (error) {
        console.error("Failed to fetch favourite services", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && !authLoading) {
      fetchFavouriteServices();
    }
  }, [favourites, user, authLoading]);

  const handleAddToCart = (service: ServiceData) => {
    addToCart(service);
    setAddedItems((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [service.id]: false }));
    }, 2000);
  };

  if (authLoading || (loading && favourites.length > 0)) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080c14] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        
        <div className="mb-12 flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Saved Services</h1>
            <p className="text-slate-400">Your curated collection of favourite Zhivam services.</p>
          </div>
        </div>

        {favouriteServices.length === 0 ? (
          <div className="bg-[#0d1520] border border-slate-700/50 rounded-3xl p-16 text-center max-w-2xl mx-auto">
            <Heart className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-2">No favourites yet</h2>
            <p className="text-slate-400 mb-8">You haven&apos;t saved any services. Click the heart icon on any service to add it here.</p>
            <button 
              onClick={() => router.push("/servicesoffered")}
              className="bg-pink-600 hover:bg-pink-500 text-white font-medium py-3 px-8 rounded-xl transition-colors"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favouriteServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col bg-[#0d1520] border border-slate-700/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_32px_rgba(236,72,153,0.08)] group"
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
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-cyan-400 text-sm font-bold font-mono z-10">
                    ₹{service.price}
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow p-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-pink-500 mb-2">{service.category}</span>
                  <Link href={`/services/${service.id}`} className="hover:text-pink-400 transition-colors">
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug line-clamp-2">
                      {service.title}
                    </h3>
                  </Link>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto border-t border-slate-700/50 pt-4">
                    <button 
                      onClick={() => handleAddToCart(service)}
                      className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        addedItems[service.id] 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-cyan-600 hover:bg-cyan-500 text-white"
                      }`}
                    >
                      {addedItems[service.id] ? "Added ✓" : <><ShoppingCart className="w-4 h-4" /> Add</>}
                    </button>
                    
                    <Link 
                      href={`/services/${service.id}`}
                      className="p-2.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700/50"
                    >
                      <Info className="w-4 h-4" />
                    </Link>

                    <button 
                      onClick={() => toggleFavourite(service)}
                      className="p-2.5 text-pink-500 bg-pink-500/10 hover:bg-pink-500/20 rounded-xl transition-colors border border-pink-500/30"
                    >
                      <Heart className="w-4 h-4 fill-pink-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
