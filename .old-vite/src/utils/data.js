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

export const skills = [
  { name: "Python", category: "Core", size: 1.6, speed: 0.8, color: "#306998", desc: "Expert in PyTorch, TensorFlow, OpenCV, Scikit-learn, Scapy, and core AI workflows." },
  { name: "Computer Vision", category: "AI/ML", size: 1.9, speed: 0.5, color: "#06b6d4", desc: "Developing object detection (YOLOv8, YOLOv11), OCR (EasyOCR), and image segmentation systems." },
  { name: "Edge AI", category: "Edge", size: 1.5, speed: 1.2, color: "#10b981", desc: "Optimizing neural networks using PyTorch & TensorRT for deployments on NVIDIA Jetson platforms." },
  { name: "React Native", category: "Mobile", size: 1.4, speed: 0.9, color: "#61dbfb", desc: "Building cross-platform mobile apps integrated with serverless backends." },
  { name: "Supabase", category: "Backend", size: 1.3, speed: 1.5, color: "#3ecf8e", desc: "Integrating secure user authentication, database schemas, and real-time syncing." },
  { name: "LLMs", category: "AI/ML", size: 1.8, speed: 0.6, color: "#a855f7", desc: "Implementing generative pipelines (V-JEPA, SAM) and utilizing AI-assisted software engineering." },
  { name: "Jetson", category: "Edge", size: 1.7, speed: 0.7, color: "#76b900", desc: "Deploying Edge AI systems with Model Optimization workflows on NVIDIA Jetson platforms." }
];

