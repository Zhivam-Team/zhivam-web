"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.08 } },
};

export default function RefundPolicyPage() {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((s) => observer.observe(s));

        return () => observer.disconnect();
    }, []);

    const tocItems = [
        { id: "overview", label: "Overview" },
        { id: "refund-tiers", label: "Refund Tiers" },
        { id: "how-to-cancel", label: "How to Cancel" },
        { id: "refund-process", label: "Refund Process" },
        { id: "non-refundable", label: "Non-Refundable Items" },
        { id: "chargebacks", label: "Chargebacks" },
        { id: "exceptions", label: "Special Exceptions" },
        { id: "contact-refund", label: "Contact" },
    ];

    return (
        <main className="min-h-screen bg-[#080c14] text-white pt-36 md:pt-40 pb-20 overflow-hidden selection:bg-cyan-500/30">
            <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex flex-col items-center text-center mb-16 md:mb-24">

                    <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        Refund & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Cancellation</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} className="text-slate-400 mt-5 text-base md:text-lg max-w-xl leading-relaxed">
                        A fair, transparent policy that protects both you and us.
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    <motion.aside {...fadeUp(0.3)} className="hidden lg:block w-64 shrink-0 sticky top-32 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contents</h3>
                        <nav className="flex flex-col space-y-1">
                            {tocItems.map((item, index) => (
                                <a key={item.id} href={`#${item.id}`} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${activeSection === item.id ? "bg-cyan-500/10 text-cyan-400 font-medium" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}>
                                    <span className={`flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold ${activeSection === item.id ? "bg-cyan-500 text-black" : "bg-slate-800 text-slate-500"}`}>{index + 1}</span>
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </motion.aside>

                    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex-1 w-full max-w-3xl space-y-10">
                        
                        <motion.div {...fadeUp(0.4)} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 text-slate-300 leading-relaxed space-y-4">
                            <p>At <strong className="text-white font-semibold">Zhivam Private Limited</strong>, we invest significant engineering effort and specialised expertise into every project. Our services — thermal simulations, battery testing, PCB design, and consultancy — are entirely customised to each client's specific requirements.</p>
                            <p>This Refund & Cancellation Policy is designed to be <strong className="text-white font-semibold">fair to both parties</strong>: it protects you from paying for work not started, while ensuring Zhivam is compensated for professional effort already invested.</p>
                        </motion.div>

                        <motion.section {...fadeUp(0.4)} id="overview" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 01</div>
                            <h2 className="text-2xl font-bold text-white">Overview</h2>
                            <p className="text-slate-300 leading-relaxed">All refund entitlements are determined based on the <strong className="text-white">stage of project completion</strong> at the time the cancellation request is received by Zhivam in writing. The three-tier system below governs all engagements unless a separate written agreement specifies otherwise.</p>
                            <p className="text-slate-300 leading-relaxed">Refunds are processed to the <strong className="text-white">original payment instrument</strong> (bank account, card, or UPI) used at the time of purchase. We do not issue refunds via any alternative method.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="refund-tiers" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 02</div>
                            <h2 className="text-2xl font-bold text-white">Refund Tiers by Project Stage</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
                                <div className="bg-green-500/10 border-2 border-green-500/50 rounded-2xl p-6 text-center">
                                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">Tier 1 — Full Refund</div>
                                    <div className="font-serif text-lg font-semibold text-white mb-2">Before Work Begins</div>
                                    <div className="text-4xl font-bold text-green-400 mb-4">100%</div>
                                    <div className="text-sm text-slate-400 leading-relaxed">Cancellation within <strong className="text-slate-200">48 hours</strong> of payment confirmation, provided no work has commenced.</div>
                                </div>
                                <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-2xl p-6 text-center">
                                    <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">Tier 2 — Partial Refund</div>
                                    <div className="font-serif text-lg font-semibold text-white mb-2">Work In Progress</div>
                                    <div className="text-4xl font-bold text-amber-400 mb-4">50%</div>
                                    <div className="text-sm text-slate-400 leading-relaxed">Work has commenced but is <strong className="text-slate-200">less than 50% complete</strong> at the time of cancellation.</div>
                                </div>
                                <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-6 text-center">
                                    <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">Tier 3 — No Refund</div>
                                    <div className="font-serif text-lg font-semibold text-white mb-2">Advanced or Completed</div>
                                    <div className="text-4xl font-bold text-red-400 mb-4">0%</div>
                                    <div className="text-sm text-slate-400 leading-relaxed">Project is <strong className="text-slate-200">50% or more complete</strong>. Significant effort invested and deliverables substantially produced.</div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl mt-6 text-sm text-slate-300">
                                <strong className="text-white block mb-1">Note on Project Completion Assessment:</strong> "Percentage of work complete" is assessed by Zhivam based on documented project milestones, simulation runs completed, test reports generated, or engineering hours logged. A written summary of work completed will be provided to the Client upon request at the time of cancellation.
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="how-to-cancel" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 03</div>
                            <h2 className="text-2xl font-bold text-white">How to Request a Cancellation</h2>
                            <p className="text-slate-300 leading-relaxed mb-6">To cancel a project and initiate a refund request, please follow these steps:</p>
                            
                            <div className="space-y-6">
                                {[
                                    { title: "Email us immediately", desc: "Send your cancellation request to info@zhivam.com from the registered email address used at the time of purchase." },
                                    { title: "Include your project details", desc: "Provide your Order/Payment ID (from the Razorpay receipt), your full name, and the reason for cancellation." },
                                    { title: "Receive acknowledgement", desc: "We will acknowledge your request within 2 business days and assess the refund tier based on project progress at that time." },
                                    { title: "Refund processing", desc: "Approved refunds are initiated within 7–10 business days of approval. Your bank or card network may take an additional 5–7 business days to credit the amount." },
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-700">{idx + 1}</div>
                                        <div>
                                            <strong className="text-white block mb-1">{step.title}</strong>
                                            <span className="text-slate-400 text-sm leading-relaxed block">{step.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-400 mt-6"><strong className="text-slate-200">Important:</strong> The date and time of your email to info@zhivam.com is treated as the official cancellation timestamp. Requests via phone, WhatsApp, or other channels do not constitute a formal cancellation.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="refund-process" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 04</div>
                            <h2 className="text-2xl font-bold text-white">Refund Processing Details</h2>
                            <ul className="list-disc pl-5 space-y-3 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white font-medium">Refund Method:</strong> All refunds are issued to the original payment source only — the same card, bank account, or UPI ID used for the transaction.</li>
                                <li><strong className="text-white font-medium">Currency:</strong> Refunds are processed in Indian Rupees (INR) at the exact amount approved, without any currency conversion surcharges.</li>
                                <li><strong className="text-white font-medium">Processing Time:</strong> 7–10 business days from the date Zhivam initiates the refund. Additional time may be taken by your bank or payment network.</li>
                                <li><strong className="text-white font-medium">GST Note:</strong> GST collected on the original invoice cannot be refunded by Zhivam, as this has been remitted to the Government of India. A GST credit note will be issued in accordance with applicable GST rules.</li>
                                <li><strong className="text-white font-medium">Payment Gateway Fees:</strong> Any non-refundable payment gateway processing fees (charged by Razorpay) are borne by the Client and will be deducted from the refund amount where applicable.</li>
                            </ul>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="non-refundable" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 05</div>
                            <h2 className="text-2xl font-bold text-white">Non-Refundable Items & Situations</h2>
                            <p className="text-slate-300 leading-relaxed">The following are <strong className="text-white font-medium">strictly non-refundable</strong> under any circumstances:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>Cancellation requests received after the 48-hour window (Tier 1 eligibility period), where work has already commenced</li>
                                <li>Projects where 50% or more of the deliverables have been completed or delivered</li>
                                <li>Fully delivered digital reports, simulation outputs, or design files</li>
                                <li>Consultation sessions (video calls, advisory meetings) that have already taken place</li>
                                <li>Physical prototype materials, testing consumables, or third-party lab charges already incurred</li>
                                <li>Projects where the Client has not provided required information or approvals, causing delays — and then seeks cancellation</li>
                                <li>Requests citing dissatisfaction based on preliminary findings that differ from client expectations, where the methodology was accurately described in the project scope</li>
                            </ul>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="chargebacks" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 06</div>
                            <h2 className="text-2xl font-bold text-white">Chargebacks & Payment Disputes</h2>
                            <p className="text-slate-300 leading-relaxed">We strongly encourage Clients to contact us at <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a> to resolve any billing concerns <em>before</em> initiating a chargeback with their bank or card issuer.</p>
                            <p className="text-slate-300 leading-relaxed">Initiating an unwarranted chargeback while we are actively working on a resolution is considered a breach of this Agreement. In such cases, Zhivam reserves the right to:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>Suspend all ongoing project work immediately</li>
                                <li>Withhold delivery of any completed deliverables until the dispute is resolved</li>
                                <li>Dispute the chargeback with full documentation of services rendered</li>
                                <li>Seek recovery of legal costs incurred in defending an invalid chargeback claim</li>
                            </ul>
                            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl mt-6 text-sm text-slate-300">
                                <strong className="text-white block mb-1">Razorpay Dispute Process:</strong> Razorpay has a formal dispute resolution mechanism. We will respond to all Razorpay-initiated disputes with complete transaction records, project documentation, and communication logs.
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="exceptions" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 07</div>
                            <h2 className="text-2xl font-bold text-white">Special Exceptions & Zhivam-Initiated Cancellations</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p><strong className="text-white font-medium">If Zhivam cancels the project:</strong> In the unlikely event that Zhivam cancels a project after payment (due to capacity constraints, force majeure, or other internal reasons), you are entitled to a <strong className="text-white">100% refund</strong> of the amounts paid, regardless of project stage.</p>
                                <p><strong className="text-white font-medium">Force Majeure:</strong> If a project is delayed or cannot be completed due to a force majeure event (as defined in our Terms & Conditions), Zhivam will work with the Client to either continue the project when circumstances permit, or negotiate a fair partial refund for incomplete work.</p>
                                <p><strong className="text-white font-medium">Quality Disputes:</strong> If you believe a deliverable does not meet the specifications defined in the Project Scope, please raise a formal quality dispute within <strong className="text-white">7 days</strong> of delivery to <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a>. We will review the claim and may offer rework, at our discretion, before any refund consideration.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="contact-refund" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 08</div>
                            <h2 className="text-2xl font-bold text-white">Contact for Refund Requests</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <p>All cancellation and refund requests must be submitted in writing to:</p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-24 shrink-0">Email</span><a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-24 shrink-0">Phone</span><a href="tel:+918333850202" className="text-cyan-400 hover:underline">+91 833 385 0202</a></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-24 shrink-0">Address</span><span className="text-slate-200">9-65-41/A Sykamvari Street, I Floor, Kothapet, Chittinagar, Vijayawada, AP 520001, India</span></li>
                                </ul>
                            </div>
                            <p className="text-slate-400 text-sm mt-4">Our team responds to refund-related enquiries within <strong className="text-slate-200">2 business days</strong>.</p>
                        </motion.section>

                    </motion.div>
                </div>
            </div>
        </main>
    );
}