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

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState<string>("");

    // Intersection Observer to highlight active TOC link based on scroll position
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
        { id: "acceptance", label: "Acceptance of Terms" },
        { id: "definitions", label: "Definitions" },
        { id: "services", label: "Scope of Services" },
        { id: "engagement", label: "Engagement & Pricing" },
        { id: "ip", label: "Intellectual Property" },
        { id: "confidentiality", label: "Confidentiality" },
        { id: "liability", label: "Limitation of Liability" },
        { id: "termination", label: "Termination" },
        { id: "governing", label: "Governing Law" },
        { id: "amendments", label: "Amendments" },
        { id: "contact-legal", label: "Contact" },
    ];

    return (
        <main className="min-h-screen bg-[#080c14] text-white pt-36 md:pt-40 pb-20 overflow-hidden selection:bg-cyan-500/30">
            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                
                {/* Hero Header */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="flex flex-col items-center text-center mb-16 md:mb-24"
                >

                    <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Conditions</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} className="text-slate-400 mt-5 text-base md:text-lg max-w-xl leading-relaxed">
                        The legal agreement governing the use of Zhivam Private Limited's engineering, simulation, and consultancy services.
                    </motion.p>
                </motion.div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT: Table of Contents (Sticky) */}
                    <motion.aside
                        {...fadeUp(0.3)}
                        className="hidden lg:block w-64 shrink-0 sticky top-32 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6"
                    >
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contents</h3>
                        <nav className="flex flex-col space-y-1">
                            {tocItems.map((item, index) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                        activeSection === item.id
                                            ? "bg-cyan-500/10 text-cyan-400 font-medium"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                    }`}
                                >
                                    <span className={`flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold ${
                                        activeSection === item.id ? "bg-cyan-500 text-black" : "bg-slate-800 text-slate-500"
                                    }`}>
                                        {index + 1}
                                    </span>
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </motion.aside>

                    {/* RIGHT: Document Content */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="flex-1 w-full max-w-3xl space-y-10"
                    >
                        {/* Intro */}
                        <motion.div {...fadeUp(0.4)} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 text-slate-300 leading-relaxed space-y-4">
                            <p>
                                Please read these Terms and Conditions ("Agreement", "Terms") carefully before engaging with or making any payment to <strong className="text-white font-semibold">Zhivam Private Limited</strong> ("Zhivam", "Company", "we", "us", or "our"). This Agreement constitutes a legally binding contract.
                            </p>
                            <p>
                                By accessing our website at <strong className="text-white font-semibold">www.zhivam.com</strong>, submitting a project enquiry, or making any payment for our services, you ("Client", "you", "your") acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.
                            </p>
                        </motion.div>

                        {/* Sections */}
                        <motion.section {...fadeUp(0.4)} id="acceptance" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 01</div>
                            <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p>These Terms apply to all visitors, users, and clients who access or use the services of Zhivam Private Limited. If you are entering into this Agreement on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.</p>
                                <p>Your continued use of our website or engagement with our services constitutes your acceptance of any changes made to these Terms. If you do not agree to these Terms, you must immediately discontinue use of our website and services.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="definitions" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 02</div>
                            <h2 className="text-2xl font-bold text-white">Definitions</h2>
                            
                            <div className="overflow-x-auto rounded-xl border border-slate-800 mt-4">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-800/50 text-white font-semibold border-b border-slate-700">
                                        <tr>
                                            <th className="px-6 py-4 w-1/4">Term</th>
                                            <th className="px-6 py-4">Meaning</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-white">"Services"</td>
                                            <td className="px-6 py-4">Engineering consultancy, thermal simulation, battery management analysis, PCB design, prototyping, testing, R&D, and related technical deliverables provided by Zhivam.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-white">"Deliverables"</td>
                                            <td className="px-6 py-4">Reports, simulation outputs, CAD files, data analyses, prototypes, or any other work product provided to the Client upon completion of a project.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-white">"Project Scope"</td>
                                            <td className="px-6 py-4">The specific work, timelines, and pricing agreed upon in writing (email or formal proposal) before commencement of any engagement.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-white">"Commencement Date"</td>
                                            <td className="px-6 py-4">The date on which payment is received and a formal project acknowledgement is issued by Zhivam.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium text-white">"Confidential Information"</td>
                                            <td className="px-6 py-4">Any non-public technical, commercial, or proprietary information shared by either party.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="services" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 03</div>
                            <h2 className="text-2xl font-bold text-white">Scope of Services</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p>Zhivam Private Limited provides specialised engineering services including, but not limited to:</p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-slate-600">
                                    <li><strong className="text-white font-medium">Electronic Thermal Management</strong> — design, analysis and optimisation of thermal systems for electronics</li>
                                    <li><strong className="text-white font-medium">Battery Thermal Management & Testing</strong> — characterisation, abuse testing, and calorimetry</li>
                                    <li><strong className="text-white font-medium">Immersion Cooling Solutions</strong> — design and simulation of liquid immersion cooling systems</li>
                                    <li><strong className="text-white font-medium">PCB Design, Prototyping & Thermal Testing</strong> — full-cycle PCB development</li>
                                    <li><strong className="text-white font-medium">Design, Simulation, Prototyping & Testing</strong> — end-to-end product development</li>
                                    <li><strong className="text-white font-medium">Renewable Energy & Sustainability Solutions</strong></li>
                                    <li><strong className="text-white font-medium">Consultancy & Technical Advisory</strong></li>
                                    <li><strong className="text-white font-medium">IP Licensing & Industry Collaboration</strong></li>
                                </ul>
                                <p>Each engagement is custom-scoped. Final deliverables and timelines are defined in a written project proposal which forms part of this Agreement.</p>
                                
                                <div className="bg-cyan-500/10 border-l-2 border-cyan-500 p-4 rounded-r-xl mt-6 text-sm">
                                    <strong className="text-cyan-400 block mb-1">Important Note</strong>
                                    Zhivam reserves the right to decline any project engagement without providing reasons. Acceptance of payment does not guarantee project outcomes beyond those specified in the agreed Project Scope.
                                </div>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="engagement" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 04</div>
                            <h2 className="text-2xl font-bold text-white">Engagement & Pricing</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p><strong className="text-white font-medium">4.1 Payment:</strong> All service fees are quoted in Indian Rupees (INR) unless otherwise agreed. Payments are processed via Razorpay or other authorised payment gateways and are subject to applicable taxes including GST.</p>
                                <p><strong className="text-white font-medium">4.2 Project Commencement:</strong> Work commences only upon receipt of payment as per the agreed payment schedule. Zhivam is not obligated to begin any work prior to payment confirmation.</p>
                                <p><strong className="text-white font-medium">4.3 Change of Scope:</strong> Any additions or modifications to the agreed Project Scope must be requested in writing. Additional work beyond the original scope will be quoted separately and requires written approval before execution.</p>
                                <p><strong className="text-white font-medium">4.4 Invoicing:</strong> Tax invoices compliant with the Goods and Services Tax Act, 2017 will be issued for all transactions. GST Registration details will appear on all invoices.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="ip" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 05</div>
                            <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p><strong className="text-white font-medium">5.1 Client-Owned Deliverables:</strong> Upon receipt of full payment, Zhivam assigns to the Client all rights in the specific deliverables created under the agreed Project Scope, unless otherwise stipulated in the project proposal.</p>
                                <p><strong className="text-white font-medium">5.2 Zhivam's Background IP:</strong> All pre-existing methodologies, tools, templates, proprietary simulation frameworks, and know-how developed by Zhivam prior to or independently of the Client engagement remain the exclusive property of Zhivam Private Limited.</p>
                                <p><strong className="text-white font-medium">5.3 Restrictions:</strong> The Client shall not reverse-engineer, resell, or sub-license any Zhivam background IP embedded in the deliverables without prior written consent from Zhivam.</p>
                                <p><strong className="text-white font-medium">5.4 Publication:</strong> Zhivam may reference the Client's project as part of its portfolio unless the Client expressly requests confidentiality in writing at the time of project commencement.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="confidentiality" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 06</div>
                            <h2 className="text-2xl font-bold text-white">Confidentiality</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p>Both parties agree to maintain the confidentiality of all Confidential Information exchanged during the engagement. Neither party shall disclose the other's Confidential Information to third parties without prior written consent, except:</p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-slate-600">
                                    <li>As required by applicable law or a court of competent jurisdiction</li>
                                    <li>To employees or contractors who need access to perform obligations under this Agreement, and who are bound by equivalent confidentiality obligations</li>
                                    <li>With the prior written consent of the disclosing party</li>
                                </ul>
                                <p>These confidentiality obligations shall survive the termination of this Agreement for a period of <strong className="text-white font-medium">three (3) years</strong>.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="liability" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 07</div>
                            <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p><strong className="text-white font-medium">7.1</strong> Zhivam's total cumulative liability to the Client arising from or related to this Agreement shall not exceed the total fees paid by the Client to Zhivam for the specific project giving rise to the claim, in the twelve (12) months preceding the claim.</p>
                                <p><strong className="text-white font-medium">7.2</strong> In no event shall Zhivam be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, or business interruption, even if Zhivam has been advised of the possibility of such damages.</p>
                                <p><strong className="text-white font-medium">7.3 Force Majeure:</strong> Zhivam shall not be liable for delays or failure to perform caused by circumstances beyond its reasonable control, including natural disasters, government actions, power failures, internet outages, or pandemic-related disruptions.</p>
                                
                                <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl mt-6 text-sm text-slate-400">
                                    <strong className="text-white block mb-1">Disclaimer</strong>
                                    Engineering deliverables are provided for the Client's specific use case as described in the Project Scope. Zhivam does not warrant that results are suitable for any application not expressly covered in the project agreement.
                                </div>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="termination" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 08</div>
                            <h2 className="text-2xl font-bold text-white">Termination</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p><strong className="text-white font-medium">8.1 By the Client:</strong> The Client may terminate an engagement by providing written notice to <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a>. Refund entitlements upon termination are governed by our Refund & Cancellation Policy.</p>
                                <p><strong className="text-white font-medium">8.2 By Zhivam:</strong> Zhivam reserves the right to terminate an engagement immediately if the Client: (a) fails to make payment as agreed; (b) provides false or misleading information; (c) engages in conduct that is abusive, illegal, or in breach of these Terms.</p>
                                <p><strong className="text-white font-medium">8.3 Effect of Termination:</strong> Upon termination, Zhivam will deliver all completed work portions to the Client. Outstanding payments for work completed to the date of termination remain due and payable.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="governing" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 09</div>
                            <h2 className="text-2xl font-bold text-white">Governing Law & Dispute Resolution</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p>This Agreement is governed by and construed in accordance with the <strong className="text-white font-medium">laws of the Republic of India</strong>. The parties agree that all disputes arising from or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts located in <strong className="text-white font-medium">Vijayawada, Andhra Pradesh, India</strong>.</p>
                                <p><strong className="text-white font-medium">Dispute Resolution Process:</strong> Before initiating legal proceedings, both parties agree to attempt resolution through good-faith negotiation for a minimum of <strong className="text-white font-medium">30 days</strong> from the date of written notice of the dispute. If unresolved, disputes may be escalated to arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual agreement.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="amendments" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 10</div>
                            <h2 className="text-2xl font-bold text-white">Amendments to These Terms</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p>Zhivam reserves the right to modify these Terms at any time. Changes will be effective upon posting on this page with an updated effective date. For ongoing projects, significant changes will be communicated via email. Continued engagement after notification constitutes acceptance of the revised Terms.</p>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="contact-legal" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 11</div>
                            <h2 className="text-2xl font-bold text-white">Contact for Legal Matters</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <p>For questions, notices, or legal correspondence regarding these Terms:</p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                                        <span className="text-slate-500 w-32 shrink-0">Company</span>
                                        <span className="text-slate-200">Zhivam Private Limited</span>
                                    </li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                                        <span className="text-slate-500 w-32 shrink-0">Registered Address</span>
                                        <span className="text-slate-200">9-65-41/A Sykamvari Street, I Floor, Kothapet, Chittinagar, Vijayawada (Urban), Krishna — 520001, Andhra Pradesh, India</span>
                                    </li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                                        <span className="text-slate-500 w-32 shrink-0">Email</span>
                                        <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a>
                                    </li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                                        <span className="text-slate-500 w-32 shrink-0">Phone</span>
                                        <a href="tel:+918333850202" className="text-cyan-400 hover:underline">+91 833 385 0202</a>
                                    </li>
                                </ul>
                            </div>
                        </motion.section>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}