export const projects = [
  {
    id: "citysense",
    title: "CitySense (Smart City Monitoring)",
    description: "Prototyped and configured a YOLOv11-based infrastructure monitoring system for street-level element detection.",
    longDescription: "CitySense targets real-time infrastructure and street-level object detection using a YOLOv11 model. Custom dataset annotations were compiled and preprocessed to optimize precise model training, allowing deployment on embedded GPUs for smart city monitoring.",
    techStack: ["YOLOv11", "Python", "Computer Vision", "PyTorch", "TensorRT", "Jetson"],
    github: "https://github.com/Balamurali2002/citysense-smart-city",
    demo: "https://citysense.demo",
    details: {
      architecture: [
        { step: "1", title: "Video Feed Ingestion", desc: "Captures street CCTV camera feeds." },
        { step: "2", title: "Custom Annotations", desc: "Dataset pre-annotated for custom street-level obstacles." },
        { step: "3", title: "YOLOv11 Object Detection", desc: "Runs high-accuracy model inference on frames." },
        { step: "4", title: "NVIDIA TensorRT Optimization", desc: "Optimizes models to FP16 for embedded platforms." },
        { step: "5", title: "Dashboard Visualization", desc: "Outputs real-time counts and telemetry logs." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-seen-from-above-41904-large.mp4",
      image: "citysense"
    }
  },
  {
    id: "rezoe",
    title: "Rezoe Mobile App",
    description: "Architected database structure and backend services using Supabase for a video-reel-focused React Native application.",
    longDescription: "A modern React Native real estate app offering immersive video-reels for properties. The database, media storage, and user authentication are built entirely on Supabase for instantaneous synchronization.",
    techStack: ["React Native", "Supabase", "PostgreSQL", "TailwindCSS", "Node.js"],
    github: "https://github.com/Balamurali2002/rezoe-mobile-app",
    demo: "https://rezoe.demo",
    details: {
      architecture: [
        { step: "1", title: "React Native UI Clients", desc: "Responsive video-reel player interface." },
        { step: "2", title: "Supabase Authentication", desc: "Secure social and email user verification." },
        { step: "3", title: "PostgreSQL Database Schema", desc: "Structured tables for properties, agents, and views." },
        { step: "4", title: "Supabase Storage Bucket", desc: "Hosts and streams high-definition property reels." },
        { step: "5", title: "Realtime Messages", desc: "Enables direct broker-client chat." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-and-kitchen-40767-large.mp4",
      image: "rezoe"
    }
  },
  {
    id: "bacteria",
    title: "Bacteria Identifier AI",
    description: "Developed a 32-class biological sample classification system utilizing MobileNetV2 for image batch processing.",
    longDescription: "A computational vision tool for microbiology research. Uses a custom-trained MobileNetV2 architecture to identify 32 distinct types of bacterial colonies, accelerating lab reporting protocols.",
    techStack: ["MobileNetV2", "PyTorch", "Python", "OpenCV", "FastAPI"],
    github: "https://github.com/Balamurali2002/bacteria-identifier-ai",
    demo: "https://bacteria-ai.demo",
    details: {
      architecture: [
        { step: "1", title: "Microbiology Plate Capture", desc: "Ingests images of bacteria cultures." },
        { step: "2", title: "OpenCV Characterization", desc: "Normalizes brightness, isolates colonies, and pre-segments overlapping blobs." },
        { step: "3", title: "MobileNetV2 Classification", desc: "Identifies bacteria class from 32 predefined biological classes." },
        { step: "4", title: "Batch Processing Queue", desc: "FastAPI handles high-throughput image loads." },
        { step: "5", title: "Lab Report Dispatch", desc: "Compiles findings into formatted JSON/PDF summaries." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-microscope-magnifying-cells-41680-large.mp4",
      image: "bacteria"
    }
  },
  {
    id: "intrusion",
    title: "Network Intrusion Detection System",
    description: "Identifies threatening IPs using the Scapy package in Python to protect vulnerable webpages.",
    longDescription: "A network security script that sniffs packet streams using Scapy, extracts features, and leverages machine learning models to classify malicious traffic patterns and block threatening IPs.",
    techStack: ["Python", "Scapy", "Machine Learning", "Scikit-learn", "Linux"],
    github: "https://github.com/Balamurali2002/network-intrusion-detection",
    demo: "https://intrusion-detection.demo",
    details: {
      architecture: [
        { step: "1", title: "Scapy Packet Sniffing", desc: "Intercepts network traffic on specified web interfaces." },
        { step: "2", title: "Feature Extraction", desc: "Extracts packet headers, payload sizes, and interval rates." },
        { step: "3", title: "ML Classifier Pipeline", desc: "Scikit-learn model evaluates traffic for threats (DDoS, scans)." },
        { step: "4", title: "Ip Blocking Command", desc: "Triggers firewall rules to drop traffic from flagged IPs." },
        { step: "5", title: "Security Log Dispatch", desc: "Sends alert logs to the administrative dashboard." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-camera-monitoring-a-parking-lot-at-night-42289-large.mp4",
      image: "intrusion"
    }
  },
  {
    id: "numberplate",
    title: "Automatic Vehicle License Plate Recognition",
    description: "Utilized Deep Learning to monitor and improve visualization in captured videos and identify vehicle number plates.",
    longDescription: "An end-to-end ALPR system. It detects vehicles and bounding box coordinates, applies contrast enhancement to locate the license plates, and uses character segmentation with OCR to read plates.",
    techStack: ["YOLOv8", "OpenCV", "EasyOCR", "Python", "SQLite"],
    github: "https://github.com/Balamurali2002/license-plate-recognition",
    demo: "https://alpr.demo",
    details: {
      architecture: [
        { step: "1", title: "Video Frame Capture", desc: "Ingests frames from parking entry cameras." },
        { step: "2", title: "Vehicle & Plate Detection", desc: "YOLOv8 locates vehicle targets and plate bounding boxes." },
        { step: "3", title: "Deskew & Thresholding", desc: "Normalizes plate angles and enhances character contrast." },
        { step: "4", title: "OCR Extraction", desc: "Segment characters and reads text using OCR engines." },
        { step: "5", title: "Registry Verification", desc: "Cross-checks SQLite logs and stamps access authorization." }
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-in-the-evening-41584-large.mp4",
      image: "numberplate"
    }
  }
];

export const experience = [
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

export const achievements = [
  {
    title: "Guinness World Record",
    subtitle: "GUVI & AICTE Event Participant",
    metric: "Credential ID: BWXi2012106P87q6m2",
    desc: "Achieved Guinness World Record Event participation for a collaborative online computer programming challenge organized by GUVI and AICTE in 2021."
  },
  {
    title: "Workshops Conducted",
    subtitle: "Technical AI Trainer",
    metric: "22+ Workshops",
    desc: "Educated over 300+ biotechnology, microbiology, and CS students. Authored specialized curricula, including 'Microbiology with AI' and AI for founders."
  },
  {
    title: "Interns Mentored",
    subtitle: "FDAI Team Leadership",
    metric: "10 Interns",
    desc: "Directed a cross-functional team of 10 interns, successfully delivering 6 AI products with a 40% reduction in code lifecycle time."
  },
  {
    title: "Python GUVI & HCL Certified",
    subtitle: "GUVI & HCL Badge",
    metric: "Credential ID: 637oX74b41322V4Hfq",
    desc: "Certified Python developer by GUVI & HCL in 2025. Also certified in Face Recognition Application using Python (Credential ID: b62Z16j3198C93P038)."
  }
];

export const education = [
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

export const chatbotContext = {
  personality: "You are the AI clone of Balamurali E. You speak with a confident, technically precise, and friendly cyberpunk engineer persona. You refer to Balamurali in the first person ('I', 'my') as his digital clone. Keep responses concise, punchy, and highlight credentials like deep learning, Jetson edge AI, the Guinness World Record, and full-stack capabilities.",
  qaPairs: [
    {
      q: "what are your core skills?",
      a: "My core expertise lies in Deep Learning (YOLOv11, YOLOv8), Edge AI (NVIDIA Jetson, TensorRT optimization), React Native mobile applications, databases (Supabase, PostgreSQL, MySQL), and Python scripting (Scapy, OpenCV)."
    },
    {
      q: "tell me about your guinness world record",
      a: "I participated in a massive collaborative online computer programming event organized by GUVI & AICTE in 2021, setting a Guinness World Record. My Credential ID is: BWXi2012106P87q6m2."
    },
    {
      q: "where did you work?",
      a: "I'm currently the Deep Learning Engineer & Technical Lead at FDAI (Future Development Artificial Intelligence), leading edge deployments and full-stack infrastructures. I've also facilitator-led 22+ workshops and trained over 300+ students."
    },
    {
      q: "how can i contact you?",
      a: "You can reach me directly via email at balamuralie56@gmail.com, call me at +91 90872 77096, or check out my profiles on LinkedIn (in/balamurali-e) and GitHub (Balamurali2002)."
    },
    {
      q: "tell me about citysense",
      a: "CitySense is my smart city project! I prototyped and configured a YOLOv11-based model for street-level obstacle and vehicle detection, running optimizations for real-time edge streaming."
    },
    {
      q: "do you have a resume?",
      a: "Yes! You can download my ATS-optimized, high-fidelity resume from the Recruiter Mode panel at the bottom of the page. It's ready for immediate review."
    }
  ],
  fallback: "That's an interesting probe! As Balamurali's AI clone, I can tell you I specialize in deep learning pipelines, computer vision models, NVIDIA Jetson edge development, and full stack deployments. For specific collaboration offers, check my contact details or email me at balamuralie56@gmail.com."
};
