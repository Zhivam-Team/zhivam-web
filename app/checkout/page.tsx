"use client";

import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Razorpay Script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center text-white px-4 pt-32 pb-20">
        <div className="bg-[#0d1520] border border-slate-700/50 rounded-3xl p-12 text-center max-w-md w-full">
          <ShoppingBag className="w-16 h-16 text-slate-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-slate-400 mb-8">Add some services to your cart before checking out.</p>
          <button 
            onClick={() => router.push("/servicesoffered")}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create Order via our API
      const res = await fetch("/api/orders/create", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Zhivam AI Solutions",
        description: "Service Purchase Checkout",
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok && verifyData.success) {
               router.push(`/orders/${data.orderId}/success`);
            } else {
               setError(verifyData.error || "Payment verification failed.");
               setIsProcessing(false);
            }
          } catch (err) {
            setError("Server error during verification.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
        },
        theme: {
          color: "#06b6d4",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        setError(response.error.description || "Payment failed or was cancelled.");
        setIsProcessing(false);
      });

      rzp.open();

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080c14] text-white pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Summary Items */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">Checkout</h1>
            <p className="text-slate-400">Review your services and complete payment securely.</p>
          </div>

          <div className="bg-[#0d1520] border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" /> Order Summary
            </h2>
            
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.serviceId} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 relative overflow-hidden shrink-0 border border-slate-700/50">
                    {item.imageUrl && <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-200 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right font-semibold">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Details */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 bg-[#0d1520] border border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-cyan-900/10">
              <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-slate-700/50">Payment Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Taxes</span>
                  <span className="text-white">Included</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-slate-700/50">
                  <span>Total</span>
                  <span className="text-cyan-400">₹{cartTotal}</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  <>Pay Now <ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Payments processed securely by Razorpay
              </div>
          </div>
        </div>

      </div>
    </main>
  );
}
