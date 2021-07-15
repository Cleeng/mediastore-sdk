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
    description: 'Add your card details here',
    paymentGateway: 'adyen'
  },
  {
    key: ACTIONS.addPayPal,
    icon: PPIcon,
    title: 'PayPal',
    description: 'Connect your PayPal account here',
    paymentGateway: 'paypal'
  }
];

export default supportedPaymentGateways;
