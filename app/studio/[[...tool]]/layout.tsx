import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Zhivam Studio",
    description: "Content management for Zhivam blog",
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}