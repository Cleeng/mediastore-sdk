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

export const bankPaymentMethods = [
  'ideal',
  'sofort', // Sofort name in cleeng-admin
  'directEbanking', // Sofort name in Adyen
  'bancontact_mobile', // Bancontact Mobile name in cleeng-admin
  'bcmc_mobile' // Bancontact Mobile name in Adyen
];

export const bankPaymentMethodsMapper = {
  bcmc_mobile: 'bancontact_mobile',
  directEbanking: 'sofort',
  bcmc: 'bancontact_card'
};

export const STANDARD_PAYMENT_METHODS = 'zeroPaymentSupported';
export const BANK_PAYMENT_METHODS = 'zeroPaymentNotSupported';

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

// returns common part between methods set in admin and those set
// by Config.setVisibleAdyenPaymentMethods()
export const getAvailablePaymentMethods = publisherPaymentMethods => {
  const visibleAdyenPaymentMethods = JSON.parse(
    getData('CLEENG_VISIBLE_ADYEN_PM') || '[]'
  );

  const availablePaymentMethods = visibleAdyenPaymentMethods.length
    ? publisherPaymentMethods.filter(({ methodName }) =>
        visibleAdyenPaymentMethods.includes(methodName)
      )
    : publisherPaymentMethods;

  return availablePaymentMethods;
};
