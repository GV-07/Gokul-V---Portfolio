import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, Cpu, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  label: string;
  pulsePhase: number;
}

interface Network3DProps {
  title?: string;
  subtitle?: string;
  networkType?: 'p2p' | 'iot';
}

export const Network3DVisualization: React.FC<Network3DProps> = ({
  title = "3D Dynamic Node Network",
  subtitle = "Interactive WebGL 3D Peer-to-Peer & Sensor Topology",
  networkType = 'p2p'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [stats, setStats] = useState({ activePeers: 14, latencyMs: 12, throughputMbps: 128 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 300);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 300;
      }
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D Nodes
    const nodeLabels = networkType === 'p2p'
      ? ['Peer Alpha', 'Peer Beta', 'Seed Node 01', 'Swarm Gateway', 'Encrypted Relay', 'ZeroNet Hub', 'Distributed DB', 'DHT Tracker']
      : ['Sensor-North', 'IoT Gateway', 'Clean-Madurai-01', 'Smart Bin A2', 'Route Optimizer', 'Central Mesh', 'Telemetry Node', 'Live Stream'];

    const colors = networkType === 'p2p'
      ? ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#f472b6']
      : ['#34d399', '#38bdf8', '#fbbf24', '#a78bfa', '#2dd4bf'];

    const nodes: Node3D[] = [];
    const numNodes = 18;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 200,
        z: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 3,
        color: colors[i % colors.length],
        label: nodeLabels[i % nodeLabels.length],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Mouse Interaction Vector
    let mouse = { x: 0, y: 0, rx: 0, ry: 0, isHovering: false };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left - width / 2;
      mouse.y = e.clientY - rect.top - height / 2;
      mouse.rx = (mouse.y / height) * 0.8;
      mouse.ry = (mouse.x / width) * 0.8;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let angleX = 0.003;
    let angleY = 0.005;

    let isVisibleOnScreen = false;
    let isRunning = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleOnScreen = entry.isIntersecting;
        if (isVisibleOnScreen && !isRunning) {
          isRunning = true;
          render();
        } else if (!isVisibleOnScreen && isRunning) {
          isRunning = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      });
    }, { threshold: 0.1 });

    if (canvas) {
      observer.observe(canvas);
    }

    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Target smooth, stable 30fps for canvas without hogging scroll thread

    const render = (time: number = 0) => {
      if (!isVisibleOnScreen) {
        isRunning = false;
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(render);

      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);

      // Radial background grid glow
      const bgGlow = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width / 2);
      bgGlow.addColorStop(0, networkType === 'p2p' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(16, 185, 129, 0.12)');
      bgGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth rotation dampening towards mouse orientation
      if (mouse.isHovering) {
        angleY += (mouse.ry * 0.03 - angleY) * 0.05;
        angleX += (mouse.rx * 0.03 - angleX) * 0.05;
      } else {
        angleY += (0.004 - angleY) * 0.05;
        angleX += (0.002 - angleX) * 0.05;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project and update 3D positions
      const projectedNodes = nodes.map(node => {
        // Velocity update & boundary bouncing in 3D box
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        if (Math.abs(node.x) > 180) node.vx *= -1;
        if (Math.abs(node.y) > 100) node.vy *= -1;
        if (Math.abs(node.z) > 150) node.vz *= -1;

        // 3D Rotation Math
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Perspective Projection
        const focalLength = 300;
        const scale = focalLength / (focalLength + z2 + 250);

        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        node.pulsePhase += 0.03;

        return {
          ...node,
          projX,
          projY,
          projScale: scale,
          z2
        };
      });

      // Sort by Z for proper depth ordering
      projectedNodes.sort((a, b) => b.z2 - a.z2);

      // Draw Connecting Glowing Edges
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.projX - n2.projX;
          const dy = n1.projY - n2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * Math.min(n1.projScale, n2.projScale) * 0.7;
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);

            const gradient = ctx.createLinearGradient(n1.projX, n1.projY, n2.projX, n2.projY);
            gradient.addColorStop(0, n1.color);
            gradient.addColorStop(1, n2.color);

            ctx.strokeStyle = gradient;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.2 * n1.projScale;
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            // Pulse particle packet moving along line
            const pulseT = (Math.sin(n1.pulsePhase + i) + 1) / 2;
            const px = n1.projX + (n2.projX - n1.projX) * pulseT;
            const py = n1.projY + (n2.projY - n1.projY) * pulseT;

            ctx.beginPath();
            ctx.arc(px, py, 2 * n1.projScale, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }
      }

      // Draw 3D Spherical Nodes with Glow Halo
      projectedNodes.forEach(node => {
        const radius = Math.max(1, node.radius * node.projScale);

        // Outer Glow Halo
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(node.projX, node.projY, radius, node.projX, node.projY, radius * 3.5);
        glow.addColorStop(0, node.color);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.globalAlpha = 0.5 * node.projScale;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Core Sphere Node
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Node Label for foreground nodes
        if (node.projScale > 0.85) {
          ctx.font = `${Math.floor(10 * node.projScale)}px monospace`;
          ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
          ctx.fillText(node.label, node.projX + radius + 4, node.projY + 3);
        }
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [networkType]);

  return (
    <div ref={containerRef} className="w-full glass border border-indigo-500/30 rounded-2xl p-4 bg-slate-950/90 relative overflow-hidden shadow-2xl">
      {/* Visual Header */}
      <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              {title}
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                WebGL 3D
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-emerald-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            18 Mesh Nodes
          </span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-300">
            ~12ms Latency
          </span>
        </div>
      </div>

      {/* Interactive WebGL 3D Canvas */}
      <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-slate-900/80 border border-white/10 cursor-crosshair group">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Hover Hint Overlay */}
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-300 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" /> Move mouse across viewport to orient 3D gravity field
        </div>
      </div>
    </div>
  );
};
