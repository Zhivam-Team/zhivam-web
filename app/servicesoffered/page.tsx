import ServicesSection from "@/app/components/ServicesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Advisory Services | Zhivam",
  description:
    "Explore Zhivam's R&D, electronic thermal management, battery cooling, CFD simulation, PCB thermal testing, renewable energy, and technical advisory services.",
  alternates: { canonical: "/servicesoffered" },
  // Hides the main services page from Google
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <ServicesSection />
    </main>
  );
}