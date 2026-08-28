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
    id: "citysense",
    title: "CitySense — Smart City Monitoring",
    category: "Computer Vision",
    description: "Prototyped and configured a YOLOv11-based infrastructure monitoring system for street-level element detection, with custom dataset annotation for precise training.",
    tags: ["YOLO Detection", "Computer Vision", "Object Tracking", "Real-Time Inference"],
    statusLabel: "Prototype build — not on GitHub, happy to walk through it live",
  },
  {
    id: "eoms",
    title: "EOMS — Exam Operations Management System",
    category: "Operations Console",
    description: "Admin console for exam operations — faculty check-in, substitution handling, materials tracking, seat-grid allocation, with full undo support.",
    tags: ["FastAPI", "JWT Auth", "Rule-Based Assignment", "Seat Grid"],
    statusLabel: "Code private — available on request",
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
  { name: "ForgeAI", desc: "Own AI agent project — task DAG, LLM integration", status: "PRIVATE" },
  { name: "BrightPath HRM", desc: "Multi-tenant HRMS, FastAPI + Next.js", status: "PRIVATE · ACTIVE" },
  { name: "FDAIAOS", desc: "Academic OS (LMS + ERP), FastAPI + Next.js 16", status: "PRIVATE · ACTIVE" },
  { name: "Bacteria Classification", desc: "CNN, MobileNetV2, transfer learning", status: "ONGOING" },
  { name: "SVV Estates", desc: "Web platform for a family real-estate business", status: "PRIVATE" },
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
  { degree: "B.Sc Computer Science", score: "Passed with 82%", institution: "A.M. Jain College", duration: "2020 – 2023" },
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
