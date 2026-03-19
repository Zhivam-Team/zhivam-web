"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ComingSoonContent() {
    const searchParams = useSearchParams();
    const feature = searchParams.get("feature") || "This feature";
    const description = searchParams.get("description") || "We are currently working on something amazing. Stay tuned!";
    const backHref = searchParams.get("back") || "/";
    const backLabel = searchParams.get("backLabel") || "Go back";

    return (
        <main className="min-h-screen bg-[#080c14] text-white flex items-center justify-center px-6 overflow-hidden">

            {/* Background grid */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Ambient glow */}
            <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
            <div className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Under Development
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold leading-tight mb-6"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                        {feature}
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto"
                >
                    {description}
                </motion.p>

                {/* Coming soon card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-slate-700/50" />
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Coming Soon</span>
                        <div className="h-px flex-1 bg-slate-700/50" />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Our team is actively working on this feature. It will be available soon.
                        In the meantime, feel free to explore our other tools and services.
                    </p>
                </motion.div>

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-center gap-4"
                >
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {backLabel}
                    </Link>
                    <span className="text-slate-700">|</span>
                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        Home
                    </Link>
                    <span className="text-slate-700">|</span>
                    <Link
                        href="/contact"
                        className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        Contact us
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}

export default function ComingSoonPage() {
    return (
        <Suspense>
            <ComingSoonContent />
        </Suspense>
    )
}