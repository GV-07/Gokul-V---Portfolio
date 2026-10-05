import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  type: 'major' | 'normal' | 'micro';
  color: string;
  glowColor: string;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface ParticleNetworkBackgroundProps {
  theme?: 'dark' | 'light';
  className?: string;
}

// Multi-tone tech palette matching portfolio design system
const DARK_PARTICLE_COLORS = [
  { fill: '#22d3ee', glow: 'rgba(34, 211, 238, 0.65)' }, // Cyan
  { fill: '#818cf8', glow: 'rgba(129, 140, 248, 0.65)' }, // Indigo
  { fill: '#c084fc', glow: 'rgba(192, 132, 252, 0.60)' }, // Purple / Violet
  { fill: '#34d399', glow: 'rgba(52, 211, 153, 0.60)' }, // Emerald
  { fill: '#38bdf8', glow: 'rgba(56, 189, 248, 0.65)' }, // Sky
  { fill: '#fbbf24', glow: 'rgba(251, 191, 36, 0.55)' },  // Amber star
];

const LIGHT_PARTICLE_COLORS = [
  { fill: '#0284c7', glow: 'rgba(2, 132, 199, 0.35)' }, // Sky Dark
  { fill: '#4f46e5', glow: 'rgba(79, 70, 229, 0.35)' }, // Indigo
  { fill: '#7c3aed', glow: 'rgba(124, 58, 237, 0.35)' }, // Violet
  { fill: '#059669', glow: 'rgba(5, 150, 105, 0.35)' }, // Emerald
];

