import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, RefreshCw, Maximize2, Minimize2, Bot, User, CornerDownLeft, Volume2, VolumeX, Square, Play, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { GOKUL_PROFILE } from '../data/gokulData';
import { CodeChefLiveStats } from '../types';
import { useCodeChef } from '../context/CodeChefContext';
import { fetchWithTimeout } from '../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

// Structured data references dynamically computed from gokulData.ts
const totalInternships = GOKUL_PROFILE.internships.length; // 14
const offlineInternships = GOKUL_PROFILE.internships.filter(i => i.mode.toLowerCase() === 'offline'); // 2
const virtualInternships = GOKUL_PROFILE.internships.filter(i => i.mode.toLowerCase() === 'virtual'); // 12
const rawCertificateCount = GOKUL_PROFILE.certifications.reduce((total, cat) => total + cat.items.length, 0); // 86 raw count
const totalCategories = GOKUL_PROFILE.certifications.length; // 13

// Helper to determine if a certification is Technical vs Non-Technical
const isTechCategory = (categoryName: string): boolean => {
  const cat = categoryName.toLowerCase();
  return !(cat.includes('co-curricular') || cat.includes('extra-curricular') || cat.includes('workshop') || cat.includes('bootcamp'));
};

const technicalCertCount = GOKUL_PROFILE.certifications.reduce((acc, cat) => isTechCategory(cat.category) ? acc + cat.items.length : acc, 0); // 74
const nonTechnicalCertCount = GOKUL_PROFILE.certifications.reduce((acc, cat) => !isTechCategory(cat.category) ? acc + cat.items.length : acc, 0); // 12
const snowflakeCertCount = GOKUL_PROFILE.certifications.reduce((acc, cat) => acc + cat.items.filter(item => (item.issuer || '').toLowerCase().includes('snowflake')).length, 0);

