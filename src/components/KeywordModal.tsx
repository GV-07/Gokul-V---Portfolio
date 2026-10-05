import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Lightbulb, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { getKeywordDetail } from '../data/keywordDictionary';

interface KeywordModalProps {
  keyword: string | null;
  onClose: () => void;
}

export const KeywordModal: React.FC<KeywordModalProps> = ({ keyword, onClose }) => {
  if (!keyword) return null;

  const detail = getKeywordDetail(keyword);

  const getCategoryBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'Frontend & Web':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'AI & Data Science':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'Hardware & Embedded':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'Design & UX':
        return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
      case 'Backend & Security':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
      case 'Management & Strategy':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="glass border border-indigo-400/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative bg-slate-900/95 text-slate-100"
        >
          {/* Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  <span>{detail.title}</span>
                </h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border inline-block mt-0.5 ${getCategoryBadgeStyle(detail.category)}`}>
                  {detail.category}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 text-sm text-slate-300 leading-relaxed text-left">
            
            {/* Definition */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>What is {detail.title}?</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm">
                {detail.definition}
              </p>
            </div>

            {/* Why It Matters */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Why It Matters in Software Engineering</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                {detail.whyItMatters}
              </p>
            </div>

            {/* Gokul's Practical Application */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Gokul's Practical Engineering Application</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm">
                {detail.gokulApplication}
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-end text-xs">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md cursor-pointer"
            >
              Got it
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
