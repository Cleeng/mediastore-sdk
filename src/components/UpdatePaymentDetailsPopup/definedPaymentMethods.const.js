import { ReactComponent as CardIcon } from 'assets/images/paymentMethods/card.svg';
import { ReactComponent as PPIcon } from 'assets/images/paymentMethods/paypal_short.svg';

export const ACTIONS = {
  delete: 'delete',
  addCard: 'addCard',
  addPayPal: 'addPayPal'
};

const supportedPaymentGateways = [
  {
    key: ACTIONS.addCard,
    icon: CardIcon,
    title: 'Credit or Debit card',
    description: 'Accept all major credit and debit cards',
    paymentGateway: 'adyen'
  },
  {
    key: ACTIONS.addPayPal,
    icon: PPIcon,
    title: 'PayPal',
    description: 'Accept all major credit and debit cards',
    paymentGateway: 'paypal'
  }
];

export default supportedPaymentGateways;
