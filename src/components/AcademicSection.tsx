import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Award, Trophy, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Code2, Heart, Flame, Target, Filter, Building2, RotateCcw, ChevronDown, Check, Layers, RefreshCw, Gem } from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';
import { HeroSection } from './HeroSection';
import { useCodeChef } from '../context/CodeChefContext';

interface AcademicSectionProps {
  onOpenContact?: () => void;
  onSelectProjects?: () => void;
  onSelectSkills?: () => void;
}

// Helper to determine if a certification is Technical vs Non-Technical
const isTechnicalCert = (title: string, category?: string): boolean => {
  const cat = category?.toLowerCase() || '';
  if (
    cat.includes('non-technical') || 
    cat.includes('co-curricular') || 
    cat.includes('extra-curricular') || 
    cat.includes('workshop') || 
    cat.includes('bootcamp')
  ) {
    return false;
  }
  return true;
};

export const AcademicSection: React.FC<AcademicSectionProps> = ({ 
  onOpenContact = () => {}, 
  onSelectProjects = () => {} 
}) => {
  const { stats, isSyncing, lastSyncedFormatted, refreshStats } = useCodeChef();
  const [activeSubTab, setActiveSubTab] = useState<'education' | 'certifications' | 'achievements'>('education');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('All');
  const [trackFilter, setTrackFilter] = useState<'all' | 'technical' | 'non-technical'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Define Company / Issuer filter definitions for Technical Certificates
  const COMPANY_FILTERS = useMemo(() => [
    { 
      id: 'CodeChef', 
      label: 'CodeChef', 
      match: (issuer: string) => issuer.toLowerCase().includes('codechef') 
    },
    { 
      id: 'Infosys', 
      label: 'Infosys Springboard', 
      match: (issuer: string) => issuer.toLowerCase().includes('infosys') 
    },
    { 
      id: 'Snowflake', 
      label: 'Snowflake', 
      match: (issuer: string) => issuer.toLowerCase().includes('snowflake') 
    },
    { 
      id: 'TCS', 
      label: 'TCS CodeVita', 
      match: (issuer: string) => issuer.toLowerCase().includes('tcs') || issuer.toLowerCase().includes('codevita') 
    },
    { 
      id: 'Forage', 
      label: 'Forage', 
      match: (issuer: string) => issuer.toLowerCase().includes('forage')
    },
    { 
      id: 'Deloitte', 
      label: 'Deloitte', 
      match: (issuer: string) => issuer.toLowerCase().includes('deloitte') 
    },
    { 
      id: 'Google', 
      label: 'Google', 
      match: (issuer: string) => issuer.toLowerCase().includes('google') || issuer.toLowerCase().includes('gdg') 
    },
    { 
      id: 'NPTEL', 
      label: 'NPTEL (IITs)', 
      match: (issuer: string) => issuer.toLowerCase().includes('nptel') 
    },
    { 
      id: 'Cisco', 
      label: 'Cisco', 
      match: (issuer: string) => issuer.toLowerCase().includes('cisco') 
    },
    { 
      id: 'Capabl', 
      label: 'Capabl', 
      match: (issuer: string) => issuer.toLowerCase().includes('capabl') 
    },
    { 
      id: 'VaultofCodes', 
      label: 'VaultofCodes', 
      match: (issuer: string) => issuer.toLowerCase().includes('vaultofcodes') 
    },
    { 
      id: 'MasterClass', 
      label: 'MasterClass', 
      match: (issuer: string) => ['novitech', 'freedomwithai', 'masai'].some(k => issuer.toLowerCase().includes(k)) 
    }
  ], []);

  // Compute counts for company filters (Technical)
  const companyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    COMPANY_FILTERS.forEach(f => {
      let count = 0;
      GOKUL_PROFILE.certifications.forEach(cat => {
        cat.items.forEach(item => {
          if (isTechnicalCert(item.title, cat.category) && f.match(item.issuer || '')) {
            count++;
          }
        });
      });
      counts[f.id] = count;
    });
    return counts;
  }, [COMPANY_FILTERS]);

  // Non-technical categories
  const NON_TECH_CATEGORIES = useMemo(() => {
    return GOKUL_PROFILE.certifications
      .filter(cat => !isTechnicalCert(cat.items[0]?.title || '', cat.category))
      .map(cat => ({
        id: cat.category,
        label: cat.category,
        count: cat.items.length
      }));
  }, []);

  // Global counts for Track / Domain categories
  const trackCounts = useMemo(() => {
    let allCount = 0;
    let techCount = 0;
    let nonTechCount = 0;

    GOKUL_PROFILE.certifications.forEach(cat => {
      cat.items.forEach(item => {
        allCount++;
        if (isTechnicalCert(item.title, cat.category)) {
          techCount++;
        } else {
          nonTechCount++;
        }
      });
    });

    return { all: allCount, technical: techCount, nonTechnical: nonTechCount };
  }, []);

  // Filter pills to display based on the active track filter
  const visiblePills = useMemo(() => {
    if (trackFilter === 'technical') {
      return COMPANY_FILTERS.map(f => ({
        id: f.id,
        label: f.label,
        count: companyCounts[f.id] || 0
      }));
    }
    if (trackFilter === 'non-technical') {
      return NON_TECH_CATEGORIES;
    }
    // 'all' track: Show both Technical Company filters + Non-Technical Categories
    return [
      ...COMPANY_FILTERS.map(f => ({
        id: f.id,
        label: f.label,
        count: companyCounts[f.id] || 0
      })),
      ...NON_TECH_CATEGORIES
    ];
  }, [trackFilter, COMPANY_FILTERS, companyCounts, NON_TECH_CATEGORIES]);

  // Filter certifications based on company/category filter AND track filter
  const filteredCertifications = useMemo(() => {
    return GOKUL_PROFILE.certifications.map(cat => {
      const isTech = isTechnicalCert(cat.items[0]?.title || '', cat.category);

      // Track check (Technical / Non-Technical / All)
      if (trackFilter === 'technical' && !isTech) return { ...cat, items: [] };
      if (trackFilter === 'non-technical' && isTech) return { ...cat, items: [] };

      // Sub-filter check
      if (selectedSubFilter === 'All') return cat;

      // Check if selectedSubFilter is a company filter
      const comp = COMPANY_FILTERS.find(f => f.id === selectedSubFilter);
      if (comp) {
        const matchingItems = cat.items.filter(item => comp.match(item.issuer || ''));
        return { ...cat, items: matchingItems };
      }

      // Check if selectedSubFilter is a category filter
      if (cat.category === selectedSubFilter) {
        return cat;
      }

      return { ...cat, items: [] };
    }).filter(cat => cat.items.length > 0);
  }, [selectedSubFilter, trackFilter, COMPANY_FILTERS]);

  const totalFilteredCount = useMemo(() => {
    return filteredCertifications.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCertifications]);

  const totalCertCount = trackCounts.all;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-8">
      
      {/* Top Hero Section (Matching layout of reference image) */}
      <HeroSection 
        onOpenContact={onOpenContact} 
        onSelectProjects={onSelectProjects} 
      />

      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="glass p-6 sm:p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-200 border border-white/10 mb-3 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
              Academic & Certifications Vault
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 tracking-tight">
              Education, Certifications & Achievements
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              B.Tech IT CGPA 8.3 candidate at Sethu Institute of Technology with global competitive coding milestones ({stats.rating} CodeChef Rating - {stats.stars} {stats.division}, {stats.dsaRating || 2472} DSA Rating - Global Rank {stats.dsaGlobalRank || '2'}, {stats.problemsSolved} Problems Solved, TCS CodeVita Round 2) and 150+ professional certifications.
            </p>
          </div>

          {/* Sub Tab Switcher */}
          <div className="flex items-center gap-1 sm:gap-1.5 glass-dark p-1.5 rounded-2xl border border-white/10 shrink-0 backdrop-blur-md max-w-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSubTab('education')}
              className={`whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeSubTab === 'education'
                  ? 'bg-white/20 text-white border border-white/30 shadow-md backdrop-blur-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Academic Qualifications
            </button>
            <button
              onClick={() => setActiveSubTab('certifications')}
              className={`whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeSubTab === 'certifications'
                  ? 'bg-white/20 text-white border border-white/30 shadow-md backdrop-blur-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => setActiveSubTab('achievements')}
              className={`whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeSubTab === 'achievements'
                  ? 'bg-white/20 text-white border border-white/30 shadow-md backdrop-blur-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Achievements
            </button>
          </div>
        </div>
      </motion.div>

      {/* SUB TAB 1: ACADEMIC QUALIFICATIONS */}
      {activeSubTab === 'education' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GOKUL_PROFILE.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
              className="glass p-6 transition-all hover:border-white/30 shadow-xl relative overflow-hidden group"
            >
              {edu.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 border border-white/10 backdrop-blur-md">
                  {edu.badge}
                </span>
              )}

              <div className="p-3 rounded-2xl bg-white/10 text-indigo-300 border border-white/10 w-fit mb-4 backdrop-blur-md">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                {edu.level}
              </h3>

              <p className="text-xs font-semibold text-indigo-200 mt-1">{edu.institution}</p>
              <p className="text-xs text-slate-300 mt-0.5">{edu.location} • {edu.period}</p>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-300 font-medium">Academic Performance:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {edu.percentage && (
                    <span className="text-sm font-extrabold text-cyan-300 font-mono bg-cyan-500/20 px-3 py-1 rounded-xl border border-cyan-500/30 backdrop-blur-md">
                      Percentage : {edu.percentage}
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-emerald-300 font-mono bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/30 backdrop-blur-md">
                    {edu.grade}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* SUB TAB 2: CERTIFICATIONS VAULT */}
      {activeSubTab === 'certifications' && (
        <div className="space-y-8">
          {/* Interactive Company Filter Section */}
          <div
            className="glass p-6 sm:p-8 rounded-2xl relative shadow-2xl space-y-6"
          >
            {/* Background Glow Accent */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none overflow-hidden" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-white/10 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-200 border border-white/10 mb-3 backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5 text-indigo-300" />
                  Verified Credential Portfolio
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 tracking-tight flex items-center gap-3 flex-wrap">
                  Certificates & Specialization Tracks
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Explore verified credentials filtered across Technical and Non-Technical categories including Core Programming, DSA, Full-Stack, MasterClasses, Cybersecurity, Co-Curricular & Extra-Curricular activities, Workshops, and Bootcamps.
                </p>
              </div>

              {/* Reset Filter Button (Shown only when a specific company or category sub-filter is active) */}
              {selectedSubFilter !== 'All' && (
                <button
                  onClick={() => {
                    setSelectedSubFilter('All');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-mono transition-colors border border-white/20 shrink-0 font-semibold cursor-pointer shadow-md"
                  title="Reset filter"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Show All ({trackFilter === 'technical' ? trackCounts.technical : trackFilter === 'non-technical' ? trackCounts.nonTechnical : totalCertCount})</span>
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 relative z-20">
              <span className="text-slate-200 mr-1 flex items-center justify-center bg-white/5 p-2 rounded-xl border border-white/10" title="Filters">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
              </span>

              {/* Dropdown Filter: Technical vs Non-Technical (Styled compact & elevated) */}
              <div className="relative z-50" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedSubFilter === 'All'
                      ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40 scale-[1.02]'
                      : 'bg-slate-950/80 hover:bg-slate-900 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 shadow-md'
                  }`}
                >
                  <span className="font-bold tracking-wide">
                    {trackFilter === 'all'
                      ? 'All Certificates'
                      : trackFilter === 'technical'
                      ? 'Technical Certificates'
                      : 'Non-Technical Certificates'}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors font-bold ${
                      selectedSubFilter === 'All'
                        ? 'bg-blue-950 text-blue-200 border border-blue-400/50'
                        : 'bg-white/10 text-slate-300 group-hover:text-white group-hover:bg-white/20'
                    }`}
                  >
                    {trackFilter === 'all'
                      ? trackCounts.all
                      : trackFilter === 'technical'
                      ? trackCounts.technical
                      : trackCounts.nonTechnical}
                  </span>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu - Short, compact, and fully elevated */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 3, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 2, scale: 0.98 }}
                      transition={{ duration: 0.1 }}
                      className="absolute left-0 top-full mt-1 w-56 sm:w-60 p-1 rounded-xl bg-[#090e1a]/98 backdrop-blur-2xl border border-white/20 shadow-2xl z-[99] space-y-0.5"
                    >
                      <div className="px-2 py-0.5 text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase border-b border-white/10 mb-0.5">
                        Certificate Tracks
                      </div>

                      {/* Option 1: All Certificates */}
                      <button
                        onClick={() => {
                          setTrackFilter('all');
                          setSelectedSubFilter('All');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all font-semibold text-xs cursor-pointer ${
                          trackFilter === 'all' && selectedSubFilter === 'All'
                            ? 'bg-[#2563eb] text-white font-bold shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="tracking-wide">All Certificates</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-mono font-bold ${trackFilter === 'all' && selectedSubFilter === 'All' ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({trackCounts.all})
                          </span>
                          {trackFilter === 'all' && selectedSubFilter === 'All' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm inline-block shrink-0 animate-pulse" />
                          )}
                        </div>
                      </button>

                      {/* Option 2: Technical Certificates */}
                      <button
                        onClick={() => {
                          setTrackFilter('technical');
                          setSelectedSubFilter('All');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all font-semibold text-xs cursor-pointer ${
                          trackFilter === 'technical' && selectedSubFilter === 'All'
                            ? 'bg-[#2563eb] text-white font-bold shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="tracking-wide">Technical</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-mono font-bold ${trackFilter === 'technical' && selectedSubFilter === 'All' ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({trackCounts.technical})
                          </span>
                          {trackFilter === 'technical' && selectedSubFilter === 'All' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm inline-block shrink-0 animate-pulse" />
                          )}
                        </div>
                      </button>

                      {/* Option 3: Non-Technical Certificates */}
                      <button
                        onClick={() => {
                          setTrackFilter('non-technical');
                          setSelectedSubFilter('All');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all font-semibold text-xs cursor-pointer ${
                          trackFilter === 'non-technical' && selectedSubFilter === 'All'
                            ? 'bg-[#2563eb] text-white font-bold shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="tracking-wide">Non-Technical</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-mono font-bold ${trackFilter === 'non-technical' && selectedSubFilter === 'All' ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({trackCounts.nonTechnical})
                          </span>
                          {trackFilter === 'non-technical' && selectedSubFilter === 'All' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm inline-block shrink-0 animate-pulse" />
                          )}
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Filter Pills (Company Filters for Technical, Category Filters for Non-Technical) */}
              {visiblePills.map((pill) => {
                const isSelected = selectedSubFilter === pill.id;

                return (
                  <button
                    key={pill.id}
                    onClick={() => {
                      setSelectedSubFilter(isSelected ? 'All' : pill.id);
                    }}
                    className={`group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/40 border border-indigo-300 scale-[1.02]'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/25 shadow-md'
                    }`}
                  >
                    <span>{pill.label}</span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-md transition-colors font-bold ${
                        isSelected
                          ? 'bg-indigo-950 text-indigo-200 border border-indigo-400'
                          : 'bg-white/10 text-slate-300 group-hover:text-white group-hover:bg-white/20'
                      }`}
                    >
                      {pill.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Standard Certification Categories - Filtered */}
          {filteredCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCertifications.map((cat, idx) => (
                <motion.div 
                  key={`${cat.category}-${selectedSubFilter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05, ease: 'easeOut' }}
                  className="glass p-6 shadow-xl space-y-4"
                >
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Award className="w-5 h-5 text-indigo-300" />
                    <h3 className="text-base font-bold text-white">{cat.category}</h3>
                  </div>

                  <div className="space-y-2.5">
                    {cat.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-3 rounded-xl flex items-start justify-between gap-2 transition-all duration-200 glass-dark"
                      >
                        <div className="flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold block text-slate-200">
                              {item.title}
                            </span>
                            {item.issuer && (
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                <span className="text-[11px] font-medium text-slate-300">
                                  Issued by: {item.issuer}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center glass rounded-2xl border border-white/10 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  No certifications match this filter
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  Try selecting a different filter or view all {totalCertCount} credentials.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedSubFilter('All');
                  setTrackFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                View All Certificates ({trackCounts.all})
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* SUB TAB 3: ACHIEVEMENTS & TRAITS */}
      {activeSubTab === 'achievements' && (
        <div className="space-y-6">
          {/* Top Live Sync Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-mono font-bold text-white tracking-wide uppercase">
                    CodeChef Competitive Milestones
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Sync</span>
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  Handle: <span className="text-slate-200 font-semibold">gokul_v_3776</span> • Last verified: <span className="text-cyan-300">{lastSyncedFormatted}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <button
                onClick={() => refreshStats()}
                disabled={isSyncing}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                title="Fetch latest stats directly from CodeChef website"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Live'}</span>
              </button>
              <a 
                href="https://codechef.com/users/gokul_v_3776" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Open Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 Core CodeChef Live Cards: Rating, DSA Rating, and Problems Solved */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: CodeChef Rating */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-5 space-y-4 border border-amber-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-amber-950/30 relative overflow-hidden group shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 backdrop-blur-md shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-extrabold text-white tracking-tight">
                          CodeChef Rating
                        </h3>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live</span>
                        </span>
                      </div>
                      <p className="text-xs text-amber-300 font-mono font-semibold truncate mt-0.5">
                        {stats.stars || '5★'} ({stats.division || 'Div 1'})
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://codechef.com/users/gokul_v_3776" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-all shrink-0"
                    title="View CodeChef Rating & Profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 font-mono text-center">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">Rating</span>
                    <span className="text-base font-extrabold text-amber-300">{stats.rating}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">Peak {stats.highestRating}</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">Global Rank</span>
                    <span className="text-xs sm:text-sm font-bold text-indigo-200">{stats.globalRank}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">Worldwide</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">Country Rank</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">{stats.countryRank}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">India</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Division 1 competitive programmer holding 5-Star rating on CodeChef with top global percentile standing.
                </p>
              </div>
            </motion.div>

            {/* Card 2: CodeChef DSA Rating */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-5 space-y-4 border border-violet-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-violet-950/30 relative overflow-hidden group shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 backdrop-blur-md shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-extrabold text-white tracking-tight">
                          CodeChef DSA Rating
                        </h3>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live</span>
                        </span>
                      </div>
                      <p className="text-xs text-violet-300 font-mono font-semibold truncate mt-0.5">
                        DSA Challenge • Peak {stats.dsaHighestRating || stats.dsaRating || 2472}
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://codechef.com/users/gokul_v_3776" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-all shrink-0"
                    title="View CodeChef DSA Ranklist"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 font-mono text-center">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">DSA Rating</span>
                    <span className="text-base font-extrabold text-violet-300">{stats.dsaRating || 2472}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">Peak {stats.dsaHighestRating || stats.dsaRating || 2472}</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">DSA Global</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300"># {stats.dsaGlobalRank || '2'}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">Top 3 Global</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">DSA Country</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-300"># {stats.dsaCountryRank || '1'}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">#1 in India</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ranked #{stats.dsaGlobalRank || '2'} worldwide and #{stats.dsaCountryRank || '1'} in India on CodeChef DSA ratings with peak rating of {stats.dsaHighestRating || stats.dsaRating || 2472}.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Real-time CodeChef Problems Solved */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-5 space-y-4 border border-cyan-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/30 relative overflow-hidden group shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 backdrop-blur-md shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-extrabold text-white tracking-tight">
                          Problems Solved
                        </h3>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live</span>
                        </span>
                      </div>
                      <p className="text-xs text-cyan-300 font-mono font-semibold truncate mt-0.5">
                        CodeChef {stats.stars || '5★'} Practice & Contests
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://codechef.com/users/gokul_v_3776" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-all shrink-0"
                    title="View Solved Problems on CodeChef"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 font-mono text-center">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">Total Solved</span>
                    <span className="text-base font-extrabold text-amber-300">{stats.problemsSolved || '3537'}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">Problems</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">Platform</span>
                    <span className="text-xs sm:text-sm font-bold text-indigo-200">CodeChef</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">Active Elite</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block truncate">Rating Tier</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-300">{stats.stars || '5★'}</span>
                    <span className="text-[9px] text-slate-400 block -mt-0.5 truncate">{stats.division || 'Div 1'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Solved <strong className="text-amber-300 font-bold">{stats.problemsSolved || '3537'}</strong> algorithmic, dynamic programming, and data structure problems on CodeChef.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Global Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diamond League in CodeChef Card */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 space-y-4 border border-cyan-400/40 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-cyan-950/50 relative overflow-hidden group shadow-lg shadow-cyan-500/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Gem className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold text-white">
                        Diamond League in CodeChef
                      </h3>
                      <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                        Diamond Tier
                      </span>
                    </div>
                    <p className="text-xs text-cyan-200/90 font-mono mt-0.5">Elite Competitive League Division</p>
                  </div>
                </div>
                <a 
                  href="https://codechef.com/users/gokul_v_3776" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 text-xs font-mono font-bold transition-all w-fit shrink-0"
                >
                  View League ↗
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-center">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">League Tier</span>
                  <span className="text-sm sm:text-base font-extrabold text-cyan-300">Diamond</span>
                  <span className="text-[9px] text-cyan-400/80 block -mt-0.5">Top Tier</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">Platform</span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-200">CodeChef</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">Status</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-300">Active Elite</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Earned the prestigious <strong className="text-cyan-300 font-bold">Diamond League</strong> status on CodeChef, demonstrating continuous competitive excellence, consistent top-percentile contest standings, and mastery over algorithmic problem solving.
                </p>
              </div>
            </motion.div>

            {/* 150+ Certifications Card */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 space-y-4 border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-emerald-950/40 relative overflow-hidden group shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 backdrop-blur-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    150+ Professional & Practice Certifications
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                      Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Completed across Cloud, AI, Security, Web & Competitive DSA</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/10">
                Earned over 150+ industry certifications including TCS CodeVita Season 13 Round 2, 72 CodeChef tracks & projects, 28 Infosys Springboard tracks (AI, GenAI, DevOps & Cloud), Snowflake specialized credentials (Advanced Data Engineering, Building AI Agents, Building Generative AI, Apache Iceberg From Zero to Production Data Lakehouse), Deloitte Australia Tech (AWS Architecture), Cisco (Cybersecurity), NPTEL (Cloud & HCI), Tata (Data Visualisation & GenAI), and Electronic Arts.
              </p>
            </motion.div>

            {/* TCS CodeVita Season 13 */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 space-y-4 border border-amber-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-amber-950/50 relative overflow-hidden group shadow-lg shadow-amber-500/10"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 backdrop-blur-md shrink-0">
                    <Trophy className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">TCS CodeVita Season 13</h3>
                    <p className="text-xs text-amber-300 font-mono font-bold">Global Round 2 Qualifier • Rank 1843 (2025)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Cert
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Advanced to Round 2 of the premier Global Coding Contest, securing a prestigious <strong className="text-amber-300 font-bold">Global Rank of 1843</strong> among top competitive programmers worldwide in algorithmic logic and computational efficiency.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>Credential: <span className="text-amber-300 font-bold">TCS_CodeVita_Season13_gokul_v_07</span></span>
                <span className="text-emerald-300 font-bold">Round 2 Certified</span>
              </div>
            </motion.div>

            {/* 36-Hr PromptWar Hackathon */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 space-y-4 border border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-indigo-950/50 relative overflow-hidden group shadow-lg shadow-indigo-500/10"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 backdrop-blur-md shrink-0">
                    <Flame className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">36-Hr PromptWar Hackathon</h3>
                    <p className="text-xs text-indigo-300 font-mono font-bold">Build with AI | Google Developer Groups (GDG) Madurai</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-bold shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Hackathon
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Certificate of Participation issued by GDG Madurai in collaboration with YI Madurai at Sethu Institute of Technology. Contributed to 36 hours of continuous ideation and AI solution development.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>Organizers: <span className="text-indigo-300 font-semibold">GDG Madurai & YI Madurai</span></span>
                <span className="text-cyan-300 font-bold">36 Hours Marathon</span>
              </div>
            </motion.div>

            {/* CodeChef Contest Card (Placed Last in Achievements) */}
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 space-y-4 border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 relative overflow-hidden group shadow-lg"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 backdrop-blur-md shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold text-white">
                        CodeChef Contest
                      </h3>
                      <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold">
                        {stats.latestDsaContest?.code || stats.latestContest?.code || 'PLACEPREP02'}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-200/90 font-semibold mt-0.5">
                      {stats.latestDsaContest?.name || stats.latestContest?.name || 'Placement Prep Weekends - 02'}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 font-mono text-center">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">
                    {stats.latestDsaContest ? 'Contest Rating' : 'Your Score'}
                  </span>
                  <span className="text-lg font-extrabold text-cyan-300">
                    {stats.latestDsaContest?.rating || '2350'}
                  </span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block">Contest Rank</span>
                  <span className="text-lg font-extrabold text-emerald-300">
                    # {stats.latestDsaContest?.rank || stats.latestContest?.rank || '13'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Secured <strong className="text-emerald-300 font-bold">Rank {stats.latestDsaContest?.rank || stats.latestContest?.rank || '13'}</strong> in {stats.latestDsaContest?.name || 'CodeChef Placement Prep Weekends contest'} with top percentile competitive standing.
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Placement Prep 02: <strong className="text-indigo-300">Score 2350 • Rank #13</strong></span>
                  <span className="text-amber-300 font-semibold">Verified CodeChef</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Personality Traits & Hobbies */}
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 shadow-xl space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Personality Traits & Beyond Code
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {GOKUL_PROFILE.personalityTraits.map((trait, tIdx) => (
                <div key={tIdx} className="p-4 rounded-xl glass-dark space-y-1 border border-white/10">
                  <span className="font-bold text-indigo-200 block">{trait.trait}</span>
                  <p className="text-slate-300 leading-relaxed">{trait.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
              <span className="text-xs text-slate-300 font-semibold self-center mr-2">Hobbies & Sports:</span>
              {GOKUL_PROFILE.hobbies.map((hobby, hIdx) => (
                <span key={hIdx} className="skill-tag text-slate-200">
                  {hobby}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
