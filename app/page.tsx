import HomeSection from "@/app/components/HomeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thermal Engineering & Cooling Solutions",
  description:
    "Zhivam builds electronic cooling, battery thermal management, CFD simulation, prototyping, testing, and advisory solutions for high-power electronics and energy systems.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeSection />;
}
