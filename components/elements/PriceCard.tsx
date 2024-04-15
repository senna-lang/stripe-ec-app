import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Stripe from 'stripe';
import SubscriptionButton from './SubscriptionButton';

const PriceCard = ({
  id,
  name,
  price,
  interval,
  subsButton,
  accountButton,
}: {
  id:string;
  name: string;
  price: string | null;
  interval: Stripe.Price.Recurring.Interval;
  subsButton: boolean | null;
  accountButton: boolean;
}) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name === 'Month' ? ' 月額プラン' : '年間プラン'}
        </Typography>
        <Typography variant="h5" component="div">
          {name}プラン
        </Typography>
        <Typography variant="body2" component="div">
          {price}JPY / {interval}
        </Typography>
      </CardContent>
      <CardActions>
        {subsButton && <SubscriptionButton planId={id}/>}
        {accountButton && <Button size="small">ログイン</Button>}
      </CardActions>
    </Card>
  );
};

export default PriceCard;
