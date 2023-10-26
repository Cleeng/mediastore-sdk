import { ReactComponent as Visa } from 'assets/images/paymentMethods/visa_payment_method.svg';
import { ReactComponent as AmericanExpress } from 'assets/images/paymentMethods/american_express.svg';
import { ReactComponent as MasterCard } from 'assets/images/paymentMethods/master_card.svg';
import { ReactComponent as Paypal } from 'assets/images/paymentMethods/PPicon.svg';
import { ReactComponent as Android } from 'assets/images/paymentMethods/android_color.svg';
import { ReactComponent as Amazon } from 'assets/images/paymentMethods/amazon.svg';
import { ReactComponent as Apple } from 'assets/images/paymentMethods/apple.svg';
import { ReactComponent as Roku } from 'assets/images/paymentMethods/roku.svg';
import { ReactComponent as ApplePayLogo } from 'assets/images/paymentMethods/applePay.svg';
import { ReactComponent as GooglePayLogo } from 'assets/images/paymentMethods/googlepay.svg';
import { ReactComponent as Discover } from 'assets/images/paymentMethods/discover.svg';
import { ReactComponent as Diners } from 'assets/images/paymentMethods/diners.svg';
import { ReactComponent as Ideal } from 'assets/images/paymentMethods/ideal.svg';
import { ReactComponent as Bancontact } from 'assets/images/paymentMethods/bancontact.svg';
import { ReactComponent as Sofort } from 'assets/images/paymentMethods/sofort.svg';

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
  sofort: {
    icon: Sofort,
    caption: 'Sofort',
    title: 'Sofort'
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
  }
};

export type CardTypesKey = keyof typeof CardTypes;
