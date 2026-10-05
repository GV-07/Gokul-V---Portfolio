import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, Sparkles, Filter, ArrowUpDown } from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';
import { KeywordModal } from './KeywordModal';

const parsePeriodToTimestamp = (periodStr: string): number => {
  const monthsMap: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, april: 4, may: 5, jun: 6, june: 6,
    jul: 7, july: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12
  };
  
  const match = periodStr.match(/([a-zA-Z]+)\s+(\d{4})/);
  if (match) {
    const monthStr = match[1].toLowerCase();
    const year = parseInt(match[2], 10);
    const month = monthsMap[monthStr] || 1;
    return year * 100 + month;
  }
  return 0;
};

export const ExperienceTimeline: React.FC = () => {
  const [filterMode, setFilterMode] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'2026-2023' | '2023-2026'>('2026-2023');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const filteredInternships = GOKUL_PROFILE.internships
    .filter(item => filterMode === 'All' || item.mode === filterMode)
    .sort((a, b) => {
      const timeA = parsePeriodToTimestamp(a.period);
      const timeB = parsePeriodToTimestamp(b.period);
      if (sortOrder === '2026-2023') {
        return timeB - timeA; // Newest first (2026 at top, 2023 at bottom)
      } else {
        return timeA - timeB; // Oldest first (2023 at top, 2026 at bottom)
      }
    });

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-200 border border-white/10 mb-3 backdrop-blur-md">
              <Briefcase className="w-3.5 h-3.5 text-indigo-300" />
              Professional Experience
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 tracking-tight">
              Industry Internships & Roles
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hands-on engineering roles across Full-Stack Web Development, Data Science, AI/ML, UI/UX Design, Robotics IoT, and Virtual Social Entrepreneurship.
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Filter */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <Filter className="w-3.5 h-3.5 text-indigo-300 ml-2 mr-1" />
              {['All', 'Offline', 'Virtual'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filterMode === mode
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Year Chronological Sort */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-cyan-500/30 backdrop-blur-md">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-300 ml-2 mr-1" />
              <button
                onClick={() => setSortOrder('2026-2023')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sortOrder === '2026-2023'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                2026 → 2023
              </button>
              <button
                onClick={() => setSortOrder('2023-2026')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sortOrder === '2023-2026'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                2023 → 2026
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-indigo-400/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
        {filteredInternships.map((intern, idx) => (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, x: -25, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
            className="relative group"
          >
            {/* Timeline Node Icon */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border-2 border-indigo-400 text-indigo-300 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all backdrop-blur-md">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            {/* Content Card */}
            <div className="glass p-6 transition-all hover:border-white/30 shadow-xl hover:shadow-indigo-500/10">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {intern.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-200 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400 inline" />
                    <span>{intern.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 flex items-center gap-1 backdrop-blur-md">
                    <Calendar className="w-3 h-3 text-indigo-300" />
                    {intern.period}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md ${
                    intern.mode === 'Offline'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  }`}>
                    {intern.mode}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mt-4">
                {intern.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Skills Badges - Interactive Keyword Pills */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                {intern.skillsGained.map((skill, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setSelectedKeyword(skill)}
                    className="skill-tag text-slate-200 hover:text-indigo-200 bg-white/5 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-400/50 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
                    title={`Click to read about ${skill}`}
                  >
                    <span>{skill}</span>
                  </button>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Keyword Details Modal */}
      <KeywordModal
        keyword={selectedKeyword}
        onClose={() => setSelectedKeyword(null)}
      />

    </div>
  );
};

