import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2, HeartPulse, ShieldCheck, Wifi, FileText, ExternalLink, Sparkles,
  CheckCircle2, Play, Terminal, Database, Lock, Cpu, ArrowRight, X, RefreshCw,
  FolderCheck, GitCommit, Star, Layers, Sprout, Scan, Mic, Droplets, TrendingUp,
  Bot, MapPin, Trash2, Truck, Navigation, Activity, Radio, Layout, Server,
  ShieldAlert, AlertTriangle, Github, Flame, Pill, Check, Volume2, Bell, UserCheck,
  Globe, Coffee, Atom, Smartphone, Zap, BarChart3
} from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';
import { Project } from '../types';
import { useCodeChef } from '../context/CodeChefContext';

const Network3DVisualization = React.lazy(() =>
  import('./Network3DVisualization').then((m) => ({ default: m.Network3DVisualization }))
);

// Visual Badge Metadata for Primary Technology Stacks matching .skill-tag style
const getTechBadgeMeta = (tech: string) => {
  const lower = tech.toLowerCase();

  // Primary Languages & Flagship Frameworks
  if (lower.includes('react')) {
    return {
      icon: <Atom className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
      colorClasses: 'text-cyan-200 border-cyan-500/30 bg-cyan-950/40 hover:border-cyan-400/60 shadow-cyan-500/10',
    };
  }
  if (lower.includes('python')) {
    return {
      icon: <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
      colorClasses: 'text-blue-200 border-blue-500/30 bg-blue-950/40 hover:border-blue-400/60 shadow-blue-500/10',
    };
  }
  if (lower.includes('java') && !lower.includes('script')) {
    return {
      icon: <Coffee className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      colorClasses: 'text-amber-200 border-amber-500/30 bg-amber-950/40 hover:border-amber-400/60 shadow-amber-500/10',
    };
  }
  if (lower.includes('next.js') || lower === 'next.js' || lower === 'next') {
    return {
      icon: <Zap className="w-3.5 h-3.5 text-white shrink-0" />,
      colorClasses: 'text-slate-100 border-slate-500/40 bg-slate-900/60 hover:border-slate-300 shadow-slate-500/10',
    };
  }
  if (lower.includes('node')) {
    return {
      icon: <Server className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      colorClasses: 'text-emerald-200 border-emerald-500/30 bg-emerald-950/40 hover:border-emerald-400/60 shadow-emerald-500/10',
    };
  }
  if (lower.includes('android') || lower.includes('mobile')) {
    return {
      icon: <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      colorClasses: 'text-emerald-200 border-emerald-500/30 bg-emerald-950/40 hover:border-emerald-400/60 shadow-emerald-500/10',
    };
  }
  if (lower.includes('firebase')) {
    return {
      icon: <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      colorClasses: 'text-amber-200 border-amber-500/30 bg-amber-950/40 hover:border-amber-400/60 shadow-amber-500/10',
    };
  }
  if (lower.includes('real-time database') || lower.includes('realtime database')) {
    return {
      icon: <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
      colorClasses: 'text-cyan-200 border-cyan-500/30 bg-cyan-950/40 hover:border-cyan-400/60 shadow-cyan-500/10',
    };
  }
  if (lower.includes('sqlite') || lower.includes('mongodb') || lower.includes('database')) {
    return {
      icon: <Database className="w-3.5 h-3.5 text-teal-400 shrink-0" />,
      colorClasses: 'text-teal-200 border-teal-500/30 bg-teal-950/40 hover:border-teal-400/60 shadow-teal-500/10',
    };
  }
  if (lower.includes('streamlit')) {
    return {
      icon: <BarChart3 className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
      colorClasses: 'text-rose-200 border-rose-500/30 bg-rose-950/40 hover:border-rose-400/60 shadow-rose-500/10',
    };
  }
  if (lower.includes('machine learning') || lower.includes('ai/ml') || lower.includes('openai') || lower.includes('gemini') || lower.includes('langchain') || lower.includes('scikit-learn')) {
    return {
      icon: <Bot className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
      colorClasses: 'text-purple-200 border-purple-500/30 bg-purple-950/40 hover:border-purple-400/60 shadow-purple-500/10',
    };
  }
  if (lower.includes('tailwind') || lower.includes('html') || lower.includes('css')) {
    return {
      icon: <Layout className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
      colorClasses: 'text-sky-200 border-sky-500/30 bg-sky-950/40 hover:border-sky-400/60 shadow-sky-500/10',
    };
  }
  if (lower.includes('blockchain') || lower.includes('sha-256') || lower.includes('cryptography') || lower.includes('encryption')) {
    return {
      icon: <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
      colorClasses: 'text-emerald-200 border-emerald-500/30 bg-emerald-950/40 hover:border-emerald-400/60 shadow-emerald-500/10',
    };
  }
  if (lower.includes('wi-fi') || lower.includes('p2p') || lower.includes('peer-to-peer')) {
    return {
      icon: <Wifi className="w-3.5 h-3.5 text-indigo-400 shrink-0" />,
      colorClasses: 'text-indigo-200 border-indigo-500/30 bg-indigo-950/40 hover:border-indigo-400/60 shadow-indigo-500/10',
    };
  }
  if (lower.includes('iot') || lower.includes('sensor')) {
    return {
      icon: <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
      colorClasses: 'text-amber-200 border-amber-500/30 bg-amber-950/40 hover:border-amber-400/60 shadow-amber-500/10',
    };
  }

  // Default clean skill-tag badge
  return {
    icon: <Code2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />,
    colorClasses: 'text-slate-300 border-white/10 bg-white/5 hover:border-white/20',
  };
};

