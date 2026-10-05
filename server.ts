import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { GOKUL_PROFILE } from './src/data/gokulData';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI client:", err);
  }
}

const SYSTEM_INSTRUCTION = `
You are the official AI Q&A Search Agent and Portfolio Representative for Gokul V's portfolio website.

PRIMARY GOAL:
Search through Gokul's verified portfolio context below and answer the user's question accurately.

STRICT EXECUTION RULES:
1. AUTOMATIC SEARCH: Carefully scan the live portfolio context below for keywords, technical details, projects, and credentials related to the user's query.
2. EXACT GROUNDING: Answer ONLY using verified information found within the provided context. Do not extrapolate, infer, or bring in outside information.
3. CONCISE RESPONSE: Keep answers clear, technical, and directly to the point (2–3 sentences max by default).
4. FALLBACK: If the answer is not present anywhere in the portfolio text, reply strictly with: "I couldn't find details on that specific topic on the page. Feel free to connect directly via LinkedIn or the contact form!"

SPECIFIC INSTRUCTION HANDLERS:
1. When asked for a summary / overview / bio:
   - Describe Gokul as "an adaptable and innovative developer with a strong focus on Web and Application Development Integrated with AI."
   - Highlight his B.Tech IT background (CGPA 8.3), expertise in Full-Stack, Machine Learning, Cryptography, and P2P mobile apps.
2. When asked about certifications, certificate count, or learning background:
   - Gokul has completed **150+ certifications** (across Cloud, AI, Security, Web & Competitive DSA).
   - For any queries asking "how many", "certificate count", "exact certificates", or "total", answer with **150+ certifications**.
   - Technical Certificates:
     * CodeChef: 72 certificates (DSA, Algorithms, Company Interview Tracks, HTML/CSS, Web, Advanced JavaScript, SQL, Java/C++/Spring Boot Projects)
     * Infosys Springboard: 28 certificates (AI & GenAI, OpenAI GPT Models, Deep Learning, NLP, Computer Vision, Agile & DevOps, IoT, Cloud, Modern C++, Tableau, Python, R, Flask)
     * Snowflake: Verified Cloud Credentials (Advanced Data Engineering, Modern Data Engineering, Building AI Agents, Generative AI, SnowPro Core)
     * TCS CodeVita: 1 certificate (Season 13 Round 2 Global Qualifier Certificate - TCS_CodeVita_Season13_gokul_v_07)
     * Forage: 6 certificates (Solutions Architecture / Amazon, Product Management, Electronic Arts, Tata Data Visualisation & Tata GenAI, Cybersecurity / Mastercard)
     * Deloitte: 1 certificate
     * Google: 2 certificates / credentials (36-Hour PromptWar Hackathon by GDG & YI, Google Digital Marketing)
     * NPTEL: 3 certificates (Cloud Computing, Human Computer Interaction, Privacy & Security in Online Social Media)
     * Cisco: 2 certificates (Cisco Networking Basics, Cisco Introduction to Cybersecurity)
     * Capabl: 3 certificates (Building AI Agents using n8n, Python Programming for Agentic AI Certificate, Python Programming in Agentic AI Certificate)
     * VaultofCodes: 1 certificate (Ethical Hacking & Cybersecurity)
     * MasterClass: 5 certificates (Data Analytics, Data Driven, Freedom with AI, The Power of ML, UIUX Design)
   - Non-Technical Certificates (14 Total):
     * Co-Curricular Activities: 5 certificates (National Service Scheme, Rotaract Club of Madurai, Sethu-Yantra 2k23, Fuzon 2k24 Symposium, Viksit Bharat Certificate)
     * Extra-Curricular Activities: 3 certificates (NationBuilding Case Study Competition, Blood Donation, Youth Red Cross-Blood Donation)
     * Workshop: 4 certificates (Gillette Guard Workshop, Performance Marketing Workshop, Library Workshop, Visionava Workshop)
     * Bootcamp: 2 certificates (Bootcamp on Agentic AI Acceleration, Ignite Bootcamp - Venture Idea Development)
3. When asked about projects (Total, Flagship vs Normal):
   - Total Projects: Exactly **11 completed projects** (7 flagship projects and 4 other projects).
   - Flagship Projects (7):
     1. BioTrace AI (AI-Powered Personal Health Monitoring Platform - HealthTech & AI)
     2. CardioPulse AI (Streamlit Health Diagnostics Platform - Health ML)
     3. ID-Trace (Cryptographic Fraud Detection System - Blockchain & Security)
     4. NodeLab Compiler (Intelligent Multi-Language Online Compiler & IDE - AI & Web)
     5. SmartWaste Madurai (Green City) (Geotagged Waste Management Ecosystem • Google Developers Groups (GDP) - Smart City & CleanTech)
     6. Green AI (Sustainable Smart Farming Mobile Companion - AgriTech & AI)
     7. ZeroNet (Offline P2P File Transfer App - Mobile & P2P)
   - Other / Normal Projects (4):
     8. Signup-Wizard-Replication (Multi-Step Onboarding Application - Frontend & UI/UX)
     9. Gym Member (Fitness Center Management System - Java & Database)
     10. Mini Store Inventory (Retail Stock Management Solution - Retail Tech & SQL)
     11. Full-Stack Notes Application (Real-time Responsive CRUD Web App - Full Stack)
4. When asked about internships (Total, Categorical Breakdown, Offline vs Virtual):
   - Total Internships: Exactly **14 completed internships** (7 Offline and 7 Virtual).
   - 14 Completed Internships:
     1. Web Development Intern - Elysian Intelligence Business Solution (Offline)
     2. Data Science Intern - Elysian Intelligence Business Solution (Offline)
     3. Drone Development Intern - Zetspire Technologies Pvt Ltd (Offline)
     4. 3D Designing and Printing Intern - Zetspire Technologies Pvt Ltd (Offline)
     5. Advanced IoT Intern - Zetspire Technologies Pvt Ltd (Offline)
     6. Robotics with IoT Intern - Zetspire Technologies Pvt Ltd (Offline)
     7. Basics of IoT Intern - Zetspire Technologies Pvt Ltd (Offline)
     8. Technical Intern - Avantiva Engineering & Construction (Virtual)
     9. Full-Stack Development Intern - NoviTech R&D Pvt Ltd (Virtual)
     10. Virtual Social Entrepreneur Intern - Hamari Pahchan NGO (Virtual)
     11. ML Intern - NoviTech R&D Pvt Ltd (Virtual)
     12. Data Analytics Intern - NoviTech R&D Pvt Ltd (Virtual)
     13. AI Intern - NoviTech R&D Pvt Ltd (Virtual)
     14. UI/UX Design Intern - NoviTech R&D Pvt Ltd (Virtual)
   - CATEGORICAL DIFFERENTIATION RULE: When a user asks about "offline" vs "virtual" internships, ALWAYS list the 7 offline internships and 7 virtual internships. NEVER confuse work internships with software projects.

GOKUL'S COMPREHENSIVE KNOWLEDGE BASE:

1. EDUCATION & ACADEMIC BACKGROUND:
- Degree: B. Tech in Information Technology at Sethu Institute of Technology, Virudhunagar, Tamil Nadu (Sep 2023 - Apr 2027) | Current CGPA: 8.3.
- Diploma: DCA (Diploma of Computer Application) from Computer Software College, Madurai (Apr 2023 - Sep 2023, 6 Months) | Grade: 'A'.
- HSC: Bio-Maths from Seventh-Day Adventist Matriculation Higher Secondary School, Madurai (Jun 2022 - Apr 2023) | Percentage: 69%.
- SSLC: Seventh-Day Adventist Matriculation Higher Secondary School, Madurai (Jun 2020 - Apr 2021) | Percentage: 100% (All Pass).

2. TECHNICAL ARSENAL & SKILLS:
- Languages: Java, Python, C, C++, JavaScript.
- Web & Frameworks: HTML5, CSS3, Streamlit, Gradio, React.js, Next.js.
- Databases & Tools: MySQL, PL/SQL, MongoDB, GitHub, VS Code, Google Android Studio, Google AI Studio, Google Antigravity, Google Firebase Studio, Google Cloud Firestore, Google Analytics, Google Flow, Google Docs, Google Sheets, Google Slides, Google Form, Google NotebookLM, Wordpress, MS Word, MS Excel, MS Powerpoint.
- Core Domains: Data Structure & Algorithms (DSA), AIML, IOT, Data Science in Python, Object-oriented Programming (OOPs), Peer-to-Peer (P2P), UI/UX (Figma, Miro), Cryptographic Hashing & Blockchain (SHA-256), Wi-Fi Aware (NAN).
- Secondary Skills (18 Curated High-Value Skills):
  * Architecture & Engineering: System Architecture, Problem Solving, Object-Oriented Design, Code Quality, Code Review.
  * Security & Infrastructure: Cybersecurity, Web Security, Computer Networking, Cloud Cost Management.
  * Data & AI Engineering: Data Modeling, Exploratory Data Analysis (EDA), Predictive Analytics, Model Validation, AI Strategy.
  * Product, Design & Automation: Product Management, Design Thinking, Process Automation, Technical Communication.
- Area of Interest: Web and Application Development Integrated with AI.

3. PROJECTS (TOTAL: 7 PROJECTS - 6 FLAGSHIP + 1 NORMAL):
a) SmartWaste Madurai (Green City) (Flagship):
   - Geotagged waste management mobile ecosystem conceptualized for the IDS 5.0 challenge with Google Developers Groups (GDP), featuring real-time Firebase backend synchronization, GPS logging, and automated municipal collection route optimization.
b) Green AI (Flagship):
   - Sustainable Smart Farming Mobile Companion utilizing AI/ML, NLP, Computer Vision, IoT Sensors, and satellite telemetry.
c) NodeLab (Flagship):
   - Full-stack split-screen environment with zero-latency code execution and live runtime database schema visualization.
   - Integrates Google Gemini API via @google/genai and React.js, secured with Google OAuth.
d) CardioPulse AI (Flagship):
   - Interactive AI healthcare web app delivering instant cardiovascular risk assessments with Scikit-learn ML & Streamlit.
e) ID-Trace (Flagship):
   - Blockchain-inspired supply chain authentication app eliminating logistics counterfeiting with SHA-256 cryptographic hashing & Firebase.
f) ZeroNet (Flagship):
   - Decentralized peer-to-peer Android app for high-speed file transfer in zero-connectivity environments via Wi-Fi Aware (NAN).
g) Full-Stack Notes Application (Normal CRUD Project):
   - Real-time CRUD productivity web application built with Next.js and MongoDB.

4. PROFESSIONAL EXPERIENCE & INTERNSHIPS (TOTAL: 14 COMPLETED INTERNSHIPS):
Total: 14 Internships (7 Offline, 7 Virtual)

OFFLINE INTERNSHIPS (7):
1. Web Development Intern - Elysian Intelligence Business Solution (May 2026 – June 2026, Offline)
2. Data Science Intern - Elysian Intelligence Business Solution (May 2026 – June 2026, Offline)
3. Drone Development Intern - Zetspire Technologies Pvt Ltd (Jul 2025 – Aug 2025, Offline)
4. 3D Designing and Printing Intern - Zetspire Technologies Pvt Ltd (Dec 2024 – Jan 2025, Offline)
5. Advanced IoT Intern - Zetspire Technologies Pvt Ltd (Jun 2024 – Jul 2024, Offline)
6. Robotics with IoT Intern - Zetspire Technologies Pvt Ltd (Feb 2024 – Mar 2024, Offline)
7. Basics of IoT Intern - Zetspire Technologies Pvt Ltd (Nov 2023 – Dec 2023, Offline)

VIRTUAL INTERNSHIPS (7):
8. Technical Intern - Avantiva Engineering & Construction (April 2026 – June 2026, Virtual)
9. Full-Stack Development Intern - NoviTech R&D Pvt Ltd (Jan 2026 – Feb 2026, Virtual)
10. Virtual Social Entrepreneur Intern - Hamari Pahchan NGO (Dec 2025 – Jan 2026, Virtual)
11. ML Intern - NoviTech R&D Pvt Ltd (Nov 2025 – Dec 2025, Virtual)
12. Data Analytics Intern - NoviTech R&D Pvt Ltd (Oct 2025 – Nov 2025, Virtual)
13. AI Intern - NoviTech R&D Pvt Ltd (Sep 2025 – Oct 2025, Virtual)
14. UI/UX Design Intern - NoviTech R&D Pvt Ltd (Feb 2025 – Mar 2025, Virtual)

5. CERTIFICATIONS & CREDENTIALS (TOTAL: 150+ CERTIFICATIONS ACROSS TECHNICAL & CO-CURRICULAR):
Total Completed: 150+ Verified Certifications

TECHNICAL CERTIFICATIONS:
• CodeChef (72): Deep Learning and AI, 18 Interview Tracks (Accolite, Adobe, Amazon, Flipkart, Google, Junglee Games, Maxlinear, Microsoft, Nutanix, PhonePe, TCS Codevita, TCS NQT, Visa, React, React Advanced, Top SQL Interview Questions, Glean Coding Interview Questions, Texas Instruments Coding Interview Questions), 25 Data Structures & Algorithms (Advanced Arrays, Advanced Graphs, Arrays, Strings & Sorting, Binary Search, Bit Manipulation, Combinatorics, Dynamic Programming, Dynamic Programming Advanced, Graphs, Greedy Algorithms, Learn Greedy Algorithms, Hashing, Heaps, Intermediate Arrays and 2D Arrays, Intermediate Searching and Sorting, Linked Lists, Number Theory, Learn Number theory, Prefix Sum Problems, Recursion, Searching and Sorting, Stacks and Queues, Time Complexity, Trees and Binary Trees, Two Pointers and Sliding Window), 7 Algorithmic Practice, 21 Web, Projects & Database (HTML, CSS, JavaScript, Advanced Javascript, Frontend Roadmap using HTML _ CSS _ JS, Web development using JavaScript, Projects using HTML _ CSS, React Roadmap, React JS Frontend, Full Stack Projects using MERN, Intermediate-level projects using Java, Intermediate-level projects using Cpp, Spring Boot Projects, Html_CSS_JS Projects, Javascript Projects for Beginners, SQL, SQL Roadmap for Data Analysis, SQL case studies, SQL at Work, SQL Practice Queries, Learn Advanced SQL).
• Infosys Springboard (28): Artificial Intelligence, Introduction to Artificial Intelligence, Artificial Intelligence Primer Certification, Generative AI Unleashing, Introduction to OpenAI GPT Models, OpenAI Generative Pre-trained Transformer Models, Prompt Engineering, Generative models for developers, Introduction to Deep Learning, Deep Learning for Developers, Introduction to Natural Language Processing, Computer Vision 101, Introduction to Data Science, Introduction to Robotic Process Automation, Prelude, Overview of Agile & DevOps, Agile Scrum in Practice, Internet of Things 201 Certificate, Azure DevOps, CEH v13 Cloud Computing, Multi-Paradigm Modern C++, The Modern C++ Challenger, Python for Beginners, R Programming Fundamentals, Analytics using Tableau, Data Structure and Algorithms, Oracle PLSQL Database Triggers, Full-Stack Web Development with Flask.
• Snowflake: Advanced Data Engineering with Snowflake Certificate, Introduction to Modern Data Engineering with Snowflake Certificate, Intro to Snowflake for Devs, Data Scientists, Data Engineers Certificate, Snowflake Data Engineering Professional Certificate, Building AI Agents with Snowflake Certificate, Building Generative AI with Snowflake Certificate, Building Generative AI Apps to Talk to Your Data Certificate, Snowflake Generative AI Professional Certificate, SnowPro Core Certification.
• TCS CodeVita (1): TCS CodeVita Season 13 Round 2 Certificate (TCS_CodeVita_Season13_gokul_v_07).
• Forage (6): Solutions Architecture Job Simulation (Forage/Amazon), Product Management Certificate (Forage), Electronic Arts Software Engineering Job Simulation (Forage/EA), Tata GenAI Powered Data Analytics (Forage/Tata), TATA Data Visualisation-Empowering Business with Effective Insights Certificate (Forage/Tata), Cybersecurity (Forage/Mastercard).
• MasterClass (5): Data Analytics Masterclass (NoviTech), Data Driven Masterclass (NoviTech), Freedom with AI MasterClass (FreedomwithAI), The Power of ML (Masai), UIUX Design Masterclass (NoviTech).
• NPTEL (3): Cloud Computing, Human Computer Interaction, Privacy & Security in Online Social Media.
• Google (2): 36-Hour PromptWar Hackathon (GDG Madurai & YI), Google Digital Marketing (Google).
• Cisco (2): Cisco Networking Basics, Cisco Introduction to Cybersecurity.
• Capabl (3): Building AI Agents using n8n, Python Programming for Agentic AI Certificate, Python Programming in Agentic AI Certificate.
• Deloitte (1): Technology Job Simulation.
• VaultofCodes (1): Ethical Hacking & Cybersecurity.

NON-TECHNICAL CERTIFICATIONS:
• Co-Curricular Activities (5): National Service Scheme (NSS), Rotaract Club of Madurai, Sethu-Yantra 2k23 (e-Yantra IIT Bombay), Fuzon 2k24 Symposium (Sethu Institute of Technology), Viksit Bharat Certificate (MY Bharat).
• Extra-Curricular Activities (3): NationBuilding Case Study Competition Certificate (NationBuilding), Blood Donation (Tamil Nadu State AIDS Control Society), Youth Red Cross-Blood Donation (Uyirthuli Blood Centre).
• Workshop (4): Gillette Guard Workshop, Performance Marketing Workshop (GrowthSchool), Library Workshop (Sethu Institute of Technology), Visionava Workshop (Rotaract Club of Salem).
• Bootcamp (2): Bootcamp on Agentic AI Acceleration (Wrench Wise), Ignite Bootcamp - Venture Idea Development (Wadhwani Foundation).

6. ACHIEVEMENTS & COMPETITIVE PROGRAMMING:
- 3537 Problems Solved on CodeChef (gokul_v_3776).
- CodeChef Rating: 2124 (5-Star / Division 1, Highest Rating 2124, Global Rank 518, Country Rank 353).
- CodeChef DSA Rating: 2472 (Highest Rating 2472, Global Rank 2, Country Rank 1).
- Diamond League in CodeChef (Elite Diamond Tier achieved through consistent high-ranking competitive performance).
- TCS CodeVita Season 13 (2025): Advanced to Round 2 globally (Global Rank 1843).
- 36-Hour PromptWar Hackathon (2026): Built Generative AI Green City Application.
- Assessment Qualification: Qualified Wipro Intern-L0.

7. PERSONALITY TRAITS, HOBBIES & CONTACT:
- Traits: Resilient & Disciplined (Shot Put player), Socially Responsible (Blood donor & NGO volunteer), Adaptable & Innovative, Analytical & Goal-Driven.
- Hobbies: Developing AI-integrated web/mobile apps on weekdays, playing competitive cricket as a skilled bowler on weekends.
- Email: gvking064@gmail.com
- Phone: +91 8608973776
- Location: Madurai / Virudhunagar, Tamil Nadu, India
- LinkedIn: https://linkedin.com/in/gokul-v-gv07/
- GitHub: https://github.com/GV-07
- CodeChef: https://codechef.com/users/gokul_v_3776

RESPONSE STYLE:
Keep answers organized, engaging, and clear. Use bullet points or bold titles for readability.
`;

