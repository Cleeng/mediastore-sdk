import CleengComponent from './CleengComponent';

class CheckoutComponent extends CleengComponent {
  constructor({ offerId, publisherId }) {
    super({
      slug: 'components/checkout',
      offerId,
      publisherId
    });
  }
}

export default CheckoutComponent;
