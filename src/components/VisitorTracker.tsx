"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const name = localStorage.getItem("adv_student_name") || "زائر مجهول";

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
