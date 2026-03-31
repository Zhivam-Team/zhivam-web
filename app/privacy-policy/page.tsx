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

export default function PrivacyPolicyPage() {
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
        { id: "data-we-collect", label: "Data We Collect" },
        { id: "how-we-collect", label: "How We Collect" },
        { id: "purpose", label: "Purpose of Use" },
        { id: "sharing", label: "Data Sharing" },
        { id: "payment-data", label: "Payment Data" },
        { id: "retention", label: "Data Retention" },
        { id: "security", label: "Security" },
        { id: "your-rights", label: "Your Rights" },
        { id: "cookies", label: "Cookies" },
        { id: "children", label: "Children's Privacy" },
        { id: "contact-privacy", label: "Contact Us" },
    ];

    return (
        <main className="min-h-screen bg-[#080c14] text-whitept-36 md:pt-40 pb-20 overflow-hidden selection:bg-cyan-500/30">
            <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex flex-col items-center text-center mb-16 md:mb-24">

                    <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Policy</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} className="text-slate-400 mt-5 text-base md:text-lg max-w-xl leading-relaxed">
                        How we collect, use, protect and respect your personal information.
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* SIDEBAR TOC */}
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

                    {/* CONTENT */}
                    <motion.div initial="initial" animate="animate" variants={staggerContainer} className="flex-1 w-full max-w-3xl space-y-10">
                        
                        <motion.div {...fadeUp(0.4)} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 text-slate-300 leading-relaxed space-y-4">
                            <p><strong className="text-white font-semibold">Zhivam Private Limited</strong> ("Zhivam", "we", "us") is committed to protecting your personal data. This Privacy Policy explains what information we collect when you use our website <strong className="text-white font-semibold">www.zhivam.com</strong> or engage our services, how we use it, and your rights over it.</p>
                            <p>This policy is compliant with the <strong className="text-white font-semibold">Information Technology Act, 2000</strong>, the <strong className="text-white font-semibold">Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and is aligned with the <strong className="text-white font-semibold">Digital Personal Data Protection (DPDP) Act, 2023</strong>.</p>
                        </motion.div>

                        <motion.section {...fadeUp(0.4)} id="overview" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 01</div>
                            <h2 className="text-2xl font-bold text-white">Overview & Data Controller</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4">
                                <p>Zhivam Private Limited is the Data Fiduciary (controller) of your personal data. We process personal data only for lawful purposes, with your consent or as required to fulfil our contractual obligations to you.</p>
                                <ul className="space-y-2 mt-4">
                                    <li><strong className="text-white">Data Fiduciary:</strong> Zhivam Private Limited</li>
                                    <li><strong className="text-white">Registered Office:</strong> 9-65-41/A Sykamvari Street, I Floor, Kothapet, Chittinagar, Vijayawada (Urban), Krishna — 520001, Andhra Pradesh, India</li>
                                    <li><strong className="text-white">Privacy Contact:</strong> <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a></li>
                                </ul>
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="data-we-collect" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 02</div>
                            <h2 className="text-2xl font-bold text-white">Personal Data We Collect</h2>
                            <div className="overflow-x-auto rounded-xl border border-slate-800 mt-4">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-800/50 text-white font-semibold border-b border-slate-700">
                                        <tr><th className="px-6 py-4">Category</th><th className="px-6 py-4">Data Points</th><th className="px-6 py-4">Why We Collect</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                                        <tr><td className="px-6 py-4 font-medium text-white">Identity</td><td className="px-6 py-4">Full name, designation, company name</td><td className="px-6 py-4">Project engagement & invoicing</td></tr>
                                        <tr><td className="px-6 py-4 font-medium text-white">Contact</td><td className="px-6 py-4">Email address, phone number, postal address</td><td className="px-6 py-4">Communication & delivery of services</td></tr>
                                        <tr><td className="px-6 py-4 font-medium text-white">Financial</td><td className="px-6 py-4">Payment confirmation, transaction ID (not card data)</td><td className="px-6 py-4">Payment processing & dispute resolution</td></tr>
                                        <tr><td className="px-6 py-4 font-medium text-white">Technical</td><td className="px-6 py-4">IP address, browser type, device, pages visited</td><td className="px-6 py-4">Website analytics & security</td></tr>
                                        <tr><td className="px-6 py-4 font-medium text-white">Project Data</td><td className="px-6 py-4">Technical specifications and requirements you share</td><td className="px-6 py-4">Delivering contracted engineering services</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-slate-300 leading-relaxed mt-4">We do not collect any <strong className="text-white">Sensitive Personal Data</strong> (such as Aadhaar, financial account details, biometric data, or health data) through our website. Payment card data is processed exclusively by our payment gateway provider and is never stored on our servers.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="how-we-collect" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 03</div>
                            <h2 className="text-2xl font-bold text-white">How We Collect Your Data</h2>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white font-medium">Directly from you:</strong> When you fill the contact form, request a quote, or initiate a payment on our website</li>
                                <li><strong className="text-white font-medium">Via email or phone:</strong> When you correspond with us to initiate or carry out a project</li>
                                <li><strong className="text-white font-medium">Automatically:</strong> Via website cookies and analytics tools when you browse www.zhivam.com</li>
                                <li><strong className="text-white font-medium">Payment gateway:</strong> Razorpay may share limited transaction data (amount, status, transaction ID) with us upon payment completion</li>
                            </ul>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="purpose" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 04</div>
                            <h2 className="text-2xl font-bold text-white">Purpose of Use</h2>
                            <p className="text-slate-300 leading-relaxed">We use your personal data only for the following specified purposes:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>To respond to your enquiries and project requests</li>
                                <li>To deliver contracted engineering services and digital deliverables</li>
                                <li>To process payments and issue GST-compliant tax invoices</li>
                                <li>To maintain project records and communication history</li>
                                <li>To comply with legal and regulatory obligations</li>
                                <li>To improve our website experience and services</li>
                                <li>To send service-related communications (not marketing, unless you opt in)</li>
                            </ul>
                            <div className="bg-cyan-500/10 border-l-2 border-cyan-500 p-4 rounded-r-xl mt-6 text-sm text-slate-300">
                                <strong className="text-cyan-400">We do not sell your data.</strong> Your personal information is never sold, rented, or traded to any third party for commercial purposes.
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="sharing" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 05</div>
                            <h2 className="text-2xl font-bold text-white">Data Sharing with Third Parties</h2>
                            <p className="text-slate-300 leading-relaxed">We share your data only with the following categories of trusted processors, strictly for the purposes stated:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white font-medium">Razorpay Financial Solutions Pvt. Ltd.</strong> — payment processing (governed by Razorpay's own privacy policy)</li>
                                <li><strong className="text-white font-medium">Email & communication service providers</strong> — for sending project-related correspondence</li>
                                <li><strong className="text-white font-medium">Cloud storage providers</strong> — for secure storage of project files</li>
                                <li><strong className="text-white font-medium">Legal and statutory authorities</strong> — when required by law, court order, or regulatory directive</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4">All third-party processors are contractually obligated to maintain data confidentiality and may only process data for the specific purpose for which it was shared.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="payment-data" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 06</div>
                            <h2 className="text-2xl font-bold text-white">Payment Data & Razorpay</h2>
                            <p className="text-slate-300 leading-relaxed">Payments on our platform are processed securely by <strong className="text-white">Razorpay Financial Solutions Private Limited</strong>, a PCI-DSS-compliant payment gateway. When you make a payment:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>Your card or bank details are entered directly on Razorpay's secure payment interface — never on our servers</li>
                                <li>Zhivam receives only the transaction confirmation, order ID, and payment amount</li>
                                <li>Razorpay processes your payment data under their own privacy policy at <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">razorpay.com/privacy</a></li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4">After payment, we retain the transaction reference for a minimum of <strong className="text-white">8 years</strong> as required under the Companies Act, 2013 and GST regulations.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="retention" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 07</div>
                            <h2 className="text-2xl font-bold text-white">Data Retention</h2>
                            <p className="text-slate-300 leading-relaxed">We retain your personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by law:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white">Client project data:</strong> For the duration of the project plus 5 years thereafter</li>
                                <li><strong className="text-white">Financial / invoicing data:</strong> Minimum 8 years (as per statutory requirements)</li>
                                <li><strong className="text-white">Contact form submissions:</strong> 12 months from the date of submission</li>
                                <li><strong className="text-white">Website analytics:</strong> Aggregated data retained for up to 26 months</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4">Upon expiry of the retention period, data is securely deleted or anonymised.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="security" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 08</div>
                            <h2 className="text-2xl font-bold text-white">Security of Your Data</h2>
                            <p className="text-slate-300 leading-relaxed">We implement reasonable security practices as mandated by the IT (SPDI) Rules, 2011, including:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>SSL/TLS encryption for all data transmitted via our website</li>
                                <li>Access controls limiting data access to authorised personnel only</li>
                                <li>Secure cloud storage with trusted providers</li>
                                <li>Regular review of our data handling practices</li>
                            </ul>
                            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl mt-6 text-sm text-slate-400">
                                <strong className="text-white block mb-1">Note</strong>
                                While we take all reasonable precautions, no method of transmission over the internet is 100% secure. We encourage you to communicate sensitive technical information through encrypted channels where possible.
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="your-rights" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 09</div>
                            <h2 className="text-2xl font-bold text-white">Your Rights as a Data Principal</h2>
                            <p className="text-slate-300 leading-relaxed">Under the Digital Personal Data Protection Act, 2023 and applicable regulations, you have the following rights:</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {[
                                    { title: "Right to Access", desc: "Request a summary of personal data we hold about you" },
                                    { title: "Right to Correction", desc: "Request correction of inaccurate or incomplete data" },
                                    { title: "Right to Erasure", desc: "Request deletion of your data (subject to legal retention obligations)" },
                                    { title: "Right to Withdraw Consent", desc: "Withdraw consent for processing at any time" },
                                    { title: "Right to Grievance Redressal", desc: "Lodge a complaint with our designated grievance officer" },
                                    { title: "Right to Nominate", desc: "Nominate an individual to exercise rights in the event of your incapacity" },
                                ].map((right, idx) => (
                                    <div key={idx} className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
                                        <strong className="text-white block text-sm mb-1">{right.title}</strong>
                                        <span className="text-slate-400 text-sm">{right.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-300 leading-relaxed mt-6">To exercise any of these rights, write to <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a>. We will respond within <strong className="text-white">30 days</strong> of receipt of your request.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="cookies" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 10</div>
                            <h2 className="text-2xl font-bold text-white">Cookies & Analytics</h2>
                            <p className="text-slate-300 leading-relaxed">Our website uses cookies — small text files stored on your device — to improve your browsing experience. We use:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white">Essential cookies:</strong> Required for the website to function. Cannot be disabled.</li>
                                <li><strong className="text-white">Analytics cookies:</strong> Used to understand how visitors interact with our site (e.g., Google Analytics). Anonymised data only.</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4">You may disable non-essential cookies through your browser settings at any time. Disabling cookies may affect certain website features but will not prevent you from accessing our services.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="children" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 11</div>
                            <h2 className="text-2xl font-bold text-white">Children's Privacy</h2>
                            <p className="text-slate-300 leading-relaxed">Our services are intended for business and professional use only. We do not knowingly collect personal data from individuals under the age of <strong className="text-white">18 years</strong>. If you believe a minor has submitted data to us, please contact us immediately at <a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a> and we will delete such data promptly.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="contact-privacy" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 12</div>
                            <h2 className="text-2xl font-bold text-white">Contact Our Grievance Officer</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <p>For any privacy-related concerns, data requests, or complaints, please contact our designated Grievance Officer:</p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-32 shrink-0">Officer</span><span className="text-slate-200">Authorised Representative, Zhivam Private Limited</span></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-32 shrink-0">Email</span><a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-32 shrink-0">Phone</span><a href="tel:+918333850202" className="text-cyan-400 hover:underline">+91 833 385 0202</a></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-32 shrink-0">Address</span><span className="text-slate-200">9-65-41/A Sykamvari Street, I Floor, Kothapet, Chittinagar, Vijayawada (Urban), Krishna — 520001, Andhra Pradesh, India</span></li>
                                </ul>
                            </div>
                            <p className="text-slate-300 leading-relaxed mt-4">If you are not satisfied with our response, you may also approach the <strong className="text-white">Data Protection Board of India</strong> once constituted under the DPDP Act, 2023.</p>
                        </motion.section>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}