import i18n from 'i18next';
import CardLogo from 'assets/images/paymentMethods/card.svg';
import PaypalLogo from 'assets/images/paymentMethods/PPicon.svg';
import ApplePayLogo from 'assets/images/paymentMethods/applePay.svg';
import GooglePayLogo from 'assets/images/paymentMethods/googlepay.svg';
import IdealLogo from 'assets/images/paymentMethods/ideal-small.svg';
import BancontactLogo from 'assets/images/paymentMethods/bancontact-small.svg';
import GiftLogo from 'assets/images/gift.svg';
import RokuLogo from 'assets/images/paymentMethods/roku_color.svg';
import AmazonLogo from 'assets/images/paymentMethods/amazon_color.svg';
import AndroidLogo from 'assets/images/paymentMethods/android_color.svg';

import store from 'appRedux/store';
import { currencyFormat, isPeriod, periodMapper } from './planHelper';
import formatNumber from './formatNumber';

export const supportedPaymentMethods = [
  'card',
  'paypal',
  'applepay',
  'googlepay',
  'ideal',
  'bancontact_card',
  'bancontact_mobile'
];

export const bankPaymentMethods = [
  'ideal',
  'bancontact_mobile', // Bancontact Mobile name in cleeng-admin
  'bcmc_mobile' // Bancontact Mobile name in Adyen
];

export const standardPaymentMethods = [
  'card',
  'scheme',
  'applepay',
  'googlepay',
  'bancontact_card',
  'bcmc'
];

// TODO checkbox copies?
export const adyenPaymentMethods = [
  'ideal',
  'bancontact_mobile', // Bancontact Mobile name in cleeng-admin
  'bcmc_mobile', // Bancontact Mobile name in Adyen
  'card',
  'scheme',
  'applepay',
  'googlepay',
  'bancontact_card',
  'bcmc'
];

export const bankPaymentMethodsMapper = {
  bcmc_mobile: 'bancontact_mobile',
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
  bancontact_card: 'Bancontact Card',
  bancontact_mobile: 'Bancontact Mobile'
};

export const supportedPaymentGateways = ['adyen', 'paypal'];

export const logos = {
  card: CardLogo,
  paypal: PaypalLogo,
  applepay: ApplePayLogo,
  apple: ApplePayLogo,
  googlepay: GooglePayLogo,
  ideal: IdealLogo,
  bancontact_card: BancontactLogo,
  bancontact_mobile: BancontactLogo,
  gift: GiftLogo,
  roku: RokuLogo,
  amazon: AmazonLogo,
  android: AndroidLogo
};

export default logos;

export const validatePaymentMethods = (
  paymentMethods,
  arePaymentMethodsProvidedByPublisher
) => {
  const {
    publisherConfig: { hiddenPaymentMethods }
  } = store.getState();
  if (!paymentMethods) return [];
  return paymentMethods.filter((method) => {
    const { id, methodName, paymentGateway } = method;
    if (hiddenPaymentMethods.includes(id)) {
      return false;
    }
    if (
      supportedPaymentMethods.includes(methodName) &&
      supportedPaymentGateways.includes(paymentGateway)
    ) {
      return true;
    }
    if (arePaymentMethodsProvidedByPublisher) {
      // eslint-disable-next-line no-console
      console.error(`Payment method not supported (id: ${id})`);
    }
    return false;
  });
};

export const shouldShowGatewayComponent = (gateway, paymentMethods) =>
  !!paymentMethods.find(({ paymentGateway }) => paymentGateway === gateway);

// returns common part between methods set in admin and those set
// by Config.setVisibleAdyenPaymentMethods()
export const getAvailablePaymentMethods = (
  publisherPaymentMethods,
  visiblePaymentMethods
) => {
  const availablePaymentMethods = visiblePaymentMethods.length
    ? publisherPaymentMethods.filter(({ methodName }) =>
        visiblePaymentMethods.includes(methodName)
      )
    : publisherPaymentMethods;

  return availablePaymentMethods;
};

export const getStandardCopy = (isMyAccount, offer, order, isGift) => {
  const { period: offerPeriod, customerPriceExclTax: offerBasePrice } = offer;

  const { discount, currency, offerId } = order;

  const isSubscription = offerId?.charAt(0) === 'S';
  const chargedForEveryText =
    offerPeriod && isPeriod(offerPeriod)
      ? periodMapper[offerPeriod].chargedForEveryText
      : null;

  const readablePrice = `${currencyFormat[currency]}${formatNumber(
    offerBasePrice
  )}`;
  const readablePeriod = chargedForEveryText ? `/${chargedForEveryText}` : '';

  if (isGift) {
    return i18n.t(
      'offer-standard-consent-copy.checkout-not-subscription',
      'By ticking this, you agree to the Terms and Conditions of our service.'
    );
  }

  if (isMyAccount) {
    return i18n.t(
      'offer-standard-consent-copy.my-account',
      'By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.'
    );
  }

  if (isSubscription) {
    if (discount?.applied && discount.type === 'trial') {
      return i18n.t(
        `offer-standard-consent-copy.trial.period-${offerPeriod}`,
        "After any free trial and/or promotional period, you will be charged {{readablePrice}}{{readablePeriod}} or the then-current price, plus applicable taxes, on a recurring basis. Your subscription will automatically continue until you cancel. To cancel, log into your account, click 'Manage' next to your subscription and then click 'Cancel'. By checking the box, you expressly acknowledge and agree to these terms as well as the full Terms of Service.",
        { readablePrice, readablePeriod }
      );
    }

    if (discount?.applied && discount.type !== 'trial') {
      return i18n.t(
        `offer-standard-consent-copy.discount.period-${offerPeriod}`,
        "After any promotional period, you will be charged {{readablePrice}}{{readablePeriod}} or the then-current price, plus applicable taxes, on a recurring basis. Your subscription will automatically continue until you cancel. To cancel, log into your account, click 'Manage' next to your subscription and then click 'Cancel'. By checking the box, you expressly acknowledge and agree to these terms as well as the full Terms of Service.",
        { readablePrice, readablePeriod }
      );
    }

    return i18n.t(
      `offer-standard-consent-copy.checkout-subscription.period-${offerPeriod}`,
      "You will be charged {{readablePrice}}{{readablePeriod}} or the then-current price, plus applicable taxes, on a recurring basis. Your subscription will automatically continue until you cancel. To cancel, log into your account, click 'Manage' next to your subscription and then click ‘Cancel.’ By checking the box, you expressly acknowledge and agree to these terms as well as the full Terms of Service.",
      { readablePrice, readablePeriod }
    );
  }

  return i18n.t(
    'offer-standard-consent-copy.checkout-not-subscription',
    'By ticking this, you agree to the Terms and Conditions of our service.'
  );
};
