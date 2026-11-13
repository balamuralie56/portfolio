export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  statusLabel: string;
  url?: string;
}

export interface LabItem {
  name: string;
  desc: string;
  status: string;
}

export interface ExperienceBullet {
  title: string;
  desc: string;
}

export interface Achievement {
  metric: string;
  title: string;
  desc: string;
}

export interface Education {
  degree: string;
  score: string;
  institution: string;
  duration: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  cred: string;
}

export interface ServiceLogItem {
  when: string;
  title: string;
  org?: string;
}

export interface ResearchItem {
  name: string;
  desc: string;
}

export interface HobbyItem {
  name: string;
  category: 'hobby' | 'interest';
}

export const personalInfo = {
  name: "Balamurali E",
  role: "Jr. Full-Stack AI Developer",
  tagline: "Machine Learning · Deep Learning · Computer Vision",
  summary:
    "Jr. Full-Stack AI Developer with a working foundation in Machine Learning, Deep Learning, and Computer Vision. Builds toward production-facing AI systems — REST APIs, cloud infrastructure — with AI-assisted engineering workflows as a deliberate, core part of the process. Early career, moving fast, and building the habit of shipping in public.",
  contact: {
    email: "balamuralie56@gmail.com",
    github: "https://github.com/balamuralie56",
    githubHandle: "balamuralie56",
    linkedin: "https://linkedin.com/in/balamurali-e",
    linkedinHandle: "balamurali-e",
    phone: "+91 90872 77096",
    phoneHref: "+919087277096",
    location: "Chengalpattu, Tamil Nadu, India",
  },
};

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["Python", "SQL"] },
  { title: "AI & ML", items: ["YOLO-based Object Detection", "Image Classification", "Object Tracking & Transfer Learning", "Roboflow"] },
  { title: "Databases", items: ["Supabase (Vector DB)", "Firebase (NoSQL)"] },
  { title: "Deploy Tools", items: ["Docker · GitHub · Git CLI", "Expo", "Vercel · Render · Hostinger"] },
  { title: "AI-Assisted Engineering", items: ["LLM-paired coding & debugging", "Rapid prototyping & iteration", "AI-accelerated troubleshooting & deployment"] },
];

export const experience = {
  role: "Jr. Full-Stack AI Developer",
  company: "Future Development Artificial Intelligence (FDAI)",
  duration: "Jan 2026 — Present",
  bullets: [
    {
      title: "AI-Assisted Systems Architecture",
      desc: "Drives the technical direction of the startup, using AI development tools (LLMs) to accelerate coding, troubleshooting, and deployment of full-stack applications and company web infrastructure.",
    },
    {
      title: "Computer Vision Deployment",
      desc: "Optimizes and deploys Deep Learning and Computer Vision models with PyTorch and TensorRT on NVIDIA Jetson platforms, as part of the team's model-optimization workflow.",
    },
    {
      title: "12+ AI workshops",
      desc: "Delivered for 300+ students across Biotechnology, Microbiology, and Computer Science departments.",
    },
    {
      title: "10+ technical workshops",
      desc: "On Artificial Neural Networks, Genetic Algorithms, Fuzzy Logic, and Machine Learning, as a freelancer collaborating with FDAI.",
    },
  ] as ExperienceBullet[],
};

export const projects: Project[] = [
  {
    id: "forgeai",
    title: "ForgeAI — Multi-Agent Orchestration System",
    category: "AI Infrastructure",
    description: "A mature multi-agent orchestration system: a FastAPI backend coordinating task graphs across agents, a React frontend for driving and observing runs, and inference against local LLMs via Ollama. 300+ passing tests.",
    tags: ["FastAPI", "React", "Multi-Agent", "Ollama / Local LLMs", "300+ Tests"],
    statusLabel: "Public · github.com/balamuralie56/ForgeAI",
    url: "https://github.com/balamuralie56/ForgeAI",
  },
  {
    id: "eoms-lite",
    title: "EOMS Lite — Exam Invigilation & Room Allocation",
    category: "SaaS Product",
    description: "A finished, feature-complete QR-based exam invigilation and room-allocation SaaS product — faculty check-in by QR scan, seat-grid allocation, substitution handling, and materials tracking.",
    tags: ["QR-Based Check-In", "FastAPI", "Room Allocation", "SaaS"],
    statusLabel: "Public · github.com/balamuralie56/eoms-lite",
    url: "https://github.com/balamuralie56/eoms-lite",
  },
  {
    id: "svv-estates",
    title: "SVV-Estates — Real Estate Platform",
    category: "Web Platform",
    description: "A live, deployed real estate platform built for a family real-estate business — listings, inquiries, and property management in one place.",
    tags: ["Next.js", "Deployed", "Real Estate"],
    statusLabel: "Public · github.com/balamuralie56/SVV-Estates",
    url: "https://github.com/balamuralie56/SVV-Estates",
  },
  {
    id: "citysense",
    title: "CitySense — Smart City Monitoring",
    category: "Computer Vision",
    description: "Prototyped and configured a YOLOv11-based infrastructure monitoring system for street-level element detection, with custom dataset annotation for precise training. Currently being rebuilt as V2.",
    tags: ["YOLO Detection", "Computer Vision", "Object Tracking", "Real-Time Inference"],
    statusLabel: "In progress — V2 rebuild, not on GitHub yet",
  },
  {
    id: "alpr",
    title: "Automatic License Plate Recognition",
    category: "Computer Vision",
    description: "Used deep learning to improve visualization in captured video and identify number plates on four-wheelers.",
    tags: ["Deep Learning", "Video Pipeline", "Plate Detection"],
    statusLabel: "Prototype build — not on GitHub, happy to walk through it live",
  },
];

