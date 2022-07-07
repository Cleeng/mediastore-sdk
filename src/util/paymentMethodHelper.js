import { ReactComponent as CardLogo } from 'assets/images/paymentMethods/card.svg';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/paypal.svg';

export const logos = {
  card: CardLogo,
  paypal: PaypalLogo
};

export default logos;

export const areProvidedPaymentMethodIdsValid = paymentMethodIds => {
  if (
    paymentMethodIds === null ||
    paymentMethodIds === undefined ||
    typeof paymentMethodIds !== 'object'
  )
    return false;

  const supportedPaymentGateways = Object.keys(paymentMethodIds).filter(
    item => item === 'paypal' || item === 'adyen'
  );

  return !!supportedPaymentGateways.length;
};
