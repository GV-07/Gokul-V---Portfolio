import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SplashIntroProps {
  onComplete?: () => void;
  duration?: number;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ 
  onComplete, 
  duration = 2600 
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only run once per reload session
    const hasRunThisSession = sessionStorage.getItem('gv_intro_shown_reload');
    if (hasRunThisSession) {
      setIsVisible(false);
      return;
    }

    // Set flag for current page load
    sessionStorage.setItem('gv_intro_shown_reload', 'true');

    // Wait until the home page is completely open and mounted before starting the intro
    const homePageMountDelay = setTimeout(() => {
      setShouldRender(true);
      // Trigger animations shortly after opening
      requestAnimationFrame(() => {
        setHasStarted(true);
      });
    }, 350);

    // End intro sequence after duration
    const endTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
    }, duration + 350);

    return () => {
      clearTimeout(homePageMountDelay);
      clearTimeout(endTimer);
    };
  }, [duration, onComplete]);

  // If already completed or not yet opened, don't block
  if (!shouldRender || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasStarted ? 1 : 0 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient Background Glows */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse" />
          <div className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] pointer-events-none -bottom-20 -right-20 animate-pulse [animation-delay:1s]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.5)_0%,rgba(2,6,23,0.92)_100%)] pointer-events-none" />

          {/* Intro Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md mx-auto">
            
            {/* The sentence "Modern Portfolio" displayed before the logo */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: hasStarted ? 1 : 0, y: hasStarted ? 0 : -20, scale: hasStarted ? 1 : 0.9 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-500/20 to-purple-500/15 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin [animation-duration:6s]" />
                <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                  Modern Portfolio
                </span>
                <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin [animation-duration:6s]" />
              </div>
            </motion.div>

            {/* Circular GV Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.65, rotate: -8 }}
              animate={{ opacity: hasStarted ? 1 : 0, scale: hasStarted ? 1 : 0.65, rotate: hasStarted ? 0 : -8 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative group"
            >
              {/* Outer Rotating Glowing Accent Ring */}
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-400 to-indigo-600 opacity-80 blur-md group-hover:opacity-100 animate-spin [animation-duration:8s] pointer-events-none" />
              
              {/* Secondary Halo */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-90 pointer-events-none" />

              {/* Exact Circle Shaped Logo Frame */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 aspect-square rounded-full overflow-hidden border-2 border-white/50 shadow-[0_0_50px_rgba(6,182,212,0.6)] bg-slate-900 flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/ug4amovq/image/upload/f_auto,q_auto,w_320/v1786793878/GV_logo_uzmfel.jpg"
                  alt="GV Logo"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full select-none transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle Inner Glass Reflection */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/15 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Name and Title Accent */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: hasStarted ? 1 : 0, y: hasStarted ? 0 : 15 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 space-y-2"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                GOKUL V
              </h2>
              <p className="text-xs text-cyan-300/80 font-mono tracking-wider">
                Full-Stack Developer • AI Engineer
              </p>
              
              {/* Progress Line */}
              <div className="w-36 h-1 mx-auto mt-4 rounded-full bg-slate-800/90 overflow-hidden border border-white/10">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.9)]"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
