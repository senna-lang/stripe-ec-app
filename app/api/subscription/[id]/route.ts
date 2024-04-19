import { NextRequest, NextResponse } from 'next/server';
import { supabaseRouteHandler } from '@/lib/supabaseClient';
import initStripe from 'stripe';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const priceId = params.id;
  const supabase = supabaseRouteHandler()
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
  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_data?.stripe_customer!,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: 'https://main.d2yppohgt9e0z6.amplifyapp.com/payment/success',
    cancel_url: 'https://main.d2yppohgt9e0z6.amplifyapp.com/payment/cancelled',
  });

  return NextResponse.json({ id: session.id });
}
