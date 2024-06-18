import CleengComponent from './CleengComponent';

class RegistrationComponent extends CleengComponent {
  constructor({ offerId, publisherId }) {
    super({
      slug: 'register',
      offerId,
      publisherId
    });
  }
}

export default RegistrationComponent;
