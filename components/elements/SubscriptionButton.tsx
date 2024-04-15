'use client';
import { Button } from '@mui/material';
import React from 'react';

const SubscriptionButton = ({ planId }: { planId: string }) => {
  const handleSubscribe = async() => {
    await fetch(`http://localhost:3000/api/subscription/${planId}`);
  };
  return <Button onClick={handleSubscribe}>サブスクリプション</Button>;
};

export default SubscriptionButton;
