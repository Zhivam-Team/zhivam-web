import "./globals.css";
import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/app/contexts/CartContext";
import SiteShell from "@/app/components/SiteShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zhivam.com";
const siteName = "Zhivam";
const siteDescription =
    "Zhivam provides thermal engineering, electronic cooling, battery thermal management, CFD simulation, prototyping, testing, and technical advisory services.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${siteName} | Thermal Engineering & Cooling Solutions`,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: [
        "thermal engineering",
        "electronic cooling",
        "battery thermal management",
        "CFD simulation",
        "immersion cooling",
        "cold plates",
        "heat sink design",
        "thermal testing",
        "Zhivam",
    ],
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: siteUrl,
        siteName,
        title: `${siteName} | Thermal Engineering & Cooling Solutions`,
        description: siteDescription,
        images: [
            {
                url: "/images/Heat_Sink.png",
                width: 1200,
                height: 630,
                alt: "Zhivam thermal engineering and cooling solutions",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteName} | Thermal Engineering & Cooling Solutions`,
        description: siteDescription,
        images: ["/images/Heat_Sink.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.png",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#080c14",
};

const geist = Geist({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/images/favicon%20(1).png`,
        email: "info@zhivam.com",
        telephone: "+91 833 385 0202",
        sameAs: [
            "https://www.linkedin.com/company/zhivam/posts/?feedView=all",
            "https://www.instagram.com/zhivam.tech/",
        ],
        address: {
            "@type": "PostalAddress",
            streetAddress: "9-65-41/A Sykamvari Street, I Floor, Kothapet, Chittinagar",
            addressLocality: "Vijayawada",
            addressRegion: "Andhra Pradesh",
            postalCode: "520001",
            addressCountry: "IN",
        },
    };

    return (
        <html lang="en">
            <body className={`${geist.className} bg-black text-white`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <CartProvider>
                    <SiteShell>{children}</SiteShell>
                </CartProvider>
            </body>
        </html>
    );
}
