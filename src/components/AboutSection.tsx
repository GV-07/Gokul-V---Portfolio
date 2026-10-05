import React from 'react';
import { motion } from 'motion/react';
import { User, Sparkles, Target, Heart, Compass, Code2, MapPin, Mail, Linkedin, Github, GraduationCap, CheckCircle2 } from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';

interface AboutSectionProps {
  onOpenContact?: () => void;
  onSelectProjects?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onOpenContact = () => {}, 
  onSelectProjects = () => {} 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Intro Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="glass p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-400/20">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Developer Biography & Introduction</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-emerald-300">Gokul V</span>.
            </h1>

            <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-sans font-medium">
              {GOKUL_PROFILE.summary}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{GOKUL_PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono text-cyan-300">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Percentage : 83%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono text-emerald-300">
                <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CGPA : 8.3 • B.Tech IT Undergraduate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 text-xs font-mono text-slate-300">
                <Target className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>AI & Full-Stack Integration</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Quick Specs</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Current Status</span>
                  <span className="text-emerald-300 font-bold">B.Tech IT Undergraduate</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Institution</span>
                  <span className="text-indigo-200 font-bold">Sethu Institute of Technology</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Competitive</span>
                  <span className="text-amber-300 font-bold">TCS CodeVita R2</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Internship Roles</span>
                  <span className="text-cyan-300 font-bold">Full-Stack, Data & AI</span>
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs font-mono shadow-lg transition-all border border-indigo-400/30 flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Ambient Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Focus & Core Drive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass p-6 rounded-3xl border border-white/10 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">Area of Primary Interest</h3>
              <p className="text-xs text-slate-400 font-mono">Core technical vision</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            Specializing in <strong className="text-cyan-300 font-semibold">{GOKUL_PROFILE.areaOfInterest}</strong>. Driven by building zero-latency web tools, ML diagnostic systems, and decentralized peer-to-peer applications that solve real-world problems.
          </p>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full-Stack Web Engineering with React, Next.js, and Node.js</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>AI Integration utilizing Google Gemini SDK, Antigravity, & GenAI models</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>Decentralized Android P2P Networks & Wi-Fi Aware (NAN)</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass p-6 rounded-3xl border border-white/10 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">Hobbies & Personal Pursuits</h3>
              <p className="text-xs text-slate-400 font-mono">Beyond coding & academia</p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {GOKUL_PROFILE.hobbies.map((hobby, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{hobby}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Personality Traits Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GOKUL_PROFILE.personalityTraits.map((item, idx) => {
          const icons = [Target, Heart, Sparkles, Compass];
          const TraitIcon = icons[idx % icons.length];
          const badgeStyles = [
            "bg-indigo-500/30 text-indigo-200 border-2 border-indigo-400/60 shadow-sm shadow-indigo-500/20",
            "bg-rose-500/30 text-rose-200 border-2 border-rose-400/60 shadow-sm shadow-rose-500/20",
            "bg-cyan-500/30 text-cyan-200 border-2 border-cyan-400/60 shadow-sm shadow-cyan-500/20",
            "bg-emerald-500/30 text-emerald-200 border-2 border-emerald-400/60 shadow-sm shadow-emerald-500/20"
          ];
          const iconColors = [
            "text-indigo-300",
            "text-rose-300",
            "text-cyan-300",
            "text-emerald-300"
          ];

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
              className="bg-slate-900 p-6 rounded-2xl border-2 border-indigo-500/40 space-y-3 shadow-xl hover:border-cyan-400 transition-all hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${badgeStyles[idx % badgeStyles.length]} shrink-0 flex items-center justify-center`}>
                  <TraitIcon className={`w-5 h-5 ${iconColors[idx % iconColors.length]} stroke-[2.2]`} />
                </div>
                <h4 className="text-base font-extrabold text-amber-300 dark:text-amber-300 font-sans leading-snug">
                  {item.trait}
                </h4>
              </div>

              <p className="text-sm text-slate-100 dark:text-slate-100 font-medium leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
