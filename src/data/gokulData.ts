import { Project, Internship, AcademicQualification, CertificationCategory, SkillCategory, PersonalityTrait } from '../types';

export const GOKUL_PROFILE = {
  name: "Gokul V",
  title: "B.Tech IT Student | Full-Stack & AI Developer | Competitive Programmer",
  email: "gvking064@gmail.com",
  phone: "+91 8608973776",
  location: "Madurai, Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/gokul-v-gv07/",
  github: "https://github.com/GV-07",
  codechef: "https://codechef.com/users/gokul_v_3776",
  cgpa: "8.3",
  codechefStats: {
    rating: 2124,
    stars: "5★",
    division: "Div 1",
    highestRating: 2124,
    problemsSolved: "3537",
    globalRank: "518",
    countryRank: "353",
    username: "gokul_v_3776",
    profileUrl: "https://codechef.com/users/gokul_v_3776",
    dsaRating: 2472,
    dsaHighestRating: 2472,
    dsaGlobalRank: "2",
    dsaCountryRank: "1",
    league: "Diamond League"
  },
  certificationsCount: "150+",
  areaOfInterest: "Web and Application Development Integrated with AI",
  tagline: "I Engineer Intelligent Architectures.",
  summary: "I am a Full-Stack Developer and AI Enthusiast building the bridge between complex machine learning algorithms and seamless web experiences. From zero-latency multi-language compilers to cryptographic fraud detection networks, I turn ambitious ideas into high-performance digital reality.",
  
  education: [
    {
      level: "Degree - B. Tech (Information Technology)",
      institution: "Sethu Institute of Technology",
      field: "Information Technology",
      location: "Virudhunagar, Tamil Nadu",
      period: "Sep 2023 – Apr 2027",
      percentage: "83%",
      grade: "CGPA : 8.3",
      badge: "Current B.Tech"
    },
    {
      level: "Diploma - DCA (Diploma of Computer Application)",
      institution: "Computer Software College",
      field: "Computer Application",
      location: "Madurai, Tamil Nadu",
      period: "Apr 2023 – Sep 2023 (6 Months)",
      grade: "Grade : A",
      badge: "Diploma"
    },
    {
      level: "HSC (Higher Secondary Certificate) - Bio-Maths",
      institution: "Seventh-Day Adventist Matriculation Higher Secondary School",
      field: "Bio-Maths",
      location: "Madurai, Tamil Nadu",
      period: "Jun 2022 – Apr 2023",
      grade: "Percentage : 69%"
    },
    {
      level: "SSLC (Secondary School Leaving Certificate)",
      institution: "Seventh-Day Adventist Matriculation Higher Secondary School",
      field: "General Education",
      location: "Madurai, Tamil Nadu",
      period: "Jun 2020 – Apr 2021",
      grade: "Percentage : 100% (All Pass)",
      badge: "100% Score"
    }
  ] as AcademicQualification[],

  skillCategories: [
    {
      title: "Languages",
      iconName: "Code2",
      skills: ["Java", "Python 3", "C", "C++", "JavaScript", "React JS"]
    },
    {
      title: "Web & Frameworks",
      iconName: "Globe",
      skills: ["HTML5", "CSS3", "Streamlit", "Gradio", "Next.js", "Spring MVC", "Spring Boot", "RESTful APIs"]
    },
    {
      title: "Databases & Tools",
      iconName: "Database",
      skills: [
        "MySQL",
        "PL/SQL",
        "MongoDB",
        "Maven",
        "Gradle",
        "GitHub",
        "VS Code",
        "Google Gemini",
        "Google Colab",
        "Google Android Studio",
        "Google AI Studio",
        "Google Antigravity IDE",
        "Google Firebase Studio",
        "Google Cloud Firestore",
        "Google Analytics",
        "Google Flow",
        "Google Docs",
        "Google Sheets",
        "Google Slides",
        "Google Form",
        "Google NotebookLM",
        "Wordpress",
        "MS Word",
        "MS Excel",
        "MS Powerpoint",
        "MS Power BI",
        "MS Copilot"
      ]
    },
    {
      title: "CS & Core Domains",
      iconName: "Cpu",
      skills: [
        "Data Structure & Algorithms (DSA)",
        "AIML",
        "IOT",
        "Data Science in Python",
        "Object-oriented Programming (OOPs)",
        "Peer-to-Peer (P2P)",
        "UI/UX (Figma, Miro)",
        "Cryptographic Hashing & Blockchain (SHA-256)",
        "Wi-Fi Aware (NAN)",
        "Full-Stack",
        "Front-End",
        "Back-End",
        "Database"
      ]
    },
    {
      title: "Secondary Skills",
      iconName: "Sparkles",
      skills: [
        "System Architecture",
        "Problem Solving",
        "Object-Oriented Design",
        "Code Quality",
        "Code Review",
        "Cybersecurity",
        "Web Security",
        "Computer Networking",
        "Data Modeling",
        "Exploratory Data Analysis",
        "Predictive Analytics",
        "Model Validation",
        "AI Strategy",
        "Process Automation",
        "Cloud Cost Management",
        "Product Management",
        "Design Thinking",
        "Technical Communication"
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "biotrace-ai",
      title: "BioTrace AI",
      subtitle: "AI-Powered Personal Health Monitoring Platform",
      category: "HealthTech & AI",
      featured: true,
      description: "Developed an academic demonstration platform designed to assist users with comprehensive home health tracking, medication management, and wellness analytics. The system integrates Real-Time Database synchronization, a localized Indian medicine database, and regional Ayurvedic wellness context, providing culturally relevant health insights.",
      keyInnovations: [
        "Architected Real-Time Database synchronization for instant vital sign tracking, dynamic health record streaming, and live prescription alerts.",
        "Built a secure, modular application using Python and Streamlit, incorporating SQLite and Real-Time Database architecture to manage continuous health records.",
        "Integrated LangChain with OpenAI's GPT models to generate AI-driven health insights, alongside multi-language support and Google Text-to-Speech capabilities for enhanced accessibility.",
        "Developed comprehensive wellness features including fitness analytics and a medication management system to support daily personal health monitoring."
      ],
      keyChallenges: [
        "Synchronizing asynchronous patient vital streams in real-time across Streamlit reactive state loops with zero data collisions or stale session states.",
        "Synthesizing contextual medical recommendations by fusing unstructured patient logs with structured Indian Pharmacopoeia and regional Ayurvedic guidelines through LangChain prompts.",
        "Architecting responsive multi-language text-to-speech synthesis (gTTS) pipeline without causing streaming bottlenecks or thread blocks on Streamlit UI.",
        "Designing local SQLite schema and Real-Time Database with encrypted session tokens and audit logs for privacy-compliant patient health records."
      ],
      fullStackDetails: {
        frontend: ["Streamlit Reactive UI", "Interactive Health Dashboards", "TTS Audio Player", "Custom CSS & Responsive Layout"],
        backend: ["Python 3.11", "LangChain Orchestration Engine", "OpenAI GPT API", "Google Text-to-Speech (gTTS)"],
        databaseAndCloud: ["Real-Time Database", "SQLite Local Database", "Indian Medicine & Ayurvedic Pharmacopoeia Dataset", "Secure Credential Vault"],
        toolsAndProtocols: ["Medication Schedule Engine", "Fitness Trend Analytics", "Multi-Language Localization", "RESTful Health APIs"]
      },
      techStack: ["Python", "Streamlit", "Real-Time Database", "SQLite", "OpenAI / LangChain", "HealthTech", "HTML5 & CSS3"],
      impact: "Provides culturally relevant personal health insights, automated medication scheduling, and multi-lingual voice accessibility.",
      demoType: "biotrace",
      liveUrl: "https://biotraceai.streamlit.app/",
      demoUrl: "https://biotraceai.streamlit.app/",
      githubUrl: "https://github.com/GV-07/BioTrace-AI"
    },
    {
      id: "cardiopulse",
      title: "CardioPulse AI",
      subtitle: "Streamlit Health Diagnostics Platform",
      category: "Health ML",
      featured: true,
      description: "Interactive AI-driven healthcare web application delivering instant cardiovascular risk assessments with high-accuracy predictive models.",
      keyInnovations: [
        "Deployed machine learning classification algorithms using Python and Scikit-learn.",
        "Accelerated medical data processing pipelines using Pandas for dataset cleaning.",
        "Real-time healthcare visualizations hosted on Streamlit for instant clinician/patient insight."
      ],
      keyChallenges: [
        "Handling medical class imbalance across clinical heart disease datasets through SMOTE synthetic oversampling and stratified cross-validation.",
        "Delivering transparent, explainable AI risk factors (SHAP values) so clinicians understand the exact biological weighting behind risk scores.",
        "Optimizing feature preprocessing pipelines in Pandas to provide instantaneous sub-second diagnostics upon parameter entry."
      ],
      fullStackDetails: {
        frontend: ["Streamlit Web Interface", "Plotly Interactive Charts", "Custom CSS Theming"],
        backend: ["Python 3.11", "Scikit-learn Classification", "Pandas & NumPy Data Engine"],
        databaseAndCloud: ["Streamlit Cloud", "Local Clinical Datasets", "Joblib Model Serialization"],
        toolsAndProtocols: ["RandomForest / LogisticRegression Ensemble", "SHAP Explainability", "RESTful Data Ingestion"]
      },
      techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Machine Learning"],
      impact: "High-accuracy instant cardiovascular risk scoring with real-time statistical medical visualizers.",
      demoType: "health",
      liveUrl: "https://cardiopulseai.streamlit.app/",
      demoUrl: "https://cardiopulseai.streamlit.app/",
      githubUrl: "https://github.com/GV-07/CardioPulseAI"
    },
    {
      id: "idtrace",
      title: "ID-Trace",
      subtitle: "Cryptographic Fraud Detection System",
      category: "Blockchain & Security",
      featured: true,
      description: "Blockchain-inspired supply chain authentication app built to eliminate high-value logistics counterfeiting via SHA-256 cryptographic hashing.",
      keyInnovations: [
        "Combined SHA-256 cryptographic hashing with digital twin technology for real-time verification.",
        "Scaled data storage and verification workflows using a synchronized Firebase back-end database.",
        "Instantaneous fraud detection alerts integrated with Android mobile framework."
      ],
      keyChallenges: [
        "Formulating unique SHA-256 cryptographic digital twin hashes incorporating batch serials, manufacturing timestamps, and distributor keys.",
        "Guaranteeing sub-second QR code verification speed on mobile hardware while executing cryptographic ledger integrity checks.",
        "Preventing replay attacks and tag cloning through one-time encrypted session challenge-response tokens."
      ],
      fullStackDetails: {
        frontend: ["Android Studio (Java/Kotlin)", "ZXing QR & Barcode Scanner", "Material Design 3 Components"],
        backend: ["Java Cryptographic Architecture", "Firebase Cloud Functions", "Digital Twin Engine"],
        databaseAndCloud: ["Firebase Realtime Database", "Cloud Firestore Immutable Ledger", "Google Cloud IAM"],
        toolsAndProtocols: ["SHA-256 Cryptographic Hashing", "Digital Signature Verification", "REST APIs", "Mobile Hardware Keystore"]
      },
      techStack: ["Android", "SHA-256 Hashing", "Firebase Realtime DB", "Digital Twin Tech", "Cryptography"],
      impact: "Eliminates supply chain counterfeiting through digital twin verification and instant alerts.",
      demoType: "blockchain",
      githubUrl: "https://github.com/GV-07/ID-Trace"
    },
    {
      id: "nodelab",
      title: "NodeLab Compiler",
      subtitle: "Intelligent Multi-Language Online Compiler & IDE",
      category: "AI & Web",
      featured: true,
      description: "Optimized a full-stack, split-screen online coding environment to achieve real-time, zero-latency code execution and live runtime database schema visualization.",
      keyInnovations: [
        "Integrated Google Gemini API via @google/genai for intelligent code assistance and error debugging.",
        "Built responsive split-screen interactive interface using React.js.",
        "Secured user environment configurations for concurrent multi-language compilation threads using Google OAuth and secure backend sandboxes."
      ],
      keyChallenges: [
        "Building isolated and secure Dockerized execution sandboxes preventing fork bombs and malicious system calls while achieving near-zero latency.",
        "Streaming Google Gemini API automated code fixes and runtime debugging suggestions in real-time alongside stdout/stderr buffers.",
        "Designing a synchronized split-screen interface with live database schema visualizer that renders without main-thread blocking."
      ],
      fullStackDetails: {
        frontend: ["React.js", "Monaco Editor / CodeMirror", "Tailwind CSS", "Framer Motion Animations"],
        backend: ["Node.js / Express Server", "Dockerized Sandbox Workers", "Google Gemini API via @google/genai"],
        databaseAndCloud: ["Google Cloud Run", "MongoDB Atlas", "Redis Execution Cache", "Google OAuth 2.0"],
        toolsAndProtocols: ["WebSocket Realtime Stderr/Stdout Stream", "Piston Compilation Engine", "JWT Auth", "RESTful Endpoints"]
      },
      techStack: ["React.js", "Google Gemini API", "@google/genai", "Google OAuth", "Node.js", "Code Sandbox"],
      impact: "Zero-latency multi-threaded code execution with AI-driven syntax assistance and schema rendering.",
      demoType: "compiler",
      githubUrl: "https://github.com/GV-07/NodeLab-Compiler"
    },
    {
      id: "smartwaste",
      title: "SmartWaste Madurai (Green City)",
      subtitle: "Geotagged Waste Management Ecosystem • Google Developers Groups (GDP)",
      category: "Smart City & CleanTech",
      featured: true,
      description: "Developed SmartWaste Madurai (Green City) for the IDS 5.0 challenge in collaboration with Google Developers Groups (GDP), conceptualizing an innovative mobile application designed to revolutionize urban sanitation. Collaborated within a five-member team to integrate location-based tracking and real-time backend data synchronization, aiming to optimize municipal waste collection processes and improve community environmental impact.",
      keyInnovations: [
        "Engineered a precise geotagged reporting mobile application to enable real-time tracking and logging of urban waste accumulation.",
        "Built a robust backend infrastructure leveraging Firebase for seamless data synchronization between mobile users and central municipal systems.",
        "Developed a scalable smart waste management architecture in initiative with Google Developers Groups (GDP) designed to reduce operational response times and optimize collection routes."
      ],
      keyChallenges: [
        "Synchronizing real-time geotagged reports under poor cellular reception across narrow Madurai heritage streets by implementing offline local caching with automatic replay upon reconnection.",
        "Mitigating duplicate citizen reporting of the same waste overflow incident through a spatial-temporal clustering algorithm (within 25m radius and 2-hour window).",
        "Optimizing multi-stop municipal collection vehicle routing with live traffic constraints to achieve over 40% reduction in average cleanup turnaround time."
      ],
      fullStackDetails: {
        frontend: ["React Native / Mobile App", "Tailwind CSS", "Mapbox GL / Google Maps SDK", "Interactive Ward Geotagger"],
        backend: ["Node.js / Express Microservices", "Firebase Cloud Functions", "Geospatial Routing Engine"],
        databaseAndCloud: ["Firebase Realtime Database", "Google Cloud Firestore", "Cloud Storage for Incident Media"],
        toolsAndProtocols: ["GPS Geolocation API", "REST API", "WebSocket Realtime Sync", "IDS 5.0 Challenge Suite"]
      },
      techStack: ["Firebase", "Mobile App", "Geotagging", "Real-Time Database", "Smart City", "Google Developers Groups (GDP)", "CleanTech"],
      impact: "Optimizes municipal waste collection routes, lowers operational response times, and drives sustainable urban sanitation.",
      demoType: "smartwaste",
      githubUrl: "https://github.com/GV-07/Green-City"
    },
    {
      id: "greenai",
      title: "Green AI",
      subtitle: "Sustainable Smart Farming Solutions",
      category: "AgriTech & AI",
      featured: true,
      description: "Developed Green AI, an all-in-one smart farming mobile companion leveraging AI/ML, NLP, IoT, and satellite data to guide farmers through a connected, intelligent, and climate-resilient farming journey.",
      keyInnovations: [
        "Engineered real-time soil and disease monitoring using mobile-based computer vision.",
        "Built a multilingual AI voice chatbot leveraging NLP to provide inclusive farming advice.",
        "Developed analytical tools for resource optimization (water/fertilizer) and market price forecasting utilizing IoT and satellite data."
      ],
      keyChallenges: [
        "Running lightweight computer vision disease classification models directly on low-spec farm smartphones with sub-200ms latency.",
        "Handling multilingual speech recognition across regional Tamil and Hindi farming terminologies with localized vernacular translation.",
        "Correlating heterogeneous IoT soil sensor data (moisture, NPK, pH) with multi-spectral satellite imagery into actionable irrigation alerts."
      ],
      fullStackDetails: {
        frontend: ["Flutter / React Mobile", "Tailwind CSS", "SpeechRecognition Audio Interface", "Canvas Spectral Visualizers"],
        backend: ["Python FastAPI", "Scikit-Learn & PyTorch ML", "NLP Multilingual Translation Engine"],
        databaseAndCloud: ["Firebase Firestore", "PostgreSQL IoT Timeseries", "Satellite Telemetry NDVI Pipeline"],
        toolsAndProtocols: ["OpenCV Computer Vision", "IoT MQTT Protocol", "Google Gemini NLP API", "Weather Radar API"]
      },
      techStack: ["AI/ML", "NLP & Voice AI", "Computer Vision", "IoT Sensors", "Satellite Data", "Python", "Mobile App"],
      impact: "Reduces agricultural risk, lowers production costs, and promotes climate-resilient farming practices.",
      demoType: "agri",
      githubUrl: "https://github.com/GV-07/Green-AI-Smart-Farming"
    },
    {
      id: "zeronet",
      title: "ZeroNet",
      subtitle: "Offline P2P File Transfer App",
      category: "Mobile & P2P",
      featured: true,
      description: "Decentralized peer-to-peer Android application capable of high-speed file transfers in zero-connectivity or disaster recovery environments.",
      keyInnovations: [
        "Leveraged Wi-Fi Aware (Neighbor Awareness Networking - NAN) technology for offline discovery and transfer.",
        "Minimized data vulnerability risks using peer-to-peer encryption protocols.",
        "Streamlined mobile UI architected for rapid single-tap transfers in emergency situations."
      ],
      keyChallenges: [
        "Overcoming fragmented Android OEM Wi-Fi Aware hardware driver variations to achieve rapid, reliable device discovery without internet.",
        "Streaming large multi-megabyte disaster recovery logs and media files over encrypted direct sockets without triggering thermal throttling.",
        "Creating an intuitive single-tap emergency connection flow requiring zero network credentials or manual IP configuration."
      ],
      fullStackDetails: {
        frontend: ["Android Native UI (Kotlin/Java)", "Custom Radial Transfer Gauges", "Material 3 Dark Theme"],
        backend: ["Android Wi-Fi Aware (NAN) Framework", "Java NIO Socket Channels", "Background Transfer Service"],
        databaseAndCloud: ["Room SQLite (Local Transfer History)", "Hardware Encrypted SharedPrefs", "Zero-Cloud Architecture"],
        toolsAndProtocols: ["Wi-Fi Aware (Neighbor Awareness Networking)", "AES-GCM-256 Cryptography", "Direct Socket Streams", "P2P Handshake"]
      },
      techStack: ["Android", "Wi-Fi Aware (NAN)", "P2P Encryption", "Java/Kotlin", "Peer-to-Peer"],
      impact: "Zero-internet high-speed encrypted file transfers for emergency and disaster recovery scenarios.",
      demoType: "p2p",
      githubUrl: "https://github.com/GV-07/ZeroNet-Offline-P2P"
    },
    {
      id: "signup-wizard-replication",
      title: "Signup-Wizard-Replication",
      subtitle: "Multi-Step Onboarding Application",
      category: "Frontend Development & UI/UX",
      featured: false,
      description: "Developed a React-based signup wizard application featuring progressive disclosure to enhance the user onboarding experience. The project focused on building a seamless, interactive multi-step form with dynamic state management and responsive design.",
      keyInnovations: [
        "Implemented a multi-step form architecture with cross-field dependencies and comprehensive form validation to ensure data integrity before submission.",
        "Managed global application state efficiently utilizing the React Context API to handle user inputs seamlessly across multiple form stages.",
        "Designed a responsive user interface using Tailwind CSS and engineered a custom Toast notification system for intuitive error handling and success feedback.",
        "Configured the application build environment using Vite and successfully handled deployment setups for both GitHub Pages and Vercel."
      ],
      keyChallenges: [
        "Maintaining bidirectional validation state across segmented progressive wizard steps with automated rollback and dependency checks.",
        "Orchestrating complex nested wizard state without unnecessary re-renders using optimized React Context selectors.",
        "Building an accessible, lightweight Toast dispatch system with zero third-party library dependencies."
      ],
      fullStackDetails: {
        frontend: ["React 18", "Tailwind CSS", "Progressive Disclosure Forms", "Custom Toast Feedback System"],
        backend: ["Context API State Engine", "Cross-Field Validation Routines", "Mock Submission Endpoints"],
        databaseAndCloud: ["LocalStorage Persistence", "Vercel Edge Deployment", "GitHub Pages CI/CD"],
        toolsAndProtocols: ["Vite Bundler", "Multi-Step Form Wizard", "ESLint", "TypeScript"]
      },
      techStack: ["React", "Tailwind CSS", "Context API", "Vite", "Frontend Development"],
      impact: "Delivers zero-friction progressive user onboarding with atomic validation and instant feedback mechanisms.",
      demoType: "signup",
      githubUrl: "https://github.com/GV-07/Signup-Wizard-Replication"
    },
    {
      id: "gym-member",
      title: "Gym Member",
      subtitle: "Fitness Center Management System",
      category: "Java & Database Management",
      featured: false,
      description: "Developed a Java-based application designed to streamline daily operations and member tracking for fitness centers. The project focuses on structured backend data management and persistent storage integration to handle facility operations.",
      keyInnovations: [
        "Engineered secure database connectivity utilizing DBConfig.java to persist and manage user profiles securely.",
        "Implemented the Data Access Object (DAO) design pattern via MemberDAO.java to cleanly separate core business logic from database operations.",
        "Built a centralized controller, GymManager.java, to handle primary operations and enforce business rules for member management."
      ],
      keyChallenges: [
        "Architecting clean separation of concerns between raw SQL statements and operational controller logic via MemberDAO.",
        "Preventing SQL injection and managing transaction commit lifecycles across concurrent member update queries.",
        "Designing robust connection pooling and configuration management through centralized DBConfig.java routines."
      ],
      fullStackDetails: {
        frontend: ["Java Swing / Desktop UI Console", "Data Entry Validation", "Real-Time Member Log Views"],
        backend: ["Java Core Architecture", "GymManager Business Controller", "MemberDAO Layer"],
        databaseAndCloud: ["MySQL Relational Database", "JDBC Driver", "DBConfig Connection Manager"],
        toolsAndProtocols: ["DAO Pattern", "PreparedStatements", "Transaction Management", "ACID Compliance"]
      },
      techStack: ["Java", "DAO Pattern", "Database Architecture", "Backend Development"],
      impact: "Streamlines member registration, subscription tracking, and persistent database operations with clean architectural separation.",
      demoType: "gym",
      githubUrl: "https://github.com/GV-07/Gym_Member"
    },
    {
      id: "mini-store-inventory",
      title: "Mini Store Inventory",
      subtitle: "Retail Stock Management Solution",
      category: "Retail Tech & Inventory Management",
      featured: false,
      description: "Created a Java utility application aimed at helping small retail stores efficiently track stock levels and manage product details. The system provides a structured approach to streamlining daily inventory operations and database interactions.",
      keyInnovations: [
        "Developed reliable backend database integration through DataBase_Connection.java to securely track inventory and product data.",
        "Engineered core product tracking logic within Product_Manager.java to facilitate the addition, updating, and monitoring of retail items.",
        "Designed the main application execution flow in Inventory_App.java to serve as the primary interface for store staff operations."
      ],
      keyChallenges: [
        "Maintaining accurate stock count synchronization and preventing race conditions during simultaneous replenishment and sales entries.",
        "Establishing resilient database connection pooling via DataBase_Connection.java with graceful reconnection fallback.",
        "Structuring modular Product_Manager CRUD logic to enable seamless category extension and low-latency barcode lookup."
      ],
      fullStackDetails: {
        frontend: ["Inventory_App Terminal & UI Flow", "Stock Alert Display", "Interactive SKU Navigation"],
        backend: ["Java SE", "Product_Manager Logic Engine", "Inventory Service Layer"],
        databaseAndCloud: ["Relational Database (SQL)", "JDBC Connection Pool", "DataBase_Connection Wrapper"],
        toolsAndProtocols: ["Inventory Tracking", "CRUD Operations", "Stock Level Alerts", "SQL Integration"]
      },
      techStack: ["Java", "Inventory Management", "Database Connectivity", "Retail Tech"],
      impact: "Empowers small retail businesses with automated stock tracking, replenishment monitoring, and secure transactional persistence.",
      demoType: "inventory",
      githubUrl: "https://github.com/GV-07/Mini_Store_Inventory"
    },
    {
      id: "notesapp",
      title: "Full-Stack Notes Application (My Notes App)",
      subtitle: "Real-time Responsive CRUD Web App",
      category: "Full Stack",
      featured: false,
      description: "Highly responsive web application that handles real-time database transactions seamlessly without UI lag.",
      keyInnovations: [
        "Developed secure CRUD (Create, Read, Update, Delete) operations using Next.js and MongoDB.",
        "Optimized frontend rendering and state management for zero-lag note creation and searching."
      ],
      keyChallenges: [
        "Eliminating UI stutter during high-frequency auto-saving through debounced optimistic state updates with rollback on network failure.",
        "Designing flexible MongoDB indexing for instant sub-millisecond keyword searching and category filtering across thousands of notes.",
        "Structuring robust serverless API routes with schema validation and sanitization against XSS attacks."
      ],
      fullStackDetails: {
        frontend: ["Next.js (App Router)", "React 18", "Tailwind CSS", "Lucide Icons", "Optimistic UI Hooks"],
        backend: ["Next.js Serverless API Routes", "Node.js", "Zod Validation Schema"],
        databaseAndCloud: ["MongoDB Atlas", "Mongoose ORM", "Vercel Edge Deployment"],
        toolsAndProtocols: ["RESTful CRUD API", "Debounced Auto-Save", "Full-Text Search Indexing", "JSON Web Tokens"]
      },
      techStack: ["Next.js", "MongoDB", "React", "Node.js", "REST API"],
      impact: "Sub-millisecond note synchronization and latency-free database interactions.",
      demoType: "notes",
      githubUrl: "https://github.com/GV-07/My-Notes-App"
    }
  ] as Project[],

  internships: [
    {
      id: "elysian-fs",
      company: "Elysian Intelligence Business Solution",
      role: "Web Development Intern",
      period: "May 2026 – June 2026",
      mode: "Offline",
      highlights: [
        "Optimized responsive full-stack web applications to improve front-end rendering performance.",
        "Accelerated data delivery speed by architecting robust UI layouts and implementing custom API integrations using React.js and JavaScript."
      ],
      skillsGained: ["React.js", "JavaScript", "REST APIs", "UI Performance Optimization"]
    },
    {
      id: "elysian-ds",
      company: "Elysian Intelligence Business Solution",
      role: "Data Science Intern",
      period: "May 2026 – June 2026",
      mode: "Offline",
      highlights: [
        "Engineered predictive statistical models to deliver actionable product analytics and data-driven insights.",
        "Cleaned and processed complex datasets using Python, Pandas, NumPy, and Streamlit."
      ],
      skillsGained: ["Python", "Pandas", "NumPy", "Predictive Modeling", "Streamlit"]
    },
    {
      id: "avantiva",
      company: "Avantiva Engineering & Construction",
      role: "Technical Intern",
      period: "April 2026 – June 2026",
      mode: "Virtual",
      highlights: [
        "Analyzed large-scale infrastructure workflows to understand corporate operational standards and system efficiencies.",
        "Collaborated with cross-functional engineering teams on practical project tasks."
      ],
      skillsGained: ["Workflow Analysis", "System Efficiency", "Cross-functional Collaboration"]
    },
    {
      id: "novitech-fs",
      company: "NoviTech R&D Pvt Ltd",
      role: "Full-Stack Development Intern",
      period: "Jan 2026 – Feb 2026",
      mode: "Virtual",
      highlights: [
        "Engineered responsive full-stack features and server-side logic ensuring zero-latency data processing.",
        "Built seamless database integrations using modern web application architectures."
      ],
      skillsGained: ["Full-Stack Architecture", "Server-Side Logic", "Database Integration"]
    },
    {
      id: "hamari-pahchan",
      company: "Hamari Pahchan NGO",
      role: "Virtual Social Entrepreneur Intern",
      period: "Dec 2025 – Jan 2026",
      mode: "Virtual",
      highlights: [
        "Coordinated community service initiatives and social campaigns to expand regional healthcare outreach.",
        "Led social entrepreneurship teams and organized local blood donation drives."
      ],
      skillsGained: ["Social Entrepreneurship", "Team Leadership", "Community Outreach"]
    },
    {
      id: "novitech-da",
      company: "NoviTech R&D Pvt Ltd",
      role: "Data Analytics Intern",
      period: "Oct 2025 – Nov 2025",
      mode: "Virtual",
      highlights: [
        "Processed and analyzed complex datasets to extract actionable operational insights and patterns.",
        "Engineered data pipelines using Python, Pandas, and statistical modeling techniques."
      ],
      skillsGained: ["Data Pipelines", "Statistical Modeling", "Operational Analytics"]
    },
    {
      id: "novitech-ai",
      company: "NoviTech R&D Pvt Ltd",
      role: "AI Intern",
      period: "Sep 2025 – Oct 2025",
      mode: "Virtual",
      highlights: [
        "Developed artificial intelligence algorithms and intelligent models for automated problem solving.",
        "Engineered AI workflows and neural pipelines using Python and Deep Learning framework tools."
      ],
      skillsGained: ["Artificial Intelligence", "Deep Learning", "Python AI"]
    },
    {
      id: "novitech-ml",
      company: "NoviTech R&D Pvt Ltd",
      role: "ML Intern",
      period: "Nov 2025 – Dec 2025",
      mode: "Virtual",
      highlights: [
        "Developed and deployed intelligent classification models to solve complex data challenges with high predictive accuracy.",
        "Engineered robust machine learning data pipelines using Python, TensorFlow, and Pandas."
      ],
      skillsGained: ["TensorFlow", "Classification Models", "Machine Learning"]
    },
    {
      id: "novitech-uiux",
      company: "NoviTech R&D Pvt Ltd",
      role: "UI/UX Design Intern",
      period: "Feb 2025 – Mar 2025",
      mode: "Virtual",
      highlights: [
        "Designed high-fidelity mockups, wireframes, and interactive user flows to improve application usability.",
        "Boosted user engagement metrics by leveraging prototyping tools like Figma and Miro."
      ],
      skillsGained: ["Figma", "Miro", "Wireframing", "User Experience Design"]
    },
    {
      id: "zetspire-basics-iot",
      company: "Zetspire Technologies Pvt Ltd",
      role: "Basics of IoT Intern",
      period: "Nov 2023 – Dec 2023",
      mode: "Offline",
      highlights: [
        "Learned foundational concepts of Internet of Things, sensor integration, and microcontrollers.",
        "Configured basic circuit topologies and established initial sensor-to-cloud connectivity."
      ],
      skillsGained: ["IoT Fundamentals", "Sensors & Actuators", "Microcontrollers"]
    },
    {
      id: "zetspire-robotics-iot",
      company: "Zetspire Technologies Pvt Ltd",
      role: "Robotics with IoT Intern",
      period: "Feb 2024 – Mar 2024",
      mode: "Offline",
      highlights: [
        "Executed hardware-software technical applications combining robotics control with IoT data channels.",
        "Built integrated communication streams between robotic microcontrollers and real-time IoT software frameworks."
      ],
      skillsGained: ["Robotics Control", "Microcontrollers", "Hardware-Software Integration"]
    },
    {
      id: "zetspire-advanced-iot",
      company: "Zetspire Technologies Pvt Ltd",
      role: "Advanced IoT Intern",
      period: "Jun 2024 – Jul 2024",
      mode: "Offline",
      highlights: [
        "Developed advanced IoT telemetry systems with edge data processing and low-latency protocol communication.",
        "Integrated sensor networks with cloud dashboards for real-time monitoring and analytics."
      ],
      skillsGained: ["Advanced IoT", "Edge Computing", "MQTT & Telemetry"]
    },
    {
      id: "zetspire-3d-design",
      company: "Zetspire Technologies Pvt Ltd",
      role: "3D Designing and Printing Intern",
      period: "Dec 2024 – Jan 2025",
      mode: "Offline",
      highlights: [
        "Modeled custom 3D CAD components and enclosure prototypes tailored for IoT and robotic hardware.",
        "Optimized 3D printing slicing parameters and material specifications for rapid physical prototyping."
      ],
      skillsGained: ["3D CAD Modeling", "3D Printing", "Rapid Prototyping", "Blender", "TinkerCAD"]
    },
    {
      id: "zetspire-drone-dev",
      company: "Zetspire Technologies Pvt Ltd",
      role: "Drone Development Intern",
      period: "Jul 2025 – Aug 2025",
      mode: "Offline",
      highlights: [
        "Engineered drone flight controller configurations, telemetry modules, and autonomous navigation protocols.",
        "Integrated aerial sensor payloads with IoT communication nodes for remote monitoring."
      ],
      skillsGained: ["Drone Systems", "Flight Controllers", "Telemetry & Avionics"]
    }
  ] as Internship[],

  certifications: [
    {
      category: "Competitive Coding & Hackathons",
      items: [
        { title: "TCS CodeVita Season 13 Round 2 Certificate", issuer: "TCS CodeVita" },
        { title: "36-Hour PromptWar Hackathon (Build with AI for Clean Madurai)", issuer: "Google Developer Groups (GDG) Madurai & YI" },
        { title: "Google Digital Marketing", issuer: "Google" }
      ]
    },
    {
      category: "Software Engineering & Cloud",
      items: [
        { title: "Solutions Architecture Job Simulation", issuer: "Forage (Amazon)" },
        { title: "Product Management Certificate", issuer: "Forage" },
        { title: "Technology Job Simulation", issuer: "Deloitte" },
        { title: "Electronic Arts Software Engineering Job Simulation", issuer: "Forage (Electronic Arts)" },
        { title: "Cloud Computing", issuer: "NPTEL" },
        { title: "Azure Devops", issuer: "Infosys Springboard" },
        { title: "CEH v13 Cloud Computing", issuer: "Infosys Springboard" },
        { title: "Overview of Agile & DevOps", issuer: "Infosys Springboard" },
        { title: "Agile Scrum in Practice", issuer: "Infosys Springboard" },
        { title: "Internet of Things 201 Certificate", issuer: "Infosys Springboard" },
        { title: "Advanced Data Engineering with Snowflake Certificate", issuer: "Snowflake" },
        { title: "Apache Iceberg From Zero to Production Data Lakehouse with Snowflake Certificate", issuer: "Snowflake" },
        { title: "Multi-Paradigm Programming with Modern C++", issuer: "Infosys Springboard" },
        { title: "The Modern C++ Challenger", issuer: "Infosys Springboard" }
      ]
    },
    {
      category: "AI & Data Science",
      items: [
        { title: "Deep Learning and AI", issuer: "CodeChef" },
        { title: "Artificial Intelligence", issuer: "Infosys Springboard" },
        { title: "Introduction to Artificial Intelligence", issuer: "Infosys Springboard" },
        { title: "Artificial Intelligence Primer Certification", issuer: "Infosys Springboard" },
        { title: "Generative AI Unleashing", issuer: "Infosys Springboard" },
        { title: "Introduction to OpenAI GPT Models", issuer: "Infosys Springboard" },
        { title: "OpenAI Generative Pre-trained Transformer Models", issuer: "Infosys Springboard" },
        { title: "Prompt Engineering", issuer: "Infosys Springboard" },
        { title: "Generative models for developers", issuer: "Infosys Springboard" },
        { title: "Introduction to Deep Learning", issuer: "Infosys Springboard" },
        { title: "Deep Learning for Developers", issuer: "Infosys Springboard" },
        { title: "Introduction to Natural Language Processing", issuer: "Infosys Springboard" },
        { title: "Computer Vision 101", issuer: "Infosys Springboard" },
        { title: "Introduction to Data Science", issuer: "Infosys Springboard" },
        { title: "Introduction to Robotic Process Automation", issuer: "Infosys Springboard" },
        { title: "Prelude", issuer: "Infosys Springboard" },
        { title: "Tata GenAI Powered Data Analytics", issuer: "Forage (Tata)" },
        { title: "TATA Data Visualisation-Empowering Business with Effective Insights Certificate", issuer: "Forage (Tata)" },
        { title: "Python for Beginners", issuer: "Infosys Springboard" },
        { title: "R Programming Fundamentals", issuer: "Infosys Springboard" },
        { title: "Building AI Agents using n8n", issuer: "Capabl" },
        { title: "Building AI Agents with Snowflake Certificate", issuer: "Snowflake" },
        { title: "Building Generative AI with Snowflake Certificate", issuer: "Snowflake" },
        { title: "Python Programming for Agentic AI Certificate", issuer: "Capabl" },
        { title: "Python Programming in Agentic AI Certificate", issuer: "Capabl" },
        { title: "Analytics using Tableau", issuer: "Infosys Springboard" }
      ]
    },
    {
      category: "Company Technical & Interview Tracks",
      items: [
        { title: "Accolite Coding Interview Questions", issuer: "CodeChef" },
        { title: "Adobe Coding Interview Questions", issuer: "CodeChef" },
        { title: "Amazon Coding Interview Questions", issuer: "CodeChef" },
        { title: "Flipkart Coding Interview Questions", issuer: "CodeChef" },
        { title: "Google Interview Questions", issuer: "CodeChef" },
        { title: "Junglee Games Interview Questions", issuer: "CodeChef" },
        { title: "Maxlinear Coding Interview Questions", issuer: "CodeChef" },
        { title: "Microsoft Coding Interview Questions", issuer: "CodeChef" },
        { title: "Nutanix Coding Interview Questions", issuer: "CodeChef" },
        { title: "PhonePe Interview Questions", issuer: "CodeChef" },
        { title: "TCS Codevita Problems", issuer: "CodeChef" },
        { title: "TCS NQT Coding Questions", issuer: "CodeChef" },
        { title: "Visa Interview Questions", issuer: "CodeChef" },
        { title: "React Interview Questions", issuer: "CodeChef" },
        { title: "React Advanced Interview Questions", issuer: "CodeChef" },
        { title: "Top SQL Interview Questions", issuer: "CodeChef" },
        { title: "Glean Coding Interview Questions", issuer: "CodeChef" },
        { title: "Texas Instruments Coding Interview Questions", issuer: "CodeChef" }
      ]
    },
    {
      category: "Data Structures & Advanced Algorithms",
      items: [
        { title: "Advanced Arrays and Strings", issuer: "CodeChef" },
        { title: "Advanced Graphs", issuer: "CodeChef" },
        { title: "Arrays, Strings & Sorting", issuer: "CodeChef" },
        { title: "Binary Search", issuer: "CodeChef" },
        { title: "Bit Manipulation", issuer: "CodeChef" },
        { title: "Combinatorics", issuer: "CodeChef" },
        { title: "Dynamic programming", issuer: "CodeChef" },
        { title: "Dynamic programming advanced", issuer: "CodeChef" },
        { title: "Graphs", issuer: "CodeChef" },
        { title: "Greedy Algorithms", issuer: "CodeChef" },
        { title: "Learn Greedy Algorithms", issuer: "CodeChef" },
        { title: "Hashing", issuer: "CodeChef" },
        { title: "Heaps", issuer: "CodeChef" },
        { title: "Intermediate Arrays and 2D Arrays", issuer: "CodeChef" },
        { title: "Intermediate Searching and Sorting algorithms", issuer: "CodeChef" },
        { title: "Linked Lists", issuer: "CodeChef" },
        { title: "Number theory", issuer: "CodeChef" },
        { title: "Learn Number theory", issuer: "CodeChef" },
        { title: "Prefix Sum Problems", issuer: "CodeChef" },
        { title: "Recursion", issuer: "CodeChef" },
        { title: "Searching and Sorting Algorithms", issuer: "CodeChef" },
        { title: "Stacks and Queues", issuer: "CodeChef" },
        { title: "Time complexity", issuer: "CodeChef" },
        { title: "Trees and Binary trees", issuer: "CodeChef" },
        { title: "Two Pointers and Sliding Window", issuer: "CodeChef" },
        { title: "Data Structure and Algorithms", issuer: "Infosys Springboard" }
      ]
    },
    {
      category: "Algorithmic Practice",
      items: [
        { title: "Practice Arrays", issuer: "CodeChef" },
        { title: "Practice Binary Search", issuer: "CodeChef" },
        { title: "Practice Linked Lists", issuer: "CodeChef" },
        { title: "Practice Sorting", issuer: "CodeChef" },
        { title: "Practice Stacks and Queues", issuer: "CodeChef" },
        { title: "Practice Strings", issuer: "CodeChef" },
        { title: "Practice Strings - Intermediate", issuer: "CodeChef" }
      ]
    },
    {
      category: "Full-Stack Web & Database Engineering",
      items: [
        { title: "HTML", issuer: "CodeChef" },
        { title: "CSS", issuer: "CodeChef" },
        { title: "JavaScript", issuer: "CodeChef" },
        { title: "Advanced Javascript", issuer: "CodeChef" },
        { title: "Frontend Roadmap using HTML _ CSS _ JS", issuer: "CodeChef" },
        { title: "Web development using JavaScript", issuer: "CodeChef" },
        { title: "Projects using HTML _ CSS", issuer: "CodeChef" },
        { title: "Html_CSS_JS Projects", issuer: "CodeChef" },
        { title: "Javascript Projects for Beginners", issuer: "CodeChef" },
        { title: "React Developer Roadmap", issuer: "CodeChef" },
        { title: "React JS for Front-end development", issuer: "CodeChef" },
        { title: "Full Stack Projects using MERN", issuer: "CodeChef" },
        { title: "Intermediate-level projects using Java", issuer: "CodeChef" },
        { title: "Intermediate-level projects using Cpp", issuer: "CodeChef" },
        { title: "Spring Boot Projects", issuer: "CodeChef" },
        { title: "SQL", issuer: "CodeChef" },
        { title: "SQL Roadmap for Data Analysis", issuer: "CodeChef" },
        { title: "SQL case studies", issuer: "CodeChef" },
        { title: "SQL at Work", issuer: "CodeChef" },
        { title: "SQL Practice Queries", issuer: "CodeChef" },
        { title: "Learn Advanced SQL", issuer: "CodeChef" },
        { title: "Oracle PLSQL - Database Triggers", issuer: "Infosys Springboard" },
        { title: "Full-Stack Web Development with Flask", issuer: "Infosys Springboard" },
        { title: "Human Computer Interaction", issuer: "NPTEL" }
      ]
    },
    {
      category: "MasterClass",
      items: [
        { title: "Data Analytics Masterclass", issuer: "NoviTech R&D Pvt Ltd" },
        { title: "Data Driven Masterclass", issuer: "NoviTech R&D Pvt Ltd" },
        { title: "Freedom with AI MasterClass", issuer: "FreedomwithAI" },
        { title: "The Power of ML", issuer: "Masai MasterClass Program" },
        { title: "UIUX Design Masterclass", issuer: "NoviTech R&D Pvt Ltd" }
      ]
    },
    {
      category: "Cybersecurity & Digital Infrastructure",
      items: [
        { title: "Cybersecurity", issuer: "Forage (Mastercard)" },
        { title: "Cisco Networking Basics", issuer: "Cisco" },
        { title: "Cisco Introduction to Cybersecurity", issuer: "Cisco" },
        { title: "Ethical Hacking & Cybersecurity", issuer: "VaultofCodes" },
        { title: "Privacy & Security in Online Social Media", issuer: "NPTEL" }
      ]
    },
    {
      category: "Co-Curricular Activities",
      items: [
        { title: "National Service Scheme", issuer: "National Service Scheme" },
        { title: "Rotaract Club", issuer: "Rotaract Club of Madurai" },
        { title: "Sethu-Yantra 2k23", issuer: "e-Yantra (IIT Bombay)" },
        { title: "Fuzon 2k24 Symposium", issuer: "Sethu Institute of Technology (IT Department)" },
        { title: "Viksit Bharat Certificate", issuer: "MY Bharat" }
      ]
    },
    {
      category: "Extra-Curricular Activities",
      items: [
        { title: "NationBuilding Case Study Competition Certificate", issuer: "NationBuilding" },
        { title: "Blood Donation", issuer: "Tamil Nadu State AIDS Control Society and the Tamil Nadu State Transfusion Council" },
        { title: "Youth Red Cross-Blood Donation", issuer: "Uyirthuli Blood Centre & Research Centre" }
      ]
    },
    {
      category: "Workshop",
      items: [
        { title: "Gillette Guard Workshop", issuer: "Gillette Guard" },
        { title: "Performance Marketing Workshop", issuer: "GrowthSchool" },
        { title: "Library Workshop", issuer: "Sethu Institute of Technology (Library Department)" },
        { title: "Visionava Workshop", issuer: "Rotaract Club of Salem" }
      ]
    },
    {
      category: "Bootcamp",
      items: [
        { title: "Bootcamp on Agentic AI Acceleration", issuer: "Wrench Wise" },
        { title: "Ignite Bootcamp - Venture Idea Development", issuer: "Wadhwani Foundation" }
      ]
    }
  ] as CertificationCategory[],

  achievements: [
  {
    title: "CodeChef DSA Rating: 2472 (Global Rank 2)",
    detail: "Achieved CodeChef DSA Rating of 2472 (Highest Rating 2472) with Global Rank 2 and Country Rank 1."
  },
  {
    title: "Diamond League in CodeChef",
    detail: "Achieved the elite Diamond League status on CodeChef, demonstrating continuous competitive excellence, top-tier contest standings, and mastery over algorithmic problem solving."
  },
  {
    title: "3537 Problems Solved on CodeChef",
    detail: "Solved 3537 algorithmic, data structure, dynamic programming, and graph optimization problems on CodeChef (gokul_v_3776)."
  },
  {
    title: "CodeChef Rating: 2124 (5★ / Div 1)",
    detail: "Achieved competitive rating of 2124 (Highest Rating 2124, Division 1) with Global Rank 518 and Country Rank 353."
  },
  {
    title: "150+ Professional & Practice Certifications",
    detail: "Earned 150+ industry and practice certifications across Cloud, Generative AI, Competitive Programming, Data Structures, Cybersecurity, and Extra-Curriculars."
  },
  {
    title: "TCS CodeVita Season 13 (2025)",
    detail: "Successfully advanced to Round 2 of the premier Global Coding Contest with Global Rank 1843, placing among top competitive programmers worldwide (Verified Certificate: TCS_CodeVita_Season13_gokul_v_07)."
  },
  {
    title: "36-Hour PromptWar Hackathon (2026)",
    detail: "Competed and engineered a Generative AI Green City Application utilizing cutting-edge GenAI frameworks."
  },
  {
    title: "Competitive Technical Assessments",
    detail: "Qualified for competitive technical assessments including Wipro Intern-L0."
  },
  {
    title: "Co-curricular Hackathons",
    detail: "Participated in Project Expo & Demo, Blind Coding, and No Compiler Hackathon at National Engineering College (2024), and Ignite Bootcamp - Venture Idea Development (2026)."
  },
  {
    title: "CodeChef Contest",
    detail: "Placement Prep Weekends - 02 (PLACEPREP02): Secured Rank 13 with a score of 2350 in the CodeChef Placement Prep Contest."
  }
  ],

  personalityTraits: [
    {
      trait: "Resilient & Disciplined",
      description: "Demonstrated high levels of physical and mental discipline through competitive District Level Shot Put participation."
    },
    {
      trait: "Socially Responsible & Empathetic",
      description: "Cultivated a strong sense of community service by participating in Blood Donation drives and leading social entrepreneurship initiatives at Hamari Pahchan NGO."
    },
    {
      trait: "Adaptable & Innovative",
      description: "Applied creative problem-solving skills to engineer unique technical solutions, such as the AuraMind innovation project."
    },
    {
      trait: "Analytical & Goal-Driven",
      description: "Successfully qualified for competitive technical assessments like Wipro Intern-L0 and TCS CodeVita through persistent preparation and logical reasoning."
    }
  ] as PersonalityTrait[],

  hobbies: [
    "Developing AI-integrated web and mobile applications during weekdays",
    "Engaging in competitive cricket as a skilled bowler on weekends",
    "Active regular blood donor",
    "District Level Player in Shot Put (School Level Athletics)"
  ]
};