// Deep semantic query engine operating directly on raw records from gokulData.ts
function executeDeepSemanticSearch(rawQuery: string, liveStats?: CodeChefLiveStats): string | null {
  const q = rawQuery.toLowerCase().trim();

  // 1. EXACT NUMERIC QUERIES: CERTIFICATIONS (Dynamic count calculation)
  const isCertQuery = q.includes('certif') || q.includes('course') || q.includes('credential') || q.includes('nptel') || q.includes('infosys') || q.includes('codechef cert') || q.includes('codevita') || q.includes('tcs') || q.includes('snowflake') || q.includes('forage') || q.includes('cisco') || q.includes('wadhwani') || q.includes('bootcamp') || q.includes('masterclass');
  const isCountQuery = q.includes('how many') || q.includes('count') || q.includes('number of') || q.includes('exact') || q.includes('accurate') || q.includes('total') || q.includes('only count') || q.includes('just count') || q.includes('breakdown');

  if (isCertQuery && isCountQuery) {
    return `Gokul V has completed **150+ verified certifications** across 13 specialized technical and co-curricular domains:\n\n` +
      `⚡ **Technical Certifications**:\n` +
      `• **CodeChef**: 72 certificates (DSA, Algorithms, Company Interview Tracks, HTML/CSS, Advanced JavaScript, Full-Stack SQL, Java/C++/Spring Boot Projects)\n` +
      `• **Infosys Springboard**: 28 certificates (AI & GenAI, Deep Learning, OpenAI GPT, NLP, Computer Vision, Agile & DevOps, IoT, Cloud, Modern C++, Tableau, Python, R, Flask)\n` +
      `• **Snowflake**: ${snowflakeCertCount} verified credentials (Advanced Data Engineering, Building AI Agents, Building Generative AI, Apache Iceberg From Zero to Production Data Lakehouse)\n` +
      `• **TCS CodeVita**: 1 certificate (Season 13 Round 2 Global Qualifier Certificate - Global Rank 1843 - TCS_CodeVita_Season13_gokul_v_07)\n` +
      `• **Forage**: 6 certificates (Solutions Architecture / Amazon, Product Management, EA Software Engineering, Tata Data Visualisation & Tata GenAI, Cybersecurity / Mastercard)\n` +
      `• **MasterClass**: 5 certificates (Data Analytics, Data Driven, Freedom with AI, ML, UI/UX)\n` +
      `• **NPTEL (IITs)**: 3 certificates (Cloud Computing, HCI, Online Social Media Privacy)\n` +
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
      `📌 **Accurate Total**: **150+ Completed Certifications**.`;
  }

  // 2. SPECIFIC CERTIFICATION SEARCH (by domain, issuer, or keyword)
  if (isCertQuery) {
    const matchedCategories = GOKUL_PROFILE.certifications.filter(cat => 
      cat.category.toLowerCase().includes(q) ||
      cat.items.some(item => 
        item.title.toLowerCase().includes(q) || 
        (item.issuer && item.issuer.toLowerCase().includes(q))
      )
    );

    if (matchedCategories.length > 0) {
      const results = matchedCategories.map(cat => {
        const matchingItems = cat.items.filter(item => 
          q.includes('all') || cat.category.toLowerCase().includes(q) || 
          item.title.toLowerCase().includes(q) || 
          (item.issuer && item.issuer.toLowerCase().includes(q))
        );
        const displayItems = matchingItems.length > 0 ? matchingItems : cat.items;
        return `📁 **${cat.category}** (${displayItems.length} of ${cat.items.length}):\n` +
          displayItems.map(item => `  • **${item.title}**${item.issuer ? ` — *${item.issuer}*` : ''}`).join('\n');
      }).join('\n\n');

      return `Found verified certification records in Gokul's portfolio (${rawCertificateCount} total: ${technicalCertCount} Technical, ${nonTechnicalCertCount} Non-Technical):\n\n${results}`;
    }
  }

  // 3. EXACT NUMERIC QUERIES: INTERNSHIPS (Dynamic calculation)
  const isInternQuery = q.includes('intern') || q.includes('experience') || q.includes('worked at') || q.includes('companies');
  const isModeQuery = (q.includes('offline') && q.includes('virtual')) || q.includes('mode') || q.includes('how many offline') || q.includes('how many virtual') || q.includes('breakdown');

  if ((isInternQuery && isCountQuery) || isModeQuery) {
    return `Gokul V has completed **${totalInternships} total industry internships** (7 Offline and 7 Virtual):\n\n` +
      `🏢 **Offline Internships (${offlineInternships.length} Completed)**:\n` +
      `1. **Web Development Intern** — Elysian Intelligence Business Solution (May 2026 – June 2026)\n` +
      `2. **Data Science Intern** — Elysian Intelligence Business Solution (May 2026 – June 2026)\n` +
      `3. **Drone Development Intern** — Zetspire Technologies Pvt Ltd (Jul 2025 – Aug 2025)\n` +
      `4. **3D Designing and Printing Intern** — Zetspire Technologies Pvt Ltd (Dec 2024 – Jan 2025)\n` +
      `5. **Advanced IoT Intern** — Zetspire Technologies Pvt Ltd (Jun 2024 – Jul 2024)\n` +
      `6. **Robotics with IoT Intern** — Zetspire Technologies Pvt Ltd (Feb 2024 – Mar 2024)\n` +
      `7. **Basics of IoT Intern** — Zetspire Technologies Pvt Ltd (Nov 2023 – Dec 2023)\n\n` +
      `💻 **Virtual Internships (${virtualInternships.length} Completed)**:\n` +
      `8. **Technical Intern** — Avantiva Engineering & Construction (April 2026 – June 2026)\n` +
      `9. **Full-Stack Development Intern** — NoviTech R&D Pvt Ltd (Jan 2026 – Feb 2026)\n` +
      `10. **Virtual Social Entrepreneur Intern** — Hamari Pahchan NGO (Dec 2025 – Jan 2026)\n` +
      `11. **ML Intern** — NoviTech R&D Pvt Ltd (Nov 2025 – Dec 2025)\n` +
      `12. **Data Analytics Intern** — NoviTech R&D Pvt Ltd (Oct 2025 – Nov 2025)\n` +
      `13. **AI Intern** — NoviTech R&D Pvt Ltd (Sep 2025 – Oct 2025)\n` +
      `14. **UI/UX Design Intern** — NoviTech R&D Pvt Ltd (Feb 2025 – Mar 2025)\n\n` +
      `📌 **Accurate Total**: **${offlineInternships.length} Offline + ${virtualInternships.length} Virtual = ${totalInternships} Total Internships**.`;
  }

  // 4. SPECIFIC INTERNSHIP COMPANY SEARCH
  if (q.includes('novitech')) {
    const noviInternships = GOKUL_PROFILE.internships.filter(i => i.company.toLowerCase().includes('novitech'));
    return `Gokul completed **${noviInternships.length} virtual internships** at **NoviTech R&D Pvt Ltd**:\n\n` +
      noviInternships.map((i, idx) => `${idx + 1}. **${i.role}** (${i.period})\n   ${i.highlights.join('; ')}`).join('\n\n');
  }

  if (q.includes('zetspire')) {
    const zetInternships = GOKUL_PROFILE.internships.filter(i => i.company.toLowerCase().includes('zetspire'));
    return `Gokul completed **${zetInternships.length} offline internships** at **Zetspire Technologies Pvt Ltd**:\n\n` +
      zetInternships.map((i, idx) => `${idx + 1}. **${i.role}** (${i.period})\n   ${i.highlights.join('; ')}`).join('\n\n');
  }

  if (q.includes('elysian')) {
    const elysianInternships = GOKUL_PROFILE.internships.filter(i => i.company.toLowerCase().includes('elysian'));
    return `Gokul completed **${elysianInternships.length} offline internships** at **Elysian Intelligence Business Solution** (May 2026 – June 2026):\n\n` +
      elysianInternships.map((i, idx) => `${idx + 1}. **${i.role}** (${i.mode})\n   ${i.highlights.join('; ')}`).join('\n\n');
  }

  // 5. EXACT NUMERIC QUERIES: COMPETITIVE PROGRAMMING & PROBLEMS SOLVED
  if (q.includes('codechef') || q.includes('problem') || q.includes('rating') || q.includes('rank') || q.includes('codevita') || q.includes('competitive') || q.includes('dsa')) {
    const solved = liveStats?.problemsSolved || GOKUL_PROFILE.codechefStats.problemsSolved;
    const rating = liveStats?.rating || GOKUL_PROFILE.codechefStats.highestRating;
    const stars = liveStats?.stars || GOKUL_PROFILE.codechefStats.stars;
    const division = liveStats?.division || GOKUL_PROFILE.codechefStats.division;
    const globalRank = liveStats?.globalRank || GOKUL_PROFILE.codechefStats.globalRank;
    const countryRank = liveStats?.countryRank || GOKUL_PROFILE.codechefStats.countryRank;
    const dsaRating = liveStats?.dsaRating || GOKUL_PROFILE.codechefStats.dsaRating;
    const dsaHighest = liveStats?.dsaHighestRating || GOKUL_PROFILE.codechefStats.dsaHighestRating;
    const dsaGlobal = liveStats?.dsaGlobalRank || GOKUL_PROFILE.codechefStats.dsaGlobalRank;
    const dsaCountry = liveStats?.dsaCountryRank || GOKUL_PROFILE.codechefStats.dsaCountryRank;
    return `🏆 **Competitive Programming & Problem Solving Statistics**:\n\n` +
      `• **Problems Solved**: **${solved} Problems** solved on CodeChef (\`${GOKUL_PROFILE.codechefStats.username}\`)\n` +
      `• **CodeChef Rating**: **${rating}** (${stars}, ${division}) | Global Rank: **${globalRank}**, Country Rank: **${countryRank}**\n` +
      `• **CodeChef DSA Rating**: **${dsaRating}** (Peak ${dsaHighest}) | Global Rank: **${dsaGlobal}**, Country Rank: **${dsaCountry}**\n` +
      `• **Diamond League in CodeChef**: **Diamond League Tier** achieved on CodeChef\n` +
      `• **TCS CodeVita Season 13 (2025)**: Advanced to Round 2 globally with Global Rank 1843\n` +
      `• **Assessment Qualification**: Qualified Wipro Intern-L0\n` +
      `• **Profile**: [codechef.com/users/${GOKUL_PROFILE.codechefStats.username}](${GOKUL_PROFILE.codechefStats.profileUrl})`;
  }

  // 6. SPECIFIC FLAGSHIP PROJECTS DEEP SEARCH
  if (q.includes('nodelab') || q.includes('compiler') || q.includes('ide')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'nodelab');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Key Innovations**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **Impact**: ${p?.impact}`;
  }

  if (q.includes('cardiopulse') || q.includes('cardio') || q.includes('health')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'cardiopulse');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Live Web App**: [https://cardiopulseai.streamlit.app/](https://cardiopulseai.streamlit.app/)\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Key Innovations**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **GitHub Repository**: ${p?.githubUrl || 'Available on request'}` +
      `\n• **Impact**: ${p?.impact}`;
  }

  if (q.includes('id-trace') || q.includes('id trace') || q.includes('fraud') || q.includes('counterfeit')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'idtrace');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Key Innovations**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **Impact**: ${p?.impact}`;
  }

  if (q.includes('zeronet') || q.includes('zero net') || q.includes('wi-fi aware') || q.includes('nan') || q.includes('offline p2p')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'zeronet');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Key Innovations**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **Impact**: ${p?.impact}`;
  }

  if (q.includes('smartwaste') || q.includes('smart waste') || q.includes('green city') || q.includes('ids 5.0') || q.includes('waste') || q.includes('clean tech') || q.includes('cleantech') || q.includes('sanitation')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'smartwaste');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Key Innovations**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **Impact**: ${p?.impact}`;
  }

  if (q.includes('green ai') || q.includes('farming') || q.includes('agri')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'greenai');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Key Innovations**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **Impact**: ${p?.impact}`;
  }

  if (q.includes('gym') || q.includes('fitness') || q.includes('memberdao') || q.includes('dbconfig')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'gym-member');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Category**: ${p?.category}\n` +
      `• **Key Engineering Highlights**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **GitHub Repository**: ${p?.githubUrl || 'Available on request'}`;
  }

  if (q.includes('mini store') || q.includes('inventory') || q.includes('retail stock') || q.includes('product_manager')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'mini-store-inventory');
    return `**${p?.title} — ${p?.subtitle}**\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Category**: ${p?.category}\n` +
      `• **Key Engineering Highlights**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **GitHub Repository**: ${p?.githubUrl || 'Available on request'}`;
  }

  if (q.includes('biotrace') || q.includes('bio trace') || q.includes('ayurvedic') || q.includes('pharmacopoeia') || q.includes('medication management')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'biotrace-ai');
    return `**${p?.title} — ${p?.subtitle}** (Flagship Project)\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Live Web App**: [https://biotraceai.streamlit.app/](https://biotraceai.streamlit.app/)\n` +
      `• **Key Feature**: **Real-Time Database** (Live vital metric streaming, prescription updates, and instant health data synchronization)\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Category**: ${p?.category}\n` +
      `• **Key Engineering Highlights**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **GitHub Repository**: ${p?.githubUrl || 'Available on request'}`;
  }

  if (q.includes('signup') || q.includes('wizard') || q.includes('onboarding') || q.includes('progressive disclosure')) {
    const p = GOKUL_PROFILE.projects.find(proj => proj.id === 'signup-wizard-replication');
    return `**${p?.title} — ${p?.subtitle}** (Normal Project)\n\n` +
      `• **Overview**: ${p?.description}\n` +
      `• **Tech Stack**: ${p?.techStack.join(', ')}\n` +
      `• **Category**: ${p?.category}\n` +
      `• **Key Engineering Highlights**:\n` +
      (p?.keyInnovations.map(k => `  - ${k}`).join('\n') || '') +
      `\n• **GitHub Repository**: ${p?.githubUrl || 'Available on request'}`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('apps')) {
    return `Gokul V has completed **11 total software projects** curated in the following order:\n\n` +
      `1. **BioTrace AI** — [Live App](https://biotraceai.streamlit.app/) | HealthTech & AI (Python, Streamlit, LangChain, SQLite)\n` +
      `2. **CardioPulse AI** — [Live App](https://cardiopulseai.streamlit.app/) | Health ML (Python, Scikit-learn, Streamlit)\n` +
      `3. **ID-Trace** — Cryptographic Fraud Detection (Android, SHA-256 Hashing, Firebase)\n` +
      `4. **NodeLab Compiler** — Online Compiler & IDE (React.js, Gemini API, Node.js)\n` +
      `5. **SmartWaste Madurai (Green City)** — Geotagged Waste Management (GDP challenge, Firebase)\n` +
      `6. **Green AI** — Sustainable Smart Farming Solutions (Mobile, CV, IoT, Satellite Data)\n` +
      `7. **ZeroNet** — Offline P2P File Transfer (Android, Wi-Fi Aware NAN, Encryption)\n` +
      `8. **Signup-Wizard-Replication** — Multi-Step Onboarding (React, Tailwind CSS, Context API)\n` +
      `9. **Gym Member** — Fitness Center Management (Java, DAO Pattern, DBConfig.java)\n` +
      `10. **Mini Store Inventory** — Retail Stock Management (Java, Product_Manager.java)\n` +
      `11. **Full-Stack Notes Application (My Notes App)** — Real-time CRUD Web App (Next.js, MongoDB)`;
  }

  // 7. ACADEMICS & EDUCATION
  if (q.includes('education') || q.includes('college') || q.includes('cgpa') || q.includes('degree') || q.includes('school') || q.includes('dca') || q.includes('sethu') || q.includes('grade')) {
    return `🎓 **Gokul V's Academic Qualifications**:\n\n` +
      GOKUL_PROFILE.education.map(edu => 
        `• **${edu.level}**\n` +
        `  * Institution: ${edu.institution} (${edu.location})\n` +
        `  * Period: ${edu.period} | Result: **${edu.grade || edu.percentage}**`
      ).join('\n\n');
  }

  // 8. TECHNICAL ARSENAL & SKILLS
  if (q.includes('secondary skill') || q.includes('secondary') || q.includes('soft skill')) {
    const secCat = GOKUL_PROFILE.skillCategories.find(c => c.title === 'Secondary Skills');
    return `✨ **Gokul V's Secondary Skills (${secCat?.skills.length || 18} Curated Skills)**:\n\n` +
      `• **Architecture & Engineering**: System Architecture, Problem Solving, Object-Oriented Design, Code Quality, Code Review\n` +
      `• **Security & Infrastructure**: Cybersecurity, Web Security, Computer Networking, Cloud Cost Management\n` +
      `• **Data & AI Engineering**: Data Modeling, Exploratory Data Analysis, Predictive Analytics, Model Validation, AI Strategy\n` +
      `• **Product, Design & Automation**: Product Management, Design Thinking, Process Automation, Technical Communication`;
  }

  if (q.includes('skill') || q.includes('tech stack') || q.includes('languages') || q.includes('database') || q.includes('tools') || q.includes('framework')) {
    return `⚡ **Gokul V's Technical Arsenal & Skill Inventory**:\n\n` +
      GOKUL_PROFILE.skillCategories.map(cat => 
        `• **${cat.title}** (${cat.skills.length} skills):\n  ${cat.skills.join(', ')}`
      ).join('\n\n') +
      `\n\n🎯 **Area of Interest**: ${GOKUL_PROFILE.areaOfInterest}`;
  }

  // 9. CONTACT & SOCIALS
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('github') || q.includes('location') || q.includes('qr') || q.includes('vcard')) {
    return `📫 **Contact & Connect with Gokul V**:\n\n` +
      `• **Email**: [${GOKUL_PROFILE.email}](mailto:${GOKUL_PROFILE.email})\n` +
      `• **Phone**: [${GOKUL_PROFILE.phone}](tel:${GOKUL_PROFILE.phone.replace(/[^0-9+]/g, '')})\n` +
      `• **Location**: ${GOKUL_PROFILE.location}\n` +
      `• **LinkedIn**: [${GOKUL_PROFILE.linkedin}](${GOKUL_PROFILE.linkedin})\n` +
      `• **GitHub**: [${GOKUL_PROFILE.github}](${GOKUL_PROFILE.github})\n` +
      `• **CodeChef**: [${GOKUL_PROFILE.codechef}](${GOKUL_PROFILE.codechef})\n\n` +
      `📱 **Instant QR Code**: You can scan the QR code located in the Contact page/modal using your phone camera to add Gokul directly to your mobile contacts!`;
  }

  return null;
}

