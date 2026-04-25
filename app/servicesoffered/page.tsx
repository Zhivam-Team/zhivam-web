import ServicesSection from "@/app/components/ServicesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Advisory Services",
  description:
    "Explore Zhivam's R&D, electronic thermal management, battery cooling, CFD simulation, PCB thermal testing, renewable energy, and technical advisory services.",
  alternates: { canonical: "/servicesoffered" },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <ServicesSection />
    </main>
  );
}
