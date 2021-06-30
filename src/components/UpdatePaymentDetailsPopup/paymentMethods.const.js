import { ReactComponent as CardIcon } from 'assets/images/paymentMethods/card.svg';
import { ReactComponent as PPIcon } from 'assets/images/paymentMethods/paypal_short.svg';

const paymentMethods = [
  {
    key: 'card',
    icon: CardIcon,
    title: 'Credit or Debit card',
    description: 'Accept all major credit and debit cards'
  },
  {
    key: 'paypal',
    icon: PPIcon,
    title: 'PayPal',
    description: 'Accept all major credit and debit cards'
  }
];

export default paymentMethods;