export const ParticleNetworkBackground: React.FC<ParticleNetworkBackgroundProps> = ({
  theme = 'dark',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer coordinates & interaction state
    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
      radius: 180, // Reaction radius
      force: 0.12
    };

    let particles: Particle[] = [];
    const ripples: ClickRipple[] = [];

    const isDark = theme === 'dark';
    const colorPalette = isDark ? DARK_PARTICLE_COLORS : LIGHT_PARTICLE_COLORS;

    // Connection threshold tailored for clean, elegant network lines
    const getConnectionDist = () => (width < 640 ? 110 : 135);

    // Default 54 Balanced Net as requested
    const getTargetCount = () => {
      if (width < 640) return 38;
      if (width < 1024) return 46;
      return 54; // Default 54 Balanced Net
    };

    const initParticles = () => {
      const count = getTargetCount();
      particles = [];

      for (let i = 0; i < count; i++) {
        const colorObj = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const speed = 0.25 + Math.random() * 0.45;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Tiered particles: 15% major stars, 65% normal constellation nodes, 20% micro dust
        const randTier = Math.random();
        let type: 'major' | 'normal' | 'micro' = 'normal';
        let radius = 1.6 + Math.random() * 1.3;
        let baseAlpha = 0.45 + Math.random() * 0.45;

        if (randTier < 0.15) {
          type = 'major';
          radius = 2.4 + Math.random() * 1.2;
          baseAlpha = 0.75 + Math.random() * 0.25;
        } else if (randTier > 0.80) {
          type = 'micro';
          radius = 0.9 + Math.random() * 0.6;
          baseAlpha = 0.3 + Math.random() * 0.3;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius,
          type,
          color: colorObj.fill,
          glowColor: colorObj.glow,
          baseAlpha,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    handleResize();

    // Global cursor tracking (pointermove works across all elements with pointer-events-none)
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.isHovered = true;
    };

    const handlePointerLeave = () => {
      pointer.isHovered = false;
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    // Expanding shockwave ripple on click / tap anywhere
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      ripples.push({
        x: clientX,
        y: clientY,
        radius: 8,
        maxRadius: 180,
        alpha: 0.65
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.targetX = e.touches[0].clientX;
        pointer.targetY = e.touches[0].clientY;
        pointer.isHovered = true;
      }
    };

    const handleTouchEnd = () => {
      pointer.isHovered = false;
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();
    const pointerRadiusSq = pointer.radius * pointer.radius;

    // Render loop
    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2);
      lastTime = currentTime;

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.18 * deltaTime;
      pointer.y += (pointer.targetY - pointer.y) * 0.18 * deltaTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Process Click Ripples (shockwave effect pushing nearby particles)
      for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripples[rIdx];
        rip.radius += 4.5 * deltaTime;
        rip.alpha -= 0.016 * deltaTime;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(rIdx, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(34, 211, 238, ${rip.alpha * 0.7})`
          : `rgba(99, 102, 241, ${rip.alpha * 0.5})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();

        // Push particles outwards along shockwave front
        for (let pIdx = 0; pIdx < particles.length; pIdx++) {
          const p = particles[pIdx];
          const dx = p.x - rip.x;
          const dy = p.y - rip.y;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - rip.radius) < 30) {
            const pushFactor = (1 - Math.abs(dist - rip.radius) / 30) * 2.2;
            p.x += (dx / (dist || 1)) * pushFactor;
            p.y += (dy / (dist || 1)) * pushFactor;
          }
        }
      }

      // 2. Update and Draw Particles
      const particleLen = particles.length;
      const maxDist = getConnectionDist();
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < particleLen; i++) {
        const p = particles[i];

        // Cursor reaction: dynamic repulsion and subtle fluid deflection
        if (pointer.isHovered) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < pointerRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / pointer.radius) * 2.2;
            const nx = dx / dist;
            const ny = dy / dist;

            // Repulsion away from cursor
            p.vx += nx * force * 0.35 * deltaTime;
            p.vy += ny * force * 0.35 * deltaTime;
          }
        }

        // Return velocity gradually towards base drift velocity
        p.vx += (p.baseVx - p.vx) * 0.035 * deltaTime;
        p.vy += (p.baseVy - p.vy) * 0.035 * deltaTime;

        // Position update
        p.x += p.vx * deltaTime;
        p.y += p.vy * deltaTime;

        // Screen boundary wrapping
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Breathing pulse effect
        p.pulsePhase += p.pulseSpeed * deltaTime;
        const currentAlpha = Math.max(
          0.2,
          Math.min(0.95, p.baseAlpha + Math.sin(p.pulsePhase) * 0.22)
        );

        // Draw particle node
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        if (isDark) {
          ctx.shadowColor = p.glowColor;
          ctx.shadowBlur = p.type === 'major' ? 10 : 5;
        } else {
          ctx.shadowColor = p.glowColor;
          ctx.shadowBlur = 3;
        }
        ctx.fill();

        // Extra outer halo ring for major constellation stars
        if (p.type === 'major') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = p.glowColor;
          ctx.lineWidth = 0.7;
          ctx.globalAlpha = currentAlpha * 0.45;
          ctx.stroke();
        }
        ctx.restore();

        // 3. Connect to Cursor if within range (High visibility neon rays)
        if (pointer.isHovered) {
          const dxMouse = p.x - pointer.x;
          const dyMouse = p.y - pointer.y;
          const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

          if (distMouseSq < pointerRadiusSq) {
            const distMouse = Math.sqrt(distMouseSq);
            const factor = 1 - distMouse / pointer.radius;
            const cursorAlpha = factor * (isDark ? 0.65 : 0.45);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = isDark
              ? `rgba(34, 211, 238, ${cursorAlpha})`
              : `rgba(79, 70, 229, ${cursorAlpha})`;
            ctx.lineWidth = factor * 1.5;
            ctx.stroke();

            // Animated light photon travelling towards cursor
            const photonT = (currentTime * 0.002 + i * 0.3) % 1;
            const photonX = p.x + (pointer.x - p.x) * photonT;
            const photonY = p.y + (pointer.y - p.y) * photonT;
            ctx.beginPath();
            ctx.arc(photonX, photonY, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? '#ffffff' : '#4338ca';
            ctx.globalAlpha = cursorAlpha * 1.2;
            ctx.fill();
            ctx.restore();
          }
        }

        // 4. Inter-particle network connections
        for (let j = i + 1; j < particleLen; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;

          if (Math.abs(dx) > maxDist || Math.abs(dy) > maxDist) {
            continue;
          }

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const normDist = 1 - dist / maxDist;
            const lineAlpha = normDist * (isDark ? 0.32 : 0.22);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (dist < 60) {
              ctx.strokeStyle = isDark
                ? `rgba(56, 189, 248, ${lineAlpha * 1.3})`
                : `rgba(99, 102, 241, ${lineAlpha * 1.3})`;
              ctx.lineWidth = 1.0;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(148, 163, 184, ${lineAlpha})`
                : `rgba(100, 116, 139, ${lineAlpha})`;
              ctx.lineWidth = 0.75;
            }

            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 5. Interactive Cursor Ambient Spotlight
      if (pointer.isHovered && pointer.x > 0 && pointer.y > 0) {
        ctx.save();
        const cursorGlow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          pointer.radius * 0.75
        );
        if (isDark) {
          cursorGlow.addColorStop(0, 'rgba(34, 211, 238, 0.12)');
          cursorGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
          cursorGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
        } else {
          cursorGlow.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
          cursorGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointer.radius * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none select-none z-[1] transform-gpu ${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform'
      }}
      aria-hidden="true"
    />
  );
};
