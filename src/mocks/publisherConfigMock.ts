import { PublisherConfigInitialState } from 'appRedux/types';

const publisherConfigMock: PublisherConfigInitialState = {
  publisherId: '123456789',
  offerId: 'S111111111',
  paymentMethods: [
    {
      id: 1,
      logoUrl: 'https://example.com/logo1.png',
      methodName: 'card',
      paymentGateway: 'adyen'
    },
    {
      id: 2,
      logoUrl: 'https://example.com/logo2.png',
      methodName: 'googlepay',
      paymentGateway: 'adyen'
    }
  ],
  visiblePaymentMethods: ['card'],
  hiddenPaymentMethods: [],
  isPayPalHidden: false,
  adyenConfiguration: null,
  displayGracePeriodError: true,
  termsUrl: 'https://cleeng.com',
  resetUrl: '',
  enable3DSRedirectFlow: true
};

export default publisherConfigMock;
