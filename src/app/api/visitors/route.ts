import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface Visitor {
  id?: string;
  name: string;
  page: string;
  timestamp: string;
  userAgent: string;
  ip?: string;
}

export async function GET() {
  try {
    const visitsColRef = collection(db, 'visits');
    // Fetch up to 2000 visits ordered by timestamp desc
    const q = query(visitsColRef, orderBy('timestamp', 'desc'), limit(2000));
    const querySnapshot = await getDocs(q);
    
    const visitors: Visitor[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      visitors.push({
        id: doc.id,
        name: data.name,
        page: data.page,
        timestamp: data.timestamp,
        userAgent: data.userAgent,
        ip: data.ip
      });
    });

    // Reverse to maintain old ascending time order for legacy calculations if needed
    // but the analytics page handles dates correctly. We'll return descending for fresh feeds.
    return NextResponse.json(visitors);
  } catch (err: any) {
    console.error("Failed to read visitors from Firestore:", err);
    return NextResponse.json({ error: 'Failed to read visitors', details: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, page, timestamp, userAgent } = body;

    if (!name || !page) {
      return NextResponse.json({ error: 'Name and page are required' }, { status: 400 });
    }

    // Try to get IP from headers
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const timestampStr = timestamp || new Date().toISOString();
    const userAgentStr = userAgent || request.headers.get('user-agent') || 'unknown';

    const visitsColRef = collection(db, 'visits');
    const docRef = await addDoc(visitsColRef, {
      name,
      page,
      timestamp: timestampStr,
      userAgent: userAgentStr,
      ip,
    });

    return NextResponse.json({ 
      success: true, 
      visitor: {
        id: docRef.id,
        name,
        page,
        timestamp: timestampStr,
        userAgent: userAgentStr,
        ip
      } 
    }, { status: 201 });
  } catch (err: any) {
    console.error("Failed to save visitor to Firestore:", err);
    return NextResponse.json({ error: 'Failed to save visitor', details: err.message }, { status: 500 });
  }
}