export const ProjectShowcase: React.FC = () => {
  const { stats } = useCodeChef();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'challenges' | 'demo'>('overview');

  // Custom Filter Taxonomy
  const PROJECT_FILTERS: { label: string; projectIds?: string[] }[] = [
    { label: 'All' },
    { label: 'Healthcare', projectIds: ['biotrace-ai', 'cardiopulse'] },
    { label: 'Blockchain', projectIds: ['idtrace'] },
    { label: 'AI', projectIds: ['biotrace-ai', 'cardiopulse', 'idtrace', 'nodelab', 'greenai'] },
    { label: 'P2P', projectIds: ['zeronet'] },
    { label: 'Agri', projectIds: ['smartwaste', 'greenai'] },
    { label: 'UI/UX', projectIds: ['signup-wizard-replication'] },
    { label: 'Full Stack', projectIds: ['nodelab', 'notesapp'] },
    { label: 'Python', projectIds: ['biotrace-ai', 'cardiopulse'] },
    { label: 'Java', projectIds: ['gym-member', 'mini-store-inventory'] }
  ];

  const currentFilter = PROJECT_FILTERS.find(f => f.label === selectedCategory);
  const filteredProjects = currentFilter?.projectIds
    ? GOKUL_PROFILE.projects.filter(p => currentFilter.projectIds!.includes(p.id))
    : GOKUL_PROFILE.projects;

  // Simulator States
  // NodeLab
  const [codeLanguage, setCodeLanguage] = useState<'python' | 'javascript' | 'java'>('python');
  const [simulatedCode, setSimulatedCode] = useState<string>(
    '# NodeLab Python Execution\nimport math\n\ndef calculate_pulse(data):\n    return f"Execution successful! Processed {len(data)} items."'
  );
  const [compilerOutput, setCompilerOutput] = useState<string>('Ready for execution. Click "Run Code" below.');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  // CardioPulse AI
  const [age, setAge] = useState<number>(45);
  const [bp, setBp] = useState<number>(120);
  const [chol, setChol] = useState<number>(200);
  const [maxHr, setMaxHr] = useState<number>(150);
  const [riskResult, setRiskResult] = useState<{ score: number; level: string; color: string } | null>(null);

  // ID-Trace
  const [productId, setProductId] = useState<string>('BATCH-2026-X99');
  const [simulatedHash, setSimulatedHash] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  // ZeroNet
  const [p2pFileName, setP2pFileName] = useState<string>('Emergency_Log_2026.pdf');
  const [transferProgress, setTransferProgress] = useState<number>(0);
  const [isTransferring, setIsTransferring] = useState<boolean>(false);

  // Green AI
  const [agriCrop, setAgriCrop] = useState<'Tomato Leaf' | 'Paddy Soil' | 'Wheat Crop'>('Tomato Leaf');
  const [isAgriAnalyzing, setIsAgriAnalyzing] = useState<boolean>(false);
  const [agriScanResult, setAgriScanResult] = useState<{
    diagnosis: string;
    confidence: number;
    recommendation: string;
    waterOpt: string;
    fertilizerOpt: string;
    marketForecast: string;
  } | null>({
    diagnosis: "Early Blight (Alternaria solani) Detected",
    confidence: 96.4,
    recommendation: "Apply organic copper fungicide. Avoid overhead watering to prevent spore dispersal.",
    waterOpt: "-22% Water Consumption",
    fertilizerOpt: "NPK 10-26-26 @ 15kg/acre",
    marketForecast: "₹3,200/quintal (Expected +8% next week)"
  });

  const [agriQuery, setAgriQuery] = useState<string>("What is the optimal irrigation schedule for clay loam soil?");
  const [agriLanguage, setAgriLanguage] = useState<'English' | 'Tamil' | 'Hindi'>('English');
  const [agriVoiceResponse, setAgriVoiceResponse] = useState<string>(
    "Green AI Voice Companion: Irrigate twice weekly in early mornings. Soil moisture sensors indicate optimal absorption at 68% field capacity."
  );

  // SmartWaste Madurai Simulator
  const [wasteWard, setWasteWard] = useState<string>('Meenakshi Amman Heritage Zone (Ward 14)');
  const [wasteCategory, setWasteCategory] = useState<'Organic / Wet Waste' | 'Recyclables (Plastic/Metal)' | 'Hazardous / E-Waste' | 'Overflowing Public Bin'>('Organic / Wet Waste');
  const [wasteLevel, setWasteLevel] = useState<number>(85);
  const [isWasteSyncing, setIsWasteSyncing] = useState<boolean>(false);
  const [wasteReportStatus, setWasteReportStatus] = useState<{
    incidentId: string;
    coords: string;
    accuracy: string;
    status: string;
    syncedAt: string;
    assignedVehicle: string;
    etaReduction: string;
    routeEfficiency: string;
    collectionTime: string;
  } | null>({
    incidentId: 'MD-WASTE-2026-084',
    coords: '9.9195° N, 78.1193° E',
    accuracy: '±1.8m (High Precision GPS)',
    status: 'REALTIME_SYNCED_TO_MUNICIPALITY',
    syncedAt: 'Firebase RTDB Sync: Active (0.08s latency)',
    assignedVehicle: 'MMC EV Compactor Truck #12',
    etaReduction: '-42% Response Time (Reduced from 4.5h to 36m)',
    routeEfficiency: '28% Fuel & Route Optimization via Dynamic Routing',
    collectionTime: 'Estimated Clearance: 22 Mins'
  });

  const handleLogWasteReport = () => {
    setIsWasteSyncing(true);
    setTimeout(() => {
      setIsWasteSyncing(false);
      const incId = `MD-WASTE-2026-${Math.floor(100 + Math.random() * 900)}`;
      const coordsMap: Record<string, string> = {
        'Meenakshi Amman Heritage Zone (Ward 14)': '9.9195° N, 78.1193° E',
        'Mattuthavani Integrated Bus Terminal (Ward 32)': '9.9482° N, 78.1587° E',
        'Goripalayam Medical Corridor (Ward 21)': '9.9298° N, 78.1345° E',
        'Anna Nagar Residential Sector (Ward 42)': '9.9174° N, 78.1482° E'
      };
      setWasteReportStatus({
        incidentId: incId,
        coords: coordsMap[wasteWard] || '9.9252° N, 78.1198° E',
        accuracy: '±1.5m (High Precision GPS)',
        status: 'REALTIME_SYNCED_TO_MUNICIPALITY',
        syncedAt: `Firebase RTDB Synced at ${new Date().toLocaleTimeString()}`,
        assignedVehicle: `MMC Fleet EV Compactor #${Math.floor(10 + Math.random() * 15)}`,
        etaReduction: `-${Math.floor(35 + Math.random() * 15)}% Response Time (Reduced from 4.2h to 32m)`,
        routeEfficiency: `${Math.floor(25 + Math.random() * 10)}% Fuel & Route Optimization`,
        collectionTime: `Estimated Clearance: ${Math.floor(18 + Math.random() * 15)} Mins`
      });
    }, 600);
  };

  // Notes App Simulator State
  const [newNoteTitle, setNewNoteTitle] = useState<string>('Real-Time Next.js 14 API Optimistic Sync');
  const [newNoteCategory, setNewNoteCategory] = useState<'Architecture' | 'Database' | 'DevOps'>('Architecture');
  const [notesList, setNotesList] = useState<{ id: string; title: string; category: string; time: string }[]>([
    { id: 'NOTE-701', title: 'Next.js 14 App Router Dynamic Route Handlers', category: 'Architecture', time: '1m ago' },
    { id: 'NOTE-702', title: 'MongoDB Atlas Compound Indexing Optimization', category: 'Database', time: '12m ago' },
    { id: 'NOTE-703', title: 'Debounced Mutations with Rollback Protection', category: 'DevOps', time: '35m ago' }
  ]);
  const [isNoteSyncing, setIsNoteSyncing] = useState<boolean>(false);
  const [lastSyncLog, setLastSyncLog] = useState<string>('MongoDB Atlas connection pool active. 0ms transaction lag.');

  // Gym Member Simulator State
  const [gymMemberName, setGymMemberName] = useState<string>('Alex Johnson');
  const [gymPlan, setGymPlan] = useState<'Premium Annual' | 'Standard Monthly' | 'Cardio VIP'>('Premium Annual');
  const [gymMembers, setGymMembers] = useState<{ id: number; name: string; plan: string; status: 'ACTIVE' | 'EXPIRED' }[]>([
    { id: 101, name: 'Alex Johnson', plan: 'Premium Annual', status: 'ACTIVE' },
    { id: 102, name: 'Maria Vance', plan: 'Standard Monthly', status: 'ACTIVE' },
    { id: 103, name: 'David Chen', plan: 'Cardio VIP', status: 'ACTIVE' }
  ]);
  const [gymSqlLog, setGymSqlLog] = useState<string>('DBConfig.java: Connection pool initialized [HikariCP / MySQL 3306].');
  const [isGymProcessing, setIsGymProcessing] = useState<boolean>(false);

  const handleAddGymMember = () => {
    if (!gymMemberName.trim()) return;
    setIsGymProcessing(true);
    setTimeout(() => {
      const newId = Math.floor(104 + gymMembers.length);
      setGymMembers(prev => [{ id: newId, name: gymMemberName.trim(), plan: gymPlan, status: 'ACTIVE' }, ...prev]);
      setGymSqlLog(`MemberDAO.java: Executed INSERT INTO members (id, name, plan, status) VALUES (${newId}, '${gymMemberName.trim()}', '${gymPlan}', 'ACTIVE') -> 1 row affected (1.2ms)`);
      setGymMemberName('');
      setIsGymProcessing(false);
    }, 300);
  };

  // Mini Store Inventory Simulator State
  const [storeItems, setStoreItems] = useState<{ sku: string; name: string; qty: number; minQty: number }[]>([
    { sku: 'RET-101', name: 'Smart Barcode Scanner Pro', qty: 28, minQty: 10 },
    { sku: 'RET-102', name: 'Thermal Receipt Rolls (50pk)', qty: 8, minQty: 15 },
    { sku: 'RET-103', name: 'USB-C POS Terminal Cradle', qty: 19, minQty: 5 }
  ]);
  const [newSku, setNewSku] = useState<string>('RET-104');
  const [newItemName, setNewItemName] = useState<string>('Wireless Cash Drawer Cable');
  const [newQty, setNewQty] = useState<number>(35);
  const [inventoryLog, setInventoryLog] = useState<string>('DataBase_Connection.java: JDBC connection verified. Ready for inventory queries.');

  const handleAddOrUpdateStock = () => {
    if (!newItemName.trim() || !newSku.trim()) return;
    const existingIndex = storeItems.findIndex(i => i.sku.toLowerCase() === newSku.toLowerCase());
    if (existingIndex >= 0) {
      const updated = [...storeItems];
      updated[existingIndex].qty += Number(newQty);
      setStoreItems(updated);
      setInventoryLog(`Product_Manager.java: Stock updated for ${newSku}. New Quantity: ${updated[existingIndex].qty}. Database committed.`);
    } else {
      setStoreItems(prev => [{ sku: newSku, name: newItemName.trim(), qty: Number(newQty), minQty: 10 }, ...prev]);
      setInventoryLog(`DataBase_Connection.java: INSERT INTO inventory (sku, name, quantity) VALUES ('${newSku}', '${newItemName.trim()}', ${newQty}) [OK]`);
      setNewSku(`RET-${Math.floor(105 + storeItems.length)}`);
      setNewItemName('');
    }
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;
    setIsNoteSyncing(true);
    setTimeout(() => {
      const noteId = `NOTE-${Math.floor(800 + Math.random() * 199)}`;
      setNotesList(prev => [
        { id: noteId, title: newNoteTitle.trim(), category: newNoteCategory, time: 'Just now' },
        ...prev
      ]);
      setLastSyncLog(`[POST /api/notes] 201 Created • ${noteId} synced in 0.8ms to MongoDB collection`);
      setNewNoteTitle('');
      setIsNoteSyncing(false);
    }, 350);
  };

  // BioTrace AI Simulator State
  const [bioMedicine, setBioMedicine] = useState<string>('Ashwagandha (Withania somnifera)');
  const [bioLanguage, setBioLanguage] = useState<'English' | 'Tamil' | 'Hindi'>('English');
  const [bioDosageTime, setBioDosageTime] = useState<string>('08:00 AM (Post-Breakfast)');
  const [isBioAnalyzing, setIsBioAnalyzing] = useState<boolean>(false);
  const [bioTtsSpeaking, setBioTtsSpeaking] = useState<boolean>(false);
  const [bioAnalysisResult, setBioAnalysisResult] = useState<{
    overview: string;
    ayurvedicProperties: string;
    interactions: string;
    dosageGuideline: string;
  }>({
    overview: "LangChain retrieved from Indian Pharmacopoeia: Adaptogenic root herb clinically verified to regulate cortisol levels and support neuromuscular recovery.",
    ayurvedicProperties: "Rasa: Tikta (Bitter), Kashaya (Astringent) • Virya: Ushna (Warm) • Dosha: Balances Vata & Kapha.",
    interactions: "Safe with standard multivitamins. Space 2 hours apart from thyroid medications.",
    dosageGuideline: "300mg - 500mg root extract once daily with warm milk or water."
  });

  const handleRunBioTraceAnalysis = () => {
    setIsBioAnalyzing(true);
    setTimeout(() => {
      if (bioMedicine.toLowerCase().includes('ashwagandha')) {
        setBioAnalysisResult({
          overview: "LangChain retrieved from Indian Pharmacopoeia: Adaptogenic root herb clinically verified to regulate cortisol levels and support neuromuscular recovery.",
          ayurvedicProperties: "Rasa: Tikta (Bitter), Kashaya (Astringent) • Virya: Ushna (Warm) • Dosha: Balances Vata & Kapha.",
          interactions: "Safe with standard multivitamins. Space 2 hours apart from thyroid medications.",
          dosageGuideline: "300mg - 500mg root extract once daily with warm milk or water."
        });
      } else if (bioMedicine.toLowerCase().includes('tulsi')) {
        setBioAnalysisResult({
          overview: "LangChain retrieved: Ocimum sanctum (Holy Basil) loaded with eugenol and adaptogenic polyphenols for bronchial clear-path and immune response.",
          ayurvedicProperties: "Rasa: Katu, Tikta • Virya: Ushna • Dosha: Pacifies Kapha & Vata.",
          interactions: "No adverse interactions reported with common analgesics. Mild anticoagulant synergistic effect.",
          dosageGuideline: "5-10 fresh leaves decoction or 250mg standardized extract twice daily."
        });
      } else {
        setBioAnalysisResult({
          overview: `LangChain synthesized cross-reference for ${bioMedicine}: Integrated pharmacovigilance database matched active compounds with safe metabolic pathway guidelines.`,
          ayurvedicProperties: "Cross-referenced with regional botanical database and modern pharmacological monograph.",
          interactions: "Monitor hydration levels and adhere strictly to prescribed chronotherapy cycles.",
          dosageGuideline: `Administer as recommended during ${bioDosageTime} with full glass of water.`
        });
      }
      setIsBioAnalyzing(false);
    }, 400);
  };

  const handleSimulateTts = () => {
    setBioTtsSpeaking(true);
    setTimeout(() => setBioTtsSpeaking(false), 2200);
  };

  // Signup Wizard Simulator State
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [wizardName, setWizardName] = useState<string>('Priya Sharma');
  const [wizardEmail, setWizardEmail] = useState<string>('priya.sharma@domain.in');
  const [wizardTrack, setWizardTrack] = useState<string>('AI & Data Engineering');
  const [wizardPassword, setWizardPassword] = useState<string>('SecurePass#2026');
  const [wizardToast, setWizardToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const triggerWizardToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setWizardToast({ message, type });
    setTimeout(() => setWizardToast(null), 3000);
  };

  const handleWizardNext = () => {
    if (wizardStep === 1) {
      if (!wizardName.trim() || !wizardEmail.includes('@')) {
        triggerWizardToast('Validation Error: Valid name and email required before continuing.', 'error');
        return;
      }
      setWizardStep(2);
      triggerWizardToast('Step 1 verified! Progress saved to React Context.', 'info');
    } else if (wizardStep === 2) {
      if (wizardPassword.length < 6) {
        triggerWizardToast('Password must be at least 6 characters.', 'error');
        return;
      }
      setWizardStep(3);
      triggerWizardToast('All dependencies met. Ready for final onboarding confirmation.', 'success');
    } else {
      triggerWizardToast('Onboarding complete! Profile dispatched via Context API & deployed.', 'success');
      setWizardStep(1);
    }
  };

  // Close modal on Escape key press and prevent background scrolling
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const handleScanAgriCrop = (selected: 'Tomato Leaf' | 'Paddy Soil' | 'Wheat Crop') => {
    setAgriCrop(selected);
    setIsAgriAnalyzing(true);
    setTimeout(() => {
      setIsAgriAnalyzing(false);
      if (selected === 'Tomato Leaf') {
        setAgriScanResult({
          diagnosis: "Early Blight (Alternaria solani) Detected",
          confidence: 96.4,
          recommendation: "Apply organic copper fungicide. Avoid overhead watering to prevent spore dispersal.",
          waterOpt: "-22% Water Consumption",
          fertilizerOpt: "NPK 10-26-26 @ 15kg/acre",
          marketForecast: "₹3,200/quintal (Expected +8% next week)"
        });
      } else if (selected === 'Paddy Soil') {
        setAgriScanResult({
          diagnosis: "Optimal Nitrogen & Moisture Balance",
          confidence: 98.1,
          recommendation: "Maintain 5cm standing water level. Soil organic carbon content is healthy at 0.72%.",
          waterOpt: "-30% Drip Savings",
          fertilizerOpt: "Urea 10kg/acre top dressing",
          marketForecast: "₹2,450/quintal (Stable demand)"
        });
      } else {
        setAgriScanResult({
          diagnosis: "Mild Yellow Rust Warning (Puccinia striiformis)",
          confidence: 91.8,
          recommendation: "Foliar spray of Propiconazole 25% EC at 1ml/liter water recommended.",
          waterOpt: "-18% Sprinkler Optimization",
          fertilizerOpt: "Potash (MOP) 8kg/acre",
          marketForecast: "₹2,800/quintal (Rising +5%)"
        });
      }
    }, 500);
  };

  const handleRunCompiler = () => {
    setIsCompiling(true);
    setCompilerOutput('Compiling in sandbox environment via zero-latency thread...');
    setTimeout(() => {
      setIsCompiling(false);
      setCompilerOutput(
        `[SUCCESS] Zero-Latency Compilation Finished (0.012s)\n` +
        `Output:\nHello from NodeLab Split-Screen Sandbox!\n` +
        `Gemini AI Optimization Hint: Code runtime complexity O(N). Memory usage 12MB.`
      );
    }, 600);
  };

  const handleCalculateCardio = () => {
    // Simple deterministic risk scoring model simulation
    let score = 15;
    if (age > 50) score += 25;
    if (bp > 130) score += 20;
    if (chol > 220) score += 25;
    if (maxHr < 130) score += 15;

    let level = 'Low Risk';
    let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

    if (score > 60) {
      level = 'High Cardiovascular Risk';
      color = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    } else if (score > 35) {
      level = 'Moderate Risk';
      color = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }

    setRiskResult({ score, level, color });
  };

  const handleVerifyHash = () => {
    // SHA-256 simulation
    let fakeHash = '8f4e2c9a1b3d5e7f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f';
    if (productId.includes('FAKE') || productId.includes('999')) {
      setIsVerified(false);
      setSimulatedHash('INVALID_SHA256_DISCREPANCY_ALERT_0x00');
    } else {
      setIsVerified(true);
      setSimulatedHash(fakeHash);
    }
  };

  const handleStartP2pTransfer = () => {
    setIsTransferring(true);
    setTransferProgress(10);
    const interval = setInterval(() => {
      setTransferProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTransferring(false);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="glass p-6 sm:p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-200 border border-white/10 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Flagship Engineering Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 tracking-tight">
            Gokul's Flagship Projects & Live Demos
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Explore Gokul's full-stack applications, machine learning diagnostics, cryptographic fraud detection tools, and offline peer-to-peer mobile apps. Click on any project to open an interactive live simulation!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedCategory(filter.label)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === filter.label
                  ? 'bg-white/20 text-white border border-white/30 shadow-md backdrop-blur-md font-semibold'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Overview Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="glass p-5 sm:p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-950/40 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <FolderCheck className="w-5 h-5 text-emerald-400" />
              Projects Performance Summary
            </h3>
            <p className="text-xs text-slate-300">
              Key engineering metrics across completed software, active contributions, and average project quality score.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0 w-fit">
            Verified Stats
          </span>
        </div>

        {/* 3-Column Simple Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Completed Projects */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-3.5 hover:border-indigo-400/40 transition-all group">
            <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0 group-hover:scale-105 transition-transform">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                Completed Projects
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-white">{GOKUL_PROFILE.projects.length}</span>
                <span className="text-xs text-emerald-300 font-semibold">{GOKUL_PROFILE.projects.filter(p => p.featured).length} Flagship</span>
              </div>
            </div>
          </div>

          {/* Active Contributions */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-3.5 hover:border-cyan-400/40 transition-all group">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shrink-0 group-hover:scale-105 transition-transform">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                  Active Contributions
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" title="Live Synced with CodeChef" />
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-white">{stats.problemsSolved}</span>
                <span className="text-xs text-cyan-300 font-semibold">CodeChef Solved</span>
              </div>
            </div>
          </div>

          {/* Average Project Rating */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-3.5 hover:border-amber-400/40 transition-all group">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0 group-hover:scale-105 transition-transform">
              <Star className="w-6 h-6 fill-amber-400/20 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                Average Project Rating
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-white">4.9</span>
                <span className="text-xs text-amber-300 font-semibold">/ 5.0 (98% Score)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            onClick={() => {
              setActiveModalProject(project);
              setModalTab('overview');
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalProject(project);
                setModalTab('overview');
              }
            }}
            className="glass p-6 flex flex-col justify-between transition-all hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/15 group relative cursor-pointer ring-0 hover:ring-2 hover:ring-cyan-400/20"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-indigo-200 border border-white/10 backdrop-blur-md">
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Flagship
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/30 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/60 flex items-center gap-1 transition-all">
                    <span>View Modal</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors flex items-center gap-2">
                {project.title}
              </h3>
              <p className="text-xs font-medium text-indigo-200 mt-0.5">{project.subtitle}</p>

              {/* Description */}
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {project.description}
              </p>

              {/* Key Innovations */}
              <div className="mt-4 space-y-1.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Engineering Highlights:</p>
                {project.keyInnovations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Badges */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => {
                  const meta = getTechBadgeMeta(tech);
                  return (
                    <span
                      key={i}
                      className={`skill-tag inline-flex items-center gap-1.5 text-xs font-mono font-medium border transition-all duration-200 cursor-default ${meta.colorClasses}`}
                      title={`${project.title} • ${tech}`}
                    >
                      {meta.icon}
                      <span>{tech}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs text-slate-400 italic font-mono truncate max-w-[36%]">
                Impact: {project.impact}
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold border border-emerald-400/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-600/25 group"
                    title={`Open Live Website: ${project.title}`}
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-100 group-hover:text-white" />
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200 group-hover:text-white" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
                    title={`Open GitHub Repository: ${project.title}`}
                  >
                    <Github className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-200" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProject(project);
                    setModalTab('overview');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1 cursor-pointer shadow-sm hover:border-cyan-400/40"
                  title="View full stack architecture and tools"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full Stack</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProject(project);
                    setModalTab('challenges');
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-all flex items-center gap-1 cursor-pointer shadow-sm hover:border-amber-400/50"
                  title="View key technical challenges and solutions"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Challenges</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalProject(project);
                    setModalTab('demo');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1 shrink-0 border border-indigo-400/30 cursor-pointer"
                  title="Launch live interactive simulator in modal"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Live Demo</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Project Modal */}
      {activeModalProject && (
        <div 
          onClick={() => setActiveModalProject(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass border border-white/20 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]"
          >
            
            {/* Modal Header */}
            <div className="bg-black/40 p-5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="space-y-1.5">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeModalProject.category}
                  </span>
                  {activeModalProject.featured && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Flagship Project
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activeModalProject.title}</h3>
                <p className="text-xs sm:text-sm text-indigo-200">{activeModalProject.subtitle}</p>
              </div>

              {/* Direct Links in Header & Close Button */}
              <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 border border-emerald-400/40 transition-all cursor-pointer"
                    title={`Visit Live Web Application: ${activeModalProject.title}`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Website</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200" />
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="View Source Code on GitHub"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-300" />
                    <span>GitHub Code</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                  title="Close Project Details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs Bar */}
            <div className="bg-slate-900/90 px-5 pt-3 border-b border-white/10 flex items-center gap-2 sm:gap-4 overflow-x-auto shrink-0">
              <button
                onClick={() => setModalTab('overview')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'overview'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Full Stack & Architecture</span>
              </button>

              <button
                onClick={() => setModalTab('challenges')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'challenges'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Key Technical Challenges ({activeModalProject.keyChallenges?.length || 3})</span>
              </button>

              <button
                onClick={() => setModalTab('demo')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  modalTab === 'demo'
                    ? 'border-indigo-400 text-indigo-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Interactive Live Demo Simulator</span>
              </button>
            </div>

            {/* Modal Body Scrollable Content */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">

              {/* TAB 1: FULL STACK ARCHITECTURE & OVERVIEW */}
              {modalTab === 'overview' && (
                <div className="space-y-6">
                  {/* System Summary Description */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block font-mono">
                      Project Objective & Architectural Vision:
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {activeModalProject.description}
                    </p>
                  </div>

                  {/* 4-Column Full Stack Breakdown Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        Comprehensive Full Stack Breakdown
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Multi-Tier Architecture
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* Frontend */}
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors space-y-2">
                        <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono">
                          <Layout className="w-4 h-4" />
                          <span>Frontend Layer</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(activeModalProject.fullStackDetails?.frontend || [activeModalProject.techStack[0], activeModalProject.techStack[1]]).map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-400/30 text-[11px] text-cyan-200 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Backend */}
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors space-y-2">
                        <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold font-mono">
                          <Server className="w-4 h-4" />
                          <span>Backend & Logic</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(activeModalProject.fullStackDetails?.backend || [activeModalProject.techStack[2], activeModalProject.techStack[3] || 'REST API']).map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-400/30 text-[11px] text-indigo-200 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Database & Cloud */}
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors space-y-2">
                        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold font-mono">
                          <Database className="w-4 h-4" />
                          <span>Data & Cloud</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(activeModalProject.fullStackDetails?.databaseAndCloud || ['Firebase / Cloud DB', 'Secure Storage']).map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-400/30 text-[11px] text-emerald-200 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Protocols */}
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-violet-500/20 hover:border-violet-500/40 transition-colors space-y-2">
                        <div className="flex items-center gap-2 text-violet-300 text-xs font-bold font-mono">
                          <Lock className="w-4 h-4" />
                          <span>Protocols & Tools</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(activeModalProject.fullStackDetails?.toolsAndProtocols || ['Secure Sandboxing', 'Zero-Latency Pipeline']).map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-lg bg-violet-950/60 border border-violet-400/30 text-[11px] text-violet-200 font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Engineering Highlights */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
                      Key Engineering Highlights & Innovations:
                    </span>
                    <div className="space-y-2">
                      {activeModalProject.keyInnovations.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900/80 border border-indigo-500/30 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Measured System Impact</span>
                        <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{activeModalProject.impact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Action Links Bar */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-white block">Experience This Project</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Explore the live interactive simulator sandbox or source repository.</p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                      {activeModalProject.liveUrl && (
                        <a
                          href={activeModalProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 border border-emerald-400/40 transition-all cursor-pointer"
                          title="Open deployed live web application"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit Live Website</span>
                          <ExternalLink className="w-3 h-3 text-emerald-200" />
                        </a>
                      )}
                      <button
                        onClick={() => setModalTab('demo')}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Try Live Simulator</span>
                      </button>
                      {activeModalProject.githubUrl && (
                        <a
                          href={activeModalProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                          title="Open GitHub Repository in new tab"
                        >
                          <Github className="w-3.5 h-3.5 text-slate-300" />
                          <span>GitHub Repo</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: KEY TECHNICAL CHALLENGES */}
              {modalTab === 'challenges' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0 mt-0.5">
                      <Flame className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Complex Engineering Hurdles & Algorithmic Solutions</h4>
                      <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
                        Production software engineering involves solving edge cases, state race conditions, and latency constraints. Here is how Gokul tackled key challenges in {activeModalProject.title}:
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(activeModalProject.keyChallenges || [
                      "Optimizing state synchronization and preventing data collisions during concurrent user interactions.",
                      "Ensuring sub-100ms latency execution loops under bandwidth-constrained environments.",
                      "Isolating secure sandbox environments to mitigate security vulnerabilities while maintaining peak performance."
                    ]).map((challenge, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-amber-500/40 transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3" />
                            Technical Challenge #{idx + 1}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Architectural Solution Implemented</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pt-1">
                          {challenge}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xs text-slate-300">
                      Want to see the system in action with live simulation telemetry?
                    </span>
                    <button
                      onClick={() => setModalTab('demo')}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Test in Live Simulator</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: INTERACTIVE DEMO SIMULATOR */}
              {modalTab === 'demo' && (
                <div className="space-y-5">
                  {/* 1. NodeLab Compiler Demo */}
              {activeModalProject.demoType === 'compiler' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      Select Language Sandbox:
                    </label>
                    <div className="flex gap-2">
                      {(['python', 'javascript', 'java'] as const).map(lang => (
                        <button
                          key={lang}
                          onClick={() => {
                            setCodeLanguage(lang);
                            if (lang === 'python') setSimulatedCode('def nodelab_demo():\n    print("Executing Python on NodeLab IDE with Gemini AI")');
                            if (lang === 'javascript') setSimulatedCode('const nodelab = () => console.log("Executing JavaScript zero-latency thread");');
                            if (lang === 'java') setSimulatedCode('public class Main {\n  public static void main(String[] args) {\n    System.out.println("NodeLab Java Sandbox");\n  }\n}');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase ${
                            codeLanguage === lang
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Window */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400">
                    <textarea
                      value={simulatedCode}
                      onChange={(e) => setSimulatedCode(e.target.value)}
                      rows={4}
                      className="w-full bg-transparent text-emerald-400 focus:outline-none resize-none font-mono"
                    />
                  </div>

                  {/* Action & Output */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleRunCompiler}
                      disabled={isCompiling}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20"
                    >
                      {isCompiling ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                      <span>{isCompiling ? 'Compiling...' : 'Run Code'}</span>
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">Gemini AI Optimization Active</span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 min-h-[90px] whitespace-pre-wrap">
                    <span className="text-slate-500 block text-[10px] uppercase font-sans mb-1">Execution Terminal Output:</span>
                    {compilerOutput}
                  </div>
                </div>
              )}

              {/* 2. CardioPulse AI Health Demo */}
              {activeModalProject.demoType === 'health' && (
                <div className="space-y-4">
                  {activeModalProject.liveUrl && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 flex-wrap shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="text-xs text-white font-bold block">Live Web App Online on Streamlit Cloud</span>
                          <span className="text-[11px] text-emerald-300 font-mono">cardiopulseai.streamlit.app</span>
                        </div>
                      </div>
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Launch App</span>
                        <ExternalLink className="w-3 h-3 text-emerald-200" />
                      </a>
                    </div>
                  )}
                  <p className="text-xs text-slate-300">
                    Adjust health input parameters to test the Scikit-learn predictive classification model simulation:
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Patient Age ({age} yrs)</label>
                      <input
                        type="range"
                        min="20"
                        max="85"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Resting BP ({bp} mmHg)</label>
                      <input
                        type="range"
                        min="90"
                        max="180"
                        value={bp}
                        onChange={(e) => setBp(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Cholesterol ({chol} mg/dL)</label>
                      <input
                        type="range"
                        min="130"
                        max="320"
                        value={chol}
                        onChange={(e) => setChol(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Max Heart Rate ({maxHr} bpm)</label>
                      <input
                        type="range"
                        min="80"
                        max="200"
                        value={maxHr}
                        onChange={(e) => setMaxHr(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCalculateCardio}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <HeartPulse className="w-4 h-4 text-rose-300" />
                    <span>Run ML Risk Diagnostic Assessment</span>
                  </button>

                  {riskResult && (
                    <div className={`p-4 rounded-xl border text-center font-medium ${riskResult.color}`}>
                      <div className="text-xs uppercase font-bold tracking-wider mb-1">Cardiovascular Assessment Result</div>
                      <div className="text-lg font-extrabold">{riskResult.level}</div>
                      <div className="text-xs opacity-80 mt-1">Calculated Probability Index: {riskResult.score}%</div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. ID-Trace Blockchain Demo */}
              {activeModalProject.demoType === 'blockchain' && (
                <div className="space-y-5">

                  {/* SHA-256 Cryptographic Verification Tester */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-300 block">
                      SHA-256 Cryptographic Digital Twin Verification Tester
                    </span>
                    <p className="text-xs text-slate-300">
                      Enter a product batch ID to simulate digital twin verification against Firebase backend:
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="e.g. BATCH-2026-X99"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={handleVerifyHash}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0"
                      >
                        Verify SHA-256
                      </button>
                    </div>

                    {simulatedHash && (
                      <div className="space-y-2 pt-1">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 break-all">
                          <span className="text-slate-500 block text-[10px] uppercase font-sans mb-1">Generated Cryptographic Hash:</span>
                          {simulatedHash}
                        </div>

                        {isVerified !== null && (
                          <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                            isVerified
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          }`}>
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>
                              {isVerified
                                ? 'AUTHENTIC RECORD VERIFIED: Supply chain provenance intact.'
                                : 'COUNTERFEIT ALERT DISCREPANCY: Discrepancy detected in digital twin record!'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. ZeroNet P2P Offline File Transfer Demo */}
              {activeModalProject.demoType === 'p2p' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Simulate offline high-speed Wi-Fi Aware (NAN) encrypted peer-to-peer payload transmission over 3D mesh nodes:
                  </p>

                  {/* 3D WebGL Mesh Canvas */}
                  <React.Suspense fallback={
                    <div className="w-full h-64 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center animate-pulse">
                      <span className="text-xs font-mono text-cyan-400">Loading 3D Mesh Topology...</span>
                    </div>
                  }>
                    <Network3DVisualization
                      title="ZeroNet 3D Mesh Swarm Topology"
                      subtitle="Interactive WebGL perspective projection of Wi-Fi Aware (NAN) P2P nodes"
                      networkType="p2p"
                    />
                  </React.Suspense>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Selected File:</span>
                      <span className="font-mono text-indigo-300">{p2pFileName}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Network Protocol:</span>
                      <span className="font-mono text-emerald-400">Wi-Fi Aware (NAN) • Zero Connectivity</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Transmission Status</span>
                        <span>{transferProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
                          style={{ width: `${transferProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStartP2pTransfer}
                    disabled={isTransferring}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    <Wifi className="w-4 h-4 text-cyan-300" />
                    <span>{isTransferring ? 'Broadcasting payload across 3D node mesh...' : 'Initiate Encrypted P2P Transfer'}</span>
                  </button>
                </div>
              )}

              {/* 5. Notes App Demo */}
              {activeModalProject.demoType === 'notes' && (
                <div className="space-y-4 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        Next.js Serverless & MongoDB Real-Time Sync Engine
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        Zero-Lag CRUD Active
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Create an optimistic note mutation to test sub-millisecond database writes and state reconciliation:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        placeholder="Type note title (e.g. Server Actions vs Route Handlers)..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateNote()}
                      />
                      <select
                        value={newNoteCategory}
                        onChange={(e) => setNewNoteCategory(e.target.value as any)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                      >
                        <option value="Architecture">Architecture</option>
                        <option value="Database">Database</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                      <button
                        onClick={handleCreateNote}
                        disabled={isNoteSyncing || !newNoteTitle.trim()}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isNoteSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        <span>Save Note</span>
                      </button>
                    </div>

                    {/* Live Terminal Log */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1">
                      <div className="text-emerald-400">{lastSyncLog}</div>
                      <div className="text-slate-400">MongoDB Replica Set: primary-cluster-01.mongodb.net (Ping: 12ms)</div>
                    </div>

                    {/* Live Notes Grid */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Synchronized Collection Items ({notesList.length}):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {notesList.map((n) => (
                          <div key={n.id} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                            <div className="truncate mr-2">
                              <div className="text-xs text-white font-medium truncate">{n.title}</div>
                              <span className="text-[10px] font-mono text-slate-400">{n.id} • {n.category}</span>
                            </div>
                            <span className="text-[10px] text-cyan-300 font-mono shrink-0">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Green AI Smart Farming Companion Demo */}
              {activeModalProject.demoType === 'agri' && (
                <div className="space-y-5 text-xs text-slate-300">
                  {/* Computer Vision Disease & Soil Diagnostic Simulator */}
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-300 flex items-center gap-2">
                        <Scan className="w-4 h-4 text-emerald-400" />
                        Mobile Computer Vision Disease & Soil Scanner
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Active Vision Model
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300">
                      Select sample field input to simulate mobile computer vision neural network analysis:
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(['Tomato Leaf', 'Paddy Soil', 'Wheat Crop'] as const).map((crop) => (
                        <button
                          key={crop}
                          onClick={() => handleScanAgriCrop(crop)}
                          className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                            agriCrop === crop
                              ? 'bg-emerald-600 text-white border border-emerald-400 shadow-md'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                          }`}
                        >
                          {crop}
                        </button>
                      ))}
                    </div>

                    {isAgriAnalyzing ? (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-emerald-400 animate-pulse">
                        Analyzing spectral reflectance & cellular necrosis...
                      </div>
                    ) : agriScanResult && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-emerald-300">{agriScanResult.diagnosis}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Confidence: {agriScanResult.confidence}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          <strong className="text-amber-300">AI Recommendation:</strong> {agriScanResult.recommendation}
                        </p>
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[10px]">
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block font-mono">Water Saving</span>
                            <span className="text-cyan-300 font-bold">{agriScanResult.waterOpt}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block font-mono">Fertilizer Ratio</span>
                            <span className="text-emerald-300 font-bold">{agriScanResult.fertilizerOpt}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block font-mono">Market Forecast</span>
                            <span className="text-amber-300 font-bold">{agriScanResult.marketForecast}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Multilingual Voice Chatbot Simulator */}
                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-300 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        Multilingual AI Voice Companion Chatbot
                      </span>
                      <div className="flex gap-1">
                        {(['English', 'Tamil', 'Hindi'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setAgriLanguage(lang);
                              if (lang === 'Tamil') {
                                setAgriQuery("களிமண் மண்ணிற்கு ஏற்ற நீர்ப்பாசன முறை என்ன?");
                                setAgriVoiceResponse("கிரீன் AI பரிந்துரை: வாரத்திற்கு இரண்டு முறை அதிகாலையில் நீர் பாய்ச்சவும். மண் ஈரப்பதம் 68% அளவை எட்டியுள்ளது.");
                              } else if (lang === 'Hindi') {
                                setAgriQuery("चिकनी दोमट मिट्टी के लिए सिंचाई का सही समय क्या है?");
                                setAgriVoiceResponse("ग्रीन AI सलाह: सप्ताह में दो बार सुबह जल्दी सिंचाई करें। मिट्टी में नमी का स्तर 68% है।");
                              } else {
                                setAgriQuery("What is the optimal irrigation schedule for clay loam soil?");
                                setAgriVoiceResponse("Green AI Voice Companion: Irrigate twice weekly in early mornings. Soil moisture sensors indicate optimal absorption at 68% field capacity.");
                              }
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              agriLanguage === lang
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={agriQuery}
                          onChange={(e) => setAgriQuery(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          onClick={() => {
                            setAgriVoiceResponse(`[Green AI Assistant - ${agriLanguage}] Answering: "${agriQuery}" → Optimal fertilizer and water mix calculated using IoT sensor telemetry.`);
                          }}
                          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0"
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>Ask AI</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-indigo-200 font-mono">
                        {agriVoiceResponse}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. SmartWaste Madurai (Green City) CleanTech Simulator */}
              {activeModalProject.demoType === 'smartwaste' && (
                <div className="space-y-5 text-xs text-slate-300">
                  {/* Geotagged Reporting & GPS Telemetry Panel */}
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-cyan-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        Geotagged Waste Reporting Console (Google Developers Groups (GDP) • IDS 5.0)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        Live GPS Telemetry Active
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Simulate a field citizen or sanitation worker logging real-time urban waste accumulation across Madurai wards:
                    </p>

                    {/* Ward Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Select Madurai Municipal Ward / Zone:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {[
                          'Meenakshi Amman Heritage Zone (Ward 14)',
                          'Mattuthavani Integrated Bus Terminal (Ward 32)',
                          'Goripalayam Medical Corridor (Ward 21)',
                          'Anna Nagar Residential Sector (Ward 42)'
                        ].map((ward) => (
                          <button
                            key={ward}
                            onClick={() => setWasteWard(ward)}
                            className={`p-2 rounded-xl text-left font-medium transition-all text-xs cursor-pointer ${
                              wasteWard === ward
                                ? 'bg-cyan-600/30 border border-cyan-400 text-cyan-200 shadow-md'
                                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-semibold text-white truncate">{ward}</div>
                            <div className="text-[10px] font-mono text-cyan-400/80">
                              {ward.includes('14') ? '9.9195° N, 78.1193° E' :
                               ward.includes('32') ? '9.9482° N, 78.1587° E' :
                               ward.includes('21') ? '9.9298° N, 78.1345° E' : '9.9174° N, 78.1482° E'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Waste Category & Accumulation Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase text-slate-400">Waste Classification:</label>
                        <select
                          value={wasteCategory}
                          onChange={(e) => setWasteCategory(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="Organic / Wet Waste">Organic & Wet Food Waste</option>
                          <option value="Recyclables (Plastic/Metal)">Recyclable Plastics & Metal</option>
                          <option value="Hazardous / E-Waste">Hazardous & Electronic Waste</option>
                          <option value="Overflowing Public Bin">Overflowing Public Community Bin</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-400 uppercase">Accumulation Severity:</span>
                          <span className={`font-bold ${wasteLevel > 75 ? 'text-rose-400' : wasteLevel > 45 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {wasteLevel}% ({wasteLevel > 75 ? 'Critical Overflow' : wasteLevel > 45 ? 'Moderate' : 'Normal'})
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={wasteLevel}
                          onChange={(e) => setWasteLevel(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Trigger Button */}
                    <button
                      onClick={handleLogWasteReport}
                      disabled={isWasteSyncing}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 cursor-pointer disabled:opacity-50"
                    >
                      {isWasteSyncing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Pushing Geotag to Firebase RTDB & Recalculating Routes...</span>
                        </>
                      ) : (
                        <>
                          <Radio className="w-4 h-4" />
                          <span>Log Geotagged Incident & Sync Central Municipality</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Realtime Backend Synchronization & Route Optimization Output */}
                  {wasteReportStatus && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white text-xs">Firebase Realtime DB Incident Payload</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {wasteReportStatus.syncedAt}
                        </span>
                      </div>

                      {/* Mock JSON Stream */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                        <div className="text-cyan-400">
                          {"{"} <span className="text-slate-400">"incident_id":</span> <span className="text-amber-300">"{wasteReportStatus.incidentId}"</span>, <span className="text-slate-400">"ward":</span> <span className="text-emerald-300">"{wasteWard}"</span> {"}"}
                        </div>
                        <div className="text-slate-400">
                          <span className="text-slate-500">└─</span> GPS Geotag: <span className="text-white">{wasteReportStatus.coords}</span> ({wasteReportStatus.accuracy})
                        </div>
                        <div className="text-slate-400">
                          <span className="text-slate-500">└─</span> Accumulation: <span className="text-rose-400 font-bold">{wasteLevel}%</span> | Type: <span className="text-indigo-300">{wasteCategory}</span>
                        </div>
                        <div className="text-emerald-400">
                          <span className="text-slate-500">└─</span> Central Sync Status: <span className="text-emerald-300 font-bold">ACKNOWLEDGED (HTTP 200 via Firebase Cloud Function)</span>
                        </div>
                      </div>

                      {/* Municipal Fleet Route Optimization Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[10px]">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 flex items-center gap-1 font-mono">
                            <Truck className="w-3.5 h-3.5 text-cyan-400" /> Assigned Fleet
                          </div>
                          <span className="text-cyan-300 font-bold block mt-1 text-xs">{wasteReportStatus.assignedVehicle}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 flex items-center gap-1 font-mono">
                            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Response Time
                          </div>
                          <span className="text-emerald-300 font-bold block mt-1 text-xs">{wasteReportStatus.etaReduction}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-slate-400 flex items-center gap-1 font-mono">
                            <Navigation className="w-3.5 h-3.5 text-amber-400" /> Route Dispatch
                          </div>
                          <span className="text-amber-300 font-bold block mt-1 text-xs">{wasteReportStatus.routeEfficiency}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 8. Gym Member Management Simulator */}
              {activeModalProject.demoType === 'gym' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-mono font-bold text-slate-200">GymManager.java Controller Console</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        DAO Pattern Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Member Full Name</label>
                        <input
                          type="text"
                          value={gymMemberName}
                          onChange={(e) => setGymMemberName(e.target.value)}
                          placeholder="e.g. Alex Johnson"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Membership Plan</label>
                        <select
                          value={gymPlan}
                          onChange={(e) => setGymPlan(e.target.value as any)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                        >
                          <option value="Premium Annual">Premium Annual</option>
                          <option value="Standard Monthly">Standard Monthly</option>
                          <option value="Cardio VIP">Cardio VIP</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleAddGymMember}
                      disabled={isGymProcessing || !gymMemberName.trim()}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>{isGymProcessing ? 'Persisting via DBConfig...' : 'Register Member (MemberDAO.insert)'}</span>
                    </button>
                  </div>

                  {/* SQL Transaction Log */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="text-slate-500 text-[10px] flex items-center justify-between">
                      <span>TRANSACTION LOG & REPOSITORY STATUS</span>
                      <span className="text-amber-400">DBConfig.java</span>
                    </div>
                    <p className="text-amber-300 font-mono break-all">{gymSqlLog}</p>
                  </div>

                  {/* Member Records Table */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <div className="bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 border-b border-slate-800">
                      Active Member Profiles (MySQL DB Snapshot)
                    </div>
                    <div className="divide-y divide-slate-800 bg-slate-950/60 max-h-48 overflow-y-auto font-mono text-xs">
                      {gymMembers.map((m) => (
                        <div key={m.id} className="p-2.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 text-[10px]">#{m.id}</span>
                            <span className="font-semibold text-slate-200">{m.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{m.plan}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">{m.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 9. Mini Store Inventory Simulator */}
              {activeModalProject.demoType === 'inventory' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono font-bold text-slate-200">Inventory_App.java Operations Console</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        DataBase_Connection.java Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Product SKU</label>
                        <input
                          type="text"
                          value={newSku}
                          onChange={(e) => setNewSku(e.target.value)}
                          placeholder="e.g. RET-104"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Item Title</label>
                        <input
                          type="text"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          placeholder="e.g. Barcode Reader"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          value={newQty}
                          onChange={(e) => setNewQty(Number(e.target.value))}
                          min={1}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddOrUpdateStock}
                      disabled={!newItemName.trim() || !newSku.trim()}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Commit Stock (Product_Manager.updateStock)</span>
                    </button>
                  </div>

                  {/* Transaction Log */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="text-slate-500 text-[10px] flex items-center justify-between">
                      <span>DATABASE_CONNECTION LOG</span>
                      <span className="text-cyan-400">Inventory_App.java</span>
                    </div>
                    <p className="text-cyan-300 font-mono break-all">{inventoryLog}</p>
                  </div>

                  {/* Current Inventory Stock Table */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <div className="bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 border-b border-slate-800">
                      Store Stock Ledger (Persistent JDBC Cache)
                    </div>
                    <div className="divide-y divide-slate-800 bg-slate-950/60 max-h-48 overflow-y-auto font-mono text-xs">
                      {storeItems.map((item) => (
                        <div key={item.sku} className="p-2.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 text-[11px] font-bold">[{item.sku}]</span>
                            <span className="font-semibold text-slate-200">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              item.qty < item.minQty ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
                            }`}>
                              Qty: {item.qty} {item.qty < item.minQty && '(LOW)'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 10. BioTrace AI - Interactive Health & Pharmacopoeia Simulator */}
              {activeModalProject.demoType === 'biotrace' && (
                <div className="space-y-4">
                  {activeModalProject.liveUrl && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 flex-wrap shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="text-xs text-white font-bold block">Live Web App Online on Streamlit Cloud</span>
                          <span className="text-[11px] text-emerald-300 font-mono">biotraceai.streamlit.app</span>
                        </div>
                      </div>
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Launch App</span>
                        <ExternalLink className="w-3 h-3 text-emerald-200" />
                      </a>
                    </div>
                  )}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-slate-200">
                          LangChain + Ayurvedic Pharmacopoeia Engine
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                          <Database className="w-3 h-3 text-cyan-400" />
                          <span>Real-Time Database</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          GPT-4 / Streamlit Local
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Medicine / Ayurvedic Herb Lookup</label>
                        <select
                          value={bioMedicine}
                          onChange={(e) => setBioMedicine(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                        >
                          <option value="Ashwagandha (Withania somnifera)">Ashwagandha (Withania somnifera)</option>
                          <option value="Tulsi (Ocimum sanctum)">Tulsi (Ocimum sanctum)</option>
                          <option value="Triphala Churna (Herbal Blend)">Triphala Churna (Herbal Blend)</option>
                          <option value="Metformin 500mg (Glycemic Management)">Metformin 500mg (Glycemic Management)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">TTS Voice Language</label>
                        <select
                          value={bioLanguage}
                          onChange={(e) => setBioLanguage(e.target.value as any)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                        >
                          <option value="English">English (IN)</option>
                          <option value="Tamil">Tamil (தமிழ்)</option>
                          <option value="Hindi">Hindi (हिन्दी)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={handleRunBioTraceAnalysis}
                        disabled={isBioAnalyzing}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isBioAnalyzing ? 'LangChain Querying...' : 'Synthesize Cultural Health Insights'}</span>
                      </button>

                      <button
                        onClick={handleSimulateTts}
                        disabled={bioTtsSpeaking}
                        className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          bioTtsSpeaking
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 animate-pulse'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{bioTtsSpeaking ? `gTTS Speaking (${bioLanguage})...` : 'Test gTTS Audio'}</span>
                      </button>
                    </div>
                  </div>

                  {/* AI Generated Clinical Analysis Output */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <HeartPulse className="w-3 h-3" />
                        <span>CLINICAL OVERVIEW & PHARMACOPOEIA</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{bioAnalysisResult.overview}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>REGIONAL AYURVEDIC DOSHA PROFILE</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{bioAnalysisResult.ayurvedicProperties}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-rose-400 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        <span>CROSS-INTERACTION PRECAUTIONS</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{bioAnalysisResult.interactions}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                        <Bell className="w-3 h-3" />
                        <span>SCHEDULED DOSAGE CHRONOTHERAPY</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{bioAnalysisResult.dosageGuideline}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 11. Signup-Wizard-Replication - Interactive Multi-Step Onboarding */}
              {activeModalProject.demoType === 'signup' && (
                <div className="space-y-4">
                  {/* Custom Toast Alert */}
                  {wizardToast && (
                    <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-semibold animate-fade-in ${
                      wizardToast.type === 'error'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : wizardToast.type === 'success'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    }`}>
                      <div className="flex items-center gap-2">
                        {wizardToast.type === 'error' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <span>{wizardToast.message}</span>
                      </div>
                      <button onClick={() => setWizardToast(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
                    </div>
                  )}

                  {/* Step Progress Bar */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">Progressive Disclosure Step {wizardStep} of 3</span>
                      <span className="text-indigo-400 font-bold">{wizardStep === 1 ? '33%' : wizardStep === 2 ? '66%' : '100%'}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full transition-all duration-300"
                        style={{ width: wizardStep === 1 ? '33%' : wizardStep === 2 ? '66%' : '100%' }}
                      />
                    </div>
                    <div className="grid grid-cols-3 text-center text-[10px] text-slate-400 font-mono pt-1">
                      <span className={wizardStep >= 1 ? 'text-indigo-400 font-bold' : ''}>1. Account</span>
                      <span className={wizardStep >= 2 ? 'text-indigo-400 font-bold' : ''}>2. Specialization</span>
                      <span className={wizardStep >= 3 ? 'text-emerald-400 font-bold' : ''}>3. Review</span>
                    </div>
                  </div>

                  {/* Form Container */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    {wizardStep === 1 && (
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-slate-200">Step 1: Personal & Contact Credentials</div>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                            <input
                              type="text"
                              value={wizardName}
                              onChange={(e) => setWizardName(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
                            <input
                              type="email"
                              value={wizardEmail}
                              onChange={(e) => setWizardEmail(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 2 && (
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-slate-200">Step 2: Track & Authentication Security</div>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Engineering Track</label>
                            <select
                              value={wizardTrack}
                              onChange={(e) => setWizardTrack(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
                            >
                              <option value="AI & Data Engineering">AI & Data Engineering</option>
                              <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                              <option value="Cloud & Microservices">Cloud & Microservices</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Account Password (min 6 chars)</label>
                            <input
                              type="password"
                              value={wizardPassword}
                              onChange={(e) => setWizardPassword(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {wizardStep === 3 && (
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-slate-200">Step 3: Verification & Context API Payload</div>
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300">
                          <div><span className="text-slate-500">Name:</span> {wizardName}</div>
                          <div><span className="text-slate-500">Email:</span> {wizardEmail}</div>
                          <div><span className="text-slate-500">Track:</span> {wizardTrack}</div>
                          <div><span className="text-slate-500">Validation:</span> <span className="text-emerald-400">All rules passed</span></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      {wizardStep > 1 ? (
                        <button
                          onClick={() => setWizardStep((prev) => (prev - 1) as any)}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                        >
                          Back
                        </button>
                      ) : <div />}

                      <button
                        onClick={handleWizardNext}
                        className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{wizardStep === 3 ? 'Deploy & Finish' : 'Next Step'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-600/30 cursor-pointer"
                    title="Open Live Website"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Website</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200" />
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="View Source Repository on GitHub"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-300" />
                    <span>View GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer"
              >
                Close Project Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
