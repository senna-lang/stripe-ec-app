import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import initStripe from 'stripe';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const { data: stripe_customer_data } = await supabase
    .from('profile')
    .select()
    .eq('id', user?.id)
    .single();
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer_data?.stripe_customer,
    return_url: 'https://main.d2yppohgt9e0z6.amplifyapp.com/subscription',
  });
  
  return NextResponse.json({ url: session.url });
}
