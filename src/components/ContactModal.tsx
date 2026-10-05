import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Code2, X, Copy, Check, ExternalLink, Sparkles, QrCode } from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';
import { ContactQRCode } from './ContactQRCode';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'details' | 'qr'>('details');

  if (!isOpen) return null;

  const copyAndOpenMail = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);

    if (label === 'email') {
      window.location.href = `mailto:${GOKUL_PROFILE.email}`;
    }
  };

  const openGmailWeb = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${GOKUL_PROFILE.email}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass border border-white/20 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8 relative">
        
        {/* Header */}
        <div className="bg-black/40 p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-indigo-200 border border-white/10 mb-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-300" /> Recruiter & Collaborator Connect
            </div>
            <h3 className="text-xl font-bold text-white">Contact Gokul V</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView(activeView === 'qr' ? 'details' : 'qr')}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'qr'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                  : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
              title="Toggle QR Code / Direct Details"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">{activeView === 'qr' ? 'View Details' : 'Scan QR'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Segmented View Switcher */}
          <div className="flex items-center p-1 bg-slate-900/80 border border-white/10 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveView('details')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeView === 'details'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Info</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('qr')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeView === 'qr'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-cyan-200" />
              <span>Phone QR Code</span>
            </button>
          </div>

          {/* Conditional View Rendering */}
          {activeView === 'qr' ? (
            <div className="space-y-4">
              <ContactQRCode size={160} showDownloadBtn={true} />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Direct Contact Cards */}
              <div className="grid grid-cols-1 gap-3.5 text-xs">
                {/* Primary Email Contact Card */}
                <div
                  onClick={() => copyAndOpenMail('email', GOKUL_PROFILE.email)}
                  className="p-4 rounded-2xl glass-dark border border-indigo-500/30 hover:border-indigo-400/80 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/40 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 group-hover:bg-indigo-500/30 shrink-0">
                      <Mail className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-indigo-300 uppercase font-extrabold tracking-wider block">Email Address</span>
                      <span className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors block mt-0.5">
                        {GOKUL_PROFILE.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={openGmailWeb}
                      className="p-2 rounded-lg bg-red-600/80 hover:bg-red-500 text-white transition-all shadow-md cursor-pointer"
                      title="Open in Gmail Web"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    {copiedField === 'email' ? (
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300 group-hover:text-indigo-300 group-hover:bg-indigo-950/60 transition-all flex items-center gap-1" title="Copy Email">
                        <Copy className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Contact Card */}
                <div
                  onClick={() => copyAndOpenMail('phone', GOKUL_PROFILE.phone)}
                  className="p-4 rounded-2xl glass-dark border border-emerald-500/30 hover:border-emerald-400/80 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-teal-950/40 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 group-hover:bg-emerald-500/30 shrink-0">
                      <Phone className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-300 uppercase font-extrabold tracking-wider block">Phone Number</span>
                      <span className="font-mono text-sm font-bold text-white group-hover:text-emerald-300 transition-colors block mt-0.5">
                        {GOKUL_PROFILE.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={`tel:${GOKUL_PROFILE.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white transition-all shadow-md cursor-pointer"
                      title="Call Phone"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {copiedField === 'phone' ? (
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300 group-hover:text-emerald-300 group-hover:bg-emerald-950/60 transition-all flex items-center gap-1" title="Copy Phone">
                        <Copy className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Profiles */}
          <div className="flex items-center justify-around p-3.5 rounded-2xl glass-dark border border-white/10 text-xs">
            <a
              href={GOKUL_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-blue-400 font-medium transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={GOKUL_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-medium transition-colors"
            >
              <Github className="w-4 h-4 text-slate-200" />
              <span>GitHub</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={GOKUL_PROFILE.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 font-medium transition-colors"
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>CodeChef</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
