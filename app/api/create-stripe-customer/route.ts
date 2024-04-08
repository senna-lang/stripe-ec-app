import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import initStripe from 'stripe';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const query = req.nextUrl.searchParams.get('API_ROUTE_SECRET');
  if (query !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ message: 'Invalid API_SECRET' });
  }
  const data = await req.json();
  const { email, id } = data;
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const customer = await stripe.customers.create({
    email,
  });

  await supabase
    .from('profile')
    .update({
      stripe_customer: customer.id,
    })
    .eq('id', id);

  return NextResponse.json({
    message: `stripe customer created ${customer.id}`,
  });
}
