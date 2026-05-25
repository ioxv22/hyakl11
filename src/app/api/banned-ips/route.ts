import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

export async function GET() {
  try {
    const bannedColRef = collection(db, 'banned_ips');
    const querySnapshot = await getDocs(bannedColRef);
    
    const bannedIps: { ip: string; bannedAt: string }[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bannedIps.push({
        ip: doc.id,
        bannedAt: data.bannedAt || new Date().toISOString()
      });
    });

    return NextResponse.json(bannedIps);
  } catch (err: any) {
    console.error("Failed to read banned IPs from Firestore:", err);
    return NextResponse.json({ error: 'Failed to read banned IPs', details: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip } = body;

    if (!ip || typeof ip !== 'string') {
      return NextResponse.json({ error: 'IP is required and must be a string' }, { status: 400 });
    }

    const trimmedIp = ip.trim();
    if (!trimmedIp) {
      return NextResponse.json({ error: 'IP cannot be empty' }, { status: 400 });
    }

    const docRef = doc(db, 'banned_ips', trimmedIp);
    await setDoc(docRef, {
      bannedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, ip: trimmedIp }, { status: 201 });
  } catch (err: any) {
    console.error("Failed to ban IP in Firestore:", err);
    return NextResponse.json({ error: 'Failed to ban IP', details: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get('ip');

    if (!ip) {
      return NextResponse.json({ error: 'IP parameter is required' }, { status: 400 });
    }

    const trimmedIp = ip.trim();
    const docRef = doc(db, 'banned_ips', trimmedIp);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, ip: trimmedIp });
  } catch (err: any) {
    console.error("Failed to unban IP in Firestore:", err);
    return NextResponse.json({ error: 'Failed to unban IP', details: err.message }, { status: 500 });
  }
}
