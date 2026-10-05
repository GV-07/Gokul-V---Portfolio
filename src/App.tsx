/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Linkedin, Github, Code2, QrCode } from 'lucide-react';
import { Header } from './components/Header';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SplashIntro } from './components/SplashIntro';
import { ParticleNetworkBackground } from './components/ParticleNetworkBackground';
import { GOKUL_PROFILE } from './data/gokulData';
import { CodeChefProvider } from './context/CodeChefContext';
import { ErrorBoundary, TabSkeletonFallback } from './components/ui';

// Code-split heavy interactive views via React.lazy for maximum performance and minimal initial bundle size
const ProjectShowcase = React.lazy(() =>
  import('./components/ProjectShowcase').then((m) => ({ default: m.ProjectShowcase }))
);
const ExperienceTimeline = React.lazy(() =>
  import('./components/ExperienceTimeline').then((m) => ({ default: m.ExperienceTimeline }))
);
const SkillsMatrix = React.lazy(() =>
  import('./components/SkillsMatrix').then((m) => ({ default: m.SkillsMatrix }))
);
const AcademicSection = React.lazy(() =>
  import('./components/AcademicSection').then((m) => ({ default: m.AcademicSection }))
);
const AboutSection = React.lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ContactModal = React.lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);
const GVBot = React.lazy(() =>
  import('./components/GVBot').then((m) => ({ default: m.GVBot }))
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'academic' | 'about' | 'experience' | 'skills' | 'projects'>('academic');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <CodeChefProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-300">
      {/* High-Tech Splash Screen with "Modern Portfolio" and Circular GV Logo on every reload */}
      <SplashIntro />

      {/* Scroll Progress Bar at the top of the viewport */}
      <ScrollProgressBar />

      {/* Background Ambience: CSS Hardware-Accelerated High-Performance Mesh Grid */}
      <div 
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none transform-gpu"
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      >
        {/* Instant CSS High-Performance Mesh Grid (Zero network lag, 60fps) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Subtle gradient overlay adapted to current theme */}
        <div className="video-bg-overlay absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />
      </div>

      {/* High-Performance Canvas Interactive Particle Network Animation */}
      <ParticleNetworkBackground theme={theme} />

      {/* Persistent Global Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenContact={() => setIsContactOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Tab Content Display */}
      <main className="flex-1 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <ErrorBoundary fallbackTitle="Project Showcase Interruption">
                <Suspense fallback={<TabSkeletonFallback title="Loading Project Showcase..." />}>
                  <ProjectShowcase />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <ErrorBoundary fallbackTitle="About Section Interruption">
                <Suspense fallback={<TabSkeletonFallback title="Loading About Gokul V..." />}>
                  <AboutSection 
                    onOpenContact={() => setIsContactOpen(true)}
                    onSelectProjects={() => setActiveTab('projects')}
                  />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <ErrorBoundary fallbackTitle="Experience Timeline Interruption">
                <Suspense fallback={<TabSkeletonFallback title="Loading Experience Timeline..." />}>
                  <ExperienceTimeline />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <ErrorBoundary fallbackTitle="Skills Matrix Interruption">
                <Suspense fallback={<TabSkeletonFallback title="Loading Skills Matrix..." />}>
                  <SkillsMatrix />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}

          {activeTab === 'academic' && (
            <motion.div
              key="academic"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <ErrorBoundary fallbackTitle="Academic & Credentials Interruption">
                <Suspense fallback={<TabSkeletonFallback title="Loading Credentials & Bio..." />}>
                  <AcademicSection 
                    onOpenContact={() => setIsContactOpen(true)}
                    onSelectProjects={() => setActiveTab('projects')}
                    onSelectSkills={() => setActiveTab('skills')}
                  />
                </Suspense>
              </ErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Bio & Details */}
          <div className="space-y-2 max-w-sm">
            <p className="font-extrabold text-base text-white font-mono tracking-tight">
              © 2026 Gokul V • B.Tech Information Technology
            </p>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Sethu Institute of Technology • Madurai, Tamil Nadu, India
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 transition-all font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Contact Details & QR Code</span>
              </button>
            </div>
          </div>

          {/* Vertical Contact & Social Links List - Pure Text & Icon */}
          <div className="flex flex-col sm:flex-row flex-wrap md:flex-col gap-3">
            {/* Phone */}
            <a
              href={`tel:${GOKUL_PROFILE.phone}`}
              className="inline-flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition-colors group text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-mono text-xs sm:text-sm">{GOKUL_PROFILE.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${GOKUL_PROFILE.email}`}
              className="inline-flex items-center gap-2.5 text-slate-300 hover:text-indigo-300 transition-colors group text-sm font-medium"
            >
              <Mail className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-mono text-xs sm:text-sm">{GOKUL_PROFILE.email}</span>
            </a>

            {/* LinkedIn */}
            <a
              href={GOKUL_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group text-sm font-medium"
            >
              <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">LinkedIn Profile</span>
            </a>

            {/* GitHub */}
            <a
              href={GOKUL_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-slate-300 hover:text-purple-400 transition-colors group text-sm font-medium"
            >
              <Github className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">GitHub Profile</span>
            </a>

            {/* CodeChef */}
            <a
              href={GOKUL_PROFILE.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors group text-sm font-medium"
            >
              <Code2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">CodeChef Profile</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Recruiter Contact Modal - dynamically loaded on demand */}
      <ErrorBoundary fallbackTitle="Contact Form Temporarily Unavailable" isolate>
        <Suspense fallback={null}>
          {isContactOpen && (
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
          )}
        </Suspense>
      </ErrorBoundary>

      {/* Website Bot GV - code-split & error isolated */}
      <ErrorBoundary fallbackTitle="AI Assistant Temporarily Unavailable" isolate>
        <Suspense fallback={null}>
          <GVBot />
        </Suspense>
      </ErrorBoundary>

    </div>
    </CodeChefProvider>
  );
}
