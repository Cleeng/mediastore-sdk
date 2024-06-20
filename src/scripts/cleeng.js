import CleengComponent from './CleengComponent';
import { kebabCase } from './utils';

export default class Cleeng {
  isConfigured = false;

  APIKey = '';

  components = {
    register: null,
    login: null,
    purchase: null,
    checkout: null,
    subscriptions: null,
    capture: null,
    myAccount: null,
    transactionsList: null,
    subscriptionSwitches: null,
    redeemGift: null,
    passwordReset: null,
    planDetails: null,
    paymentInfo: null,
    updateProfile: null,
    checkoutConsents: null,
    thankYou: null
  };

  configure({ APIKey, publisherId, offerId }) {
    if (!APIKey) {
      throw new Error(
        'Cleeng needs an API key in order to configure properly. Please pass your Broadcaster API key.'
      );
    }

    this.isConfigured = true;
    this.APIKey = APIKey;
    // * probably this is a good place to fetch the configuration object and set it somewhere globally

    Object.keys(this.components).forEach((componentName) => {
      this.components[componentName] = new CleengComponent({
        slug: kebabCase(componentName),
        offerId,
        publisherId,
        isConfigured: this.isConfigured
      });
    });
  }
}
