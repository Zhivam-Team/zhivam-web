import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions | Zhivam",
    // This completely hides the /terms route from Google
    robots: {
        index: false,
        follow: false,
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}