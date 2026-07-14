"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface QuotePayment {
    id: string;
    status: string;
    payment?: { amount: string; status: string; paymentUrl: string };
}

export default function QuotePaymentPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams<{ quoteId: string }>();
    const quoteId = decodeURIComponent(params.quoteId || "");
    const [quote, setQuote] = useState<QuotePayment | null>(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(`/dashboard/quotes/${quoteId}/payment`)}`);
    }, [loading, user, router, quoteId]);

    useEffect(() => {
        if (!user || !quoteId) return;
        fetch("/api/quote/my", { credentials: "include", cache: "no-store" })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Unable to load payment details.");
                const matchingQuote = data.quotes?.find((item: QuotePayment) => item.id === quoteId);
                if (!matchingQuote) throw new Error("This quote was not found.");
                setQuote(matchingQuote);
            })
            .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load payment details."))
            .finally(() => setFetching(false));
    }, [user, quoteId]);

    const payment = quote?.payment;
    const paid = payment?.status?.toLowerCase() === "paid";
    const available = quote?.status?.toLowerCase() === "quoted" && payment?.paymentUrl;

    return (
        <main className="min-h-screen bg-[#080c14] text-white px-4 py-12">
            <div className="w-full max-w-md mx-auto">
                <Link href="/dashboard/quotes" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-8">
                    <span aria-hidden="true">←</span> Back to My Quotes
                </Link>
                <section className="bg-[#0d1520] border border-slate-700/50 rounded-2xl p-6 shadow-2xl text-center">
                    {loading || fetching ? <p className="text-sm text-slate-400 py-12">Loading payment details…</p>
                        : error ? <p className="text-sm text-red-400 py-8">{error}</p>
                            : paid ? <p className="text-sm text-green-400 py-8">Payment received — thank you.</p>
                                : available ? <>
                                    <p className="text-[11px] uppercase tracking-widest font-semibold text-cyan-400">Quoted — Pay to Proceed</p>
                                    <h1 className="text-xl font-bold mt-2">Complete your payment</h1>
                                    {payment?.amount && <p className="text-3xl font-bold mt-5">₹{payment.amount}</p>}
                                    <a href={payment?.paymentUrl} className="inline-flex mt-6 px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold">Pay Now with Razorpay</a>
                                </> : <p className="text-sm text-slate-400 py-8">Payment is not available for this quote yet.</p>}
                </section>
            </div>
        </main>
    );
}