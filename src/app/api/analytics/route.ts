import { NextRequest, NextResponse } from 'next/server';

/* ================================================================
   Server-side GA4 Measurement Protocol endpoint
   POST /api/analytics  { name: string, params?: Record<string, unknown> }
   Forwards events to GA4 even when the browser blocks gtag.js
   ================================================================ */

const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { name: string; params?: Record<string, unknown> };

    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const apiSecret     = process.env.GA_API_SECRET;

    // If GA is not configured, silently succeed (don't break the client)
    if (!measurementId || !apiSecret) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const payload = {
      client_id:  req.headers.get('x-forwarded-for') ?? 'server',
      events: [{
        name:   body.name,
        params: body.params ?? {},
      }],
    };

    const gaRes = await fetch(
      `${GA_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      }
    );

    if (!gaRes.ok) {
      console.error('[Analytics API] GA4 MP responded:', gaRes.status);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Analytics API] Error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
