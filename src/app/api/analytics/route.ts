import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VISITORS_FILE = path.join(process.cwd(), 'visitors.json');

interface Visitor {
  id: string;
  name: string;
  page: string;
  timestamp: string;
  userAgent: string;
  ip?: string;
}

function readVisitors(): Visitor[] {
  try {
    if (fs.existsSync(VISITORS_FILE)) {
      const data = fs.readFileSync(VISITORS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // If file is corrupted, return empty
  }
  return [];
}

export async function GET() {
  try {
    const visitors = readVisitors();

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
    const recentVisitors = [...visitors]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 20);

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

    // Visitors list (unique visitors with visit count and last visit)
    const visitorsMap: Record<string, { visitCount: number; lastVisit: string }> = {};
    for (const v of visitors) {
      if (!visitorsMap[v.name]) {
        visitorsMap[v.name] = { visitCount: 0, lastVisit: v.timestamp };
      }
      visitorsMap[v.name].visitCount++;
      if (new Date(v.timestamp) > new Date(visitorsMap[v.name].lastVisit)) {
        visitorsMap[v.name].lastVisit = v.timestamp;
      }
    }
    const visitorsList = Object.entries(visitorsMap)
      .map(([name, data]) => ({
        name,
        visitCount: data.visitCount,
        lastVisit: data.lastVisit,
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
  } catch {
    return NextResponse.json(
      { error: 'Failed to compute analytics' },
      { status: 500 }
    );
  }
}
