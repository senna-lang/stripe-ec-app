'use client';
import { Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const SubscriptionButton = ({ planId }: { planId: string }) => {
  const handleSubscribe = async () => {
    const res = await fetch(`http://localhost:3000/api/subscription/${planId}`);
    const data = await res.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return <Button onClick={handleSubscribe}>サブスクリプション</Button>;
};

export default SubscriptionButton;
