import Visa from 'assets/images/paymentMethods/visa_payment_method.svg';
import AmericanExpress from 'assets/images/paymentMethods/american_express.svg';
import MasterCard from 'assets/images/paymentMethods/master_card.svg';
import Paypal from 'assets/images/paymentMethods/PPicon.svg';
import Android from 'assets/images/paymentMethods/android_color.svg';
import Amazon from 'assets/images/paymentMethods/amazon.svg';
import Apple from 'assets/images/paymentMethods/apple.svg';
import Roku from 'assets/images/paymentMethods/roku.svg';
import ApplePayLogo from 'assets/images/paymentMethods/applePay.svg';
import GooglePayLogo from 'assets/images/paymentMethods/googlepay.svg';
import Discover from 'assets/images/paymentMethods/discover.svg';
import Diners from 'assets/images/paymentMethods/diners.svg';
import Ideal from 'assets/images/paymentMethods/ideal.svg';
import Bancontact from 'assets/images/paymentMethods/bancontact.svg';
import GCash from 'assets/images/paymentMethods/gcash.svg';

// eslint-disable-next-line import/prefer-default-export
export const CardTypes = {
  visa: {
    icon: Visa,
    caption: 'Visa',
    title: 'Credit Card'
  },
  visacredit: {
    icon: Visa,
    caption: 'Visa',
    title: 'Credit Card'
  },
  amex: {
    icon: AmericanExpress,
    caption: 'American Express',
    title: 'Credit Card'
  },
  mc: {
    icon: MasterCard,
    caption: 'MasterCard',
    title: 'Credit Card'
  },
  paypal: {
    icon: Paypal,
    caption: 'PayPal',
    title: 'PayPal'
  },
  apple: {
    icon: Apple,
    caption: 'Apple',
    title: 'Apple'
  },
  android: {
    icon: Android,
    caption: 'Android',
    title: 'Android'
  },
  amazon: {
    icon: Amazon,
    caption: 'Amazon',
    title: 'Amazon'
  },
  roku: {
    icon: Roku,
    caption: 'Roku',
    title: 'Roku'
  },
  applepay: {
    icon: ApplePayLogo,
    caption: 'Apple Pay',
    title: 'Apple Pay'
  },
  googlepay: {
    icon: GooglePayLogo,
    caption: 'Google Pay',
    title: 'Google Pay'
  },
  discover: {
    icon: Discover,
    caption: 'Discover',
    title: 'Credit Card'
  },
  diners: {
    icon: Diners,
    caption: 'Diners',
    title: 'Credit Card'
  },
  ideal: {
    icon: Ideal,
    caption: 'Ideal',
    title: 'iDeal'
  },
  bancontact_card: {
    icon: Bancontact,
    caption: 'Bancontact Card',
    title: 'Bancontact Card'
  },
  bancontact_mobile: {
    icon: Bancontact,
    caption: 'Bancontact Mobile',
    title: 'Bancontact Mobile'
  },
  gcash: {
    icon: GCash,
    caption: 'GCash',
    title: 'GCash'
  },
  // Primer card types:
  VISA: { icon: Visa, caption: 'Visa', title: 'Credit Card' },
  MASTERCARD: {
    icon: MasterCard,
    caption: 'MasterCard',
    title: 'Credit Card'
  },
  AMEX: {
    icon: AmericanExpress,
    caption: 'American Express',
    title: 'Credit Card'
  },
  DINERS: {
    icon: Diners,
    caption: 'Diners',
    title: 'Credit Card'
  },
  DISCOVER: {
    icon: Discover,
    caption: 'Discover',
    title: 'Credit Card'
  }
};

export type CardTypesKey = keyof typeof CardTypes;
