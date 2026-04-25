import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contact Zhivam for thermal engineering, battery cooling, simulation, prototyping, testing, and technical advisory projects.",
    alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
