"use client";

import { useEffect } from "react";
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
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){1,7}|[a-f0-9]{0,4}::[a-f0-9]{0,4})/i;
        const match = candidate.match(ipRegex);
        if (match && match[1]) {
          const ip = match[1];
          if (ip === "ca" || ip.toLowerCase() === "unknown") return;
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

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const name = localStorage.getItem("adv_student_name") || "زائر مجهول";
        const realIp = await getRealIP();

        await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            page: pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: realIp, // Sent WebRTC real IP
          }),
        });
      } catch {
        // Silently fail - tracking should not affect user experience
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
