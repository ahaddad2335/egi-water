export const siteConfig = {
  name: "EGI",
  fullName: "Ecomis Group Inc.",
  fullNameExpansion: "Engineering Commercial & Information Systems",
  tagline: "Water Services Built Around Security, Governance and Value",
  locationBlurb:
    "Ecomis Group Inc. is a Hammond, Indiana-based company serving the Chicago metro area and international clients.",
  description:
    "EGI delivers non-revenue water reduction, AI-enabled SCADA monitoring, cybersecurity and technology governance, and treatment/desalination/efficiency improvements — staged for the best ROI.",
  disclaimer:
    "EGI provides advisory, operational, and engineering services. EGI is also open to partnering with industry leaders who share our passion for serving our clients.",
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const waterServicesSubNav: NavItem[] = [
  {
    label: "Water Services (Overview)",
    href: "/water-services",
    description: "One partner, every stage of the water journey.",
  },
  {
    label: "SCADA & AI-Enabled Monitoring",
    href: "/services/scada-ai-monitoring",
    description: "Systems built for security, layered with AI insight.",
  },
  {
    label: "Cybersecurity & Technology Governance",
    href: "/services/cybersecurity-governance",
    description: "Fractional CIO/CISO leadership, staged to your budget.",
  },
  {
    label: "Non-Revenue Water Reduction",
    href: "/services/non-revenue-water",
    description: "Find the loss. Prioritize the fix. Sustain the result.",
  },
  {
    label: "Treatment, Desalination & Efficiency",
    href: "/services/treatment-desalination-efficiency",
    description: "Reliable water, produced efficiently.",
  },
  {
    label: "Lower-Cost, Staged Implementation",
    href: "/how-we-work",
    description: "How we work: diagnose, prioritize, pilot, scale, sustain.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Water Services", href: "/water-services" },
  { label: "Funding", href: "/funding" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Water Services", href: "/water-services" },
  { label: "Funding", href: "/funding" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
];