export const labItems: LabItem[] = [
  { name: "Bacteria Classification", desc: "CNN, MobileNetV2, transfer learning", status: "ONGOING" },
];

export const publicRepo = {
  name: "DSA-Bootcamp-JS",
  desc: "JS data-structures & algorithms practice",
  url: "https://github.com/balamuralie56/DSA-Bootcamp-JS",
};

export const achievements: Achievement[] = [
  { metric: "10 interns", title: "Mentorship at FDAI", desc: "Scoped projects, delegated AI/full-stack tasks, and ran technical reviews for a team of 10 interns." },
  { metric: "22+ workshops", title: "Technical facilitation", desc: "Delivered AI and ML workshops to 300+ students across Biotechnology, Microbiology, and CS departments." },
  { metric: "Event participant", title: "Guinness World Record", desc: "Collaborative online programming event, organized by GUVI & AICTE, 2021." },
];

export const education: Education[] = [
  { degree: "M.Sc Information Technology", score: "Passed with 75%", institution: "University of Madras", duration: "2023 – 2025" },
  { degree: "B.Sc Computer Science", score: "Distinction (75–79%, University of Madras CBCS grading)", institution: "A.M. Jain College (University of Madras)", duration: "2020 – 2023" },
];

export const serviceLog: ServiceLogItem[] = [
  { when: "Jul 2025 — Jan 2026", title: "FDAI IIT Internship — problem solving / agile methodology." },
  { when: "2024 — Present", title: "Basic Technical Mentoring." },
  { when: "Jan 2025 — Apr 2025", title: "Full-Stack Web Development, fourth semester", org: "8Queens Technologies" },
  { when: "Sep 2024 — Dec 2024", title: "Three-month internship, Cancer Insight webpages", org: "RUSA" },
  { when: "May 2024 — Jun 2024", title: "Developed an Intrusion Detection System", org: "Crown Shield IT Consultant & Software Company" },
];

export const certifications: Certification[] = [
  { title: "Python — Certificate of Completion", issuer: "GUVI & HCL", year: "2025", cred: "637oX74b41322V4Hfq" },
  { title: "Face Recognition App using Python", issuer: "GUVI — AI-For-India Event", year: "2021", cred: "b62Z16j3198C93P038" },
  { title: "Guinness World Record Event Participant", issuer: "GUVI & AICTE", year: "2021", cred: "BWXi2012106P87q6m2" },
];

export const researchInterests: ResearchItem[] = [
  { name: "GIS & Spatial Analysis", desc: "Applying geographic information systems and satellite imagery platforms for land measurement and agricultural data analysis." },
  { name: "Advanced Computer Vision", desc: "Experimenting with Meta's V-JEPA for self-supervised video understanding and SAM for zero-shot image segmentation." },
  { name: "Search Engine Optimization", desc: "Studying SEO operations and web analytics to improve search visibility and organic growth on live platforms." },
];

export const hobbies: HobbyItem[] = [
  { name: "Chess", category: "hobby" },
  { name: "Reading", category: "hobby" },
  { name: "Writing Poems", category: "hobby" },
  { name: "Shuttle", category: "hobby" },
  { name: "Politics & News", category: "interest" },
  { name: "Sustainable Agriculture", category: "interest" },
  { name: "Market Trends", category: "interest" },
];

export const journeyPhotos = [
  {
    src: "/images/B.sc Graduvation.jpeg",
    caption: "B.Sc Computer Science convocation — Agurchand Manmull Jain College, 2023",
  },
  {
    src: "/images/GUVI Class at SRM.jpeg",
    caption: "GUVI Technical Educator session — SRM University bootcamp series",
  },
];
