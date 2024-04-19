import PriceCard from '@/components/elements/PriceCard';
import { getAllPlans } from '@/lib/stripe';
import { getProfile } from '@/lib/supabase';
import { supabaseServer } from '@/lib/supabaseClient';

const PricePage = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getUser();
  const [plans, profile] = await Promise.all([
    await getAllPlans(),
    await getProfile(supabase),
  ]);
  const showSubscribeButton = !!user && !profile?.is_subscribed;
  const showCreateAccount = !user;
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {plans.map(plan => (
        <PriceCard
          key={plan.id}
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
