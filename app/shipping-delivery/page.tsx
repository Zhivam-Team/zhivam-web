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

export default function ShippingDeliveryPage() {
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
        { id: "digital-only", label: "Digital Delivery" },
        { id: "delivery-timelines", label: "Delivery Timelines" },
        { id: "delivery-method", label: "Delivery Methods" },
        { id: "commencement", label: "Project Start" },
        { id: "delays", label: "Delays" },
        { id: "physical", label: "Physical Items" },
        { id: "international", label: "International Clients" },
        { id: "contact-delivery", label: "Contact" },
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
                        Shipping & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Delivery</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} className="text-slate-400 mt-5 text-base md:text-lg max-w-xl leading-relaxed">
                        How and when your engineering deliverables are delivered to you.
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
                            <p><strong className="text-white font-semibold">Zhivam Private Limited</strong> is a specialised engineering R&D company. We do not sell or ship physical goods as a primary business activity. All our services result in <strong className="text-white font-semibold">digital deliverables</strong> — reports, simulation outputs, design files, analysis documents, and related technical content.</p>
                            <p>This policy explains how these deliverables are transmitted to clients, the expected timelines, and what to do if a delivery is delayed or incomplete.</p>
                        </motion.div>

                        <motion.section {...fadeUp(0.4)} id="overview" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 01</div>
                            <h2 className="text-2xl font-bold text-white">Overview</h2>
                            <p className="text-slate-300 leading-relaxed">Since Zhivam provides professional engineering services rather than physical products, the concept of "shipping" applies exclusively to the digital transfer of completed project deliverables. There are no physical packaging, courier services, or logistics fees involved unless a physical prototype or hardware testing component is specifically included in your project scope.</p>
                            <div className="bg-cyan-500/10 border-l-2 border-cyan-500 p-4 rounded-r-xl mt-6 text-sm text-slate-300">
                                <strong className="text-cyan-400 block mb-1">Important for Payment Gateway Verification:</strong> All deliverables from Zhivam Private Limited are delivered digitally via email or secure file-sharing platforms. Delivery is completed when the final report, simulation output, or agreed deliverable is sent to the client's registered email address.
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="digital-only" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 02</div>
                            <h2 className="text-2xl font-bold text-white">Digital Delivery — Our Standard</h2>
                            <p className="text-slate-300 leading-relaxed">All Zhivam service deliverables are provided as digital files. These include but are not limited to:</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                                {[
                                    { icon: "📊", title: "Simulation Reports", desc: "Thermal, CFD, FEA results in PDF or interactive formats with supporting data files" },
                                    { icon: "📐", title: "Design Files", desc: "CAD models, PCB design files, schematics, and BOM documents" },
                                    { icon: "📋", title: "Technical Reports", desc: "Written analyses, advisory reports, feasibility studies, and test documentation" },
                                    { icon: "💾", title: "Data & Outputs", desc: "Raw simulation data, test measurements, processed results, and supporting appendices" },
                                ].map((method, idx) => (
                                    <div key={idx} className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                        <div className="text-2xl mb-3">{method.icon}</div>
                                        <strong className="text-white block text-sm mb-2">{method.title}</strong>
                                        <span className="text-slate-400 text-sm leading-relaxed">{method.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-300 leading-relaxed mt-4">All digital deliverables are delivered to the <strong className="text-white">email address provided by the Client at the time of engagement</strong>. It is the Client's responsibility to ensure the email address is correct and accessible.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="delivery-timelines" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 03</div>
                            <h2 className="text-2xl font-bold text-white">Delivery Timelines by Service</h2>
                            <p className="text-slate-300 leading-relaxed">The following are <strong className="text-white">standard delivery timelines</strong> from the Project Commencement Date. Complex or large-scale projects will have customised timelines agreed upon in writing.</p>
                            
                            <div className="flex flex-col border border-slate-700 rounded-xl overflow-hidden my-6">
                                {[
                                    { service: "Electronic Thermal Management", badge: "7–14 Business Days", desc: "Standard; may extend for multi-board or data centre scale projects" },
                                    { service: "Battery Thermal Management", badge: "14–21 Business Days", desc: "Includes physical testing cycles; timeline subject to lab availability" },
                                    { service: "Immersion Cooling Solutions", badge: "10–18 Business Days", desc: "Design and simulation phases" },
                                    { service: "PCB Design, Prototyping & Testing", badge: "14–28 Business Days", desc: "Includes design, review, and fabrication co-ordination cycles" },
                                    { service: "Design, Sim & Prototyping", badge: "14–30 Business Days", desc: "End-to-end — timeline agreed per project scope" },
                                    { service: "Renewable Energy Solutions", badge: "10–21 Business Days", desc: "Feasibility and simulation reports" },
                                    { service: "Consultancy & Advisory", badge: "5–10 Business Days", desc: "Advisory reports and sessions; structured as agreed in brief" },
                                    { service: "IP Licensing & Collaboration", badge: "As Negotiated", desc: "Timeline depends on due diligence and agreement scope" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row border-b border-slate-700 last:border-b-0 bg-slate-800/10 hover:bg-slate-800/30 transition-colors">
                                        <div className="sm:w-64 p-4 text-sm font-medium text-white border-b sm:border-b-0 sm:border-r border-slate-700 flex items-center bg-slate-800/30">
                                            {item.service}
                                        </div>
                                        <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-slate-300 flex-1">
                                            <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">{item.badge}</span>
                                            <span>{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-300 leading-relaxed">All timelines are in <strong className="text-white">Indian Standard Time (IST), Monday to Friday</strong>, excluding public and national holidays.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="delivery-method" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 04</div>
                            <h2 className="text-2xl font-bold text-white">Delivery Methods</h2>
                            <p className="text-slate-300 leading-relaxed">Zhivam uses the following channels for delivery of completed work:</p>
                            <ul className="list-disc pl-5 space-y-3 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white font-medium">Email:</strong> Primary method. Deliverables are sent as PDF attachments or via secure download links to the Client's registered email address.</li>
                                <li><strong className="text-white font-medium">Secure File Sharing:</strong> For large files (CAD, simulation datasets), deliverables are shared via password-protected cloud links (e.g., Google Drive, WeTransfer Pro) with a defined link expiry.</li>
                                <li><strong className="text-white font-medium">Client Portal (if applicable):</strong> Where a dedicated client workspace has been set up, deliverables will be uploaded to the agreed shared folder.</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4">Upon delivery, the Client will receive a delivery confirmation email from <a href="mailto:support@zhivam.com" className="text-cyan-400 hover:underline">support@zhivam.com</a>. If you do not receive a confirmation within the agreed timeline, please write to us immediately.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="commencement" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 05</div>
                            <h2 className="text-2xl font-bold text-white">Project Commencement & Client Inputs</h2>
                            <p className="text-slate-300 leading-relaxed"><strong className="text-white">Delivery timelines commence only after:</strong></p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>Full payment (or agreed advance payment) has been received and confirmed</li>
                                <li>All required client inputs — specifications, CAD files, test parameters, or brief documents — have been received by Zhivam</li>
                                <li>A project acknowledgement email has been sent to the Client by Zhivam</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4"><strong className="text-white">Delays caused by late submission of required inputs by the Client will not be counted against Zhivam's delivery timeline.</strong> The timeline clock restarts from the date all required inputs are received.</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="delays" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 06</div>
                            <h2 className="text-2xl font-bold text-white">Delays & Escalation</h2>
                            <p className="text-slate-300 leading-relaxed">We are committed to meeting agreed delivery timelines. However, in exceptional circumstances (equipment failure, technical complexity beyond initial scope, force majeure), delays may occur. In such cases:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>Zhivam will notify the Client at least <strong className="text-white">2 business days before the expected delivery date</strong> if a delay is anticipated</li>
                                <li>A revised delivery timeline will be communicated in writing</li>
                                <li>If the delay exceeds <strong className="text-white">10 additional business days</strong> beyond the original committed date, the Client may request a partial refund for the incomplete portion under our Refund & Cancellation Policy</li>
                            </ul>
                            <p className="text-slate-300 leading-relaxed mt-4">To escalate a delivery concern, email <a href="mailto:support@zhivam.com" className="text-cyan-400 hover:underline">support@zhivam.com</a> with your project ID and the subject line "Delivery Escalation — [Project ID]".</p>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="physical" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 07</div>
                            <h2 className="text-2xl font-bold text-white">Physical Items (Prototypes & Hardware)</h2>
                            <p className="text-slate-300 leading-relaxed">Where a project scope explicitly includes the delivery of a <strong className="text-white">physical prototype, hardware component, or test sample</strong>, the following applies:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li>Physical deliveries are made within <strong className="text-white">India only</strong> unless otherwise agreed in writing</li>
                                <li>Shipping is via registered courier (e.g., BlueDart, DTDC, or Delhivery); tracking details will be shared upon dispatch</li>
                                <li>Shipping costs, insurance, and applicable import duties (for international shipments, if any) are borne by the Client unless explicitly included in the project quote</li>
                                <li>Risk of loss or damage transfers to the Client upon handover to the courier partner</li>
                                <li>Zhivam is not responsible for courier delays, damaged packaging, or customs clearance issues for international shipments</li>
                            </ul>
                            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl mt-6 text-sm text-slate-300">
                                <strong className="text-white block mb-1">Standard Practice:</strong> Physical prototypes are typically paired with a comprehensive digital report. Both digital and physical deliverables for such projects are dispatched simultaneously at project completion.
                            </div>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="international" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 08</div>
                            <h2 className="text-2xl font-bold text-white">International Clients</h2>
                            <p className="text-slate-300 leading-relaxed">Zhivam serves clients globally. For international engagements:</p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-600">
                                <li><strong className="text-white font-medium">Digital deliverables:</strong> Delivered globally with no additional charge. All digital files are sent via email or secure cloud links, irrespective of the Client's location.</li>
                                <li><strong className="text-white font-medium">Time zone coordination:</strong> All communication and milestone tracking is in <strong className="text-white">Indian Standard Time (IST, UTC+5:30)</strong>. We commit to responding to international clients within 1 business day (IST).</li>
                                <li><strong className="text-white font-medium">Invoicing:</strong> International clients are invoiced in INR or USD as mutually agreed. GST exemption (zero-rated) applies to services rendered to clients outside India, subject to FEMA and GST export regulations.</li>
                            </ul>
                        </motion.section>

                        <motion.section {...fadeUp(0.4)} id="contact-delivery" className="scroll-mt-32 space-y-4">
                            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Section 09</div>
                            <h2 className="text-2xl font-bold text-white">Delivery Queries & Support</h2>
                            <div className="text-slate-300 leading-relaxed space-y-4 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <p>For any delivery-related queries — including missing deliverables, file access issues, or timeline clarifications — please contact:</p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-24 shrink-0">Support</span><a href="mailto:support@zhivam.com" className="text-cyan-400 hover:underline">support@zhivam.com</a></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-24 shrink-0">Disputes</span><a href="mailto:info@zhivam.com" className="text-cyan-400 hover:underline">info@zhivam.com</a></li>
                                    <li className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="text-slate-500 w-24 shrink-0">Phone</span><a href="tel:+918333850202" className="text-cyan-400 hover:underline">+91 833 385 0202</a></li>
                                </ul>
                            </div>
                            <p className="text-slate-400 text-sm mt-4">Please include your <strong className="text-slate-200">Order/Payment ID</strong> and <strong className="text-slate-200">project name</strong> in all delivery-related correspondence for faster resolution.</p>
                        </motion.section>

                    </motion.div>
                </div>
            </div>
        </main>
    );
}