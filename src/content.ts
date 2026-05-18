export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  summary: string;
  thumbUrl?: string;
  tags: string[];
  links: ProjectLink[];
  role: string;
  outcome: string;
  highlights: string[];
};

export type Study = {
  title: string;
  place: string;
  period: string;
  details?: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type WorkExperience = {
  title: string;
  company: string;
  period: string;
  summary: string;
  imageUrl: string;
};

export const content = {
  hero: {
    headline: "Erfan Echresh",
    role: "Python/Django Developer",
    subheadline: "Full-stack systems, AI interfaces, blockchain workflows, and data science",
    overview:
      "I turn complex operational, analytical, and research problems into scalable Django back ends, clean React interfaces, and secure workflows that teams can actually use.",
    proofPoints: [
      "Django + FastAPI back ends",
      "AI and real-time data visualization",
      "Blockchain and secure access flows",
    ],
    metrics: [
      { value: "20%", label: "sales increase from e-commerce delivery" },
      { value: "50%", label: "less scheduling time in booking workflow" },
      { value: "5", label: "production and freelance roles" },
      { value: "MSc", label: "cognitive neuroimaging and data science" },
    ],
  },
  about: {
    title: "Overview",
    bullets: [
      "Python/Django developer with experience across backend systems, full-stack delivery, AI integration, and blockchain-based applications.",
      "Builds production-oriented features including dashboards, reservation systems, order tracking, MFA, payment flows, and real-time analytical interfaces.",
      "Brings a data science and computational neuroscience background to products that need clear analysis, experimentation, and technical rigor.",
    ],
  },
  studies: [
    {
      title: "Masters - Cognitive Neuroimaging and Data Science",
      place: "University of Birmingham - Birmingham - UK",
      period: "2024 – 2025",
      details: "Specialized in computational neuroscience. Designed Unity VR experiments with haptic and visual feedback to study material softness perception, then analyzed behavioral and cognitive responses.",
    },
    {
      title: "Bachelors - Electrical Engineering",
      place: "K.N. Toosi University of Technology - Tehran - Iran",
      period: "2019 – 2024",
      details: "Specialized in control systems. Built an Ethereum DApp for secure medical IoT data transfer with privacy, integrity, and scalability requirements.",
    },
  ] satisfies Study[],
  skills: [
    { name: "Backend", items: ["Python", "Django", "FastAPI", "REST APIs", "PostgreSQL"] },
    { name: "Frontend", items: ["React.js", "JavaScript", "HTML/CSS", "Bootstrap", "WordPress"] },
    { name: "AI & Data", items: ["Pandas", "AI Integration", "Stable Diffusion", "Data Visualization"] },
    { name: "Systems", items: ["Git", "Blockchain", "Ethereum DApps", "MFA", "Cron Jobs"] },
  ] satisfies SkillGroup[],
  workExperience: [
    {
      title: "Front-End Developer",
      company: "Motion Dynamics - Birmingham, UK",
      period: "Sep 2025 - Present",
      imageUrl: "work-history/motion-dynamics-analytics.png",
      summary: "Developing a React.js analytics interface for JSON-driven reports, dynamic charts, tooltips, and a synchronized 3D human body model that maps API data to physical states in real time.",
    },
    {
      title: "Freelance Full-Stack Developer",
      company: "E-Commerce Platform - Remote",
      period: "Dec 2024 - Oct 2025",
      imageUrl: "work-history/ecommerce-platform.png",
      summary: "Designed and built a Django, Bootstrap, and PostgreSQL e-commerce platform with product management, customer accounts, order tracking, secure payments, and responsive layouts that contributed to a 20% sales increase.",
    },
    {
      title: "Python Back-End Developer",
      company: "MGC RZ Company - Tehran, Iran",
      period: "Feb 2024 - Jun 2024",
      imageUrl: "work-history/mgc-marketplace-ai.png",
      summary: "Built scalable modules for an NFT marketplace and subscription e-commerce platform, including seller dashboards, order tracking, email/SMS MFA, and Stable Diffusion image-generation features.",
    },
    {
      title: "Freelance Full-Stack Developer",
      company: "Butterfly Nail Club - London, UK",
      period: "Dec 2023 - Apr 2024",
      imageUrl: "work-history/butterfly-booking-system.png",
      summary: "Built a Django REST and Bootstrap reservation system with booking models, worker scheduling, and automated time-release cron jobs, reducing scheduling time by 50%.",
    },
    {
      title: "Python Full-Stack Developer",
      company: "Saman Ab Imen Ahvaz / Tehran, Iran",
      period: "Sep 2022 - Jan 2024",
      imageUrl: "work-history/saman-intranet-automation.png",
      summary: "Developed an intranet automation system with multi-level access control, task tracking, employee activity logging, service presentation, and Django-backed responsive interfaces.",
    },
  ] satisfies WorkExperience[],
  projects: [
    {
      name: "E-Commerce Platform",
      summary:
        "A scalable Django e-commerce system with product management, customer accounts, order tracking, PostgreSQL persistence, and secure payment integration.",
      thumbUrl: "work-history/ecommerce-platform.png",
      tags: ["Django", "PostgreSQL", "Bootstrap", "Payments"],
      role: "Freelance full-stack developer",
      outcome: "Streamlined sales operations and contributed to a 20% increase in sales.",
      highlights: [
        "Designed backend models and operational workflows for products, customers, and orders.",
        "Integrated secure payment flows and responsive customer-facing layouts.",
        "Built for maintainability so sales operations could be managed without developer support.",
      ],
      links: [],
    },
    {
      name: "Reservation System",
      summary:
        "A web-based booking platform for Butterfly Nail Club using Django, REST APIs, Bootstrap, worker scheduling, and automated release jobs.",
      thumbUrl: "work-history/butterfly-booking-system.png",
      tags: ["Django", "REST APIs", "Bootstrap", "Automation"],
      role: "Freelance full-stack developer",
      outcome: "Reduced scheduling time by 50% and lowered booking errors.",
      highlights: [
        "Modeled booking availability around workers, appointments, and service timing.",
        "Implemented cron-based release logic to keep availability accurate.",
        "Created a practical interface for day-to-day booking operations.",
      ],
      links: [],
    },
    {
      name: "Golf Web Reports",
      summary:
        "An analytical reporting interface that visualizes processed sports-performance JSON through React charts, tooltips, and AI-assisted insights.",
      thumbUrl: "project_samples/web_report_sample.png",
      tags: ["React", "Charts", "JSON Data", "AI Insights"],
      role: "Front-end developer",
      outcome: "Made complex performance data easier to interpret and discuss.",
      highlights: [
        "Translated analytical API responses into chart-driven interface states.",
        "Used tooltips and visual hierarchy to make dense metrics easier to understand.",
        "Collaborated with backend and data teams to keep mappings accurate.",
      ],
      links: [],
    },
    {
      name: "Medical Data DApp",
      summary: "A blockchain thesis project for secure medical IoT data transfer using Ethereum and decentralized application patterns.",
      thumbUrl: "work-history/medical-data-dapp.png",
      tags: ["Blockchain", "Ethereum", "DApp", "Data Privacy"],
      role: "Research, protocol design, and implementation",
      outcome: "Explored privacy, integrity, and scalability for healthcare communication.",
      highlights: [
        "Designed a decentralized approach for sensitive medical IoT data transfer.",
        "Focused on secure data handling, integrity, and real-world healthcare constraints.",
        "Connected electrical engineering research with practical blockchain architecture.",
      ],
      links: [],
    },
  ] satisfies Project[],
};
