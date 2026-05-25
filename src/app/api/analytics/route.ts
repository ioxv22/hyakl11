import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface Visitor {
  id: string;
  name: string;
  page: string;
  timestamp: string;
  userAgent: string;
  ip?: string;
}

export async function GET() {
  try {
    const visitsColRef = collection(db, 'visits');
    // Fetch up to 2500 visits ordered by timestamp desc to compute analytics
    const q = query(visitsColRef, orderBy('timestamp', 'desc'), limit(2500));
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

    // Total visits
    const totalVisits = visitors.length;

    // Unique visitors (by name)
    const uniqueNames = new Set(visitors.map((v) => v.name));
    const uniqueVisitors = uniqueNames.size;

    // Today's visits
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = visitors.filter(
      (v) => v.timestamp.split('T')[0] === today
    ).length;

    // Top pages
    const pageCounts: Record<string, number> = {};
    for (const v of visitors) {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    }
    const topPages = Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    // Recent visitors (last 20, most recent first)
    const recentVisitors = visitors.slice(0, 20);

    // Visits by day (last 7 days)
    const visitsByDay: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = visitors.filter(
        (v) => v.timestamp.split('T')[0] === dateStr
      ).length;
      visitsByDay.push({ date: dateStr, count });
    }

    // Visitors list (unique visitors with visit count and last visit and IP)
    const visitorsMap: Record<string, { visitCount: number; lastVisit: string; ip?: string }> = {};
    for (const v of visitors) {
      if (!visitorsMap[v.name]) {
        visitorsMap[v.name] = { visitCount: 0, lastVisit: v.timestamp, ip: v.ip };
      }
      visitorsMap[v.name].visitCount++;
      if (new Date(v.timestamp) > new Date(visitorsMap[v.name].lastVisit)) {
        visitorsMap[v.name].lastVisit = v.timestamp;
        if (v.ip) {
          visitorsMap[v.name].ip = v.ip;
        }
      }
    }
    const visitorsList = Object.entries(visitorsMap)
      .map(([name, data]) => ({
        name,
        visitCount: data.visitCount,
        lastVisit: data.lastVisit,
        ip: data.ip
      }))
      .sort((a, b) => b.visitCount - a.visitCount);

    return NextResponse.json({
      totalVisits,
      uniqueVisitors,
      todayVisits,
      topPages,
      recentVisitors,
      visitsByDay,
      visitorsList,
    });
  } catch (err: any) {
    console.error("Failed to compute Firestore analytics:", err);
    return NextResponse.json(
      { error: 'Failed to compute analytics', details: err.message },
      { status: 500 }
    );
  }
}
