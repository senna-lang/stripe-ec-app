'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const SubscriptionManagementButton = () => {
  const router = useRouter();
  const loadPortal = async () => {
    const res = await fetch('http://localhost:3000/api/portal');
    const data = await res.json();
    router.push(data.url);
  };

  return (
    <Button variant="outlined" onClick={loadPortal}>
      サブスクリプション管理
    </Button>
  );
};

export default SubscriptionManagementButton;
