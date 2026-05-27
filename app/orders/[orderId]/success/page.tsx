"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Package } from "lucide-react";

export default function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);

  useEffect(() => {
    // Optional: trigger confetti or animation here
  }, []);

  return (
    <main className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center px-4 pt-20">
      <div className="bg-[#0d1520] border border-slate-700/60 rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden">
        
        {/* Background glow behind icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-500/20 rounded-full blur-[60px] pointer-events-none" />
        
        <CheckCircle className="w-24 h-24 text-green-400 mx-auto relative z-10 mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]" />
        
        <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Payment Successful!</h1>
        <p className="text-slate-400 mb-8 relative z-10">
          Thank you for your order. We have sent a confirmation email to you. We will begin processing your request right away.
        </p>
        
        <div className="bg-slate-900/50 rounded-xl p-4 mb-8 border border-slate-700/50 relative z-10 flex flex-col items-center">
            <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Order Reference ID</span>
            <span className="font-mono text-cyan-400 font-bold tracking-wider">{resolvedParams.orderId}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button 
            onClick={() => router.push("/orders")}
            className="flex-1 flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            <Package className="w-4 h-4" /> View Orders
          </button>
          <button 
            onClick={() => router.push("/servicesoffered")}
            className="flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all"
          >
            Explore More <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </main>
  );
}
