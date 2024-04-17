import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import initStripe from 'stripe';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
  const sig = req.headers.get('stripe-signature');
  const reqBuffer = Buffer.from(await req.arrayBuffer());
  let event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig!, endpointSecret!);
    switch (event.type) {
      case 'customer.subscription.created':
        const customerSubscriptionCreated = event.data.object;
        await supabase
          .from('profile')
          .update({
            is_subscribed: true,
            interval: customerSubscriptionCreated.items.data[0].plan.interval,
          })
          .eq('stripe_customer', event.data.object.customer);
        break;
      case 'customer.subscription.deleted':
        const customerSubscriptionDeleted = event.data.object;
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case 'customer.subscription.updated':
        const customerSubscriptionUpdated = event.data.object;
        // Then define and call a function to handle the event customer.subscription.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    return NextResponse.json(`Webhook Error: ${err.message}`);
  }
}
