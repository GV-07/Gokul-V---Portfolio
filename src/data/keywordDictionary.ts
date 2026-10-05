export interface KeywordDetail {
  title: string;
  category: 'Frontend & Web' | 'Architecture & Web' | 'Data & Storage' | 'AI & Data Science' | 'Hardware & Embedded' | 'Design & UX' | 'Backend & Security' | 'Core CS & Software' | 'Management & Strategy';
  definition: string;
  whyItMatters: string;
  gokulApplication: string;
}

export const KEYWORD_DICTIONARY: Record<string, KeywordDetail> = {
  "Google Colab": {
    title: "Google Colab",
    category: "AI & Data Science",
    definition: "A hosted Jupyter Notebook service that requires zero setup and provides free cloud access to computing resources including GPUs and TPUs.",
    whyItMatters: "Enables collaborative machine learning research, data analysis, and model training directly in the browser without requiring heavy local hardware.",
    gokulApplication: "Used to train machine learning models and run cryptographic data analysis scripts for the ID-Trace security platform."
  },
  "Full-Stack": {
    title: "Full-Stack Development",
    category: "Architecture & Web",
    definition: "The practice of designing, building, and maintaining both the client-side (front-end) and server-side (back-end) components of an application.",
    whyItMatters: "Ensures seamless end-to-end integration, efficient data flow from the database to the user interface, and holistic product architecture.",
    gokulApplication: "Applied in building end-to-end solutions like integrated dashboards and connected mobile-to-web management systems."
  },
  "Front-End": {
    title: "Front-End Development",
    category: "Frontend & Web",
    definition: "The practice of building user interfaces using HTML, CSS, and JavaScript so users can directly view and interact with web applications.",
    whyItMatters: "Crucial for delivering intuitive user experiences, responsive cross-device layouts, and high-performance interactive interfaces.",
    gokulApplication: "Utilized to craft responsive user dashboards and monitoring panels for tracking peer-to-peer file transfer metrics in ZeroNet."
  },
  "Back-End": {
    title: "Back-End Development",
    category: "Backend & Security",
    definition: "The server-side logic, API development, server configuration, and architecture that power the hidden operations of an application.",
    whyItMatters: "Handles critical business logic, security authentication, routing, and scalable performance behind the scenes.",
    gokulApplication: "Implemented to manage server-side authentication, API routing, and secure data synchronization for cryptographic apps."
  },
  "Database": {
    title: "Database Management",
    category: "Data & Storage",
    definition: "The systematic organization, storage, querying, and security management of structured or unstructured data within an application ecosystem.",
    whyItMatters: "Ensures data integrity, fast query performance, reliable persistence, and robust protection of sensitive user information.",
    gokulApplication: "Used to securely store cryptographic keys, user profiles, and session logs for the ID-Trace security system."
  },
  "React JS": {
    title: "React JS",
    category: "Frontend & Web",
    definition: "A popular open-source JavaScript library created by Meta for building interactive, component-based user interfaces and dynamic single-page applications.",
    whyItMatters: "Allows developers to create reusable UI components, manage state efficiently using virtual DOM reconciliation, and build blazing-fast web apps.",
    gokulApplication: "Used extensively by Gokul in building responsive web applications, interactive split-screen IDE compilers, and his portfolio architecture."
  },
  "React.js": {
    title: "React.js",
    category: "Frontend & Web",
    definition: "A popular open-source JavaScript library created by Meta for building interactive, component-based user interfaces and dynamic single-page applications.",
    whyItMatters: "Allows developers to create reusable UI components, manage state efficiently using virtual DOM reconciliation, and build blazing-fast web apps.",
    gokulApplication: "Used extensively by Gokul in building responsive web applications, interactive split-screen IDE compilers, and his portfolio architecture."
  },
  "Spring MVC": {
    title: "Spring MVC",
    category: "Backend & Security",
    definition: "A Model-View-Controller framework within the Java Spring ecosystem designed to build clean, decoupled, and flexible web applications and REST endpoints.",
    whyItMatters: "Separates business logic, presentation layer, and request routing with robust dependency injection, validation, and request mapping features.",
    gokulApplication: "Implemented by Gokul to structure enterprise Java backend controllers, handle HTTP request lifecycles, and deliver secure data payloads."
  },
  "Spring Boot": {
    title: "Spring Boot",
    category: "Backend & Security",
    definition: "An opinionated, production-ready extension of the Spring framework that accelerates Java microservice and web application development with auto-configuration and embedded servers.",
    whyItMatters: "Eliminates boilerplate XML and complex annotations, enabling rapid deployment of standalone, production-grade Spring-based microservices.",
    gokulApplication: "Applied by Gokul in backend application architecture, REST service scaffolding, and microservice database integration."
  },
  "RESTful APIs": {
    title: "RESTful APIs",
    category: "Backend & Security",
    definition: "Architectural design conforming to REST principles (statelessness, cacheability, standard HTTP methods GET/POST/PUT/DELETE) for networked software systems.",
    whyItMatters: "The universal industry standard for seamless data interchange between diverse frontend clients and scalable cloud microservices.",
    gokulApplication: "Engineered across full-stack projects to interface frontend dashboards with database models, AI endpoints, and third-party APIs."
  },
  "Maven": {
    title: "Maven",
    category: "Core CS & Software",
    definition: "A comprehensive build automation and project management tool primarily for Java projects, managing dependencies, compilation, and package lifecycle via pom.xml.",
    whyItMatters: "Automates dependency resolution, transitive library downloads, test executions, and repeatable builds across team environments.",
    gokulApplication: "Utilized for managing dependencies, packaging JAR/WAR artifacts, and standardizing build lifecycles in Java and Spring applications."
  },
  "Gradle": {
    title: "Gradle",
    category: "Core CS & Software",
    definition: "An advanced, high-performance build automation tool that uses a Groovy or Kotlin DSL, supporting multi-language and multi-project builds with incremental compilation.",
    whyItMatters: "Offers up to 100x faster build speeds through aggressive caching and parallel task execution; powers official Android development builds.",
    gokulApplication: "Used in Android Studio development, APK builds, and modern Java backend dependency automation."
  },
  "Google Gemini": {
    title: "Google Gemini",
    category: "AI & Data Science",
    definition: "Google's state-of-the-art multimodal generative AI model family capable of reasoning across text, code, audio, image, and video with large context windows.",
    whyItMatters: "Enables natural conversational intelligence, multimodal problem solving, advanced code generation, and low-latency agentic workflows.",
    gokulApplication: "Integrated into NodeLab compiler for real-time code analysis, bug fixing, and automated explanation via the official @google/genai SDK."
  },
  "Google Analytics": {
    title: "Google Analytics",
    category: "Management & Strategy",
    definition: "Google's web analytics service that tracks and reports website traffic, user interactions, session durations, conversion funnels, and bounce rates.",
    whyItMatters: "Provides mission-critical operational telemetry to understand user behavior, optimize engagement funnels, and inform data-driven product decisions.",
    gokulApplication: "Configured for portfolio telemetry, user retention monitoring, and web traffic pattern analysis across digital deployments."
  },
  "Google Flow": {
    title: "Google Flow",
    category: "Management & Strategy",
    definition: "Google's workflow orchestration and process automation ecosystem for building streamlined event-driven automations, data flows, and intelligent integration pipelines across Google Cloud and Workspace services.",
    whyItMatters: "Eliminates repetitive manual workflows, connects disparate data sources automatically, and accelerates end-to-end task automation with high reliability.",
    gokulApplication: "Utilized for orchestrating automated operational pipelines, Google Workspace task triggers, and streamlined data integrations."
  },
  "MS Power BI": {
    title: "MS Power BI",
    category: "AI & Data Science",
    definition: "Microsoft's premier business analytics and data visualization platform that empowers developers to connect diverse data sources into rich, interactive reports and KPI dashboards.",
    whyItMatters: "Transforms raw corporate datasets into automated visual executive summaries, real-time metrics, and predictive business intelligence.",
    gokulApplication: "Leveraged during Data Science internships and predictive modeling simulations to design executive reports and visual trend analytics."
  },
  "MS Copilot": {
    title: "MS Copilot",
    category: "AI & Data Science",
    definition: "Microsoft's generative AI ecosystem embedded across developer tools, Microsoft 365, and enterprise workflows powered by advanced foundation models.",
    whyItMatters: "Accelerates engineering productivity, technical documentation synthesis, contextual workflow automation, and intelligent enterprise search.",
    gokulApplication: "Leveraged for AI-assisted programming workflows, rapid code refactoring, technical documentation, and intelligent office productivity."
  },
  "JavaScript": {
    title: "JavaScript",
    category: "Frontend & Web",
    definition: "The core high-level programming language of the Web that enables dynamic client-side scripting, full-stack server development (Node.js), and interactive interfaces.",
    whyItMatters: "Powers over 98% of all websites globally, providing asynchronous handling (promises, async/await), event-driven logic, and universal runtime capability.",
    gokulApplication: "Core language used across Gokul's full-stack web applications, REST API integrations, and frontend UI performance optimizations."
  },
  "REST APIs": {
    title: "REST APIs",
    category: "Backend & Security",
    definition: "Representational State Transfer (REST) is a standardized architectural style for web APIs that allows software systems to communicate over HTTP using JSON data.",
    whyItMatters: "Enables stateless, decoupled communication between client frontends and backend databases across web and mobile platforms.",
    gokulApplication: "Architected by Gokul for connecting React and Next.js frontends to backend services, compiler sandboxes, and database endpoints."
  },
  "UI Performance Optimization": {
    title: "UI Performance Optimization",
    category: "Frontend & Web",
    definition: "The practice of tuning web applications using code-splitting, DOM minimization, image optimization, memoization, and lazy loading to achieve high FPS and instant load times.",
    whyItMatters: "Directly improves user experience, reduces bounce rates, minimizes bandwidth consumption, and boosts accessibility ratings.",
    gokulApplication: "Applied by Gokul during his Web Development Internship at Elysian Intelligence to accelerate data delivery and UI rendering speed."
  },
  "Python": {
    title: "Python",
    category: "AI & Data Science",
    definition: "A high-level, versatile programming language renowned for its clean readability, extensive scientific libraries, and dominant role in AI, Machine Learning, and Data Analytics.",
    whyItMatters: "Provides rich ecosystem support (PyTorch, TensorFlow, Scikit-learn, Pandas) for processing complex datasets and building AI neural models.",
    gokulApplication: "Gokul's primary choice for building AI/ML pipelines, CardioPulse AI diagnostic tools, and data processing automation during his Data Science internship."
  },
  "Power BI": {
    title: "Power BI",
    category: "AI & Data Science",
    definition: "A business analytics service by Microsoft that empowers developers and analysts to visualize complex data and share actionable insights through interactive dashboards.",
    whyItMatters: "Transforms raw corporate data into automated visual executive reports, key performance metrics (KPIs), and trend predictions.",
    gokulApplication: "Utilized during Gokul's Data Science Internship at Technobyte to build business intelligence dashboards and operational data models."
  },
  "Pandas": {
    title: "Pandas",
    category: "AI & Data Science",
    definition: "An essential open-source Python library providing high-performance data structures like DataFrames for data manipulation, cleaning, and statistical analysis.",
    whyItMatters: "Simplifies data wrangling, missing value handling, time-series analysis, and dataset merging required for machine learning model preparation.",
    gokulApplication: "Leveraged in Gokul's Data Science and ML internships to clean dataset noise and structure high-volume medical and operational data."
  },
  "Matplotlib": {
    title: "Matplotlib",
    category: "AI & Data Science",
    definition: "A comprehensive plotting and visualization library in Python for generating static, animated, and interactive publication-quality charts.",
    whyItMatters: "Allows data scientists to visualize dataset distributions, correlation heatmaps, line trends, and model evaluation metrics visually.",
    gokulApplication: "Integrated by Gokul in data analysis pipelines to render statistical trends and health metric distributions in real-time."
  },
  "Tableau": {
    title: "Tableau",
    category: "AI & Data Science",
    definition: "A leading visual analytics and business intelligence platform designed to transform complex raw datasets into interactive, shareable dashboards.",
    whyItMatters: "Enables fast visual exploration of big data without writing extensive custom visualization code.",
    gokulApplication: "Mastered by Gokul in Data Science & Tableau Analytics certifications to construct executive business intelligence dashboards."
  },
  "Data Pipelines": {
    title: "Data Pipelines",
    category: "AI & Data Science",
    definition: "Automated end-to-end systems that ingest, transform, clean, and route raw data from diverse sources into analytical databases or AI inference engines.",
    whyItMatters: "Ensures data consistency, eliminates manual data entry, and guarantees high-quality inputs for real-time machine learning prediction models.",
    gokulApplication: "Engineered by Gokul at Technobyte and NoviTech to process continuous operational data streams into predictive AI features."
  },
  "Statistical Modeling": {
    title: "Statistical Modeling",
    category: "AI & Data Science",
    definition: "The application of probability distributions, regression models, and statistical tests to uncover underlying patterns and correlations in data.",
    whyItMatters: "Forms the mathematical backbone of data science, enabling hypothesis testing, variance analysis, and reliable risk estimation.",
    gokulApplication: "Applied by Gokul in evaluating model statistical confidence, error distributions, and predictive health risk scoring."
  },
  "Operational Analytics": {
    title: "Operational Analytics",
    category: "Management & Strategy",
    definition: "The business discipline of analyzing real-time operational data to streamline workflows, eliminate bottlenecks, and improve system efficiency.",
    whyItMatters: "Bridges the gap between data insights and everyday business execution, optimizing resource usage and operational throughput.",
    gokulApplication: "Utilized during data internships to translate raw operational telemetry into actionable decision matrices."
  },
  "Artificial Intelligence": {
    title: "Artificial Intelligence (AI)",
    category: "AI & Data Science",
    definition: "A domain of Computer Science focused on developing intelligent software capable of perception, reasoning, decision-making, and autonomous problem-solving.",
    whyItMatters: "Drives modern technological breakthroughs across natural language processing, computer vision, recommendation systems, and autonomous robotics.",
    gokulApplication: "Gokul's core specialization — powering his Green AI farming platform, NodeLab Gemini coding assistant, and predictive health tools."
  },
  "Deep Learning": {
    title: "Deep Learning",
    category: "AI & Data Science",
    definition: "A specialized branch of Machine Learning based on multi-layered Artificial Neural Networks (ANNs) that automatically learn features from unstructured data like images and audio.",
    whyItMatters: "Achieves state-of-the-art accuracy in image classification, natural language understanding, speech synthesis, and autonomous vehicles.",
    gokulApplication: "Utilized by Gokul in building computer vision disease detection networks for Green AI and neural classification models."
  },
  "Python AI": {
    title: "Python AI Ecosystem",
    category: "AI & Data Science",
    definition: "The combined suite of Python frameworks (PyTorch, TensorFlow, OpenCV, Scikit-Learn) used to build, train, and deploy intelligent AI systems.",
    whyItMatters: "Provides a unified software stack allowing seamless transition from AI research prototypes to production web deployments.",
    gokulApplication: "Applied during Gokul's AI Internship at NoviTech to engineer automated machine intelligence workflows."
  },
  "TensorFlow": {
    title: "TensorFlow",
    category: "AI & Data Science",
    definition: "An open-source, end-to-end machine learning platform developed by Google for designing, training, and serving deep neural network models.",
    whyItMatters: "Provides high-performance tensor computation across GPUs/TPUs, robust neural network abstractions, and production deployment tools.",
    gokulApplication: "Engineered by Gokul at NoviTech R&D to build and evaluate deep classification models for complex data challenges."
  },
  "Classification Models": {
    title: "Classification Models",
    category: "AI & Data Science",
    definition: "Supervised machine learning algorithms (e.g. Random Forest, SVM, Logistic Regression, CNNs) designed to map input features into discrete target classes.",
    whyItMatters: "Used across industry for medical diagnosis, spam filtering, sentiment analysis, fraud detection, and image categorization.",
    gokulApplication: "Implemented in CardioPulse AI for cardiovascular risk scoring and in NoviTech ML projects with high predictive accuracy."
  },
  "Machine Learning": {
    title: "Machine Learning (ML)",
    category: "AI & Data Science",
    definition: "A subfield of AI focused on building algorithms that automatically learn patterns from data and improve their predictive accuracy over time without explicit programming.",
    whyItMatters: "Powers modern predictive engines, intelligent automation, personalized recommendations, and medical diagnostic platforms.",
    gokulApplication: "Core discipline applied by Gokul across health ML platforms, smart agriculture forecasts, and predictive data pipelines."
  },
  "Figma": {
    title: "Figma",
    category: "Design & UX",
    definition: "A leading web-based vector graphics and interface design tool used for creating interactive wireframes, UI design systems, and software prototypes.",
    whyItMatters: "Enables real-time team collaboration, rapid user interface design iteration, and seamless developer handoff with design tokens.",
    gokulApplication: "Utilized during Gokul's UI/UX Internship at NoviTech to design modern, user-centric web and mobile interfaces."
  },
  "Miro": {
    title: "Miro",
    category: "Design & UX",
    definition: "An interactive digital whiteboarding platform designed for team brainstorming, system architecture mapping, and user flow wireframing.",
    whyItMatters: "Facilitates visual alignment across distributed engineering teams, enabling rapid concept mapping and agile planning.",
    gokulApplication: "Used by Gokul to diagram complex software architectures, user journey maps, and wireframe prototypes."
  },
  "Wireframing": {
    title: "Wireframing",
    category: "Design & UX",
    definition: "The visual blueprinting stage of user interface design that establishes layout structure, navigation hierarchy, and content placement before coding.",
    whyItMatters: "Saves development time by testing usability and layout concepts early before committing technical resources.",
    gokulApplication: "Applied in Gokul's UI/UX projects to structure intuitive mobile app layouts and web application dashboards."
  },
  "User Experience Design": {
    title: "User Experience Design (UX)",
    category: "Design & UX",
    definition: "The discipline of designing digital products so that interactions are intuitive, seamless, accessible, and aligned with user goals.",
    whyItMatters: "Directly determines product adoption, user retention, task completion speed, and overall satisfaction.",
    gokulApplication: "Practiced across Gokul's portfolio projects to ensure high accessibility, clean visual hierarchy, and responsive UI feedback."
  },
  "IoT Fundamentals": {
    title: "IoT Fundamentals",
    category: "Hardware & Embedded",
    definition: "The foundational principles governing the Internet of Things, including sensor data acquisition, microcontroller interfacing, and network protocol basics.",
    whyItMatters: "Bridges the physical world with cloud software, enabling smart cities, industrial automation, and connected agriculture.",
    gokulApplication: "Learned and applied during Gokul's Basics of IoT Internship at Zetspire Technologies to build connected sensor nodes."
  },
  "Sensors & Actuators": {
    title: "Sensors & Actuators",
    category: "Hardware & Embedded",
    definition: "Hardware devices where sensors measure physical metrics (temperature, humidity, light, motion) and actuators convert electrical signals into mechanical movement.",
    whyItMatters: "Forms the primary input and output interface for all physical computing, robotics, and smart IoT systems.",
    gokulApplication: "Configured by Gokul to gather real-time environmental data in smart farming and robotics telemetry systems."
  },
  "Microcontrollers": {
    title: "Microcontrollers",
    category: "Hardware & Embedded",
    definition: "Compact integrated circuits containing a processor core, memory, and programmable input/output pins (such as ESP32, Arduino, or STM32).",
    whyItMatters: "Acts as the embedded brain of smart physical devices, executing real-time firmware to read sensors and control hardware components.",
    gokulApplication: "Programmed by Gokul across multiple Zetspire IoT and robotics internships to handle hardware-software communication."
  },
  "Robotics Control": {
    title: "Robotics Control",
    category: "Hardware & Embedded",
    definition: "The discipline combining feedback loops, sensor readings, and microcontroller algorithms to precisely govern mechanical robot movements and tasks.",
    whyItMatters: "Essential for industrial automation, autonomous drones, robotic arms, and self-driving vehicular systems.",
    gokulApplication: "Developed by Gokul during his Robotics with IoT Internship to build integrated microcontroller communication channels."
  },
  "Hardware-Software Integration": {
    title: "Hardware-Software Integration",
    category: "Hardware & Embedded",
    definition: "The engineering process of establishing reliable low-latency communication between embedded microcontroller hardware firmware and high-level software APIs.",
    whyItMatters: "Ensures seamless telemetry data flow from hardware sensors into web/mobile user dashboards and cloud databases.",
    gokulApplication: "Executed by Gokul to minimize data latency between physical IoT microcontrollers and software management frameworks."
  },
  "Advanced IoT": {
    title: "Advanced IoT",
    category: "Hardware & Embedded",
    definition: "High-level Internet of Things architecture incorporating edge data filtering, distributed sensor networks, low-power mesh connectivity, and cloud telemetry.",
    whyItMatters: "Enables industrial-scale smart automation, predictive equipment maintenance, and real-time remote environmental tracking.",
    gokulApplication: "Engineered by Gokul during his Advanced IoT Internship at Zetspire Technologies to build real-time monitoring telemetry systems."
  },
  "Edge Computing": {
    title: "Edge Computing",
    category: "Hardware & Embedded",
    definition: "The architectural model of processing sensor data locally on edge hardware devices near the data source rather than transmitting raw streams to distant cloud servers.",
    whyItMatters: "Dramatically reduces network bandwidth, eliminates cloud server latency, and enables real-time offline decision making.",
    gokulApplication: "Applied by Gokul in IoT and Green AI mobile systems to perform real-time local sensor filtering and computer vision inferencing."
  },
  "MQTT & Telemetry": {
    title: "MQTT & Telemetry Protocols",
    category: "Hardware & Embedded",
    definition: "MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe network protocol designed for low-bandwidth, high-latency IoT sensor networks.",
    whyItMatters: "Minimizes network overhead and power consumption while delivering reliable real-time sensor measurements over mobile connections.",
    gokulApplication: "Integrated by Gokul for transmitting live IoT farm telemetry and robotic sensor readings to cloud dashboards."
  },
  "3D CAD Modeling": {
    title: "3D CAD Modeling",
    category: "Hardware & Embedded",
    definition: "Computer-Aided Design (CAD) software techniques used to construct precise 3D digital geometric models of mechanical parts and physical hardware enclosures.",
    whyItMatters: "Essential for custom hardware design, enabling engineers to inspect, simulate, and refine physical components before manufacturing.",
    gokulApplication: "Practiced during Gokul's 3D Designing and Printing Internship at Zetspire to model custom IoT and robotic hardware enclosures."
  },
  "3D Printing": {
    title: "3D Printing & Additive Manufacturing",
    category: "Hardware & Embedded",
    definition: "The process of fabricating physical three-dimensional objects layer-by-layer directly from digital 3D CAD computer models.",
    whyItMatters: "Allows rapid custom hardware prototyping, reducing fabrication costs and turn-around time from months to hours.",
    gokulApplication: "Executed by Gokul to produce custom physical prototypes for robotic enclosures and sensor housing."
  },
  "Blender": {
    title: "Blender 3D",
    category: "Design & UX",
    definition: "A free and open-source 3D creation suite supporting the entire 3D pipeline — modeling, rigging, animation, simulation, rendering, compositing, and motion tracking.",
    whyItMatters: "The industry standard for open-source 3D asset creation, photorealistic rendering, and complex geometric mesh editing.",
    gokulApplication: "Utilized by Gokul during his 3D Designing and Printing Internship at Zetspire to sculpt complex physical hardware enclosures and rendering digital prototypes."
  },
  "TinkerCAD": {
    title: "TinkerCAD",
    category: "Hardware & Embedded",
    definition: "An intuitive web-based 3D modeling and CAD tool by Autodesk designed for fast constructive solid geometry (CSG) modeling and electronics circuit simulation.",
    whyItMatters: "Enables rapid geometric modeling of functional enclosures, mechanical brackets, and rapid physical prototyping before 3D printing.",
    gokulApplication: "Leveraged by Gokul to design precision 3D-printable physical components and enclosure mounts for IoT hardware modules."
  },
  "Rapid Prototyping": {
    title: "Rapid Prototyping",
    category: "Core CS & Software",
    definition: "The strategy of quickly building functional physical or software prototypes to test ideas, validate mechanics, and iterate based on user feedback.",
    whyItMatters: "Accelerates innovation cycles and identifies structural or usability defects early in the development timeline.",
    gokulApplication: "Applied across Gokul's hackathons, IoT hardware builds, and full-stack web application development cycles."
  },
  "Drone Systems": {
    title: "Drone Systems & UAVs",
    category: "Hardware & Embedded",
    definition: "Unmanned Aerial Vehicle (UAV) engineering encompassing flight avionics, motor ESC controllers, payload sensors, and autonomous ground station software.",
    whyItMatters: "Powers aerial mapping, agricultural crop inspection, search-and-rescue operations, and autonomous logistics delivery.",
    gokulApplication: "Engineered by Gokul during his Drone Development Internship at Zetspire to configure flight telemetry and aerial sensor payloads."
  },
  "Flight Controllers": {
    title: "Flight Controllers",
    category: "Hardware & Embedded",
    definition: "The embedded microprocessor on a drone that reads IMU gyroscopes, accelerometers, and GPS metrics to continuously calculate rotor speeds and stabilize flight.",
    whyItMatters: "Serves as the central autopilot brain of an aircraft, maintaining steady hovering and navigating autonomous waypoint routes.",
    gokulApplication: "Configured and calibrated by Gokul to ensure precise UAV flight stability and telemetry relay."
  },
  "Telemetry & Avionics": {
    title: "Telemetry & Avionics",
    category: "Hardware & Embedded",
    definition: "Wireless radio communication hardware that streams live flight data (altitude, airspeed, battery level, GPS coordinates) from aircraft avionics to ground stations.",
    whyItMatters: "Provides pilot and ground software with real-time situational awareness and emergency return-to-home safeguards.",
    gokulApplication: "Integrated in Gokul's drone and IoT projects to enable real-time remote monitoring and flight telemetry log recording."
  },
  "Social Entrepreneurship": {
    title: "Social Entrepreneurship",
    category: "Management & Strategy",
    definition: "The practice of launching and operating innovative ventures that specifically target pressing societal, community, or environmental challenges.",
    whyItMatters: "Combines sustainable business models with technology to drive positive social change and community empowerment.",
    gokulApplication: "Practiced during Gokul's Virtual Social Entrepreneurship Internship at Edunet Foundation to design impact-driven tech solutions."
  },
  "Virtual Incubation": {
    title: "Virtual Incubation",
    category: "Management & Strategy",
    definition: "A digital startup support framework providing remote venture mentorship, business model design, seed pitch prep, and collaborative tools.",
    whyItMatters: "Democratizes access to startup resources, allowing global founders to build and pitch viable tech ventures from anywhere.",
    gokulApplication: "Engaged in virtual incubation at Edunet Foundation, developing social innovation blueprints and market viability strategies."
  },
  "Pitching & Venture Prep": {
    title: "Pitching & Venture Prep",
    category: "Management & Strategy",
    definition: "The process of crafting compelling pitch decks, technical architecture summaries, and market viability strategies to present to investors and competitions.",
    whyItMatters: "Crucial for securing venture capital funding, incubator acceptance, and strategic industry partnerships.",
    gokulApplication: "Mastered by Gokul in pitch competitions to articulate the technical value and societal impact of his engineering projects."
  },
  "Java": {
    title: "Java",
    category: "Core CS & Software",
    definition: "A robust, object-oriented, class-based programming language built on the 'Write Once, Run Anywhere' JVM paradigm.",
    whyItMatters: "Powers enterprise backends, high-performance distributed systems, and core Android mobile platforms globally.",
    gokulApplication: "One of Gokul's primary programming languages, heavily utilized in Data Structures & Algorithms and competitive programming."
  },
  "C++": {
    title: "C++",
    category: "Core CS & Software",
    definition: "A powerful, high-performance general-purpose programming language providing low-level memory management and object-oriented abstractions.",
    whyItMatters: "The industry standard for competitive programming, operating system kernels, game engines, and real-time execution engines.",
    gokulApplication: "Mastered by Gokul for fast algorithmic problem solving, memory optimization, and Modern C++ certification courses."
  },
  "Data Structure & Algorithms (DSA)": {
    title: "Data Structures & Algorithms (DSA)",
    category: "Core CS & Software",
    definition: "The core CS discipline of organizing data efficiently (arrays, trees, graphs, heaps) and designing optimal step-by-step algorithms (dynamic programming, greedy, binary search).",
    whyItMatters: "Forms the fundamental metric of computer software efficiency, enabling sub-linear search time and low memory complexity.",
    gokulApplication: "Proven track record with 1500+ problems solved on CodeChef (2★, Division 3) and competitive coding proficiency."
  },
  "Computer Vision": {
    title: "Computer Vision (CV)",
    category: "AI & Data Science",
    definition: "A domain of AI enabling software to extract, process, and understand visual information from digital images and real-time camera video streams.",
    whyItMatters: "Enables medical image diagnosis, facial recognition, autonomous driving, quality control, and agricultural crop inspection.",
    gokulApplication: "Engineered in Green AI to perform mobile camera-based real-time crop disease diagnosis and soil spectral analysis."
  },
  "NLP & Voice AI": {
    title: "Natural Language Processing (NLP)",
    category: "AI & Data Science",
    definition: "A field of AI enabling computers to comprehend, analyze, generate, and speak human language naturally across voice and text channels.",
    whyItMatters: "Powers modern voice assistants, multilingual neural translation, sentiment analyzers, and intelligent chatbots.",
    gokulApplication: "Integrated in Green AI to create a multilingual voice assistant supporting English, Tamil, and Hindi for inclusive farmer guidance."
  },
  "Google Gemini API": {
    title: "Google Gemini API & GenAI SDK",
    category: "AI & Data Science",
    definition: "Google's next-generation multimodal AI SDK (@google/genai) allowing developers to integrate cutting-edge LLMs directly into full-stack applications.",
    whyItMatters: "Enables real-time code generation, intelligent error debugging, natural conversation, and multimodal reasoning in software.",
    gokulApplication: "Integrated by Gokul in NodeLab online compiler to provide real-time AI code debugging and syntax suggestions."
  },
  "Firebase": {
    title: "Firebase Cloud Services",
    category: "Backend & Security",
    definition: "Google's comprehensive backend-as-a-service (BaaS) providing real-time databases, Firestore, authentication, and cloud messaging.",
    whyItMatters: "Accelerates app development by providing instant real-time data sync, security rules, and serverless infrastructure.",
    gokulApplication: "Used in ID-Trace fraud detection and mobile apps for instantaneous data synchronization and user verification."
  },
  "SHA-256 Hashing": {
    title: "SHA-256 Cryptographic Hashing",
    category: "Backend & Security",
    definition: "A cryptographic hash function that converts input data of any size into a fixed 256-bit unique digital fingerprint, guaranteeing data integrity.",
    whyItMatters: "Forms the cryptographic bedrock of blockchains, digital signatures, password security, and tamper-proof verification systems.",
    gokulApplication: "Utilized in ID-Trace to generate immutable digital twin fingerprints for supply chain counterfeit detection."
  },
  "Wi-Fi Aware (NAN)": {
    title: "Wi-Fi Aware (Neighbor Awareness Networking)",
    category: "Hardware & Embedded",
    definition: "An Android protocol enabling devices to discover and transfer data directly to nearby peers without an active internet or cellular connection.",
    whyItMatters: "Critical for zero-internet communication, offline P2P data sharing, and disaster recovery emergency networks.",
    gokulApplication: "Implemented in ZeroNet to achieve high-speed offline peer-to-peer file transfers during zero-connectivity conditions."
  },
  "MySQL": {
    title: "MySQL",
    category: "Backend & Security",
    definition: "A globally leading open-source Relational Database Management System (RDBMS) based on Structured Query Language (SQL) for managing structured data.",
    whyItMatters: "Provides ACID-compliant transactional consistency, high concurrency, and reliable structured storage for enterprise applications.",
    gokulApplication: "Applied by Gokul for schema design, relational data modeling, query optimization, and structured database backends."
  },
  "PL/SQL": {
    title: "PL/SQL",
    category: "Backend & Security",
    definition: "Procedural Language/Structured Query Language (PL/SQL) is an extension of SQL combining relational data manipulation with procedural programming constructs.",
    whyItMatters: "Enables developers to execute complex business logic directly on the database engine through stored procedures, functions, packages, and triggers.",
    gokulApplication: "Leveraged for database programming, automated stored procedure creation, data validation triggers, and backend database logic."
  },
  "MongoDB": {
    title: "MongoDB",
    category: "Backend & Security",
    definition: "A document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents with dynamic schemas.",
    whyItMatters: "Offers horizontal scalability, flexible schema design, and seamless integration with modern JavaScript/TypeScript full-stack applications.",
    gokulApplication: "Utilized in Gokul's full-stack web applications and notes apps for real-time CRUD operations without schema friction."
  },
  "GitHub": {
    title: "GitHub",
    category: "Core CS & Software",
    definition: "A cloud-based Git repository hosting platform providing version control, collaborative code reviews, automated CI/CD pipelines, and project tracking.",
    whyItMatters: "The global epicenter of software collaboration, continuous deployment, issue management, and open-source contribution.",
    gokulApplication: "Active engineering hub where Gokul maintains his open-source repositories, project commits, and deployment automation."
  },
  "VS Code": {
    title: "Visual Studio Code (VS Code)",
    category: "Core CS & Software",
    definition: "A lightweight, powerful, and highly extensible source-code editor developed by Microsoft supporting multi-language debugging, Git integration, and extensions.",
    whyItMatters: "The most popular developer environment worldwide, providing rich language server support, terminal integration, and rapid productivity.",
    gokulApplication: "Gokul's primary integrated development environment for writing full-stack code, Python AI scripts, and modern C++ applications."
  },
  "Google Android Studio": {
    title: "Google Android Studio",
    category: "Frontend & Web",
    definition: "The official Integrated Development Environment (IDE) for Android application development based on JetBrains IntelliJ IDEA software.",
    whyItMatters: "Provides visual layout editors, Gradle build systems, Android device emulators, and real-time APK profiling tools.",
    gokulApplication: "Used to develop ID-Trace cryptographic security app and ZeroNet Wi-Fi Aware offline peer-to-peer file transfer mobile apps."
  },
  "Google AI Studio": {
    title: "Google AI Studio",
    category: "AI & Data Science",
    definition: "A web-based prototyping environment by Google for experimenting with Gemini models, system instructions, multimodal prompts, and generating API integration code.",
    whyItMatters: "Accelerates AI application development by providing instant sandbox testing and zero-friction generation of production @google/genai SDK code.",
    gokulApplication: "Utilized to prototype Gemini API prompts, fine-tune conversational behaviors, and integrate AI capabilities into NodeLab."
  },
  "Google Antigravity IDE": {
    title: "Google Antigravity IDE",
    category: "Core CS & Software",
    definition: "An advanced AI-powered agentic coding and deployment platform leveraging cutting-edge LLMs for full-stack autonomous application engineering.",
    whyItMatters: "Empowers developers to rapidly synthesize full-stack web applications, automate debugging, and deploy production-ready cloud solutions.",
    gokulApplication: "Leveraged for full-stack web engineering, rapid application prototyping, and automated software workflows."
  },
  "Google Firebase Studio": {
    title: "Google Firebase Studio",
    category: "Backend & Security",
    definition: "Google's developer toolset and cloud console for provisioning Firestore databases, Firebase Authentication, Cloud Functions, and real-time backend sync.",
    whyItMatters: "Streamlines cloud database setup, real-time sync listeners, and user security rules across web and mobile platforms.",
    gokulApplication: "Configured by Gokul to manage real-time databases, user authentication, and cloud infrastructure for mobile and web systems."
  },
  "Google Cloud Firestore": {
    title: "Google Cloud Firestore",
    category: "Backend & Security",
    definition: "A flexible, scalable NoSQL cloud document database for mobile, web, and server development from Firebase and Google Cloud.",
    whyItMatters: "Keeps data in sync across client apps through realtime listeners, offers offline support for mobile and web, and provides expressive querying.",
    gokulApplication: "Applied by Gokul for structured NoSQL document storage, live state synchronization, and secure cloud database backends."
  },
  "Google Docs": {
    title: "Google Docs",
    category: "Management & Strategy",
    definition: "A cloud-based real-time collaborative word processor offering document editing, revision history, and intelligent collaboration tools.",
    whyItMatters: "Enables seamless multi-stakeholder collaboration on software requirement specifications (SRS), project documentation, and reports.",
    gokulApplication: "Used for drafting technical design documents, internship project documentation, and collaborative engineering reports."
  },
  "Google Sheets": {
    title: "Google Sheets",
    category: "Management & Strategy",
    definition: "A cloud-based spreadsheet program providing real-time data calculations, formula functions, automated charts, and App Script automations.",
    whyItMatters: "Facilitates collaborative data tracking, automated formula processing, and fast structured data organization.",
    gokulApplication: "Utilized for data collection, dataset cleaning tracking, project roadmaps, and internship milestone logs."
  },
  "Google Slides": {
    title: "Google Slides",
    category: "Management & Strategy",
    definition: "A collaborative presentation software tool for designing dynamic visual slide decks and technical presentations.",
    whyItMatters: "Essential for communicating engineering architectures, presenting pitch decks, and conducting project demonstrations.",
    gokulApplication: "Used by Gokul to craft pitch decks and technical presentations for innovation hackathons and project demos."
  },
  "Google Form": {
    title: "Google Forms",
    category: "Management & Strategy",
    definition: "A survey administration and data collection tool allowing automated question creation, real-time responses, and spreadsheet linkage.",
    whyItMatters: "Simplifies user research, gathering stakeholder feedback, and collecting experimental dataset surveys.",
    gokulApplication: "Used for conducting user experience surveys, gathering feedback on mobile apps, and collecting academic project input."
  },
  "Google NotebookLM": {
    title: "Google NotebookLM",
    category: "AI & Data Science",
    definition: "An AI-powered personalized research assistant grounded in uploaded source documents, powered by Google's Gemini models.",
    whyItMatters: "Transforms static technical documentation, research papers, and codebases into interactive synthesized research notebooks.",
    gokulApplication: "Leveraged for synthesizing complex technical research papers, deep document analysis, and accelerated learning workflows."
  },
  "Wordpress": {
    title: "Wordpress",
    category: "Frontend & Web",
    definition: "An open-source Content Management System (CMS) that powers a substantial portion of the global web with customizable themes, plugins, and REST API support.",
    whyItMatters: "Enables fast content publishing, custom template development, and web asset management.",
    gokulApplication: "Utilized for content management, rapid web design prototyping, and client web layout deployments."
  },
  "MS Word": {
    title: "Microsoft Word",
    category: "Management & Strategy",
    definition: "The industry-standard desktop and cloud word processing software for creating formatted reports, professional resumes, and formal documentation.",
    whyItMatters: "Provides advanced typography, layout formatting, automated table of contents, and cross-referencing for official publications.",
    gokulApplication: "Used for authoring formal academic project proposals, technical reports, and curriculum vitae documentation."
  },
  "MS Excel": {
    title: "Microsoft Excel",
    category: "AI & Data Science",
    definition: "The industry-standard spreadsheet software featuring pivot tables, advanced formulas (VLOOKUP, INDEX/MATCH), macros, and data visualization.",
    whyItMatters: "The foundational tool for financial modeling, quantitative data analysis, and statistical summary reporting.",
    gokulApplication: "Applied by Gokul for numerical data modeling, statistical summaries, pivot table analysis, and dataset preparation."
  },
  "MS Powerpoint": {
    title: "Microsoft PowerPoint",
    category: "Management & Strategy",
    definition: "A presentation graphics program designed to create professional visual slide decks with animations, diagrams, and multimedia elements.",
    whyItMatters: "Widely used in corporate and academic settings to deliver executive summaries, technical defenses, and venture presentations.",
    gokulApplication: "Leveraged to present technical project defenses, engineering architecture overviews, and academic seminars."
  },
  "Critical Thinking": {
    title: "Critical Thinking",
    category: "Management & Strategy",
    definition: "The objective analysis and disciplined evaluation of complex technical problems, constraints, and data to form reasoned judgments and optimal solutions.",
    whyItMatters: "Essential for debugging root causes, evaluating architectural trade-offs, and avoiding cognitive biases in engineering decisions.",
    gokulApplication: "Demonstrated across competitive programming on CodeChef and selecting optimal system architectures for IoT and AI projects."
  },
  "Problem Solving": {
    title: "Problem Solving",
    category: "Core CS & Software",
    definition: "The systematic method of breaking down intricate computational and engineering challenges into modular, algorithmically verifiable sub-problems.",
    whyItMatters: "The hallmark of great software engineers, enabling fast resolution of high-severity bugs and efficient algorithmic design.",
    gokulApplication: "Evidenced by 3482 solved problems on CodeChef, 5-star rating (2124, Div 1), 2389 DSA rating (Global Rank 6), and reaching Round 2 globally in TCS CodeVita Season 13."
  },
  "System Architecture": {
    title: "System Architecture",
    category: "Core CS & Software",
    definition: "The conceptual model and structural blueprint defining the components, behaviors, data flow, and interfaces of complex software systems.",
    whyItMatters: "Guarantees scalability, maintainability, low latency, fault tolerance, and security across distributed environments.",
    gokulApplication: "Architected split-screen IDE sandboxes in NodeLab, peer-to-peer Wi-Fi Aware mesh protocols in ZeroNet, and real-time smart agriculture telemetry in Green AI."
  },
  "Software Development": {
    title: "Software Development",
    category: "Core CS & Software",
    definition: "The end-to-end discipline of designing, writing, testing, profiling, and deploying reliable software applications across the SDLC.",
    whyItMatters: "Drives modern digital transformation and delivers mission-critical software tools across web, cloud, mobile, and embedded platforms.",
    gokulApplication: "Applied across 6 full-stack and mobile applications and 14 technical internships at companies including NoviTech, Zetspire, and Elysian."
  },
  "Feature Development": {
    title: "Feature Development",
    category: "Core CS & Software",
    definition: "The structured process of translating user requirements and product specs into production-ready software features with tests and documentation.",
    whyItMatters: "Ensures rapid product delivery while maintaining high software velocity, code readability, and backward compatibility.",
    gokulApplication: "Built split-screen compilation, instant Gemini AI debugging, real-time disease detection, and Wi-Fi Aware transfer protocols."
  },
  "Code Quality": {
    title: "Code Quality",
    category: "Core CS & Software",
    definition: "The adherence to clean code standards, type safety, modular architecture, optimal asymptotic complexity, and thorough error handling.",
    whyItMatters: "Minimizes technical debt, accelerates onboarding, prevents security vulnerabilities, and ensures long-term software robustness.",
    gokulApplication: "Practiced through rigorous TypeScript typing, ESLint compliance, DRY principles, and modular architecture across all web and mobile codebases."
  },
  "Code Review": {
    title: "Code Review",
    category: "Core CS & Software",
    definition: "The peer review practice of inspecting source code for logical bugs, security flaws, performance bottlenecks, and architectural conformance.",
    whyItMatters: "Increases codebase reliability, distributes system knowledge, and maintains team coding conventions.",
    gokulApplication: "Utilized during full-stack engineering internships and collaborative GitHub pull request workflows at NoviTech R&D."
  },
  "Object-Oriented Design": {
    title: "Object-Oriented Design (OOD)",
    category: "Core CS & Software",
    definition: "A design paradigm centered on principles like SOLID, encapsulation, polymorphism, inheritance, and design patterns (Factory, Observer, Singleton).",
    whyItMatters: "Creates extensible, loosely coupled codebases capable of evolving without cascading regressions.",
    gokulApplication: "Leveraged in Java and C++ application architectures, Android service lifecycles, and modular full-stack backend handlers."
  },
  "Product Management": {
    title: "Product Management",
    category: "Management & Strategy",
    definition: "The organizational function guiding the lifecycle of a product from customer discovery and roadmapping to feature prioritization and launch.",
    whyItMatters: "Aligns engineering execution with genuine user needs, business viability, and strategic market opportunities.",
    gokulApplication: "Demonstrated through Forage Product Management certification, Wadhwani Foundation Venture Idea Bootcamp, and roadmapping flagship applications."
  },
  "Project Planning": {
    title: "Project Planning",
    category: "Management & Strategy",
    definition: "The disciplined process of defining project scopes, milestone schedules, dependency paths, and resource allocations for timely execution.",
    whyItMatters: "Prevents scope creep, manages project risk, and ensures predictable software delivery cycles.",
    gokulApplication: "Applied across 14 industry internships and multiple parallel engineering builds to consistently deliver on deadlines."
  },
  "Performance Management": {
    title: "Performance Management",
    category: "Management & Strategy",
    definition: "The systematic tracking, benchmarking, and optimization of both system execution metrics and team delivery milestones.",
    whyItMatters: "Maintains optimal engineering velocity, system responsiveness, and SLA compliance.",
    gokulApplication: "Utilized in optimizing UI frame rates, backend execution response times, and project milestone velocity."
  },
  "Strategic Thinking": {
    title: "Strategic Thinking",
    category: "Management & Strategy",
    definition: "The capability to analyze long-term technology trajectories, market dynamics, and competitive advantages to position products for sustained impact.",
    whyItMatters: "Enables organizations to invest in high-leverage architectural foundations rather than short-sighted temporary fixes.",
    gokulApplication: "Applied in conceptualizing Green AI for agrarian sustainability and ZeroNet for resilient off-grid communication."
  },
  "Design Thinking": {
    title: "Design Thinking",
    category: "Design & UX",
    definition: "A human-centered iterative methodology encompassing Empathize, Define, Ideate, Prototype, and Test to solve complex user problems.",
    whyItMatters: "Uncovers unmet user pain points, validates assumptions rapidly, and leads to intuitive digital product experiences.",
    gokulApplication: "Applied during UI/UX internships at NoviTech to design Figma prototypes and intuitive user flows for mobile and desktop applications."
  },
  "Cybersecurity": {
    title: "Cybersecurity",
    category: "Backend & Security",
    definition: "The comprehensive practice of protecting networks, servers, databases, and client devices from unauthorized access, attacks, or damage.",
    whyItMatters: "Critical for safeguarding confidential user data, preserving system integrity, and maintaining organizational trust.",
    gokulApplication: "Backed by Forage Mastercard Cybersecurity and Cisco Cybersecurity certifications, VaultofCodes Ethical Hacking, and SHA-256 blockchain verification in ID-Trace."
  },
  "Web Security": {
    title: "Web Security",
    category: "Backend & Security",
    definition: "Securing web applications against OWASP Top 10 vulnerabilities including XSS, CSRF, SQL Injection, SSRF, and broken access controls.",
    whyItMatters: "Prevents data breaches, credential harvesting, and remote code execution in web platforms.",
    gokulApplication: "Integrated into NodeLab compiler sandbox security, server-side API proxy routing, and sanitized database query handlers."
  },
  "Security Awareness": {
    title: "Security Awareness",
    category: "Backend & Security",
    definition: "Knowledge and vigilance regarding social engineering, phishing vectors, credential hygiene, and operational security best practices.",
    whyItMatters: "Mitigates human-layer security vulnerabilities which represent the vast majority of modern enterprise breaches.",
    gokulApplication: "Certified via Cisco Cybersecurity, VaultofCodes Ethical Hacking, and NPTEL Privacy & Security in Online Social Media."
  },
  "Security Training": {
    title: "Security Training",
    category: "Backend & Security",
    definition: "Formal education and technical drills on vulnerability mitigation, threat modeling, incident response, and defensive coding practices.",
    whyItMatters: "Instills security-first engineering mindsets across development teams from day one.",
    gokulApplication: "Completed practical defense labs in Cisco Networking Basics, CEH v13 Cloud Computing, and Deloitte Job Simulation."
  },
  "Computer Networking": {
    title: "Computer Networking",
    category: "Core CS & Software",
    definition: "The protocols, hardware architectures, and communication layers (OSI Model, TCP/IP, DNS, HTTP/3, Routing) connecting computing systems.",
    whyItMatters: "The underlying substrate powering the global Internet, cloud infrastructure, and distributed microservices.",
    gokulApplication: "Certified in Cisco Networking Basics; applied in socket programming, Wi-Fi Aware NAN peer discovery, and REST/WebSocket communication."
  },
  "Data Analysis": {
    title: "Data Analysis",
    category: "AI & Data Science",
    definition: "The process of inspecting, cleansing, transforming, and modeling data to discover useful information, inform conclusions, and support decision-making.",
    whyItMatters: "Transforms vast unorganized data into actionable intelligence and strategic business direction.",
    gokulApplication: "Conducted during Data Science internships and Tata GenAI analytics simulations using Python, Pandas, and interactive dashboards."
  },
  "Data Modeling": {
    title: "Data Modeling",
    category: "Backend & Security",
    definition: "The structural formulation of database schemas, entity-relationship diagrams (ERDs), relational normalization, and document structures.",
    whyItMatters: "Ensures data integrity, accelerates query execution performance, and prevents duplicate or orphaned records.",
    gokulApplication: "Engineered normalized relational schemas in MySQL/PL-SQL and flexible NoSQL document models in MongoDB and Firestore."
  },
  "Exploratory Data Analysis": {
    title: "Exploratory Data Analysis (EDA)",
    category: "AI & Data Science",
    definition: "An approach to analyzing datasets to summarize their main characteristics, often with visual methods, before formal modeling.",
    whyItMatters: "Reveals outliers, anomalies, collinearities, and underlying probability distributions essential for selecting proper ML algorithms.",
    gokulApplication: "Applied across health datasets in CardioPulse AI and agricultural telemetry in Green AI to prepare high-confidence model inputs."
  },
  "Data Interpretation": {
    title: "Data Interpretation",
    category: "AI & Data Science",
    definition: "The critical capability to extract meaningful narratives, correlations, and business significance from analytical charts and statistical models.",
    whyItMatters: "Bridges the gap between raw statistical output and high-impact strategic business actions.",
    gokulApplication: "Utilized during Data Analytics internships to explain model accuracy, confusion matrices, and risk scoring metrics to stakeholders."
  },
  "Data Quality Management": {
    title: "Data Quality Management",
    category: "AI & Data Science",
    definition: "The continuous monitoring and validation of data completeness, accuracy, consistency, and timeliness across ingestion pipelines.",
    whyItMatters: "Guarantees 'garbage in, garbage out' does not compromise AI/ML prediction models or corporate financial reporting.",
    gokulApplication: "Implemented data cleansing and validation filters across sensor inputs in IoT platforms and data ingestion scripts."
  },
  "Data Visualization Tools": {
    title: "Data Visualization Tools",
    category: "AI & Data Science",
    definition: "Software suites (Tableau, Power BI, Matplotlib, Recharts, D3) used to render data into intuitive visual charts, maps, and dashboards.",
    whyItMatters: "Enables non-technical stakeholders to quickly grasp complex trends, variances, and correlations in real time.",
    gokulApplication: "Certified in Tableau; built interactive visualizations across Streamlit health diagnostics and React portfolio dashboards."
  },
  "Predictive Analytics": {
    title: "Predictive Analytics",
    category: "AI & Data Science",
    definition: "The branch of advanced analytics using statistical algorithms and machine learning to forecast future outcomes based on historical patterns.",
    whyItMatters: "Empowers proactive preventative maintenance, early disease diagnosis, accurate demand forecasting, and risk mitigation.",
    gokulApplication: "Built CardioPulse AI for cardiovascular risk prediction and Green AI for crop yield and disease outbreak forecasting."
  },
  "Model Selection": {
    title: "Model Selection",
    category: "AI & Data Science",
    definition: "The rigorous process of choosing the most appropriate machine learning algorithm based on problem type, dataset size, interpretability, and compute constraints.",
    whyItMatters: "Ensures optimal balance between model bias, variance, inference latency, and computational cost.",
    gokulApplication: "Evaluated Random Forests, Support Vector Machines, and Gradient Boosted Trees for clinical diagnostic accuracy in CardioPulse AI."
  },
  "Model Validation": {
    title: "Model Validation",
    category: "AI & Data Science",
    definition: "Assessing trained models using techniques like k-fold cross-validation, precision-recall AUC, ROC curves, and confusion matrix profiling.",
    whyItMatters: "Prevents overfitting, verifies generalizability to unseen real-world data, and ensures reliable production inference.",
    gokulApplication: "Applied rigorous train/test splitting, cross-validation, and F1-score optimization across ML pipelines."
  },
  "AI Analytics": {
    title: "AI Analytics",
    category: "AI & Data Science",
    definition: "The integration of machine learning and natural language processing into analytical workflows to automate trend discovery and anomaly detection.",
    whyItMatters: "Accelerates time-to-insight by automating complex statistical computations and pattern recognition.",
    gokulApplication: "Integrated Google Gemini API via @google/genai and Tata GenAI analytics tools for automated coding analysis and document understanding."
  },
  "AI Strategy": {
    title: "AI Strategy",
    category: "Management & Strategy",
    definition: "The strategic roadmap guiding how artificial intelligence is adopted, architected, and ethically deployed to solve real-world problems.",
    whyItMatters: "Ensures AI investments align with measurable objectives, data governance laws, and sustainable compute budgets.",
    gokulApplication: "Formulated AI-driven architectural plans for smart agriculture in Green AI and agentic automation workflows using Capabl n8n."
  },
  "Analytical Reporting": {
    title: "Analytical Reporting",
    category: "AI & Data Science",
    definition: "Creating structured, evidence-based technical documents and interactive dashboards that explain metrics, forecasts, and recommendations.",
    whyItMatters: "Empowers leadership and cross-functional teams to make informed data-backed operational decisions.",
    gokulApplication: "Authored technical analysis briefs during data science internships and interactive reports in Streamlit and Tableau."
  },
  "Cloud Cost Management": {
    title: "Cloud Cost Management",
    category: "Management & Strategy",
    definition: "The discipline of monitoring, rightsizing, and optimizing cloud infrastructure spending across compute, database, and egress resources.",
    whyItMatters: "Prevents unexpected cloud budget blowouts and maximizes ROI on cloud infrastructure investments.",
    gokulApplication: "Studied through AWS Solutions Architecture job simulations and optimized serverless container deployments on Google Cloud Run."
  },
  "Process Automation": {
    title: "Process Automation",
    category: "Core CS & Software",
    definition: "Designing automated scripts, workflows, and CI/CD pipelines to eliminate manual repetitive tasks and increase software velocity.",
    whyItMatters: "Dramatically reduces human error, accelerates delivery cycles, and allows engineers to focus on high-value creative work.",
    gokulApplication: "Engineered automated data ingestion pipelines, automated compiler test runners, and Capabl n8n AI agent workflows."
  },
  "Spreadsheet Skills": {
    title: "Spreadsheet Skills",
    category: "AI & Data Science",
    definition: "Advanced proficiency in Google Sheets and Microsoft Excel, including pivot tables, dynamic array formulas, nested lookups, and data validation.",
    whyItMatters: "Essential for fast exploratory calculations, financial tracking, tabular record-keeping, and operational data organization.",
    gokulApplication: "Applied extensively for project record auditing, statistical summaries, and academic metrics compilation."
  },
  "Decision Making": {
    title: "Decision Making",
    category: "Management & Strategy",
    definition: "The cognitive process of selecting the most logical course of action among several alternative engineering and business options.",
    whyItMatters: "Drives timely project momentum and ensures sound engineering trade-offs under high-uncertainty conditions.",
    gokulApplication: "Demonstrated in competitive programming under strict time limits and selecting optimal tech stacks across project architectures."
  },
  "Ethical Reasoning": {
    title: "Ethical Reasoning",
    category: "Management & Strategy",
    definition: "Evaluating the moral implications, privacy impacts, fairness, and societal effects of software and artificial intelligence deployments.",
    whyItMatters: "Crucial for preventing algorithmic bias, respecting user data sovereignty, and ensuring responsible AI deployments.",
    gokulApplication: "Certified in NPTEL Privacy & Security in Social Media, with strong adherence to responsible AI practices in Green AI and health diagnostics."
  },
  "Technical Communication": {
    title: "Technical Communication",
    category: "Management & Strategy",
    definition: "The ability to convey complex technical concepts, system architectures, and API specifications clearly to technical and non-technical audiences.",
    whyItMatters: "Enables cross-functional alignment, minimizes implementation misunderstandings, and fosters high-performing engineering teams.",
    gokulApplication: "Exemplified in clear API documentation, project README guides, interactive portfolio architecture, and internship technical presentations."
  },
  "Business Communication": {
    title: "Business Communication",
    category: "Management & Strategy",
    definition: "Professional oral and written interaction tailored for stakeholders, clients, executives, and cross-functional business partners.",
    whyItMatters: "Ensures engineering proposals, project status updates, and value propositions are clearly understood by business decision-makers.",
    gokulApplication: "Practiced during Hamari Pahchan NGO social entrepreneurship, technical client demos, and corporate internship team syncs."
  },
  "Presentation Preparation": {
    title: "Presentation Preparation",
    category: "Management & Strategy",
    definition: "Designing visually engaging, high-retention slide decks and speaking structures that articulate project vision, findings, and demos.",
    whyItMatters: "Captivates audiences, wins project proposals, and successfully defends engineering thesis milestones.",
    gokulApplication: "Crafted compelling slide decks for symposiums, venture pitches (Wadhwani Bootcamp), and university technical defenses."
  },
  "Game Development": {
    title: "Game Development",
    category: "Core CS & Software",
    definition: "The art and engineering discipline of creating interactive games, involving game loop logic, physics calculations, collision detection, and rendering.",
    whyItMatters: "Develops deep mastery of real-time state machines, memory optimization, and responsive user interaction mechanics.",
    gokulApplication: "Completed Electronic Arts Software Engineering simulation via Forage, building object-oriented game logic and event handlers."
  },
  "Diamond League in CodeChef": {
    title: "Diamond League in CodeChef",
    category: "Core CS & Software",
    definition: "The elite tier in CodeChef's competitive league system, awarded to active programmers who consistently maintain top-bracket performance, rapid problem-solving streaks, and high contest percentile standings.",
    whyItMatters: "Distinguishes premier competitive programmers globally, proving consistent algorithmic dedication, high code efficiency, and pressure resilience.",
    gokulApplication: "Achieved by Gokul V through 3482+ problems solved, 5★ rating (2124), 2389 DSA rating (Global Rank 6), and sustained contest rankings."
  },
  "CodeChef Diamond League": {
    title: "CodeChef Diamond League",
    category: "Core CS & Software",
    definition: "CodeChef's premier league division recognizing programmers who consistently deliver top-tier speed, accuracy, and algorithmic depth in global rated competitions.",
    whyItMatters: "Validates long-term competitive excellence beyond isolated contest spikes, reflecting true industry-grade problem-solving discipline.",
    gokulApplication: "Maintained by Gokul V alongside his 2389 DSA rating, 5★ rating, and round 2 qualification in TCS CodeVita Season 13."
  }
};

export const getKeywordDetail = (keyword: string): KeywordDetail => {
  // Check exact or trimmed match
  const trimmed = keyword.trim();
  if (KEYWORD_DICTIONARY[trimmed]) {
    return KEYWORD_DICTIONARY[trimmed];
  }

  // Check case-insensitive match
  const lower = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(KEYWORD_DICTIONARY)) {
    if (key.toLowerCase() === lower) {
      return val;
    }
  }

  // Dynamic Fallback Generator for any unmapped keyword
  return {
    title: trimmed,
    category: "Core CS & Software",
    definition: `${trimmed} is a specialized technical discipline and software capability utilized in modern engineering and digital product development.`,
    whyItMatters: `Mastery in ${trimmed} enables developers to design scalable architectures, streamline engineering workflows, and deliver robust software solutions.`,
    gokulApplication: `Applied by Gokul V as a core competency across his industry internships, competitive programming, and engineering portfolio projects.`
  };
};
