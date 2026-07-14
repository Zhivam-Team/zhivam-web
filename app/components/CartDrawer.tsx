"use client";

import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { cartItems, cartTotal, removeFromCart, isDrawerOpen, setIsDrawerOpen } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d1520] border-l border-slate-700/60 shadow-[-8px_0_32px_rgba(0,0,0,0.5)] z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/60">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Your Cart</h2>
                <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                  <ShoppingBag className="w-16 h-16 mb-4 stroke-1" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.serviceId}
                    className="flex gap-4 p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl relative group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">No Img</div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <div className="text-xs text-slate-400 mt-1">Qty: {item.quantity}</div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-cyan-400">₹{item.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.serviceId)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-700/60 bg-slate-900/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-white">₹{cartTotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
