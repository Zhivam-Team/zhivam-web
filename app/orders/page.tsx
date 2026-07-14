"use client";

import { useEffect, useState } from "react";
import { getFirebase } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, Package, Calendar, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  serviceId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Order {
  id: string;
  createdAt: string;
  status: "pending" | "paid" | "completed" | "failed";
  totalAmount: number;
  razorpayOrderId: string;
  paymentId?: string;
  items: OrderItem[];
}

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  paid: "bg-green-500/10 text-green-400 border border-green-500/20",
  completed: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  failed: "bg-red-500/10 text-red-500 border border-red-500/20",
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const { db } = getFirebase();
        if (!db) return;
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        snapshot.forEach((docSnap) => {
          fetchedOrders.push({ id: docSnap.id, ...docSnap.data() } as Order);
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080c14] text-white pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <Package className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Your Orders</h1>
            <p className="text-slate-400">View and track your previous service purchases.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#0d1520] border border-slate-700/50 rounded-3xl p-16 text-center">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-slate-400 mb-8">You haven&apos;t placed any orders with us. Explore our services to get started.</p>
            <button 
              onClick={() => router.push("/servicesoffered")}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 rounded-xl transition-colors"
            >
              Explore Services
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                year: "numeric", month: "long", day: "numeric"
              });

              const isExpanded = expandedId === order.id;

              return (
                <div key={order.id} className="bg-[#0d1520] border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl shadow-black/50 transition-all hover:border-slate-600/60">
                  
                  {/* Order Header / Toggle */}
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="p-6 cursor-pointer flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:bg-slate-800/30 transition-colors"
                  >
                    
                    {/* ID & Date */}
                    <div className="flex flex-col gap-2">
                       <span className="text-xs text-slate-500 uppercase tracking-widest font-mono font-bold">Order #{order.id.slice(-8)}</span>
                       <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-500" /> {date}
                       </div>
                    </div>

                    {/* Status & Total */}
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                       <div className="flex flex-col md:items-end gap-1">
                          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono font-bold">Total</span>
                          <span className="font-bold text-lg text-cyan-400">₹{order.totalAmount}</span>
                       </div>
                       
                       <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[order.status] || statusColors.pending}`}>
                         {order.status}
                       </div>

                       <div className="p-2 bg-slate-800/80 rounded-full text-slate-400">
                         {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                       </div>
                    </div>
                  </div>

                  {/* Expanded Items Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-slate-700/50 bg-slate-900/40"
                      >
                        <div className="p-6 space-y-4">
                          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-700/50 pb-2 mb-4">Included Items</h4>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
                              <div className="w-12 h-12 bg-slate-800 rounded-lg relative overflow-hidden shrink-0">
                                {item.imageUrl && <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-slate-200 truncate">{item.title}</h5>
                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-mono text-slate-300">₹{item.price * item.quantity}</span>
                            </div>
                          ))}

                          {order.paymentId && (
                            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-500 font-mono">
                               <CreditCard className="w-4 h-4" /> Ref: {order.paymentId}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