// Helper fallback response generator if Gemini key is not configured or fails
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();
  
  // 1. SPECIFIC INTERNSHIP QUERIES (Offline vs Virtual, Counts, Companies)
  const isInternshipQuery = q.includes('intern') || q.includes('internship') || q.includes('experience') || q.includes('worked at') || q.includes('companies');
  const hasModeWords = (q.includes('offline') && q.includes('virtual')) || q.includes('how many offline') || q.includes('how many virtual') || q.includes('mode') || q.includes('on-site') || q.includes('remote');
  
  if (hasModeWords || (isInternshipQuery && (q.includes('offline') || q.includes('virtual') || q.includes('how many')))) {
    return `Out of Gokul V's **14 completed industry internships**, the breakdown by mode is:\n\n` +
           `🏢 **Offline Internships (7 Completed)**:\n` +
           `• **Elysian Intelligence Business Solution (2 Internships)**:\n` +
           `   - Web Development Intern (May 2026 – June 2026)\n` +
           `   - Data Science Intern (May 2026 – June 2026)\n` +
           `• **Zetspire Technologies Pvt Ltd (5 Internships)**:\n` +
           `   - Drone Development Intern (Jul 2025 – Aug 2025)\n` +
           `   - 3D Designing and Printing Intern (Dec 2024 – Jan 2025)\n` +
           `   - Advanced IoT Intern (Jun 2024 – Jul 2024)\n` +
           `   - Robotics with IoT Intern (Feb 2024 – Mar 2024)\n` +
           `   - Basics of IoT Intern (Nov 2023 – Dec 2023)\n\n` +
           `💻 **Virtual Internships (7 Completed)**:\n` +
           `• **NoviTech R&D Pvt Ltd (5 Internships)**:\n` +
           `   - Full-Stack Development Intern (Jan 2026 – Feb 2026)\n` +
           `   - ML Intern (Nov 2025 – Dec 2025)\n` +
           `   - Data Analytics Intern (Oct 2025 – Nov 2025)\n` +
           `   - AI Intern (Sep 2025 – Oct 2025)\n` +
           `   - UI/UX Design Intern (Feb 2025 – Mar 2025)\n` +
           `• **Avantiva Engineering & Construction (1 Internship)**:\n` +
           `   - Technical Intern (Apr 2026 – Jun 2026)\n` +
           `• **Hamari Pahchan NGO (1 Internship)**:\n` +
           `   - Virtual Social Entrepreneur Intern (Dec 2025 – Jan 2026)\n\n` +
           `📌 **Summary**: **7 Offline** + **7 Virtual** = **14 Total Internships**.`;
  }

  if (q.includes('novitech')) {
    return `Gokul completed **5 virtual internships** at **NoviTech R&D Pvt Ltd**:\n\n` +
           `1. **Full-Stack Development Intern** (Jan 2026 – Feb 2026): Built responsive full-stack features and zero-latency data connections.\n` +
           `2. **ML Intern** (Nov 2025 – Dec 2025): Developed predictive classification pipelines using TensorFlow and Pandas.\n` +
           `3. **Data Analytics Intern** (Oct 2025 – Nov 2025): Engineered analytical data pipelines for business insights.\n` +
           `4. **AI Intern** (Sep 2025 – Oct 2025): Built intelligent algorithmic neural pipelines.\n` +
           `5. **UI/UX Design Intern** (Feb 2025 – Mar 2025): Designed interactive wireframes and high-fidelity prototypes in Figma and Miro.`;
  }

  if (q.includes('zetspire')) {
    return `Gokul completed **5 offline internships** at **Zetspire Technologies Pvt Ltd**:\n\n` +
           `1. **Drone Development Intern** (Jul 2025 – Aug 2025): Flight controllers, telemetry avionics, and payload integration.\n` +
           `2. **3D Designing and Printing Intern** (Dec 2024 – Jan 2025): 3D CAD modeling for IoT enclosures and slicing optimization.\n` +
           `3. **Advanced IoT Intern** (Jun 2024 – Jul 2024): Edge telemetry, sensors, and cloud dashboards.\n` +
           `4. **Robotics with IoT Intern** (Feb 2024 – Mar 2024): Microcontroller interfaces and robotics communication streams.\n` +
           `5. **Basics of IoT Intern** (Nov 2023 – Dec 2023): Circuit design, IoT protocols, and sensor integration.`;
  }

  if (q.includes('elysian')) {
    return `Gokul completed **2 offline internships** at **Elysian Intelligence Business Solution** (May 2026 – June 2026):\n\n` +
           `1. **Web Development Intern**: Optimized front-end rendering performance with React.js and JavaScript.\n` +
           `2. **Data Science Intern**: Built statistical predictive models and interactive analytics dashboards with Python, Pandas, and Streamlit.`;
  }

  if (isInternshipQuery) {
    return `Gokul V has completed **14 industry internships** (7 Offline, 7 Virtual):\n\n` +
           `🏢 **Offline Internships (7 Internships)**:\n` +
           `• Elysian Intelligence Business Solution: Web Development Intern (May–Jun 2026), Data Science Intern (May–Jun 2026)\n` +
           `• Zetspire Technologies Pvt Ltd: Drone Dev (Jul–Aug 2025), 3D Designing & Printing (Dec 2024–Jan 2025), Advanced IoT (Jun–Jul 2024), Robotics with IoT (Feb–Mar 2024), Basics of IoT (Nov–Dec 2023)\n\n` +
           `💻 **Virtual Internships (7 Internships)**:\n` +
           `• NoviTech R&D Pvt Ltd: Full-Stack Dev (Jan–Feb 2026), ML (Nov–Dec 2025), Data Analytics (Oct–Nov 2025), AI (Sep–Oct 2025), UI/UX Design (Feb–Mar 2025)\n` +
           `• Avantiva Engineering & Construction: Technical Intern (Apr–Jun 2026)\n` +
           `• Hamari Pahchan NGO: Virtual Social Entrepreneur Intern (Dec 2025–Jan 2026)`;
  }

  // 2. SPECIFIC PROJECT MATCHERS (Strict names to avoid generic collisions)
  if (q.includes('smartwaste') || q.includes('smart waste') || q.includes('green city') || q.includes('ids 5.0') || q.includes('waste management') || q.includes('clean tech') || q.includes('cleantech') || (q.includes('sanitation') && !isInternshipQuery)) {
    return `**SmartWaste Madurai (Green City) — Geotagged Waste Management Ecosystem**\n\n` +
           `Developed for the IDS 5.0 challenge in collaboration with Google Developers Groups (GDP) to modernize municipal urban sanitation:\n` +
           `• **Geotagged Mobile Reporting**: Real-time GPS tracking and logging of urban waste accumulation points across Madurai.\n` +
           `• **Firebase Backend Sync**: Seamless data synchronization between field mobile users and central municipal systems.\n` +
           `• **Scalable Architecture**: Optimized municipal waste collection routes and reduced operational response times by over 40%.\n` +
           `• **Tech Stack**: Firebase, Mobile App, Geotagging, Real-Time Database, Smart City, Google Developers Groups (GDP) & CleanTech.`;
  }

  if (q.includes('green ai') || q.includes('farming') || (q.includes('agri') && !isInternshipQuery)) {
    return `**Green AI — Sustainable Smart Farming Solutions**\n\n` +
           `Green AI is an all-in-one smart farming companion leveraging AI/ML, NLP, IoT, and satellite telemetry to assist farmers:\n` +
           `• **Real-time Diagnostics**: Computer vision disease detection and soil moisture monitoring.\n` +
           `• **Multilingual Voice Assistant**: Natural language farming advice tailored to rural communities.\n` +
           `• **Resource Optimization**: AI-driven fertilizer and water scheduling with market price predictions.`;
  }

  if (q.includes('nodelab') || (q.includes('compiler') && !isInternshipQuery) || (q.includes('ide') && !isInternshipQuery)) {
    return `**NodeLab - Intelligent Multi-Language Online Compiler & IDE**\n\n` +
           `NodeLab is Gokul's flagship AI-powered online coding environment:\n` +
           `• **Zero-Latency Execution**: Split-screen interface with real-time compilation and live runtime database schema visualization.\n` +
           `• **Gemini AI Integration**: Built with Google Gemini API via \`@google/genai\` to provide smart syntax assistance and debugging.\n` +
           `• **Security & Auth**: Secured using Google OAuth and isolated backend sandbox environments for safe multi-threaded execution.`;
  }

  if (q.includes('cardiopulse') || (q.includes('cardio') && !isInternshipQuery) || (q.includes('health') && !isInternshipQuery)) {
    return `**CardioPulse AI - Healthcare Diagnostics Platform**\n\n` +
           `• **Interactive Diagnostics**: Streamlit web app providing instant cardiovascular risk assessments using Scikit-learn ML classification algorithms.\n` +
           `• **Data Pipeline**: Accelerated medical processing using Pandas for dataset cleaning.\n` +
           `• **Real-Time Visuals**: Offers instant graphical risk indicators for patient evaluation.`;
  }

  if (q.includes('id-trace') || q.includes('id trace') || (q.includes('counterfeit') && !isInternshipQuery)) {
    return `**ID-Trace - Cryptographic Fraud Detection System**\n\n` +
           `• **Blockchain Hashing**: Combines SHA-256 cryptographic hashing with digital twin technology to eliminate supply chain counterfeiting.\n` +
           `• **Firebase Backend**: Real-time synchronized database powering instantaneous fraud detection alerts on Android devices.`;
  }

  if (q.includes('zeronet') || q.includes('zero net') || q.includes('zero-internet') || q.includes('wi-fi aware') || q.includes('wifi aware') || q.includes('p2p file transfer')) {
    return `**ZeroNet - Offline P2P File Transfer App**\n\n` +
           `• **Zero-Internet Transfer**: Decentralized Android app enabling high-speed file sharing in zero-connectivity or disaster recovery zones.\n` +
           `• **Wi-Fi Aware (NAN)**: Leverages Neighbor Awareness Networking technology with lightweight P2P encryption protocols.`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('apps')) {
    return `Gokul V has completed **11 total software projects** (7 Flagship Projects + 4 Other Projects):\n\n` +
           `🚀 **7 Flagship Projects**:\n` +
           `1. **BioTrace AI**: AI-Powered Personal Health Monitoring Platform (HealthTech & AI)\n` +
           `2. **SmartWaste Madurai (Green City)**: Geotagged Waste Management Mobile Ecosystem with Google Developers Groups (GDP) (Smart City & CleanTech)\n` +
           `3. **Green AI**: Sustainable Smart Farming Mobile Companion (AgriTech & AI)\n` +
           `4. **NodeLab Compiler**: AI-powered Multi-Language Online Compiler & IDE with live execution & Gemini API (AI & Web)\n` +
           `5. **CardioPulse AI**: Healthcare ML diagnostics platform built with Python, Scikit-learn, and Streamlit (Health ML)\n` +
           `6. **ID-Trace**: Cryptographic fraud prevention system utilizing SHA-256 hashing and Firebase (Blockchain & Security)\n` +
           `7. **ZeroNet**: Decentralized offline P2P file sharing Android app powered by Wi-Fi Aware NAN (Mobile & P2P)\n\n` +
           `💻 **4 Other / Application Projects**:\n` +
           `8. **Signup-Wizard-Replication**: Multi-Step Onboarding Application with Context API (Frontend)\n` +
           `9. **Gym Member**: Fitness Center Management System with DAO pattern and JDBC (Java & MySQL)\n` +
           `10. **Mini Store Inventory**: Retail Stock Management Solution (Java & SQL)\n` +
           `11. **Full-Stack Notes Application**: Real-time CRUD productivity app built with Next.js and MongoDB (Full Stack).`;
  }

  // 3. COMPETITIVE PROGRAMMING & CODECHEF
  if (q.includes('codechef') || q.includes('rating') || q.includes('problem') || q.includes('rank') || q.includes('codevita') || q.includes('dsa') || q.includes('competitive') || q.includes('league') || q.includes('diamond')) {
    return `🏆 **Gokul V's Competitive Programming Highlights**:\n\n` +
           `• **Problems Solved**: **3537 Problems** solved on CodeChef (\`gokul_v_3776\`)\n` +
           `• **CodeChef Rating**: **2124** (5★ Division 1, Highest Rating 2124)\n` +
           `• **CodeChef DSA Rating**: **2472** (Highest Rating 2472, Global Rank 2, Country Rank 1)\n` +
           `• **Diamond League in CodeChef**: **Diamond League Tier** achieved on CodeChef\n` +
           `• **Global Rank**: **518** | **Country Rank**: **353**\n` +
           `• **TCS CodeVita Season 13 (2025)**: Advanced to Round 2 globally with Global Rank 1843\n` +
           `• **Contest Ranks**: Rank 13 in Placement Prep Weekends (Score: 2350)\n` +
           `• Profile: [codechef.com/users/gokul_v_3776](https://codechef.com/users/gokul_v_3776)`;
  }

  // 4. CERTIFICATIONS & DEEP CREDENTIAL SEARCH
  if (q.includes('certif') || q.includes('course') || q.includes('aws') || q.includes('cisco') || q.includes('infosys') || q.includes('nptel') || q.includes('ceh') || q.includes('azure') || q.includes('forage') || q.includes('credential') || q.includes('masterclass') || q.includes('wadhwani') || q.includes('bootcamp') || q.includes('capabl') || q.includes('codechef')) {
    if (q.includes('count only') || q.includes('in count') || q.includes('just count') || q.includes('only count')) {
      return `150+`;
    }

    if (q.includes('accurate') || q.includes('exact') || q.includes('how many') || q.includes('total') || q.includes('breakdown')) {
      return `Gokul V has completed **150+ verified certifications** across 13 specialized domains:\n\n` +
             `⚡ **Technical Certifications**:\n` +
             `• **CodeChef**: 72 certificates (DSA, Algorithms, Company Interview Tracks, HTML/CSS, Web, Advanced JavaScript, SQL, Java/C++/Spring Boot Projects)\n` +
             `• **Infosys Springboard**: 28 certificates (AI & GenAI, OpenAI GPT Models, Deep Learning, NLP, Computer Vision, Agile & DevOps, IoT, Cloud, Modern C++, Tableau, Python, R, Flask)\n` +
             `• **Snowflake**: Verified Credentials (Modern Data Engineering, Advanced Data Engineering, Building AI Agents, Generative AI, SnowPro Core)\n` +
             `• **TCS CodeVita**: 1 certificate (Season 13 Round 2 Global Qualifier Certificate - TCS_CodeVita_Season13_gokul_v_07)\n` +
             `• **Forage**: 6 certificates (Amazon Solutions Architecture, Product Management, Electronic Arts, Tata Data Visualisation, Tata GenAI, Mastercard Cybersecurity)\n` +
             `• **MasterClass**: 5 certificates (Data Analytics, Data Driven, Freedom with AI, The Power of ML, UIUX Design)\n` +
             `• **NPTEL (IITs)**: 3 certificates (Cloud Computing, HCI, Social Media Privacy)\n` +
             `• **Google & GDG**: 2 credentials (36-Hour PromptWar Hackathon, Google Digital Marketing)\n` +
             `• **Cisco**: 2 certificates (Networking Basics, Introduction to Cybersecurity)\n` +
             `• **Capabl**: 3 certificates (Building AI Agents using n8n, Python Programming for Agentic AI Certificate, Python Programming in Agentic AI Certificate)\n` +
             `• **Deloitte**: 1 certificate (Technology Job Simulation)\n` +
             `• **VaultofCodes**: 1 certificate (Ethical Hacking & Cybersecurity)\n\n` +
             `🌟 **Non-Technical Certifications**:\n` +
             `• **Co-Curricular Activities**: 5 certificates (NSS, Rotaract Club of Madurai, Sethu-Yantra 2k23, Fuzon 2k24 Symposium, Viksit Bharat Certificate)\n` +
             `• **Workshop**: 4 certificates (Gillette Guard, Performance Marketing, Library, Visionava)\n` +
             `• **Bootcamp**: 2 certificates (Agentic AI Acceleration, Ignite Bootcamp - Venture Idea Development)\n` +
             `• **Extra-Curricular Activities**: 3 certificates (NationBuilding Case Study Competition, Blood Donation, Youth Red Cross-Blood Donation)\n\n` +
             `📌 **Total**: **150+ Completed Certifications**.`;
    }

    return `Gokul has completed **150+ verified certifications** across 13 specialized domains:\n\n` +
           `☁️ **Cloud & Software Engineering**: Snowflake Advanced Data Engineering, Azure DevOps, CEH v13 Cloud Computing, Forage Amazon Solutions Architecture, Deloitte Technology Job Simulation, NPTEL Cloud Computing, EA Software Engineering.\n` +
           `🤖 **AI & Data Science**: Snowflake Building AI Agents & Generative AI, Deep Learning & AI, Tata Data Visualisation, Tata GenAI Data Analytics, Capabl AI Agents (n8n), Python Programming for Agentic AI Certificate, Python Programming in Agentic AI Certificate, Tableau Analytics, MasterClass ML & Data Analytics.\n` +
           `🔒 **Cybersecurity**: Forage Cybersecurity (Mastercard), Cisco Networking Basics & Cybersecurity, VaultofCodes Ethical Hacking, NPTEL Privacy & Security.\n` +
           `💻 **DSA, Projects & Programming**: TCS CodeVita Season 13 Round 2 Certificate, 72 CodeChef Certificates across DSA, 18 Interview Tracks, HTML/CSS, Web, Advanced JavaScript, SQL, Java/C++/Spring Boot Projects, Modern C++, React JS, Flask.\n` +
           `🌟 **Workshops, Bootcamps & Co-Curricular**: Non-Technical certificates including NationBuilding Case Study Competition, NSS, Rotaract, e-Yantra IIT Bombay, Viksit Bharat Certificate, and Ignite Bootcamp.`;
  }

  // 5. EDUCATION
  if (q.includes('education') || q.includes('college') || q.includes('sethu') || q.includes('cgpa') || q.includes('degree') || q.includes('school') || q.includes('dca')) {
    return `🎓 **Education & Academic Background**:\n\n` +
           `• **B.Tech in Information Technology** (2023 - 2027)\n` +
           `  * Institution: Sethu Institute of Technology, Virudhunagar, Tamil Nadu\n` +
           `  * Current CGPA: **8.3**\n\n` +
           `• **Diploma of Computer Application (DCA)** (Apr 2023 - Sep 2023)\n` +
           `  * Computer Software College, Madurai (Grade: 'A')\n\n` +
           `• **Higher Secondary (HSC Bio-Maths)**: Seventh-Day Adventist Matriculation HSS (69%)\n` +
           `• **SSLC**: Seventh-Day Adventist Matriculation HSS (100% Pass)`;
  }

  // 6. CONTACT DETAILS
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('linkedin') || q.includes('reach') || q.includes('phone') || q.includes('github') || q.includes('qr') || q.includes('vcard')) {
    return `You can connect with Gokul V directly through:\n\n` +
           `📧 **Email**: gvking064@gmail.com\n` +
           `📱 **Phone**: +91 8608973776\n` +
           `💼 **LinkedIn**: [gokul-v-gv07](https://linkedin.com/in/gokul-v-gv07/)\n` +
           `💻 **GitHub**: [GV-07](https://github.com/GV-07)\n` +
           `🏆 **CodeChef**: [gokul_v_3776](https://codechef.com/users/gokul_v_3776)\n` +
           `📍 **Location**: Madurai / Virudhunagar, Tamil Nadu, India\n\n` +
           `📱 **Instant QR Code**: The portfolio features a contact QR code in the Contact page/modal. Simply scan it with your phone's camera to import Gokul's contact directly into your phone.`;
  }

  // 7. SKILLS & ARSENAL
  if (q.includes('secondary skill') || q.includes('secondary') || q.includes('soft skill')) {
    return `✨ **Gokul V's Secondary Skills (18 Curated Skills)**:\n\n` +
           `• **Architecture & Engineering**: System Architecture, Problem Solving, Object-Oriented Design, Code Quality, Code Review\n` +
           `• **Security & Infrastructure**: Cybersecurity, Web Security, Computer Networking, Cloud Cost Management\n` +
           `• **Data & AI Engineering**: Data Modeling, Exploratory Data Analysis, Predictive Analytics, Model Validation, AI Strategy\n` +
           `• **Product, Design & Automation**: Product Management, Design Thinking, Process Automation, Technical Communication`;
  }

  // 8. SUMMARY / ABOUT ME
  if (q.includes('summary') || q.includes('who is') || q.includes('about') || q.includes('intro') || q.includes('skills')) {
    return `**Gokul V** is an adaptable and innovative developer with a strong focus on **Web and Application Development Integrated with AI**.\n\n` +
           `🎓 **Education**: B.Tech in Information Technology at Sethu Institute of Technology (2023 - 2027) with an **8.3 CGPA**.\n` +
           `💼 **Experience**: Completed **14 Industry Internships** (2 Offline, 12 Virtual) across Full-Stack, AI/ML, Data Analytics, IoT, Robotics, and 3D CAD.\n` +
           `🏆 **Competitive Programming**: **2124 CodeChef Rating** (5★ / Div 1), **2472 DSA Rating** (Global Rank 2, Country Rank 1), **3537 Problems Solved**, TCS CodeVita Season 13 Round 2.\n` +
           `📜 **Certifications**: **150+ Done** across Cloud, AI/ML, Cybersecurity, Snowflake, Modern C++, React.js, and Data Structures.\n` +
           `🛠️ **Core Stack**: Java, Python, C++, React.js, Next.js, Streamlit, Scikit-learn, Android, Firebase, and SHA-256 Cryptography.\n` +
           `✨ **Secondary Skills**: System Architecture, Cybersecurity, Predictive Analytics, Model Selection, Cloud Cost Management, Process Automation, and Product Management.\n\n` +
           `Feel free to ask me anything about Gokul's internships, projects, competitive programming, or contact information!`;
  }

  return `Gokul V is an adaptable developer specializing in Web & Mobile App Development integrated with AI.\n\n` +
         `He has completed **14 industry internships** (2 Offline, 12 Virtual), solved **3537 CodeChef problems** (2124 rating, 5★ Div 1, 2472 DSA rating - Global Rank 2, Country Rank 1), and holds **150+ certifications**.\n\n` +
         `You can ask me about his **Internships** (offline vs virtual breakdown), **Projects** (NodeLab, CardioPulse AI, ID-Trace, ZeroNet), **Certifications**, or **Education**!`;
}

