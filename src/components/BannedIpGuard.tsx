"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Extract real IP via WebRTC STUN (bypasses TCP proxies and browser VPNs)
const getRealIP = (): Promise<string> => {
  return new Promise((resolve) => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" }
        ]
      });
      pc.createDataChannel("");
      pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch(() => {});

      let resolved = false;
      pc.onicecandidate = (ice) => {
        if (resolved || !ice || !ice.candidate || !ice.candidate.candidate) return;
        const candidate = ice.candidate.candidate;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9:]+)/i;
        const match = candidate.match(ipRegex);
        if (match && match[1]) {
          const ip = match[1];
          // Exclude typical local/private network IPs to extract their actual public IP
          if (
            !ip.startsWith("192.168.") &&
            !ip.startsWith("10.") &&
            !ip.startsWith("127.0.0.") &&
            !ip.startsWith("172.16.") &&
            !ip.startsWith("172.17.") &&
            !ip.startsWith("172.18.") &&
            !ip.startsWith("172.19.") &&
            !ip.startsWith("172.20.") &&
            !ip.startsWith("172.21.") &&
            !ip.startsWith("172.22.") &&
            !ip.startsWith("172.23.") &&
            !ip.startsWith("172.24.") &&
            !ip.startsWith("172.25.") &&
            !ip.startsWith("172.26.") &&
            !ip.startsWith("172.27.") &&
            !ip.startsWith("172.28.") &&
            !ip.startsWith("172.29.") &&
            !ip.startsWith("172.30.") &&
            !ip.startsWith("172.31.") &&
            !ip.includes("fe80:")
          ) {
            resolved = true;
            resolve(ip);
            try { pc.close(); } catch {}
          }
        }
      };

      // Set timeout fallback (1.5s) to query ipify or default to unknown
      setTimeout(async () => {
        if (!resolved) {
          try {
            const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(2000) });
            if (res.ok) {
              const data = await res.json();
              if (data.ip) {
                resolved = true;
                resolve(data.ip);
                return;
              }
            }
          } catch {}
          resolve("unknown");
        }
      }, 1500);
    } catch {
      resolve("unknown");
    }
  });
};

interface BannedIpGuardProps {
  children: React.ReactNode;
}

export function BannedIpGuard({ children }: BannedIpGuardProps) {
  const pathname = usePathname();
  const [isBanned, setIsBanned] = useState<boolean | null>(null);
  const [userIp, setUserIp] = useState<string>("unknown");
  const [isCopied, setIsCopied] = useState(false);

  // Immediately bypass check if pathname is for the admin panel or backend APIs
  const isAdminOrApi = pathname.startsWith("/admin") || pathname.startsWith("/api/");

  useEffect(() => {
    if (isAdminOrApi) {
      setIsBanned(false);
      return;
    }

    const checkBanStatus = async () => {
      try {
        const realIp = await getRealIP();
        setUserIp(realIp);

        const res = await fetch("/api/check-ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ip: realIp }),
        });

        if (res.ok) {
          const data = await res.json();
          setIsBanned(!!data.banned);
        } else {
          setIsBanned(false); // Let through on failure
        }
      } catch {
        setIsBanned(false); // Let through on failure
      }
    };

    checkBanStatus();
  }, [pathname, isAdminOrApi]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userIp);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // While checking, render a premium loading layout to avoid content flash for banned users
  if (isBanned === null && !isAdminOrApi) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-4">
        {/* Glow effect */}
        <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        
        {/* Loader */}
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-xs font-bold tracking-wider text-slate-400 animate-pulse select-none">
            جاري تهيئة الاتصال الآمن...
          </p>
        </div>
      </div>
    );
  }

  // If IP is banned, show the gorgeous Crimson Warning Screen
  if (isBanned && !isAdminOrApi) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 p-4 overflow-y-auto select-none dir-rtl">
        {/* Ambient Dark-Crimson Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Banned Screen Card Container */}
        <div className="w-full max-w-lg bg-slate-900/90 border border-red-500/20 rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl flex flex-col items-center text-center">
          
          {/* Crimson Top-border Glow */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-[0_4px_20px_rgba(239,68,68,0.5)]" />

          {/* Glowing Banned Icon */}
          <div className="mb-6 relative flex items-center justify-center">
            {/* Outer pulsating rings */}
            <div className="absolute inset-0 w-20 h-20 bg-red-500/20 rounded-3xl blur-md animate-ping" />
            <div className="absolute inset-[-4px] w-[88px] h-[88px] border border-red-500/30 rounded-3xl" />
            
            {/* Main Icon Box */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-red-600 to-rose-500 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-red-950/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <line x1="9" y1="11" x2="15" y2="17"/>
                <line x1="15" y1="11" x2="9" y2="17"/>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300 mb-3 leading-tight">
            عذراً، تم تعليق وصولك إلى المنصة! 🚫
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6 text-justify sm:text-center">
            لقد تم حظر عنوان الـ IP الخاص بك من تصفح خدمات أكاديمية ADVVVV11. إذا كنت تعتقد أن هذا الإجراء تم بالخطأ، أو ترغب في استعادة الوصول ومناقشة فك الحظر، يرجى التواصل مع الإدارة مباشرة عبر تلغرام.
          </p>

          {/* Telegram CTA Button */}
          <a
            href="https://t.me/iivoz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 group cursor-pointer mb-6 transform hover:scale-[1.02]"
          >
            {/* Telegram Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-[-2px] group-hover:scale-110">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            <span>تواصل معي عبر تلغرام فوراً</span>
          </a>

          {/* User IP Box */}
          <div className="w-full bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl text-right flex flex-col gap-2 relative">
            <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500">
              <span>تاريخ الحظر: تلقائي ودائم</span>
              <span>بيانات الاتصال للتعريف</span>
            </div>
            
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800/50 px-3 py-2 rounded-xl">
              <button
                onClick={copyToClipboard}
                className="text-[10px] font-bold text-red-400 hover:text-red-300 transition-colors shrink-0 px-2 py-1 bg-red-500/5 rounded border border-red-500/10 cursor-pointer"
              >
                {isCopied ? "تم النسخ! ✓" : "نسخ العنوان 📋"}
              </button>
              <span className="text-xs font-mono font-black text-rose-400 select-all truncate ml-2">
                {userIp}
              </span>
            </div>
            
            <p className="text-[9px] text-slate-500 leading-normal text-center">
              يرجى تزويد المشرف بعنون الـ IP أعلاه عند التحدث معه لتسهيل العثور على حسابك وإلغاء الحظر.
            </p>
          </div>

          {/* Branding */}
          <p className="text-[10px] text-slate-600 mt-6 select-none">
            أكاديمية ADVVVV11 • نظام الحماية الرقمية والدرع الحديدي
          </p>

        </div>
      </div>
    );
  }

  // Otherwise, render children (let through)
  return <>{children}</>;
}
