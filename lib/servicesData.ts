export interface RdService {
    id: string
    title: string
    subtitle: string
    description: string
    sectionLabel: string
    capabilities: string[]
    imageUrl: string
    size: string
    tag: string
}

export const rdServices: RdService[] = [{
    id: "rd-1",
    title: "Electronic Thermal Management",
    subtitle: "R&D & Engineering",
    description: "Zhivam provides advanced electronic thermal management services covering air cooling, liquid cooling, PCM-based systems, immersion cooling, and hybrid thermal architectures for high-power electronics and energy systems.",
    sectionLabel: "Key Services",
    capabilities: [
        "Air-cooled heat sink design and optimization",
        "Liquid-cooled cold plates (electronics & data centers)",
        "PCM-based thermal buffering",
        "Thermal capacitors for transient loads",
        "Peltier (thermoelectric) cooling systems",
    ],
    imageUrl: "/images/rd/electronic-thermal.webp",
    size: "large",
    tag: "Core Service",
},
{
    id: "rd-2",
    title: "Design, Simulation, Prototyping & Testing",
    subtitle: "",
    description: "End-to-end thermal engineering services including multiphysics simulation, design optimization, rapid prototyping, and experimental thermal validation.",
    sectionLabel: "Key Services",
    capabilities: [
        "CFD & multiphysics simulation",
        "Thermal optimization and benchmarking",
        "Prototype development",
        "Experimental testing and validation",
    ],
    imageUrl: "/images/rd/simulation.webp",
    size: "large",
    tag: "Core Service",
},
{
    id: "rd-3",
    title: "Battery Thermal Management & Testing",
    subtitle: "",
    description: "Comprehensive battery thermal management including cold plates, PCM systems, immersion cooling, EIS, and charge-discharge testing.",
    sectionLabel: "Capabilities",
    capabilities: [
        "Battery cold plate design",
        "PCM & immersion-based battery cooling",
        "Battery EIS testing",
        "Charging-discharging & thermal characterization",
    ],
    imageUrl: "/images/rd/battery.webp",
    size: "small",
    tag: "Battery",
},
{
    id: "rd-4",
    title: "Immersion Cooling Solutions",
    subtitle: "",
    description: "Design and evaluation of single-phase immersion cooling systems for electronics and batteries, including dielectric fluid selection and system optimization.",
    sectionLabel: "Capabilities",
    capabilities: [
        "Single-phase immersion cooling system design",
        "Dielectric fluid selection and compatibility",
        "Thermal and flow performance analysis",
        "Reliability and safety evaluation",
    ],
    imageUrl: "/images/rd/immersion.webp",
    size: "small",
    tag: "Cooling",
},
{
    id: "rd-5",
    title: "PCB Design, Prototyping & Thermal Testing",
    subtitle: "",
    description: "PCB design, fabrication, assembly, and thermal analysis services including test boards for BIS, IEC, and IS standards.",
    sectionLabel: "Capabilities",
    capabilities: [
        "Single- and double-layer PCB design",
        "PCB prototyping & assembly",
        "Thermal test boards for standards",
        "SMD resistor and component thermal testing",
    ],
    imageUrl: "/images/rd/pcb.webp",
    size: "small",
    tag: "PCB",
},
{
    id: "rd-6",
    title: "Renewable Energy & Sustainability Solutions",
    subtitle: "",
    description: "Engineering and consultancy in agrivoltaics, bifacial PV systems, and end-of-life management of solar PV modules.",
    sectionLabel: "Capabilities",
    capabilities: [
        "Agrivoltaic system design and assessment",
        "Bifacial PV system modeling",
        "Techno-economic analysis of solar systems",
        "EoL management and recycling for PV modules",
    ],
    imageUrl: "/images/rd/renewable.webp",
    size: "small",
    tag: "Renewable",
},
{
    id: "rd-7",
    title: "Consultancy & Technical Advisory",
    subtitle: "",
    description: "Expert consultancy in thermal management, product reliability, standards compliance, and cooling system selection.",
    sectionLabel: "Capabilities",
    capabilities: [
        "Thermal architecture selection",
        "Cooling technology evaluation",
        "Thermal reliability and failure analysis",
        "Standards advisory (BIS, IEC, IS)",
    ],
    imageUrl: "/images/rd/consultancy.webp",
    size: "large",
    tag: "Advisory",
},
{
    id: "rd-8",
    title: "IP Licensing & Industry Collaboration",
    subtitle: "",
    description: "Licensing of patented thermal technologies and support for industry collaboration, technology transfer, and commercialization.",
    sectionLabel: "Capabilities",
    capabilities: [
        "Licensing of granted patents",
        "Technology transfer and commercialization",
        "Joint R&D with industry partners",
        "Prototype-to-product transition",
    ],
    imageUrl: "/images/rd/ip-licensing.webp",
    size: "large",
    tag: "IP & Licensing",
},
]