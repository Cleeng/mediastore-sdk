import { ReactComponent as CardIcon } from 'assets/images/paymentMethods/card.svg';
import { ReactComponent as PPIcon } from 'assets/images/paymentMethods/paypal_short.svg';

const supportedPaymentGateways = [
  {
    key: 'card',
    icon: CardIcon,
    title: 'Credit or Debit card',
    description: 'Accept all major credit and debit cards',
    paymentGateway: 'adyen'
  },
  {
    key: 'paypal',
    icon: PPIcon,
    title: 'PayPal',
    description: 'Accept all major credit and debit cards',
    paymentGateway: 'payPal'
  }
];

export default supportedPaymentGateways;
