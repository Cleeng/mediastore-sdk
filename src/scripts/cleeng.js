import RegistrationComponent from './RegistrationComponent';

export default class Cleeng {
  RegistrationComponent = RegistrationComponent;

  constructor() {
    this.APIKey = '';
  }

  configure(APIKey) {
    if (!APIKey) {
      throw new Error(
        'Cleeng needs an API key in order to configure properly. Please pass your Broadcaster API key.'
      );
    }

    this.APIKey = APIKey;
    // * probably this is a good place to fetch the configuration object and set it somewhere globally
  }
}
