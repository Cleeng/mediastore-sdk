import { ReactComponent as Visa } from 'assets/images/paymentMethods/visa_payment_method.svg';
import { ReactComponent as AmericanExpress } from 'assets/images/paymentMethods/american_express.svg';
import { ReactComponent as MasterCard } from 'assets/images/paymentMethods/master_card.svg';
import { ReactComponent as Paypal } from 'assets/images/paymentMethods/PPicon.svg';
import { ReactComponent as Android } from 'assets/images/paymentMethods/android.svg';
import { ReactComponent as Amazon } from 'assets/images/paymentMethods/amazon.svg';
import { ReactComponent as Apple } from 'assets/images/paymentMethods/apple.svg';
import { ReactComponent as Roku } from 'assets/images/paymentMethods/roku.svg';
import { ReactComponent as ApplePayLogo } from 'assets/images/paymentMethods/applePay.svg';
import { ReactComponent as GooglePayLogo } from 'assets/images/paymentMethods/googlepay.svg';
import { ReactComponent as Discover } from 'assets/images/paymentMethods/discover.svg';
import { ReactComponent as Diners } from 'assets/images/paymentMethods/diners.svg';
import { ReactComponent as Bancontact } from 'assets/images/paymentMethods/bancontact.svg';
import { ReactComponent as Sofort } from 'assets/images/paymentMethods/sofort.svg';

// eslint-disable-next-line import/prefer-default-export
export const CardTypes = {
  visa: {
    icon: Visa,
    title: 'Credit Card'
  },
  visacredit: {
    icon: Visa,
    title: 'Credit Card'
  },
  amex: {
    icon: AmericanExpress,
    title: 'Credit Card'
  },
  mc: {
    icon: MasterCard,
    title: 'Credit Card'
  },
  paypal: {
    icon: Paypal,
    title: 'PayPal'
  },
  apple: {
    icon: Apple,
    title: 'Apple'
  },
  android: {
    icon: Android,
    title: 'Android'
  },
  amazon: {
    icon: Amazon,
    title: 'Amazon'
  },
  roku: {
    icon: Roku,
    title: 'Roku'
  },
  applepay: {
    icon: ApplePayLogo,
    title: 'Apple Pay'
  },
  googlepay: {
    icon: GooglePayLogo,
    title: 'Google Pay'
  },
  discover: {
    icon: Discover,
    title: 'Credit Card'
  },
  diners: {
    icon: Diners,
    title: 'Credit Card'
  },
  ideal: {
    icon: Diners, // TODO: add icons
    title: 'iDeal'
  },
  sofort: {
    icon: Sofort,
    title: 'Sofort'
  },
  bancontact_card: {
    icon: Bancontact,
    title: 'bancontact_card'
  },
  bancontact_mobile: {
    icon: Bancontact,
    title: 'bancontact_mobile'
  }
};
