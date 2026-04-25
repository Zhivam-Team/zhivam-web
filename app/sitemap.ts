import type { MetadataRoute } from "next";
import { rdServices } from "@/lib/servicesData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zhivam.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const staticRoutes = [
        "",
        "/servicesoffered",
        "/blog",
        "/contact",
        "/terms",
        "/privacy-policy",
        "/refund-policy",
        "/shipping-delivery",
        "/zheat",
    ];

    const serviceRoutes = rdServices.map((service) => ({
        url: `${siteUrl}/servicesoffered/${service.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [
        ...staticRoutes.map((route) => ({
            url: `${siteUrl}${route}`,
            lastModified: now,
            changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
            priority: route === "" ? 1 : 0.7,
        })),
        ...serviceRoutes,
    ];
}
