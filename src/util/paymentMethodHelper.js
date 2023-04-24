import { ReactComponent as CardLogo } from 'assets/images/paymentMethods/card.svg';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/PPicon.svg';
import { ReactComponent as ApplePayLogo } from 'assets/images/paymentMethods/applePay.svg';
import { ReactComponent as GooglePayLogo } from 'assets/images/paymentMethods/googlepay.svg';
import { getData } from 'util/appConfigHelper';

export const supportedPaymentMethods = [
  'card',
  'paypal',
  'applepay',
  'googlepay',
  'ideal',
  'sofort',
  'bancontact_card',
  'bancontact_mobile'
];

export const readablePaymentMethodNames = {
  card: 'Card',
  paypal: 'PayPal',
  applepay: 'ApplePay',
  googlepay: 'GooglePay',
  ideal: 'iDEAL',
  sofort: 'Sofort',
  bancontact_card: 'Bancontact Card',
  bancontact_mobile: 'Bancontact Mobile'
};

export const supportedPaymentGateways = ['adyen', 'paypal'];

export const logos = {
  card: CardLogo,
  paypal: PaypalLogo,
  applepay: ApplePayLogo,
  googlepay: GooglePayLogo
};

export default logos;

export const validatePaymentMethods = (
  paymentMethods,
  arePaymentMethodsProvidedByPublisher
) => {
  if (!paymentMethods) return [];
  return paymentMethods.filter(method => {
    if (
      supportedPaymentMethods.includes(method.methodName) &&
      supportedPaymentGateways.includes(method.paymentGateway)
    ) {
      return true;
    }
    if (arePaymentMethodsProvidedByPublisher) {
      // eslint-disable-next-line no-console
      console.error(`Payment method not supported (id: ${method.id})`);
    }
    return false;
  });
};

export const shouldShowGatewayComponent = (gateway, paymentMethods) =>
  !!paymentMethods.find(({ paymentGateway }) => paymentGateway === gateway);

export const getPayPalInfo = paymentMethods => {
  const visibleAdyenPaymentMethodstMethods = JSON.parse(
    getData('CLEENG_VISIBLE_ADYEN_PM') || '[]'
  );

  const isPayPalInPublisherConfig = shouldShowGatewayComponent(
    'paypal',
    paymentMethods
  );

  const isPayPalInClientConfig = visibleAdyenPaymentMethodstMethods.includes(
    'paypal'
  );
  const onlyPayPalInClientConfig =
    isPayPalInClientConfig && visibleAdyenPaymentMethodstMethods.length === 1;

  const shouldShowPayPal =
    isPayPalInPublisherConfig &&
    (!visibleAdyenPaymentMethodstMethods.length || isPayPalInClientConfig);

  const onlyPayPalNotAvailable = !shouldShowPayPal && onlyPayPalInClientConfig;

  return {
    onlyPayPalInClientConfig,
    onlyPayPalNotAvailable,
    shouldShowPayPal
  };
};
