import { NextRequest, NextResponse } from 'next/server';
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
    // If file is corrupted, start fresh
  }
  return [];
}

function writeVisitors(visitors: Visitor[]): void {
  fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2), 'utf-8');
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function GET() {
  try {
    const visitors = readVisitors();
    return NextResponse.json(visitors);
  } catch {
    return NextResponse.json({ error: 'Failed to read visitors' }, { status: 500 });
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

    const visitor: Visitor = {
      id: generateId(),
      name,
      page,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || request.headers.get('user-agent') || 'unknown',
      ip,
    };

    const visitors = readVisitors();
    visitors.push(visitor);
    writeVisitors(visitors);

    return NextResponse.json({ success: true, visitor }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to save visitor' }, { status: 500 });
  }
}