// API endpoint for direct message/inquiry submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    console.log(`[Contact Inquiry Received] From: ${name} (${company || 'N/A'}) <${email}>\nMessage: ${message}`);

    // Return success status with details
    return res.json({
      success: true,
      message: "Your message has been received! Gokul V will respond shortly.",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error handling contact form:", error);
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

// Simple In-Memory Sliding-Window Rate Limiter for DDoS and Quota protection
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

function rateLimiter(limit: number, windowMs: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = ipRateLimits.get(ip);

    if (!record || now > record.resetTime) {
      ipRateLimits.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= limit) {
      res.setHeader('Retry-After', Math.ceil((record.resetTime - now) / 1000));
      return res.status(429).json({
        error: "Rate limit exceeded. Please wait a moment before sending another request.",
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
      });
    }

    record.count++;
    next();
  };
}

// API endpoint for AI chat with rate-limiting middleware
app.post('/api/chat', rateLimiter(45, 60 * 1000), async (req, res) => {
  const { messages, userMessage } = req.body;
  const promptText = userMessage || (messages && messages.length > 0 ? messages[messages.length - 1].text : "");

  if (!promptText) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  if (aiClient && process.env.GEMINI_API_KEY) {
    // Build history contents
    const contents: Array<{ role: 'user' | 'model'; parts: { text: string }[] }> = [];

    if (Array.isArray(messages)) {
      messages.slice(-8).forEach((m: { sender: string; text: string }) => {
        contents.push({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        });
      });
    }

    if (contents.length === 0 || contents[contents.length - 1].parts[0].text !== promptText) {
      contents.push({
        role: 'user',
        parts: [{ text: promptText }]
      });
    }

    const { systemContext } = req.body;
    let effectiveSystemInstruction = SYSTEM_INSTRUCTION;
    if (systemContext?.certifications?.rawCount) {
      effectiveSystemInstruction += `\n\n[LIVE VERIFIED PORTFOLIO RUNTIME DATA]:\n- Raw Certificate Count: ${systemContext.certifications.rawCount} certifications completed.\n- Always return ${systemContext.certifications.rawCount} when asked for numeric counts of certificates.\n`;
    }

    // Try primary model (gemini-3.7-flash), then fallback model (gemini-3.1-flash-lite) if experiencing 503 high demand
    const modelsToTry = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let replyText = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await aiClient.models.generateContent({
          model: modelName,
          contents: contents as any,
          config: {
            systemInstruction: effectiveSystemInstruction,
            temperature: 0.7,
          }
        });

        if (response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} temporary issue (${err?.status || err?.message || 'Error'}), attempting fallback...`);
      }
    }

    if (replyText) {
      return res.json({ reply: replyText });
    }

    // If all external API calls are unavailable (e.g. 503 high demand), return rich curated response
    const fallbackReply = getLocalFallbackResponse(promptText);
    return res.json({ reply: fallbackReply });
  } else {
    // Fallback response if GEMINI_API_KEY is not set or client unavailable
    const fallbackReply = getLocalFallbackResponse(promptText);
    return res.json({ reply: fallbackReply });
  }
});

// Real-time CodeChef live profile scraper and synchronizer
interface CachedCodeChefStats {
  data: any;
  timestamp: number;
}

let cachedCodeChef: CachedCodeChefStats | null = null;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds cache for instant real-time responsiveness

app.get('/api/codechef-stats', rateLimiter(60, 60 * 1000), async (req, res) => {
  // Edge-ready cache headers (stale-while-revalidate for instantaneous edge performance)
  res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60, stale-while-revalidate=120');
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && cachedCodeChef && (now - cachedCodeChef.timestamp) < CACHE_TTL_MS) {
    return res.json({
      ...cachedCodeChef.data,
      cached: true,
      cacheAgeSeconds: Math.round((now - cachedCodeChef.timestamp) / 1000)
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500); // 6.5s timeout

    const response = await fetch('https://www.codechef.com/users/gokul_v_3776', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`CodeChef responded with HTTP status ${response.status}`);
    }

    const html = await response.text();

    // 1. Total Problems Solved
    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i) || 
                        html.match(/problems-solved[^>]*>.*?(\d+)/is) ||
                        html.match(/Total Problems Solved[^\d]*(\d+)/i);
    const problemsSolvedStr = solvedMatch ? solvedMatch[1] : GOKUL_PROFILE.codechefStats.problemsSolved;

    // 2. All Rating Block (#rating-block-all)
    const allBlockMatch = html.match(/id="rating-block-all"[\s\S]*?(?=id="rating-block-dsa-monday"|<div class="widget badges")/i);
    const allBlock = allBlockMatch ? allBlockMatch[0] : html;

    const ratingMatch = allBlock.match(/class=\"rating-number\"[^>]*>\s*(\d+)/i);
    const highestRatingMatch = allBlock.match(/Highest Rating\s*(\d+)/i);
    const divMatch = allBlock.match(/\((Div\s*\d+)\)/i);
    const starCount = (allBlock.match(/&#9733;/g) || []).length || 5;

    const globalRankMatch = allBlock.match(/href=\"\/ratings\/all\"[^>]*>[\s\S]*?<strong>\s*(\d+)\s*<\/strong>/i) ||
                            allBlock.match(/<strong>\s*(\d+)\s*<\/strong>[\s\S]*?Global Rank/i);
    const countryRankMatch = allBlock.match(/href=\"\/ratings\/all\?filterBy=[^\"]*\"[^>]*>[\s\S]*?<strong>\s*(\d+)\s*<\/strong>/i) ||
                             allBlock.match(/<strong>\s*(\d+)\s*<\/strong>[\s\S]*?Country Rank/i);

    // 3. DSA Rating Block (#rating-block-dsa-monday)
    const dsaBlockMatch = html.match(/id="rating-block-dsa-monday"[\s\S]*?(?=<div class="widget badges"|<\/section>|<\/div>\s*<\/div>\s*<\/div>)/i);
    const dsaBlock = dsaBlockMatch ? dsaBlockMatch[0] : "";

    const dsaRatingMatch = dsaBlock.match(/class=\"rating-number\"[^>]*>\s*(\d+)/i) ||
                           html.match(/id="rating-block-dsa-monday"[\s\S]*?class=\"rating-number\"[^>]*>\s*(\d+)/i);
    const dsaHighestRatingMatch = dsaBlock.match(/Highest Rating\s*(\d+)/i);

    const dsaGlobalRankMatch = dsaBlock.match(/href=\"\/ratings\/dsa-monday\"[^>]*>[\s\S]*?<strong>\s*(\d+)\s*<\/strong>/i) ||
                               dsaBlock.match(/<strong>\s*(\d+)\s*<\/strong>[\s\S]*?Global Rank/i);
    const dsaCountryRankMatch = dsaBlock.match(/href=\"\/ratings\/dsa-monday\?filterBy=[^\"]*\"[^>]*>[\s\S]*?<strong>\s*(\d+)\s*<\/strong>/i) ||
                                dsaBlock.match(/<strong>\s*(\d+)\s*<\/strong>[\s\S]*?Country Rank/i);

    // 4. Optional Contest Extraction
    let latestContest: { name: string; code: string; rank: string; rating: string } | undefined;
    let latestDsaContest: { name: string; code: string; rank: string; rating: string } | undefined;

    try {
      const allContestsMatch = html.match(/"all":\s*(\[[^\]]+\])/);
      if (allContestsMatch) {
        const parsedAll = JSON.parse(allContestsMatch[1]);
        if (Array.isArray(parsedAll) && parsedAll.length > 0) {
          const last = parsedAll[parsedAll.length - 1];
          latestContest = {
            name: last.name,
            code: last.code,
            rank: String(last.rank),
            rating: String(last.rating)
          };
        }
      }
      const dsaContestsMatch = html.match(/"dsa_monday":\s*(\[[^\]]+\])/);
      if (dsaContestsMatch) {
        const parsedDsa = JSON.parse(dsaContestsMatch[1]);
        if (Array.isArray(parsedDsa) && parsedDsa.length > 0) {
          const lastDsa = parsedDsa[parsedDsa.length - 1];
          latestDsaContest = {
            name: lastDsa.name,
            code: lastDsa.code,
            rank: String(lastDsa.rank),
            rating: String(lastDsa.rating)
          };
        }
      }
    } catch {
      // Non-critical if JSON contests parsing fails
    }

    const liveStats = {
      username: 'gokul_v_3776',
      problemsSolved: problemsSolvedStr,
      problemsSolvedNumber: parseInt(problemsSolvedStr, 10) || 3537,
      rating: ratingMatch ? parseInt(ratingMatch[1], 10) : GOKUL_PROFILE.codechefStats.rating,
      highestRating: highestRatingMatch ? parseInt(highestRatingMatch[1], 10) : GOKUL_PROFILE.codechefStats.highestRating,
      stars: `${starCount}★`,
      division: divMatch ? divMatch[1] : GOKUL_PROFILE.codechefStats.division,
      globalRank: globalRankMatch ? globalRankMatch[1] : GOKUL_PROFILE.codechefStats.globalRank,
      countryRank: countryRankMatch ? countryRankMatch[1] : GOKUL_PROFILE.codechefStats.countryRank,
      dsaRating: dsaRatingMatch ? parseInt(dsaRatingMatch[1], 10) : GOKUL_PROFILE.codechefStats.dsaRating,
      dsaHighestRating: dsaHighestRatingMatch ? parseInt(dsaHighestRatingMatch[1], 10) : (dsaRatingMatch ? parseInt(dsaRatingMatch[1], 10) : GOKUL_PROFILE.codechefStats.dsaHighestRating),
      dsaGlobalRank: dsaGlobalRankMatch ? dsaGlobalRankMatch[1] : GOKUL_PROFILE.codechefStats.dsaGlobalRank,
      dsaCountryRank: dsaCountryRankMatch ? dsaCountryRankMatch[1] : GOKUL_PROFILE.codechefStats.dsaCountryRank,
      league: 'Diamond League',
      profileUrl: 'https://codechef.com/users/gokul_v_3776',
      lastSyncedAt: new Date().toISOString(),
      source: 'live',
      success: true,
      latestContest,
      latestDsaContest
    };

    cachedCodeChef = {
      data: liveStats,
      timestamp: now
    };

    return res.json({
      ...liveStats,
      cached: false
    });
  } catch (error: any) {
    console.warn('Real-time CodeChef live sync error, serving fallback profile values:', error?.message);

    const fallbackStats = {
      ...GOKUL_PROFILE.codechefStats,
      problemsSolvedNumber: parseInt(GOKUL_PROFILE.codechefStats.problemsSolved, 10),
      lastSyncedAt: cachedCodeChef ? cachedCodeChef.data.lastSyncedAt : new Date().toISOString(),
      source: cachedCodeChef ? 'stale-cache' : 'fallback',
      success: true
    };

    return res.json(fallbackStats);
  }
});

// Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else if (filePath.match(/\.(js|css|webp|avif|png|jpg|jpeg|svg|woff2|woff|ttf)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
