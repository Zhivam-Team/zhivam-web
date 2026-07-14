"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import AboutSection from "./AboutSection";
import FoundersSection from "./FoundersSection";
import TeamSection from "./TeamSection";
import LogoSection from "./LogoSection";

export default function Home() {
    const textRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const gradientX = useMotionValue(0);
    const gradientY = useMotionValue(0);

    const background = useMotionTemplate`radial-gradient(circle 250px at ${gradientX}px ${gradientY}px, #ff8a00, #e52e71, #6b21a8, #0077b6)`;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.18 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut" as const,
            },
        },
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (textRef.current) {
            const rect = textRef.current.getBoundingClientRect();
            gradientX.set(event.clientX - rect.left);
            gradientY.set(event.clientY - rect.top);
        }
    };

    return (
        <main className="bg-[#080c14] overflow-x-hidden">

            {/* ====== Hero Section ====== */}
            <section
                id="home"
                className="relative min-h-svh flex flex-col justify-center items-center md:items-start text-white overflow-hidden pt-20 sm:pt-0"
            >
                {/* Background grid texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04] z-0"
                    style={{
                        backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black 40%, transparent 90%)",
                        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black 40%, transparent 90%)",
                    }}
                />

                {/* Layered ambient glow */}
                <div className="pointer-events-none absolute top-1/3 -translate-y-1/2 left-0 w-[560px] h-[560px] bg-cyan-500/[0.07] blur-[140px] rounded-full z-0" />
                <div className="pointer-events-none absolute top-2/3 -translate-y-1/2 left-20 w-[380px] h-[380px] bg-blue-600/[0.05] blur-[120px] rounded-full z-0" />

                {/* Left Side: Text Content */}
                <motion.div
                    className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left space-y-6 sm:space-y-7 w-full max-w-[38rem] md:max-w-2xl pt-14 pb-12 md:pt-0 md:pb-0 px-6 md:px-6 md:pl-12 lg:pl-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow badge
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[1.5px] uppercase text-cyan-400 bg-cyan-500/[0.06] border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Precision Thermal Engineering
                        </span>
                    </motion.div> */}

                    {/* Zhivam Logo Image with Spotlight */}
                    <motion.div
                        ref={textRef}
                        variants={itemVariants}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseMove={handleMouseMove}
                        className="cursor-default mx-auto md:mx-0"
                        style={{
                            display: "grid",
                            width: "clamp(230px, 76vw, 600px)",
                            height: "clamp(68px, 23vw, 172px)",
                            filter: "drop-shadow(0 8px 32px rgba(6,182,212,0.1))",
                        }}
                    >
                        {/* Base Image */}
                        <img
                            src="/images/zhivam-white.png"
                            alt="Zhivam"
                            style={{
                                gridArea: "1 / 1",
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "left center",
                            }}
                            className="select-none"
                            draggable={false}
                        />

                        {/* Spotlight Gradient Overlay */}
                        <motion.div
                            style={{
                                gridArea: "1 / 1",
                                width: "100%",
                                height: "100%",
                                backgroundImage: background,
                                WebkitMaskImage: "url('/images/zhivam-white.png')",
                                maskImage: "url('/images/zhivam-white.png')",
                                WebkitMaskSize: "contain",
                                maskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskPosition: "left center",
                                maskPosition: "left center",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            aria-hidden="true"
                        />
                    </motion.div>

                    {/* CTAs */}
                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="order-1 md:order-none flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-3 md:ml-6 lg:ml-10"
                    >
                        <Link
                            href="/servicesoffered"
                            className="group flex min-h-11 items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-5 py-2.5 md:px-6 md:py-3 rounded-full transition-all duration-200 shadow-[0_4px_24px_rgba(6,182,212,0.25)] hover:shadow-[0_6px_32px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
                        >
                            Explore Services
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="flex min-h-11 items-center justify-center text-sm font-medium text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm border border-slate-700/60 hover:border-slate-500 px-5 py-2.5 md:px-6 md:py-3 rounded-full transition-all duration-200"
                        >
                            Contact Us
                        </Link>
                    </motion.div>

                    {/* Divider + micro-caption instead of empty stats row */}
                    <motion.div
                        variants={itemVariants}
                        className="order-2 md:order-none flex items-center justify-center md:justify-start gap-3 border-t-0 md:border-t md:border-slate-700/40 pt-6 mt-2 w-full max-w-sm md:ml-6 lg:ml-10"
                    >
                        <span className="text-sm md:text-[11px] text-slate-400 md:text-slate-500 tracking-wide">
                            Engineering-grade thermal solutions, built to spec.
                        </span>
                    </motion.div>
                </motion.div>

                {/* Desktop scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="hidden md:flex absolute bottom-8 left-12 lg:left-20 z-10 flex-col items-center gap-2"
                >
                    <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                    </motion.div>
                </motion.div>

                {/* Mobile scroll cue — centered, icon only, no text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="flex md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2"
                >
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                    </motion.div>
                </motion.div>

                {/* HERO BACKGROUND IMAGE */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="/images/Heat_Sink.webp"
                        alt="Hero"
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center sm:object-[58%_center] md:inset-auto md:right-0 md:left-60 md:top-1/2 md:-translate-y-1/2 md:h-[155%] md:w-auto md:object-contain opacity-32 sm:opacity-45 md:opacity-80"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                    />

                    {/* Cinematic left fade */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `linear-gradient(
                                to right,
                                #080c14 0%,
                                #080c14 18%,
                                #080c14dd 42%,
                                transparent 82%
                            )`,
                        }}
                    />
                    <div className="md:hidden absolute inset-0 bg-[#080c14]/40 pointer-events-none" />

                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080c14] to-transparent pointer-events-none" />
                </div>
            </section>

            <AboutSection />
            <LogoSection />
            <FoundersSection />
            <TeamSection />
        </main>
    );
}