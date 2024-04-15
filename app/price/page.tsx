import PriceCard from '@/components/elements/PriceCard';
import { getAllPlans } from '@/lib/stripe';
import { getProfile } from '@/lib/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const PricePage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getSession();
  const [plans, profile] = await Promise.all([
    await getAllPlans(),
    await getProfile(supabase),
  ]);
  const showSubscribeButton = !!user.session && !profile?.is_subscribed;
  const showCreateAccount = !user.session;
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {plans.map(plan => (
        <PriceCard
          id={plan.id}
          name={plan.name}
          price={plan.price}
          interval={plan.interval}
          subsButton={showSubscribeButton}
          accountButton={showCreateAccount}
        />
      ))}
    </div>
  );
};

export default PricePage;
