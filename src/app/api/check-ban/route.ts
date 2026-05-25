import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const isRealIp = (ip: string | undefined | null): ip is string => {
  if (!ip) return false;
  const lower = ip.trim().toLowerCase();
  return lower !== 'unknown' && lower !== '127.0.0.1' && lower !== 'localhost' && lower !== '::1' && lower !== '';
};

export async function POST(request: NextRequest) {
  try {
    let bodyIp: string | undefined;
    try {
      const body = await request.json();
      bodyIp = body.ip;
    } catch {
      // Body might be empty or invalid, ignore
    }

    // Retrieve server-side IP from request headers
    const headerIp = (
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip')?.trim()
    );

    const ipsToCheck: string[] = [];

    // Add body IP (from WebRTC frontend) if valid
    if (bodyIp && isRealIp(bodyIp)) {
      ipsToCheck.push(bodyIp.trim());
    }

    // Add header IP if valid and not already added
    if (headerIp && isRealIp(headerIp) && !ipsToCheck.includes(headerIp.trim())) {
      ipsToCheck.push(headerIp.trim());
    }

    // Check Firestore for each IP
    for (const ip of ipsToCheck) {
      const docRef = doc(db, 'banned_ips', ip);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.warn(`Blocked access for banned IP: ${ip}`);
        return NextResponse.json({ banned: true, ip });
      }
    }

    return NextResponse.json({ banned: false });
  } catch (err: any) {
    console.error("Failed to check IP ban status in Firestore:", err);
    // On error, let the visitor through as a fallback so we don't break the app for everyone
    return NextResponse.json({ banned: false, error: err.message });
  }
}