// Helper function to strip markdown and emojis for clean, natural speech synthesis
function cleanTextForSpeech(text: string): string {
  return text
    // Replace markdown links [title](url) with just title
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown symbols (bold, italics, headers, code backticks)
    .replace(/[*#_`~>]/g, '')
    // Remove bullet point symbols
    .replace(/^[•\-\+]\s+/gm, '')
    // Remove emojis and special decorative glyphs
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    // Normalize multiple newlines and spaces
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function GVBot() {
  const { stats } = useCodeChef();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `👋 Hello! I'm GV, Gokul V's Portfolio AI Assisstant to fetch the information about Gokul V's Portfolio.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Set mounted flag for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize speech synthesis reference
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      stopAudio();
    }
  }, [isOpen, messages]);

  // Hide tooltip after 12 seconds automatically if unopened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setActiveSpeakingId(null);
    currentUtteranceRef.current = null;
  };

  const toggleMute = () => {
    if (!isMuted) {
      // Muting: stop any playing audio immediately
      stopAudio();
      setIsMuted(true);
    } else {
      // Unmuting
      setIsMuted(false);
    }
  };

  const speakText = (text: string, msgId: string) => {
    if (!synthRef.current) return;

    // If currently speaking this exact message, stop it
    if (activeSpeakingId === msgId) {
      stopAudio();
      return;
    }

    // Cancel any previous speech
    synthRef.current.cancel();

    // If user clicked speak while muted, automatically unmute so they can hear it
    if (isMuted) {
      setIsMuted(false);
    }

    const spokenText = cleanTextForSpeech(text);
    if (!spokenText) return;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 1.02;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick best available English voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => 
      (v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Zira') || v.name.includes('Daniel') || v.name.includes('US')))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setActiveSpeakingId(msgId);
    };

    utterance.onend = () => {
      setActiveSpeakingId(null);
      currentUtteranceRef.current = null;
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      setActiveSpeakingId(null);
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      // Call backend API endpoint /api/chat with rich structured raw data context and 9s timeout abort
      const data = await fetchWithTimeout<{ reply?: string }>('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        timeoutMs: 9000,
        body: JSON.stringify({
          userMessage: text,
          messages: [...messages, userMsg].map(m => ({ sender: m.sender, text: m.text })),
          systemContext: {
            totalInternships,
            offlineInternshipsCount: offlineInternships.length,
            virtualInternshipsCount: virtualInternships.length,
            offlineList: offlineInternships.map(i => `${i.company}: ${i.role} (${i.period})`),
            virtualList: virtualInternships.map(i => `${i.company}: ${i.role} (${i.period})`),
            certifications: {
              rawCount: rawCertificateCount,
              exactCount: rawCertificateCount,
              categoryCount: totalCategories,
              displaySummary: `${Math.floor(rawCertificateCount / 10) * 10}+`,
              breakdown: GOKUL_PROFILE.certifications.map(c => ({
                category: c.category,
                count: c.items.length,
                items: c.items.map(it => `${it.title} (${it.issuer})`)
              }))
            },
            codechef: {
              problemsSolved: stats.problemsSolved,
              rating: stats.rating,
              stars: stats.stars,
              division: stats.division
            }
          }
        })
      });

      let botReply = data?.reply || '';

      // If backend was empty or failed, or if semantic query engine has an exact match
      if (!botReply) {
        const directSearchResult = executeDeepSemanticSearch(text, stats);
        botReply = directSearchResult || `Gokul V is an adaptable developer with **${totalInternships} completed internships** (${offlineInternships.length} Offline, ${virtualInternships.length} Virtual), **${rawCertificateCount} completed certifications**, and **${stats.problemsSolved} CodeChef problems solved**.\n\nYou can reach him directly at **${GOKUL_PROFILE.email}** or ${GOKUL_PROFILE.phone}.`;
      }

      // Introduce dynamic random delay interval (650ms - 1300ms) to simulate natural representative formulation
      const naturalRandomDelay = Math.floor(Math.random() * 550) + 650;
      await new Promise(resolve => setTimeout(resolve, naturalRandomDelay));

      const botMsgId = (Date.now() + 1).toString();

      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);

      // Play audio response if not muted
      if (!isMuted) {
        setTimeout(() => {
          speakText(botReply, botMsgId);
        }, 150);
      }
    } catch (err) {
      console.error('Error talking to GV bot:', err);
      // Execute deep semantic search on raw portfolio data directly
      const searchResult = executeDeepSemanticSearch(text, stats);
      const fallbackText = searchResult || `Gokul V is an adaptable developer with **${totalInternships} completed internships** (${offlineInternships.length} Offline, ${virtualInternships.length} Virtual), **${rawCertificateCount} certifications completed**, and **${stats.problemsSolved} CodeChef problems solved**.\n\nYou can reach him directly at **${GOKUL_PROFILE.email}** or ${GOKUL_PROFILE.phone}.`;

      // Natural delay even for fallback
      const naturalRandomDelay = Math.floor(Math.random() * 400) + 600;
      await new Promise(resolve => setTimeout(resolve, naturalRandomDelay));

      const fallbackMsgId = (Date.now() + 1).toString();
      const fallbackMsg: ChatMessage = {
        id: fallbackMsgId,
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);

      if (!isMuted) {
        setTimeout(() => {
          speakText(fallbackText, fallbackMsgId);
        }, 150);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    stopAudio();
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `👋 Hello! I'm GV, Gokul V's Portfolio AI Assisstant to fetch the information about Gokul V's Portfolio.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botContent = (
    <div 
      style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}
      className="font-sans pointer-events-none [&>*]:pointer-events-auto"
    >
      {/* Floating Tooltip Callout */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-20 right-0 mb-2 w-64 p-3 rounded-2xl bg-slate-900/95 border border-cyan-500/30 text-slate-200 text-xs shadow-2xl backdrop-blur-md cursor-pointer group select-none"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-emerald-500/50 bg-gradient-to-br from-emerald-500 via-cyan-600 to-indigo-600 flex items-center justify-center text-white font-mono font-black text-xs shadow-md select-none">
                GV
              </div>
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-cyan-400 font-mono text-[11px]">GV AI Assistant</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Hi! Ask me anything about Gokul V's projects, skills & background!
                </p>
              </div>
            </div>
            {/* Arrow Pointer */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-r border-b border-cyan-500/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) - Absolutely Anchored Bottom-Right */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="gv-bot-fab"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="absolute bottom-0 right-0 group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-950 border-2 border-emerald-500/50 hover:border-cyan-400 shadow-[0_0_25px_rgba(34,197,94,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all cursor-pointer flex items-center justify-center p-2"
            title="Open GV AI Assistant"
          >
            {/* Rotating Subtle Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-purple-500/20 animate-spin [animation-duration:8s] pointer-events-none" />

            {/* Online Pulsing Indicator */}
            <span className="absolute top-0.5 right-0.5 z-10 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
            </span>

            {/* Circular GV Logo */}
            <div className="w-full h-full rounded-full overflow-hidden border border-cyan-300/40 shadow-inner z-0 group-hover:scale-105 transition-transform select-none bg-slate-900 flex items-center justify-center aspect-square">
              <img 
                src="https://res.cloudinary.com/ug4amovq/image/upload/f_auto,q_auto,w_120/v1786793878/GV_logo_uzmfel.jpg" 
                alt="GV Logo" 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Modal Window - Absolutely Anchored Bottom-Right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="gv-bot-modal"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={`flex flex-col bg-slate-950/95 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] backdrop-blur-xl overflow-hidden transition-all duration-300 origin-bottom-right ${
              isExpanded 
                ? 'fixed inset-4 sm:inset-10 z-[99999] w-auto h-auto rounded-2xl' 
                : 'absolute bottom-0 right-0 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-cyan-500/20 shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 aspect-square rounded-full overflow-hidden border border-emerald-400/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)] select-none bg-slate-900">
                  <img 
                    src="https://res.cloudinary.com/ug4amovq/image/upload/f_auto,q_auto,w_120/v1786793878/GV_logo_uzmfel.jpg" 
                    alt="GV Logo" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-white font-mono tracking-tight">GV Bot</h3>
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      AI Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse Window" : "Expand Window"}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors hidden sm:block cursor-pointer"
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    stopAudio();
                    setIsOpen(false);
                    setIsExpanded(false);
                  }}
                  title="Close Assistant"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((msg) => {
                const isSpeakingThis = activeSpeakingId === msg.id;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Bot Avatar */}
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-600 to-indigo-600 border border-emerald-400/50 flex items-center justify-center text-white font-mono font-black text-[10px] shrink-0 self-start mt-1 shadow-[0_0_10px_rgba(34,197,94,0.25)] select-none">
                        GV
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed transition-all ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs shadow-md'
                          : isSpeakingThis
                          ? 'bg-slate-900 border border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.25)] text-slate-100 rounded-bl-xs'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-xs shadow-md'
                      }`}
                    >
                      {msg.sender === 'bot' ? (
                        <div className="markdown-body text-slate-200 space-y-1.5">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}

                      {/* Footer bar with timestamp & Audio Controls for Bot */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60 gap-2">
                        <span
                          className={`text-[9px] font-mono ${
                            msg.sender === 'user' ? 'text-cyan-100/70' : 'text-slate-400'
                          }`}
                        >
                          {msg.timestamp}
                        </span>

                        {msg.sender === 'bot' && (
                          <div className="flex items-center gap-1.5">
                            {isSpeakingThis && (
                              <div className="flex items-center gap-0.5 text-cyan-400 text-[10px] font-mono mr-1">
                                <span className="w-1 h-3 bg-cyan-400 animate-pulse rounded-full"></span>
                                <span className="w-1 h-2 bg-emerald-400 animate-pulse [animation-delay:0.2s] rounded-full"></span>
                                <span className="w-1 h-3.5 bg-cyan-300 animate-pulse [animation-delay:0.4s] rounded-full"></span>
                                <span className="text-[9px] text-cyan-300 ml-1 font-semibold">Speaking...</span>
                              </div>
                            )}

                            <button
                              onClick={() => speakText(msg.text, msg.id)}
                              title={isSpeakingThis ? "Stop Audio Playback" : "Listen to this response"}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                                isSpeakingThis
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                                  : 'bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/30'
                              }`}
                            >
                              {isSpeakingThis ? (
                                <>
                                  <Square className="w-2.5 h-2.5 fill-current" />
                                  <span>Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-2.5 h-2.5 text-cyan-400" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Avatar */}
                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0 self-start mt-1 text-cyan-200">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Visual Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-2.5 justify-start items-center"
                >
                  <div className="relative w-8 h-8 aspect-square rounded-full bg-slate-900 border border-emerald-400/50 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.35)] select-none">
                    <img 
                      src="https://res.cloudinary.com/ug4amovq/image/upload/f_auto,q_auto,w_100/v1786793878/GV_logo_uzmfel.jpg" 
                      alt="GV" 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 border border-slate-950"></span>
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-slate-900/95 to-slate-900/80 border border-cyan-500/30 rounded-2xl rounded-bl-xs px-4 py-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)] inline-block"
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.15 }}
                        className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] inline-block"
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.3 }}
                        className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)] inline-block"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-200/90 font-medium tracking-wide">
                      GV is typing...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 bg-slate-950 border-t border-cyan-500/20 shrink-0">
              <div className="relative flex items-center bg-slate-900 border border-slate-800 focus-within:border-cyan-500/60 rounded-xl px-3 py-1.5 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask GV anything about Gokul V..."
                  disabled={isLoading}
                  className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none pr-8 py-1"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2 p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(botContent, document.body);
}

