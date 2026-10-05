export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Web' | 'Health ML' | 'Blockchain & Security' | 'Mobile & P2P' | 'Full Stack' | 'AgriTech & AI' | 'Smart City & CleanTech' | 'Java & Database Management' | 'Retail Tech & Inventory Management' | 'HealthTech & AI' | 'Frontend Development & UI/UX';
  description: string;
  keyInnovations: string[];
  keyChallenges?: string[];
  fullStackDetails?: {
    frontend: string[];
    backend: string[];
    databaseAndCloud: string[];
    toolsAndProtocols: string[];
  };
  techStack: string[];
  impact: string;
  demoType: 'compiler' | 'health' | 'blockchain' | 'p2p' | 'notes' | 'agri' | 'smartwaste' | 'gym' | 'inventory' | 'biotrace' | 'signup';
  demoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  period: string;
  mode: 'Offline' | 'Virtual' | 'Remote';
  location?: string;
  highlights: string[];
  skillsGained: string[];
}

export interface AcademicQualification {
  level: string;
  institution: string;
  field: string;
  location: string;
  period: string;
  grade: string;
  percentage?: string;
  badge?: string;
}

export interface CertificationCategory {
  category: string;
  items: {
    title: string;
    issuer?: string;
    credentialId?: string;
    featured?: boolean;
    date?: string;
  }[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface PersonalityTrait {
  trait: string;
  description: string;
}

export interface CodeChefLiveStats {
  username: string;
  problemsSolved: string;
  problemsSolvedNumber: number;
  rating: number;
  highestRating: number;
  stars: string;
  division: string;
  globalRank: string;
  countryRank: string;
  dsaRating?: number;
  dsaHighestRating?: number;
  dsaGlobalRank?: string;
  dsaCountryRank?: string;
  league?: string;
  profileUrl: string;
  lastSyncedAt: string;
  source: 'live' | 'stale-cache' | 'fallback';
  cached?: boolean;
  latestContest?: {
    name: string;
    code: string;
    rank: string;
    rating: string;
  };
  latestDsaContest?: {
    name: string;
    code: string;
    rank: string;
    rating: string;
  };
}
