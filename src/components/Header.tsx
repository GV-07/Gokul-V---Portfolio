import React from 'react';
import { Home, Briefcase, Presentation, Sparkles, Mail, User, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'academic' | 'about' | 'experience' | 'skills' | 'projects';
  setActiveTab: (tab: 'academic' | 'about' | 'experience' | 'skills' | 'projects') => void;
  onOpenContact: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenContact, theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-40 bg-transparent text-slate-100 transition-all border-b border-white/5">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="py-2.5 sm:py-3.5 flex items-center justify-end">
          
          {/* Navigation Links & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono text-xs sm:text-sm overflow-x-auto scrollbar-none py-1 ml-auto">
            
            {/* Home */}
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'academic'
                  ? 'px-4 py-2 rounded-2xl bg-[#161a29] border border-slate-700/80 text-white font-medium shadow-sm'
                  : 'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Home className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Home</span>
            </button>

            {/* Experience */}
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'experience'
                  ? 'px-4 py-2 rounded-2xl bg-[#161a29] border border-slate-700/80 text-white font-medium shadow-sm'
                  : 'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Experience</span>
            </button>

            {/* Projects */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'projects'
                  ? 'px-4 py-2 rounded-2xl bg-[#161a29] border border-slate-700/80 text-white font-medium shadow-sm'
                  : 'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Presentation className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Projects</span>
            </button>

            {/* Skills */}
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'skills'
                  ? 'px-4 py-2 rounded-2xl bg-[#161a29] border border-slate-700/80 text-white font-medium shadow-sm'
                  : 'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Skills</span>
            </button>

            {/* Contact */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all whitespace-nowrap cursor-pointer"
            >
              <Mail className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Contact</span>
            </button>

            {/* About */}
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'about'
                  ? 'px-4 py-2 rounded-2xl bg-[#161a29] border border-slate-700/80 text-white font-medium shadow-sm'
                  : 'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <User className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>About</span>
            </button>

            {/* Light / Dark Mode Toggle (Icon Only) */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 rounded-2xl border border-slate-700/80 hover:border-slate-600 bg-[#161a29]/60 hover:bg-[#161a29] text-amber-400 transition-all cursor-pointer shrink-0 ml-1"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-300 hover:-rotate-12 transition-transform" />
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};



