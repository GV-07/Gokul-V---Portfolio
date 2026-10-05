import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Download, Check, Sparkles, Smartphone, UserPlus, ExternalLink } from 'lucide-react';
import { GOKUL_PROFILE } from '../data/gokulData';

// Generates RFC-compliant vCard 3.0 string
export const generateVCardData = (): string => {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:V;Gokul;;;',
    'FN:Gokul V',
    'ORG:Sethu Institute of Technology',
    'TITLE:Full-Stack & AI Developer',
    'TEL;TYPE=CELL,VOICE:+918608973776',
    'EMAIL;TYPE=PREF,INTERNET:gvking064@gmail.com',
    'ADR;TYPE=HOME:;;Madurai;Tamil Nadu;;India',
    'URL:https://linkedin.com/in/gokul-v-gv07/',
    'NOTE:B.Tech IT (CGPA 8.3) • 2124 CodeChef Rating (5★) • 2389 DSA Rating • 3482 Problems Solved • 150+ Certifications',
    'END:VCARD'
  ].join('\r\n');
};

interface ContactQRCodeProps {
  size?: number;
  showDownloadBtn?: boolean;
  compact?: boolean;
  className?: string;
}

export const ContactQRCode: React.FC<ContactQRCodeProps> = ({
  size = 140,
  showDownloadBtn = true,
  compact = false,
  className = ''
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const vCardString = generateVCardData();

  const handleDownloadVCF = (e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Gokul_V_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  if (compact) {
    return (
      <div className={`p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-xl flex flex-col items-center gap-2.5 ${className}`}>
        <div className="relative p-2.5 bg-white rounded-xl shadow-inner border border-slate-200/40">
          <QRCodeSVG
            value={vCardString}
            size={size}
            level="M"
            includeMargin={false}
            fgColor="#0f172a"
            bgColor="#ffffff"
          />
          {/* Subtle center avatar / badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[9px] font-black border-2 border-white shadow-md">
              GV
            </div>
          </div>
        </div>

        <div className="text-center">
          <span className="text-[11px] font-bold text-cyan-300 flex items-center justify-center gap-1">
            <Smartphone className="w-3 h-3 text-cyan-400" /> Scan to Save Contact
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            iOS / Android Camera
          </span>
        </div>

        {showDownloadBtn && (
          <button
            type="button"
            onClick={handleDownloadVCF}
            className="w-full py-1.5 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" /> Saved .VCF
              </>
            ) : (
              <>
                <Download className="w-3 h-3" /> Save .VCF Contact
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group ${className}`}>
      {/* Decorative ambient background glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/25 transition-all duration-500" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
        {/* Crisp QR Code with optical padding */}
        <div className="relative p-3.5 bg-white rounded-2xl shadow-xl border border-slate-100 shrink-0 transform group-hover:scale-[1.02] transition-transform duration-300">
          <QRCodeSVG
            value={vCardString}
            size={size}
            level="M"
            includeMargin={false}
            fgColor="#090d16"
            bgColor="#ffffff"
          />
          {/* Badge icon centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-lg">
              GV
            </div>
          </div>
        </div>

        {/* Informational & Action Column */}
        <div className="flex-1 text-center sm:text-left space-y-2.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Instant vCard QR
          </div>

          <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <UserPlus className="w-4 h-4 text-cyan-400" /> Add to Phone Contacts
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            Scan this QR code with your iOS or Android camera to instantly import Gokul's verified phone, email, and social profiles to your device.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            {showDownloadBtn && (
              <button
                type="button"
                onClick={handleDownloadVCF}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 text-cyan-200 hover:text-white border border-cyan-500/40 hover:border-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                {downloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Contact File Saved
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-cyan-400" /> Download .VCF Card
                  </>
                )}
              </button>
            )}

            <a
              href={`tel:${GOKUL_PROFILE.phone}`}
              className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Call Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
