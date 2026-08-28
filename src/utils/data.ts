export interface Skill {
  name: string;
  category: string;
  size: number;
  speed: number;
  color: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  techStack: string[];
  github: string;
  demo: string;
  details: {
    architecture: { step: string; title: string; desc: string }[];
    videoUrl: string;
    image: string;
    screenshot?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  details: string[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  metric: string;
  desc: string;
}

export interface Education {
  degree: string;
  score: string;
  institution: string;
  duration: string;
}

export const personalInfo = {
  name: "Balamurali E",
  titles: [
    "Deep Learning Engineer",
    "Computer Vision Engineer",
    "Technical Lead",
    "Full-Stack AI Developer"
  ],
  summary: "Deep Learning Engineer and Full-Stack AI Developer with expertise in Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Edge AI, and Model Deployment. Experienced in building production-ready AI systems using PyTorch, TensorRT, NVIDIA Jetson platforms, REST APIs, cloud infrastructure, and AI-assisted software engineering workflows. Strong background in LLM applications, computer vision systems, and scalable microservice architectures.",
  contact: {
    email: "balamuralie56@gmail.com",
    github: "https://github.com/Balamurali2002",
    linkedin: "https://linkedin.com/in/balamurali-e",
    phone: "+91 90872 77096",
    location: "Chengalpattu, Tamil Nadu, India",
  }
};

export const skills: Skill[] = [
  { name: "Python", category: "Core", size: 1.6, speed: 0.8, color: "#306998", desc: "Expert in PyTorch, TensorFlow, OpenCV, Scikit-learn, Scapy, and core AI workflows." },
  { name: "PyTorch", category: "AI/ML", size: 1.8, speed: 0.6, color: "#EE4C2C", desc: "Building, training, and optimizing deep neural networks for computer vision." },
  { name: "TensorRT", category: "Edge", size: 1.7, speed: 0.9, color: "#76B900", desc: "Model optimization and FP16/INT8 calibration for high-speed edge inference." },
  { name: "YOLO", category: "AI/ML", size: 1.9, speed: 0.5, color: "#06b6d4", desc: "Real-time object detection, segmentation, and tracking (YOLOv8, YOLOv11)." },
  { name: "Computer Vision", category: "AI/ML", size: 1.9, speed: 0.5, color: "#00b4d8", desc: "Deploying camera stream analytics, plate recognition, and biological cell segmentation." },
  { name: "React", category: "Web", size: 1.4, speed: 1.0, color: "#61DAFB", desc: "Developing immersive, state-of-the-art interactive user interfaces." },
  { name: "React Native", category: "Mobile", size: 1.4, speed: 0.9, color: "#61dbfb", desc: "Building cross-platform mobile apps integrated with serverless backends." },
  { name: "Supabase", category: "Backend", size: 1.3, speed: 1.5, color: "#3ecf8e", desc: "Integrating secure user authentication, database schemas, and real-time syncing." },
  { name: "Node.js", category: "Backend", size: 1.3, speed: 1.2, color: "#339933", desc: "Designing secure REST APIs, web scrapers, and backend microservices." },
  { name: "LLMs", category: "AI/ML", size: 1.8, speed: 0.6, color: "#a855f7", desc: "Implementing generative pipelines (V-JEPA, SAM) and utilizing AI-assisted software engineering." },
  { name: "Edge AI", category: "Edge", size: 1.5, speed: 1.2, color: "#10b981", desc: "Optimizing neural networks using PyTorch & TensorRT for deployments on NVIDIA Jetson platforms." },
  { name: "Cloud Computing", category: "DevOps", size: 1.4, speed: 0.7, color: "#4285F4", desc: "Deploying apps to Vercel, Hostinger, and configuring GitHub Actions pipelines." },
  { name: "Prompt Engineering", category: "AI/ML", size: 1.5, speed: 0.8, color: "#e879f9", desc: "Structuring context windows, few-shot prompting, and RAG optimization." }
];

export const projects: Project[] = [
  {
    id: "forgeai",
    category: "AI Operating System",
    title: "ForgeAI",
    description: "Privacy-first local LLM execution operating engine featuring a dynamic plugin architecture and task DAG system.",
    features: ["Privacy First Local Execution", "Modular Plugin Architecture", "Task DAG Orchestration Engine", "Long-term Vector Memory System"],
    techStack: ["Python", "Local LLM", "SQLite", "Dependency Injection"],
    github: "https://github.com/Balamurali2002/forge-ai",
    demo: "https://forgeai.demo",
    details: {
      architecture: [
        { step: "1", title: "Local Ingestion Gateway", desc: "Receives user tasks securely offline." },
        { step: "2", title: "Task DAG Parser", desc: "Resolves complex tasks into a directed acyclic graph of sub-actions." },
        { step: "3", title: "Plugin Executor", desc: "Executes Python plugins via dependency injection." },
        { step: "4", title: "Vector Memory Query", desc: "Contextual lookup in local database for historical reference." },
        { step: "5", title: "Local LLM Inference", desc: "Compiles prompt and generates secure text response." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-typing-on-a-laptop-42171-large.mp4",
      image: "forgeai",
      screenshot: "/images/mint_terminal.png"
    }
  },
  {
    id: "citysense",
    category: "Smart City",
    title: "CitySense Smart City Monitoring",
    description: "AI-powered edge surveillance system checking helmet compliance, potholes, and traffic anomalies.",
    features: ["YOLOv11 Core Detection", "Jetson Orin Edge Deployment", "Helmet Compliance Checker", "Pothole Anomaly Scanner", "Realtime Street Monitor"],
    techStack: ["YOLOv11", "Jetson Orin Nano", "TensorRT", "PyTorch", "Python"],
    github: "https://github.com/Balamurali2002/citysense-smart-city",
    demo: "https://citysense.demo",
    details: {
      architecture: [
        { step: "1", title: "CCTV RTSP Ingestion", desc: "Captures street feeds directly at intersection node." },
        { step: "2", title: "YOLOv11 Object Detection", desc: "Detects motorcycles, riders, helmet presence, and potholes." },
        { step: "3", title: "TensorRT Inference Execution", desc: "Accelerates model to 80fps on Jetson Orin Nano." },
        { step: "4", title: "Anomaly Dispatcher", desc: "Triggers safety warnings for rider compliance." },
        { step: "5", title: "Cloud DB Syncing", desc: "Syncs coordinates and photos of potholes to map portal." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-seen-from-above-41904-large.mp4",
      image: "citysense",
      screenshot: "/images/citysense.png"
    }
  },
  {
    id: "eoms",
    category: "Operations Portal",
    title: "EOMS",
    description: "Examination Operations Management System incorporating QR checks, allocations, and WebSockets.",
    features: ["QR Scan Check-In Gateway", "WhatsApp Automated Alerts", "Room Allocation Engine", "Realtime WebSocket Dashboard", "Material Verification Logic"],
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "WhatsApp API"],
    github: "https://github.com/Balamurali2002/eoms-portal",
    demo: "https://eoms.demo",
    details: {
      architecture: [
        { step: "1", title: "Student QR Entry", desc: "Student scans ticket at gate." },
        { step: "2", title: "Allocation Engine", desc: "Instantly computes room, table row, and exam code." },
        { step: "3", title: "WhatsApp Broadcaster", desc: "Dispatches ticket details and table locations to WhatsApp." },
        { step: "4", title: "WebSocket Live Grid", desc: "Broadcasters update supervisor panel in real-time." },
        { step: "5", title: "Material Verification", desc: "Double-checks exam paper barcode with student profile." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-fast-on-a-laptop-keyboard-41724-large.mp4",
      image: "eoms"
    }
  },
  {
    id: "rezoe",
    category: "Mobile Application",
    title: "Rezoe Real Estate Reels",
    description: "Immersive real estate discovery mobile app utilizing reels, broker chat, and Supabase database syncing.",
    features: ["Instagram-Style Property Reels", "Detailed Property Management", "Realtime Agent Chat", "Supabase Serverless Database"],
    techStack: ["React Native", "Supabase", "PostgreSQL", "TailwindCSS", "Node.js"],
    github: "https://github.com/Balamurali2002/rezoe-mobile-app",
    demo: "https://rezoe.demo",
    details: {
      architecture: [
        { step: "1", title: "Video Feed Ingestion", desc: "Loads property reel feed in player." },
        { step: "2", title: "Realtime Broker Query", desc: "Sends property token info to agent chat." },
        { step: "3", title: "pgvector Property Search", desc: "Finds matches near location." },
        { step: "4", title: "Stripe Booking Portal", desc: "Secures broker subscription token fees." },
        { step: "5", title: "Supabase Realtime Sync", desc: "Updates chat messages instantly." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-and-kitchen-40767-large.mp4",
      image: "rezoe",
      screenshot: "/images/rezoe.png"
    }
  },
  {
    id: "webscraper",
    category: "AI Analytics",
    title: "WebScraper Pro",
    description: "Automated analysis tool detecting SEO factors, technology stacks, and exporting detailed spreadsheets.",
    features: ["Playwright headless crawler", "SEO meta analyzer", "Tech stack detection engine", "PDF/DOCX/XLSX exporters"],
    techStack: ["Playwright", "FastAPI", "BeautifulSoup", "Python"],
    github: "https://github.com/Balamurali2002/webscraper-pro",
    demo: "https://webscraper.demo",
    details: {
      architecture: [
        { step: "1", title: "Playwright Headless Ingest", desc: "Crawls single-page JS heavy sites." },
        { step: "2", title: "BeautifulSoup Parser", desc: "Extracts body text, headers, and images." },
        { step: "3", title: "Wappalyzer Detector", desc: "Scans DOM headers to map framework types." },
        { step: "4", title: "SEO Diagnostic Engine", desc: "Flags missing tags, duplicate headers, or slow assets." },
        { step: "5", title: "Document Exporter", desc: "Compiles formatted spreadsheets and PDFs." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-data-scrolls-on-a-monitor-43187-large.mp4",
      image: "webscraper"
    }
  },
  {
    id: "lms",
    category: "Web Application",
    title: "LMS Platform",
    description: "Enterprise learning management platform with course modules, video lectures, and analytics.",
    features: ["Learning Modules Builder", "Course Attendance Tracker", "Analytics Student Dashboard"],
    techStack: ["Next.js", "Express", "MongoDB", "TailwindCSS"],
    github: "https://github.com/Balamurali2002/lms-platform",
    demo: "https://lms.demo",
    details: {
      architecture: [
        { step: "1", title: "Client Entry", desc: "Enters course portal page." },
        { step: "2", title: "Module Renderer", desc: "Streams lecture video assets." },
        { step: "3", title: "Quiz Engine", desc: "Validates multiple choice checks." },
        { step: "4", title: "Score Analytics", desc: "Plots student speed and grades." },
        { step: "5", title: "Cert Verification", desc: "Signs certificates upon course completion." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-microscope-magnifying-cells-41680-large.mp4",
      image: "lms"
    }
  },
  {
    id: "fdaicorp",
    category: "Corporate Website",
    title: "FDAI Corporate Hub",
    description: "The official web architecture for FDAI, displaying researcher bios and service grids.",
    features: ["Corporate research grid", "Interactive project layouts", "Hostinger deployment"],
    techStack: ["React", "CSS", "Hostinger", "Vite"],
    github: "https://github.com/Balamurali2002/fdaicorp",
    demo: "https://fdaivr.com",
    details: {
      architecture: [
        { step: "1", title: "Client Visit", desc: "Visits official company URL." },
        { step: "2", title: "Research Grid", desc: "Pulls scientific papers and bios." },
        { step: "3", title: "Contact Gateway", desc: "Dispatches leads directly to executives." },
        { step: "4", title: "Mobile Layout", desc: "Optimized responsive assets." },
        { step: "5", title: "Fast Delivery Link", desc: "Served via CDN nodes." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-in-the-evening-41584-large.mp4",
      image: "fdaicorp"
    }
  },
  {
    id: "fitypro",
    category: "Web Application",
    title: "FityPro Fitness Manager",
    description: "Fitness planner portal providing custom workout maps, caloric counters, and progress tracker.",
    features: ["Caloric burn calculator", "Dynamic exercise log", "Weight charts"],
    techStack: ["React", "Node.js", "Express", "SQLite"],
    github: "https://github.com/Balamurali2002/fitypro",
    demo: "https://fitypro.demo",
    details: {
      architecture: [
        { step: "1", title: "User Register", desc: "Saves weight and daily activity goal." },
        { step: "2", title: "Exercise Log", desc: "Tracks weights, reps, and durations." },
        { step: "3", title: "Calorie API", desc: "Retrieves nutritional estimates." },
        { step: "4", title: "Progress Dashboard", desc: "Visualizes trends over 30 days." },
        { step: "5", title: "Local SQLite DB", desc: "Stores activity logs securely." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-typing-on-a-laptop-42171-large.mp4",
      image: "fitypro"
    }
  },
  {
    id: "classroom",
    category: "Operations Portal",
    title: "Digital Classroom Academy",
    description: "Integrated school manager covering grades, attendance, and administrative workflows.",
    features: ["Attendance scanner", "Gradebook registry", "Teacher-Parent channel"],
    techStack: ["React", "Supabase", "TailwindCSS", "Node.js"],
    github: "https://github.com/Balamurali2002/digital-classroom",
    demo: "https://classroom.demo",
    details: {
      architecture: [
        { step: "1", title: "Dashboard Entry", desc: "Logs in with teacher credentials." },
        { step: "2", title: "Attendance Log", desc: "Scans student cards for entry stamps." },
        { step: "3", title: "Grades Grid", desc: "Inputs test scores dynamically." },
        { step: "4", title: "Supabase DB sync", desc: "Instantly sends notifications to parents." },
        { step: "5", title: "Final Term Sheets", desc: "Outputs printable student profiles." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-fast-on-a-laptop-keyboard-41724-large.mp4",
      image: "classroom"
    }
  },
  {
    id: "dsabootcamp",
    category: "Training Platform",
    title: "DSA Bootcamp Portal",
    description: "Code preparation hub containing algorithmic modules, sandbox compilers, and tests.",
    features: ["Algorithmic track builder", "Interactive compilers", "Mock contest systems"],
    techStack: ["React", "Express", "Node.js", "Docker Sandbox"],
    github: "https://github.com/Balamurali2002/dsa-bootcamp",
    demo: "https://dsabootcamp.demo",
    details: {
      architecture: [
        { step: "1", title: "Enters Sandbox", desc: "Selects coding challenge (e.g. Graph traversal)." },
        { step: "2", title: "Code Compiler", desc: "User inputs code (Python/C++)." },
        { step: "3", title: "Docker Execution Node", desc: "Compiles user code inside sandboxed containers." },
        { step: "4", title: "Test Case Validator", desc: "Compares outputs against hidden tests." },
        { step: "5", title: "Score Registry", desc: "Updates rankings on the bootcamp dashboard." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-data-scrolls-on-a-monitor-43187-large.mp4",
      image: "dsabootcamp"
    }
  }
];

export const experience: Experience[] = [
  {
    role: "Deep Learning Engineer / Tech Lead",
    company: "Future Development Artificial Intelligence (FDAI)",
    duration: "2024 - Present",
    description: "Orchestrating technical direction and edge AI deployments for deep learning startup products.",
    details: [
      "AI-Assisted Systems Architecture: Drive the startup's technical direction, utilizing LLMs to accelerate coding, troubleshooting, and deployment of complex full-stack apps.",
      "Edge AI Deployment: Optimized and deployed Computer Vision models using PyTorch and TensorRT on NVIDIA Jetson platforms, implementing Model Optimization workflows.",
      "Team Leadership: Led a cross-functional team of 10 interns and delivered 6 AI products with a 40% reduction in development time using AI-assisted engineering.",
      "Workshops: Conducted 12+ AI workshops for 300+ students across Biotechnology, Microbiology, and CS departments (including specialized 'Microbiology with AI' modules)."
    ]
  },
  {
    role: "Soft Computing Trainer (Part Time)",
    company: "Future Development Artificial Intelligence (FDAI)",
    duration: "Part Time",
    description: "Educated engineering professionals on neural network models and heuristic optimization methods.",
    details: [
      "Conducted 10+ technical workshops on Artificial Neural Networks, Genetic Algorithms, Fuzzy Logic, and Machine Learning.",
      "Delivered customized AI curricula tailored to startup founders to accelerate product building."
    ]
  },
  {
    role: "AI Internships & Training",
    company: "Crown Shield IT | 8Queens | Cancer Insight",
    duration: "2021 - 2023",
    description: "Acquired core hands-on experience in full-stack web and security engineering roles.",
    details: [
      "Developed a custom Network Intrusion Detection system at Crown Shield IT Consultant and Software Company.",
      "Contributed to Cancer Insight Webpages in RUSA during a three-month semester internship.",
      "Built full-stack database integrations and layouts at 8Queens Technologies."
    ]
  }
];

export const achievements: Achievement[] = [
  {
    title: "Technical Lead",
    subtitle: "FDAI Team Leadership",
    metric: "6 Products",
    desc: "Directed a cross-functional team of 10 interns, successfully delivering 6 AI products with a 40% reduction in code lifecycle time."
  },
  {
    title: "Workshops Conducted",
    subtitle: "Technical AI Trainer",
    metric: "22+ Workshops",
    desc: "Educated over 300+ biotechnology, microbiology, and CS students. Authored specialized curricula, including 'Microbiology with AI' and AI for founders."
  },
  {
    title: "Projects Developed",
    subtitle: "Deployments",
    metric: "15+ Projects",
    desc: "Built 15+ complex applications spanning Computer Vision at the edge, real-time database portals, and local LLM sandboxes."
  },
  {
    title: "Guinness World Record",
    subtitle: "GUVI & AICTE Event Participant",
    metric: "Record Holder",
    desc: "Achieved Guinness World Record Event participation for a collaborative online computer programming challenge organized by GUVI and AICTE in 2021 (Credential ID: BWXi2012106P87q6m2)."
  }
];

export const education: Education[] = [
  {
    degree: "M.Sc Information Technology (M.Sc IT)",
    score: "Passed with 75%",
    institution: "University of Madras",
    duration: "2023 - 2025"
  },
  {
    degree: "B.Sc in Computer Science (B.Sc CS)",
    score: "Passed With 82%",
    institution: "A.M.Jain College",
    duration: "2020 - 2023"
  },
  {
    degree: "HSC",
    score: "Passed With 67%",
    institution: "RKN Gyan Jothi Matric Hr.Sec. School, Chengalpattu",
    duration: "Graduated"
  }
];

export const researchInterests = [
  { name: "Computer Vision", desc: "Object detection, YOLO frameworks, Oriented Bounding Boxes, and character segmentation." },
  { name: "Multimodal AI", desc: "Combining visual tokens with textual embeddings for rich, contextual reasoning." },
  { name: "Edge AI", desc: "Deploying optimized neural networks on microcontrollers and embedded devices like NVIDIA Jetson." },
  { name: "AI for Healthcare", desc: "Diagnosing ailments, scanning biological samples, and processing medical imagery." },
  { name: "AI for Biotechnology", desc: "Mapping microbiology colony counters, DNA sequencing pipelines, and bioinformatics." },
  { name: "LLM Systems", desc: "Developing privacy-first local LLM sandboxes, DAG task runners, and semantic vector indexing." }
];

export const certifications = [
  { title: "Python Completion", issuer: "GUVI & HCL", year: "2025", cred: "637oX74b41322V4Hfq" },
  { title: "Face Recognition App", issuer: "GUVI (AI-For-India)", year: "2021", cred: "b62Z16j3198C93P038" },
  { title: "Guinness Record Coder", issuer: "GUVI & AICTE", year: "2021", cred: "BWXi2012106P87q6m2" }
];

export const chatbotContext = {
  personality: "You are the AI clone of Balamurali E. You speak with a confident, technically precise, and friendly cyberpunk engineer persona. You refer to Balamurali in the first person ('I', 'my') as his digital clone. Keep responses concise, punchy, and highlight credentials like deep learning, Jetson edge AI, the Guinness World Record, and full-stack capabilities.",
  qaPairs: [
    {
      q: "what are your core skills?",
      a: "My core expertise lies in Deep Learning (YOLOv11, YOLOv8), Edge AI (NVIDIA Jetson, TensorRT optimization), React/Next.js, React Native, Supabase, Node.js, and local LLM systems."
    },
    {
      q: "tell me about your guinness world record",
      a: "I participated in a collaborative online programming event organized by GUVI & AICTE in 2021, setting a Guinness World Record. Credential ID: BWXi2012106P87q6m2."
    },
    {
      q: "where did you work?",
      a: "I'm currently the Deep Learning Engineer & Technical Lead at FDAI, leading edge deployments and full-stack infrastructures. I've also facilitator-led 22+ workshops and trained over 300+ students."
    },
    {
      q: "how can i contact you?",
      a: "You can reach me directly via email at balamuralie56@gmail.com, call me at +91 90872 77096, or check out my profiles on LinkedIn (in/balamurali-e) and GitHub (Balamurali2002)."
    },
    {
      q: "tell me about citysense",
      a: "CitySense is my smart city project! I prototyped a YOLOv11 model for street-level obstacle and vehicle detection, running optimizations for real-time edge streaming on Jetson Orin."
    },
    {
      q: "tell me about forgeai",
      a: "ForgeAI is my local LLM OS engine! It runs offline tasks using SQLite vector memory and a Python dependency injection plugin architecture, organizing jobs through a custom DAG task runner."
    },
    {
      q: "do you have a resume?",
      a: "Yes! You can download my ATS-optimized, high-fidelity resume from the Recruiter Mode panel at the bottom of the page. It's ready for immediate review."
    }
  ],
  fallback: "That's an interesting probe! As Balamurali's AI clone, I can tell you I specialize in deep learning pipelines, computer vision models, NVIDIA Jetson edge development, and full stack deployments. For specific collaboration offers, check my contact details or email me at balamuralie56@gmail.com."
};

export interface HobbyInterestItem {
  name: string;
  desc: string;
  category: 'hobby' | 'interest';
}

export const hobbiesAndInterests: HobbyInterestItem[] = [
  { name: "Chess", desc: "Sharpening strategic depth, pattern recognition, and tactical calculation.", category: "hobby" },
  { name: "Reading", desc: "Exploring scientific publications, historical accounts, and technical literature.", category: "hobby" },
  { name: "Writing Poems", desc: "Synthesizing emotional themes and linguistic patterns into structured stanzas.", category: "hobby" },
  { name: "Playing Shuttle", desc: "Maintaining physical response rates, agility, and cardiovascular fitness.", category: "hobby" },
  { name: "Politics & News", desc: "Monitoring international affairs, macroeconomic shifts, and domestic policy updates.", category: "interest" },
  { name: "Sustainable Agriculture", desc: "Investigating precision farming, automation, and automated crop feeds.", category: "interest" },
  { name: "Market Trends", desc: "Studying trade updates, micro-cap indicators, and tech sector investment indexes.", category: "interest" }
];
