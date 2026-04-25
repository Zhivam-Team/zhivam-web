import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ZHeat Analyzer",
    description:
        "Use Zhivam's ZHeat analyzer for heat sink and thermal design calculations.",
    alternates: { canonical: "/zheat" },
};

export default function ZHeatLayout({ children }: { children: React.ReactNode }) {
    return children;
}
