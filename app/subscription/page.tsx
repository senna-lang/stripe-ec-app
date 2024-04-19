import SubscriptionManagementButton from '@/components/elements/SubscriptionManagementButton';
import { getProfile } from '@/lib/supabase';
import { supabaseServer } from '@/lib/supabaseClient';

const Subscription = async () => {
  const supabase = supabaseServer();
  const profile = await getProfile(supabase);
  return (
    <div className=" w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className=" text-3xl mb-8">サブスクリプション管理</h1>
      <div className="flex flex-col gap-2">
        <div>
          {profile?.is_subscribed
            ? `プラン加入中：${profile.interval}`
            : '加入しているプランはありません'}
        </div>
        <div>
          <SubscriptionManagementButton />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
