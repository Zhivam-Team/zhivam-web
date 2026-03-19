"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const FloatingContactButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();

    const toggleVisibility = () => {
        if (pathname === '/') {
            setIsVisible(window.scrollY > 300);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        if (pathname.startsWith('/studio')) return;
        toggleVisibility();
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [pathname]);

    if (
        pathname.startsWith('/studio') ||
        pathname === '/contact' ||
        pathname === '/zheat'
    ) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3"
                >
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                key="panel"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="bg-[#0d1520] border border-slate-700/60 rounded-2xl p-4 w-64 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                                        Get in touch
                                    </p>
                                </div>
                                <p className="text-sm text-white font-semibold mb-1">
                                    {"Let's work together"}
                                </p>
                                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                    Have a thermal engineering project? We respond within 24 hours.
                                </p>
                                <div className="space-y-2">
                                    <a
                                        href="tel:+918333850202"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                            <Phone className="w-3.5 h-3.5 text-cyan-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-white">Call us</p>
                                            <p className="text-[10px] text-slate-500">+91 833 385 0202</p>
                                        </div>
                                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                                    </a>
                                    <a
                                        href="mailto:info@zhivam.com"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                            <Mail className="w-3.5 h-3.5 text-cyan-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-white">Email us</p>
                                            <p className="text-[10px] text-slate-500">info@zhivam.com</p>
                                        </div>
                                        <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                                    </a>
                                </div>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsExpanded(false)}
                                    className="mt-3 flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold py-2.5 rounded-xl transition-colors"
                                >
                                    Send a message <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-label="Contact Us"
                        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 shadow-[0_4px_24px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_32px_rgba(6,182,212,0.6)] transition-all duration-300"
                    >
                        <AnimatePresence mode="wait">
                            {isExpanded ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={20} className="text-black" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MessageCircle size={20} className="text-black" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!isExpanded && (
                            <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" />
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingContactButton;