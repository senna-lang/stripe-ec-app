import { NextRequest, NextResponse } from 'next/server';
import { supabaseRouteHandler } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  if (code) {
    const supabase = supabaseRouteHandler()
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(requestUrl.origin);
}
