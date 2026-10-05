import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2, Globe, Database, Cpu, Sparkles, CheckCircle2, Search, Zap,
  Coffee, Terminal, Binary, FileJson, Layout, Palette, BarChart3, Atom,
  Layers, GitBranch, Smartphone, Bot, Compass, Flame, Network, LineChart,
  Boxes, Share2, LayoutGrid, Lock, Wifi, BarChart2, Tag, Info,
  FileText, FileSpreadsheet, Presentation, ClipboardList, BookOpen,
  Brain, Shield, ShieldCheck, Target, TrendingUp, Cloud, Cog, MessageSquare,
  Gamepad2, Lightbulb, Workflow, FileCheck
} from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';

const KeywordModal = React.lazy(() =>
  import('./KeywordModal').then((m) => ({ default: m.KeywordModal }))
);

interface SkillMeta {
  percentage: number;
  level: 'Expert' | 'Advanced' | 'Proficient';
  barColor: string;
  badgeBg: string;
}

export const SkillsMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'bars' | 'compact'>('compact');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Languages':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Web & Frameworks':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Databases & Tools':
      case 'Database & Tools':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Secondary Skills':
        return <Sparkles className="w-5 h-5 text-fuchsia-400" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  const getSkillIcon = (skillName: string) => {
    const lower = skillName.toLowerCase();
    if (lower.includes('react')) return <Atom className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    if (lower.includes('java') && !lower.includes('script')) return <Coffee className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
    if (lower.includes('javascript') || lower.includes('js')) return <FileJson className="w-3.5 h-3.5 text-yellow-300 shrink-0" />;
    if (lower.includes('python')) return <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    if (lower.includes('c++') || lower === 'c' || lower.includes('c/c++')) return <Binary className="w-3.5 h-3.5 text-indigo-300 shrink-0" />;
    if (lower.includes('html')) return <Layout className="w-3.5 h-3.5 text-orange-400 shrink-0" />;
    if (lower.includes('css')) return <Palette className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
    if (lower.includes('streamlit') || lower.includes('gradio')) return <BarChart3 className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
    if (lower.includes('spring')) return <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    if (lower.includes('rest')) return <Network className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
    if (lower.includes('next')) return <Zap className="w-3.5 h-3.5 text-white shrink-0" />;
    if (lower.includes('mysql') || lower.includes('pl/sql') || lower.includes('database')) return <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    if (lower.includes('mongo')) return <Layers className="w-3.5 h-3.5 text-emerald-300 shrink-0" />;
    if (lower.includes('maven') || lower.includes('gradle')) return <Boxes className="w-3.5 h-3.5 text-orange-400 shrink-0" />;
    if (lower.includes('github') || lower.includes('git')) return <GitBranch className="w-3.5 h-3.5 text-purple-300 shrink-0" />;
    if (lower.includes('android')) return <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    if (lower.includes('gemini') || lower.includes('google ai')) return <Bot className="w-3.5 h-3.5 text-sky-300 shrink-0" />;
    if (lower.includes('copilot')) return <Bot className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
    if (lower.includes('vs code') || lower.includes('code')) return <Code2 className="w-3.5 h-3.5 text-blue-300 shrink-0" />;
    if (lower.includes('antigravity')) return <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (lower.includes('firebase') || lower.includes('firestore')) return <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (lower.includes('analytics')) return <LineChart className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (lower.includes('flow')) return <Workflow className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
    if (lower.includes('power bi')) return <BarChart2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />;
    if (lower.includes('notebooklm')) return <BookOpen className="w-3.5 h-3.5 text-purple-300 shrink-0" />;
    if (lower.includes('docs') || lower.includes('ms word')) return <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    if (lower.includes('sheets') || lower.includes('excel') || lower.includes('spreadsheet')) return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    if (lower.includes('slides') || lower.includes('powerpoint') || lower.includes('presentation')) return <Presentation className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (lower.includes('form')) return <ClipboardList className="w-3.5 h-3.5 text-indigo-300 shrink-0" />;
    if (lower.includes('wordpress')) return <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    if (lower.includes('aiml') || lower.includes('ai/ml') || lower === 'ai' || lower === 'ml' || lower.includes('ai analytics') || lower.includes('ai strategy')) return <Bot className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
    if (lower === 'iot' || lower.includes('internet of things')) return <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    if (lower.includes('data structure') || lower.includes('dsa')) return <Network className="w-3.5 h-3.5 text-indigo-300 shrink-0" />;
    if (lower.includes('data science') || lower.includes('predictive analytics') || lower.includes('exploratory data') || lower.includes('data analysis') || lower.includes('data modeling')) return <TrendingUp className="w-3.5 h-3.5 text-emerald-300 shrink-0" />;
    if (lower.includes('data visualization') || lower.includes('analytical reporting')) return <BarChart3 className="w-3.5 h-3.5 text-yellow-300 shrink-0" />;
    if (lower.includes('oops') || lower.includes('object-oriented')) return <Boxes className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
    if (lower.includes('peer-to-peer') || lower.includes('p2p')) return <Share2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
    if (lower.includes('ui/ux') || lower.includes('figma') || lower.includes('design thinking')) return <LayoutGrid className="w-3.5 h-3.5 text-pink-400 shrink-0" />;
    if (lower.includes('cryptographic') || lower.includes('sha-256') || lower.includes('blockchain')) return <Lock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />;
    if (lower.includes('wi-fi') || lower.includes('nan') || lower.includes('networking')) return <Wifi className="w-3.5 h-3.5 text-cyan-300 shrink-0" />;
    if (lower.includes('cybersecurity') || lower.includes('security')) return <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    if (lower.includes('critical thinking') || lower.includes('problem solving') || lower.includes('decision making') || lower.includes('ethical reasoning') || lower.includes('strategic thinking')) return <Brain className="w-3.5 h-3.5 text-purple-300 shrink-0" />;
    if (lower.includes('system architecture') || lower.includes('software development') || lower.includes('feature development')) return <Workflow className="w-3.5 h-3.5 text-sky-300 shrink-0" />;
    if (lower.includes('code quality') || lower.includes('code review')) return <FileCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />;
    if (lower.includes('product management') || lower.includes('project planning') || lower.includes('performance management') || lower.includes('regulatory compliance')) return <Target className="w-3.5 h-3.5 text-rose-300 shrink-0" />;
    if (lower.includes('cloud cost')) return <Cloud className="w-3.5 h-3.5 text-blue-300 shrink-0" />;
    if (lower.includes('process automation')) return <Cog className="w-3.5 h-3.5 text-violet-300 shrink-0" />;
    if (lower.includes('communication')) return <MessageSquare className="w-3.5 h-3.5 text-indigo-300 shrink-0" />;
    if (lower.includes('game development')) return <Gamepad2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />;
    if (lower.includes('model selection') || lower.includes('model validation') || lower.includes('data interpretation') || lower.includes('data quality')) return <LineChart className="w-3.5 h-3.5 text-teal-300 shrink-0" />;
    return <CheckCircle2 className="w-3.5 h-3.5 text-indigo-300 shrink-0" />;
  };

  const getSkillMeta = (skillName: string, categoryTitle: string): SkillMeta => {
    const lower = skillName.toLowerCase();
    let percentage = 88;

    if (lower.includes('java') && !lower.includes('script')) percentage = 92;
    else if (lower.includes('python')) percentage = 90;
    else if (lower === 'c') percentage = 85;
    else if (lower.includes('c++')) percentage = 88;
    else if (lower.includes('javascript') || lower.includes('js')) percentage = 90;
    else if (lower.includes('html')) percentage = 95;
    else if (lower.includes('css')) percentage = 92;
    else if (lower.includes('react')) percentage = 92;
    else if (lower.includes('spring')) percentage = 90;
    else if (lower.includes('rest')) percentage = 92;
    else if (lower.includes('next')) percentage = 84;
    else if (lower.includes('streamlit')) percentage = 88;
    else if (lower.includes('gradio')) percentage = 85;
    else if (lower.includes('mysql')) percentage = 88;
    else if (lower.includes('pl/sql')) percentage = 86;
    else if (lower.includes('mongo')) percentage = 84;
    else if (lower.includes('maven') || lower.includes('gradle')) percentage = 88;
    else if (lower.includes('github') || lower.includes('git')) percentage = 92;
    else if (lower.includes('android')) percentage = 86;
    else if (lower.includes('google ai') || lower.includes('gemini')) percentage = 95;
    else if (lower.includes('vs code')) percentage = 95;
    else if (lower.includes('antigravity')) percentage = 90;
    else if (lower.includes('firebase')) percentage = 88;
    else if (lower.includes('analytics')) percentage = 90;
    else if (lower.includes('power bi')) percentage = 90;
    else if (lower.includes('copilot')) percentage = 92;
    else if (lower.includes('docs')) percentage = 94;
    else if (lower.includes('sheets')) percentage = 92;
    else if (lower.includes('slides')) percentage = 90;
    else if (lower.includes('form')) percentage = 94;
    else if (lower.includes('notebooklm')) percentage = 92;
    else if (lower.includes('wordpress')) percentage = 86;
    else if (lower.includes('ms word')) percentage = 92;
    else if (lower.includes('excel')) percentage = 90;
    else if (lower.includes('powerpoint')) percentage = 90;
    else if (lower.includes('aiml') || lower.includes('ai/ml')) percentage = 92;
    else if (lower === 'iot' || lower.includes('internet of things')) percentage = 90;
    else if (lower.includes('dsa') || lower.includes('data structure')) percentage = 92;
    else if (lower.includes('data science')) percentage = 86;
    else if (lower.includes('oops') || lower.includes('object')) percentage = 90;
    else if (lower.includes('peer-to-peer') || lower.includes('p2p')) percentage = 88;
    else if (lower.includes('ui/ux') || lower.includes('figma')) percentage = 84;
    else if (lower.includes('sha-256') || lower.includes('crypto')) percentage = 88;
    else if (lower.includes('wi-fi') || lower.includes('nan')) percentage = 86;
    // Secondary Skills percentages
    else if (lower.includes('problem solving')) percentage = 94;
    else if (lower.includes('critical thinking')) percentage = 92;
    else if (lower.includes('system architecture')) percentage = 90;
    else if (lower.includes('software development')) percentage = 92;
    else if (lower.includes('code quality') || lower.includes('code review')) percentage = 92;
    else if (lower.includes('cybersecurity') || lower.includes('web security')) percentage = 90;
    else if (lower.includes('data analysis') || lower.includes('data modeling')) percentage = 92;
    else if (lower.includes('predictive analytics') || lower.includes('ai analytics')) percentage = 92;
    else if (lower.includes('technical communication') || lower.includes('business communication')) percentage = 92;
    else if (lower.includes('spreadsheet skills')) percentage = 92;
    else if (lower.includes('data visualization')) percentage = 90;
    else if (lower.includes('process automation')) percentage = 90;
    else if (lower.includes('product management')) percentage = 88;
    else if (lower.includes('cloud cost')) percentage = 86;
    else if (lower.includes('game development')) percentage = 86;

    let level: 'Expert' | 'Advanced' | 'Proficient' = 'Proficient';
    if (percentage >= 92) level = 'Expert';
    else if (percentage >= 88) level = 'Advanced';

    let barColor = 'bg-gradient-to-r from-indigo-500 to-cyan-400';
    let badgeBg = 'text-indigo-300 border-indigo-400/30 bg-indigo-500/20';

    if (categoryTitle === 'Languages') {
      barColor = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400';
      badgeBg = 'text-indigo-300 border-indigo-400/30 bg-indigo-500/20';
    } else if (categoryTitle === 'Web & Frameworks') {
      barColor = 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400';
      badgeBg = 'text-cyan-300 border-cyan-400/30 bg-cyan-500/20';
    } else if (categoryTitle === 'Databases & Tools' || categoryTitle === 'Database & Tools') {
      barColor = 'bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400';
      badgeBg = 'text-emerald-300 border-emerald-400/30 bg-emerald-500/20';
    } else if (categoryTitle === 'Secondary Skills') {
      barColor = 'bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-400';
      badgeBg = 'text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-500/20';
    } else {
      barColor = 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-400';
      badgeBg = 'text-amber-300 border-amber-400/30 bg-amber-500/20';
    }

    return { percentage, level, barColor, badgeBg };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-slate-700/90 bg-slate-900/95"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-3 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Technical Arsenal Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Languages, Frameworks & Core CS Domains
            </h2>
            <p className="mt-2 text-sm text-slate-200 leading-relaxed">
              Gokul combines multi-paradigm programming (Java, Python 3, C++) with modern full-stack frameworks, machine learning, cryptographic security, and offline mobile P2P protocols.
            </p>
          </div>

          {/* Area of Interest Callout */}
          <div className="stat-card md:w-80 shrink-0 bg-slate-850 border-l-4 border-indigo-500 border border-slate-700 p-4 rounded-xl shadow-lg">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
              Primary Area of Interest:
            </span>
            <p className="text-sm font-semibold text-white leading-snug">
              {GOKUL_PROFILE.areaOfInterest}
            </p>
          </div>
        </div>

        {/* Controls Bar: Search + View Toggle */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-750">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cyan-300 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills (e.g., Python 3, React, SHA-256, DSA)..."
              className="w-full bg-slate-950 border border-slate-600 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700 shrink-0 self-end sm:self-auto shadow-sm">
            <button
              onClick={() => setViewMode('bars')}
              title="Progress Bars View"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Progress Bars
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact Badges View"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              Badges
            </button>
          </div>

        </div>
      </motion.div>

      {/* Skill Categories Stacked Line by Line */}
      <div className="space-y-6">
        {GOKUL_PROFILE.skillCategories.map((cat, idx) => {
          const filteredSkills = cat.skills.filter(s =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredSkills.length === 0) return null;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5 hover:border-slate-600 transition-all relative z-10"
            >
              {/* Category Title Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 shadow-sm">
                    {getCategoryIcon(cat.title)}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white font-mono tracking-tight">{cat.title}</h3>
                    <span className="text-xs font-mono font-bold text-cyan-300">{filteredSkills.length} Verified Skills</span>
                  </div>
                </div>
              </div>

              {/* View Mode 1: Interactive Animated Progress Bars Grid */}
              {viewMode === 'bars' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {filteredSkills.map((skill, sIdx) => {
                    const meta = getSkillMeta(skill, cat.title);
                    return (
                      <div
                        key={sIdx}
                        onClick={() => setSelectedKeyword(skill)}
                        className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-400 cursor-pointer transition-all duration-200 group hover:shadow-lg hover:shadow-cyan-500/10 space-y-2.5 hover:-translate-y-0.5"
                        title={`Click to learn about ${skill}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                              {getSkillIcon(skill)}
                            </div>
                            <span className="font-sans font-bold text-xs sm:text-sm text-white truncate group-hover:text-cyan-300 transition-colors">
                              {skill}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${meta.badgeBg}`}>
                              {meta.level}
                            </span>
                            <span className="text-xs font-mono font-bold text-cyan-300 min-w-[32px] text-right">
                              {meta.percentage}%
                            </span>
                          </div>
                        </div>

                        {/* Interactive Visual Progress Bar */}
                        <div className="relative w-full h-2.5 rounded-full bg-slate-950 border border-slate-700 overflow-hidden shadow-inner">
                          <div
                            style={{ width: `${meta.percentage}%` }}
                            className={`h-full rounded-full ${meta.barColor} relative shadow-sm transition-all duration-500`}
                          >
                            {/* Glowing tip indicator */}
                            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* View Mode 2: Compact Badges View */
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  {filteredSkills.map((skill, sIdx) => {
                    return (
                      <button
                        key={sIdx}
                        onClick={() => setSelectedKeyword(skill)}
                        className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-600 hover:border-cyan-400 text-xs sm:text-sm font-sans font-bold text-white transition-all shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 group cursor-pointer"
                        title={`Click to learn about ${skill}`}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 shrink-0 group-hover:border-cyan-400/50 transition-colors">
                          {getSkillIcon(skill)}
                        </div>
                        <span className="font-bold text-xs sm:text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors">{skill}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Core Competencies Summary Card */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 shadow-2xl bg-slate-900 border border-slate-700 rounded-2xl relative z-10"
      >
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Specialized Engineering Capabilities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
            <span className="font-bold text-indigo-300 block mb-1 text-sm">AI & Full-Stack Synergy</span>
            <p className="text-slate-200">Integrating Google Gemini API, Streamlit, and Scikit-learn into zero-latency web environments.</p>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
            <span className="font-bold text-cyan-300 block mb-1 text-sm">Cryptography & Security</span>
            <p className="text-slate-200">SHA-256 digital twin verification, Firebase synchronization, and Cisco network security fundamentals.</p>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
            <span className="font-bold text-emerald-300 block mb-1 text-sm">P2P Mobile Networks</span>
            <p className="text-slate-200">Wi-Fi Aware (NAN) Android application engineering for zero-connectivity file transfers.</p>
          </div>

          <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
            <span className="font-bold text-amber-300 block mb-1 text-sm">Competitive Problem Solving</span>
            <p className="text-slate-200">TCS CodeVita Season 13 Round 2 global contender with active CodeChef profile (gokul_v_3776).</p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Keyword Details Modal */}
      <React.Suspense fallback={null}>
        {selectedKeyword && (
          <KeywordModal
            keyword={selectedKeyword}
            onClose={() => setSelectedKeyword(null)}
          />
        )}
      </React.Suspense>

    </div>
  );
};
