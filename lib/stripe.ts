import initStripe from 'stripe';
import Stripe from 'stripe';

interface Plan {
  id: string;
  name: string;
  price: string | null;
  interval: Stripe.Price.Recurring.Interval;
  currency: string;
}

export const getAllPlans = async (): Promise<Plan[]> => {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const { data } = await stripe.plans.list();
  const plans = await Promise.all(
    data.map(async data => {
      const product = await stripe.products.retrieve(data.product as string);

      return {
        id: data.id,
        name: product.name,
        price: data.amount_decimal,
        interval: data.interval,
        currency: data.currency,
      };
    })
  );
  const sortedPlans = plans.sort(
    (a, b) => parseInt(a.price!) - parseInt(b.price!)
  );
  return sortedPlans;
};
