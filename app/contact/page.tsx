"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const SocialLinks = () => {
    const socials = [
        {
            name: "Instagram",
            href: "https://www.instagram.com/zhivam.tech/",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/company/zhivam/posts/?feedView=all",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex gap-4 mt-8">
            {socials.map((s, i) => (
                <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    {...fadeUp(0.5 + i * 0.1)}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-slate-600 text-slate-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-200"
                >
                    {s.icon}
                </motion.a>
            ))}
        </div>
    );
};

// SVG icon helpers matching the HTML's office card icons
const IconLocation = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconPhone = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const IconMail = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const IconClock = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const InfoRow = ({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex gap-3 items-start mb-5 last:mb-0">
        <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
            {icon}
        </div>
        <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">{label}</div>
            <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
        </div>
    </div>
);

const SERVICE_OPTIONS = [
    "Electronic Thermal Management",
    "Battery Thermal Management & Testing",
    "Immersion Cooling Solutions",
    "PCB Design, Prototyping & Thermal Testing",
    "Design, Simulation, Prototyping & Testing",
    "Renewable Energy & Sustainability Solutions",
    "Consultancy & Technical Advisory",
    "IP Licensing & Industry Collaboration",
    "Other",
];

export default function ContactPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    const [service, setService] = useState("")
    const [message, setMessage] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [focused, setFocused] = useState<string | null>(null)
    const [marketingConsent, setMarketingConsent] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const validateEmail = (value: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!regex.test(value) ? "Enter a valid email" : "");
    };

    const validatePhone = (value: string) => {
        const regex = /^\+?\d{10,12}$/;
        setPhoneError(!regex.test(value) ? "Only + and 10–12 digits allowed" : "");
    };

    const countWords = (text: string) =>
        text.trim() ? text.trim().split(/\s+/).length : 0;

    const handleMessageChange = (value: string) => {
        if (countWords(value) <= 1000) setMessage(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (emailError || phoneError) return

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, company, location, service, message, marketingConsent })
            })

            if (res.ok) {
                setSubmitStatus('success')
                setName("")
                setEmail("")
                setPhone("")
                setCompany("")
                setLocation("")
                setService("")
                setMessage("")
            } else {
                setSubmitStatus('error')
            }
        } catch {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputBase =
        "w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all duration-200";

    const inputClass = (field: string, hasError?: boolean) =>
        `${inputBase} ${hasError
            ? "border-red-500/70 focus:border-red-400"
            : focused === field
                ? "border-cyan-400/70 shadow-[0_0_0_3px_rgba(34,211,238,0.08)]"
                : "border-slate-700 hover:border-slate-500"
        }`;

    const stagger = {
        animate: { transition: { staggerChildren: 0.08 } },
    };

    return (
        <main className="min-h-screen bg-[#080c14] text-white flex items-start justify-center px-6 pt-28 pb-20 overflow-hidden">

            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />
            </div>

            <div className="relative w-full max-w-5xl flex flex-col lg:flex-row gap-16 items-start">

                {/* ── LEFT PANEL ── */}
                <div className="flex-1 lg:sticky lg:top-28 space-y-0">

                    {/* Headline block */}
                    <div>
                        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Available for projects
                        </motion.div>

                        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-6xl font-bold tracking-tight leading-none">
                            Let&apos;s <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                                work together
                            </span>
                        </motion.h1>

                        <motion.p {...fadeUp(0.2)} className="text-slate-400 mt-5 text-base leading-relaxed max-w-xs">
                            Have a project or question? Drop us a message and we&apos;ll get back to you within 24 hours.
                        </motion.p>

                        <SocialLinks />
                    </div>

                    {/* Quick contact row */}
                    <motion.div {...fadeUp(0.8)} className="mt-10 pt-10 border-t border-slate-800 space-y-3">
                        {[
                            { label: "Email", value: "info@zhivam.com" },
                            { label: "Contact", value: "+91 833 385 0202" },
                            { label: "Based in", value: "India" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3 text-sm">
                                <span className="text-slate-500 w-16">{item.label}</span>
                                <span className="text-slate-300">{item.value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* ── Office Cards ── */}
                    <motion.div {...fadeUp(1.0)} className="mt-10 space-y-4">

                        {/* Vijayawada HQ */}
                        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
                            <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400 mb-1">Headquarters</div>
                            <h3 className="text-sm font-semibold text-white mb-4">Vijayawada Office</h3>

                            <InfoRow icon={<IconLocation />} label="Registered Address">
                                9-65-41/A Sykamvari Street, I Floor,<br />
                                Kothapet, Chittinagar,<br />
                                Vijayawada (Urban), Krishna — 520001<br />
                                Andhra Pradesh, India
                            </InfoRow>

                            <InfoRow icon={<IconPhone />} label="Phone">
                                <a href="tel:+918333850202" className="hover:text-cyan-400 transition-colors">+91 833 385 0202</a>
                            </InfoRow>

                            <InfoRow icon={<IconMail />} label="Email">
                                <a href="mailto:support@zhivam.com" className="hover:text-cyan-400 transition-colors">support@zhivam.com</a><br />
                                <a href="mailto:info@zhivam.com" className="hover:text-cyan-400 transition-colors">info@zhivam.com</a>
                            </InfoRow>
                        </div>

                        {/* Kattankulathur Branch */}
                        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
                            <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400 mb-1">Branch Office</div>
                            <h3 className="text-sm font-semibold text-white mb-4">Kattankulathur Office</h3>

                            <InfoRow icon={<IconLocation />} label="Branch Address">
                                Second Floor, Center For Electric Mobility,<br />
                                Potheri, SRM Nagar,<br />
                                Kattankulathur — 603203<br />
                                Tamil Nadu, India
                            </InfoRow>

                            <InfoRow icon={<IconClock />} label="Business Hours">
                                Mon – Fri: 9:00 AM – 6:00 PM IST<br />
                                Saturday: 10:00 AM – 2:00 PM IST
                            </InfoRow>

                            {/* Service badges
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700/50">
                                {["⚡ Thermal Engineering", "🔋 Battery Systems", "📐 Simulation", "🌱 Renewables"].map((badge) => (
                                    <span key={badge} className="text-[11px] font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-1">
                                        {badge}
                                    </span>
                                ))}
                            </div> */}

                            {/* Legal notice */}
                            <div className="mt-4 rounded-xl border-l-2 border-cyan-400/50 bg-cyan-400/5 px-4 py-3 text-xs text-slate-400 leading-relaxed">
                                <span className="text-cyan-400 font-semibold">Note for Clients: </span>
                                For billing disputes, refund requests, or legal correspondence, please write to{" "}
                                <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a>{" "}
                                quoting your order/project ID.
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── FORM ── */}
                <motion.form
                    onSubmit={handleSubmit}
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="flex-1 w-full space-y-5"
                >
                    {/* Name */}
                    <motion.div variants={fadeUp(0)}>
                        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            className={inputClass("name")}
                        />
                    </motion.div>

                    {/* Email + Phone */}
                    <motion.div variants={fadeUp(0)} className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                                onBlur={(e) => { validateEmail(e.target.value); setFocused(null); }}
                                onFocus={() => setFocused("email")}
                                required
                                type="email"
                                placeholder="you@email.com"
                                className={inputClass("email", !!emailError)}
                            />
                            {emailError && <p className="text-red-400 text-xs mt-1.5">{emailError}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                                Phone <span className="text-red-400">*</span>
                            </label>
                            <input
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value); validatePhone(e.target.value); }}
                                onBlur={(e) => { validatePhone(e.target.value); setFocused(null); }}
                                onFocus={() => setFocused("phone")}
                                required
                                type="tel"
                                placeholder="+919876543210"
                                className={inputClass("phone", !!phoneError)}
                            />
                            {phoneError && <p className="text-red-400 text-xs mt-1.5">{phoneError}</p>}
                        </div>
                    </motion.div>

                    {/* Company */}
                    <motion.div variants={fadeUp(0)}>
                        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                            Company
                        </label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Your company (optional)"
                            onFocus={() => setFocused("company")}
                            onBlur={() => setFocused(null)}
                            className={inputClass("company")}
                        />
                    </motion.div>

                    {/* Location */}
                    <motion.div variants={fadeUp(0)}>
                        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                            Location <span className="text-red-400">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, Country"
                            onFocus={() => setFocused("location")}
                            onBlur={() => setFocused(null)}
                            className={inputClass("location")}
                        />
                    </motion.div>

                    {/* Service of Interest */}
                    <motion.div variants={fadeUp(0)}>
                        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                            Service of Interest <span className="text-red-400">*</span>
                        </label>
                        <select
                            required
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            onFocus={() => setFocused("service")}
                            onBlur={() => setFocused(null)}
                            className={`${inputClass("service")} appearance-none cursor-pointer`}
                        >
                            <option value="" disabled className="bg-slate-900 text-slate-500">
                                Select a service…
                            </option>
                            {SERVICE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-slate-900 text-white">
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUp(0)}>
                        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                            Message <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            required
                            rows={6}
                            value={message}
                            onChange={(e) => handleMessageChange(e.target.value)}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused(null)}
                            placeholder="Tell us about your project..."
                            className={`${inputClass("message")} resize-none`}
                        />
                        <div className="flex justify-end mt-1.5">
                            <span className={`text-xs tabular-nums ${countWords(message) > 900 ? "text-amber-400" : "text-slate-500"}`}>
                                {countWords(message)} / 1000 words
                            </span>
                        </div>
                    </motion.div>

                    {/* Marketing consent */}
                    <motion.div variants={fadeUp(0)}>
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative mt-0.5 shrink-0">
                                <input
                                    type="checkbox"
                                    checked={marketingConsent}
                                    onChange={(e) => setMarketingConsent(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900/50 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all duration-200 flex items-center justify-center">
                                    {marketingConsent && (
                                        <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                Yes, I would like to receive blog updates, research insights, and occasional offers from Zhivam.
                                <span className="text-slate-600 ml-1">(Optional — unsubscribe anytime)</span>
                            </span>
                        </label>
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={fadeUp(0)} className="space-y-3">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className="w-full relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm tracking-wide"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message →'}
                        </motion.button>

                        <p className="text-xs text-slate-500 text-center">
                            We respond within 1–2 business days. Your data is handled per our{" "}
                            <a href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
                        </p>

                        {/* Success message */}
                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3"
                            >
                                <span>✓</span> Message sent! We&apos;ll get back to you within 24 hours.
                            </motion.div>
                        )}

                        {/* Error message */}
                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                            >
                                <span>✕</span> Something went wrong. Please try again or email us directly.
                            </motion.div>
                        )}
                    </motion.div>
                </motion.form>
            </div>
        </main>
    );
}