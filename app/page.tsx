import HomeSection from "@/app/components/HomeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // A stronger, brand-first title to outrank the contact page
  title: "Zhivam | Advanced Electronic Thermal Management",
  description:
    "Zhivam builds electronic cooling, battery thermal management, CFD simulation, prototyping, testing, and advisory solutions for high-power electronics and energy systems.",
  alternates: { canonical: "/" },
  // Explicitly tell Google bots this is the priority page
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <HomeSection />;
}