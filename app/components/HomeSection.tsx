"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            ease: "easeInOut" as const, // Add 'as const' here
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
                // Changed justify-center to justify-start to align content to the left
                className="relative min-h-svh flex flex-col justify-center items-start text-white overflow-hidden"
            >
                {/* Background grid texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
                    style={{
                        backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />

                {/* Ambient glow */}
                <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full z-0" />

                {/* Left Side: Text Content */}
                <motion.div
                    // Changed items-center to items-start and text-center to text-left for mobile
                    className="relative z-10 flex flex-col items-start text-left space-y-6 w-full md:max-w-2xl pt-24 pb-8 md:pt-0 md:pb-0 px-6 md:pl-12 lg:pl-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Zhivam Logo Image with Spotlight */}
                    <motion.div
                        ref={textRef}
                        variants={itemVariants}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseMove={handleMouseMove}
                        className="pt-2 md:pt-3 cursor-default"
                        style={{
                            display: "grid",
                            width: "clamp(220px, 38vw, 560px)",
                            height: "clamp(64px, 11vw, 160px)",
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
                                // Forced left alignment for the logo image
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
                                // Forced left alignment for the mask
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
                    <motion.div
                        variants={itemVariants}
                        // Removed the complex clamp padding to keep it naturally aligned to the left
                        className="flex items-center gap-3 md:gap-4 pt-2"
                    >
                        <Link
                            href="/servicesoffered"
                            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-4 py-2.5 md:px-6 md:py-3 rounded-xl transition-colors duration-200"
                        >
                            Explore Services <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2.5 md:px-6 md:py-3 rounded-xl transition-colors duration-200"
                        >
                            Contact Us
                        </Link>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-6 border-t border-slate-700/50 pt-6 mt-2 w-full"
                    >
                    </motion.div>
                </motion.div>

                {/* HERO BACKGROUND IMAGE */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="/images/HeroSection Image.webp"
                        alt="Hero"
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center md:inset-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:h-[155%] md:w-auto md:object-contain opacity-40 md:opacity-80"
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
                                #080c14 25%,
                                #080c14cc 40%,
                                transparent 70%
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