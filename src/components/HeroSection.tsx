import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useCodeChef } from '../context/CodeChefContext';
import { LazyVideo } from './ui/LazyVideo';

interface HeroSectionProps {
  onOpenContact: () => void;
  onSelectProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onSelectProjects }) => {
  const { stats } = useCodeChef();

  const roles = useMemo(() => [
    "B.Tech Information Technology",
    "Full-Stack Developer",
    "Generative AI Engineer",
    "TCS CodeVita Round 2 Global Rank 1843",
    `CodeChef ${stats.stars} ${stats.division} (Rating ${stats.rating})`,
    `CodeChef DSA Rating ${stats.dsaRating || 2472} (Global Rank ${stats.dsaGlobalRank || '2'})`,
    `${stats.problemsSolved} Problems Solved in CodeChef`,
    "150+ Certifications Completed",
    "14 Internships",
    // 11 projects ( 7 Flayship Projects) - 7 Flagship projects
    "11 Projects ( 7 Flagship Projects)"
  ], [stats.problemsSolved, stats.stars, stats.division, stats.rating, stats.dsaRating, stats.dsaGlobalRank]);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Avatar intro state
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Unmuted autoplay prevented by browser policy, fallback handler added:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
          const enableAudio = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.play().catch(() => {});
            }
          };
          window.addEventListener('click', enableAudio, { once: true });
          window.addEventListener('touchstart', enableAudio, { once: true });
        });
      }
    }
  }, []);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <div className="relative overflow-hidden py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Typography, Role & Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Wave Greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-400/20 backdrop-blur-md shadow-sm">
            <span>Hi There!</span>
            <span className="animate-bounce">👋</span>
          </div>

          {/* Name Display */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-mono">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-emerald-300">Gokul V</span>
            </h1>
            
            {/* Typewriter Text */}
            <div className="h-10 sm:h-12 flex items-center font-mono text-xl sm:text-2xl font-bold text-cyan-300">
              <span>{displayedText}</span>
              <span className="animate-pulse ml-1 text-emerald-400 font-extrabold">|</span>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-medium max-w-2xl">
            A passionate B.Tech IT student at Sethu Institute of Technology (8.3 CGPA) dedicated to bridging modern web architecture with artificial intelligence. I build scalable full-stack platforms, Gemini-powered tools, and offline P2P mobile networks.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 border border-indigo-400/30 group cursor-pointer"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onSelectProjects}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Explore Projects</span>
            </button>
          </div>

          {/* Key Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4 border-t border-white/10 max-w-3xl">
            <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Percentage</span>
              <span className="text-sm sm:text-base font-bold text-cyan-300">83%</span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">CGPA</span>
              <span className="text-sm sm:text-base font-bold text-emerald-300">8.3 / 10</span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">CodeChef</span>
              <span className="text-sm sm:text-base font-bold text-amber-300">{stats.rating} <span className="text-xs text-amber-400 font-normal">({stats.stars})</span></span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">DSA Rating</span>
              <span className="text-sm sm:text-base font-bold text-violet-300">{stats.dsaRating || 2472} <span className="text-[10px] text-cyan-300 font-mono">(#{stats.dsaGlobalRank || '2'})</span></span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase flex items-center justify-between">
                <span>Problems Solved</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" title="Live Synced with CodeChef" />
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300">{stats.problemsSolved}</span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Certifications</span>
              <span className="text-sm sm:text-base font-bold text-indigo-300">150+ Done</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Seamless Background-Merged AI Avatar Intro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Ambient Glow Aura behind Avatar */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-emerald-500/10 blur-3xl -z-10 pointer-events-none animate-pulse"></div>

          {/* Borderless Masked Avatar Container */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-full overflow-hidden flex items-center justify-center shadow-2xl border-2 border-cyan-500/30 backdrop-blur-3xl group bg-slate-900">
            
            {/* Radial Vignette Mask for Seamless Merging with Page Background */}
            <div className="absolute inset-0 z-10 pointer-events-none rounded-full ring-1 ring-inset ring-cyan-500/30 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>

            {/* Background-Merged AI Avatar Video or Frozen Avatar Still Image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 aspect-square">
              {!videoError ? (
                <video
                  ref={videoRef}
                  src="https://res.cloudinary.com/ug4amovq/video/upload/v1786260508/Untitled_video-7_28_2026_10_20_PM_sg4hlc.mp4"
                  poster="/avatar_still.jpg"
                  preload="metadata"
                  autoPlay
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <img
                  src="/avatar_still.jpg"
                  alt="Gokul V - AI Avatar"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

