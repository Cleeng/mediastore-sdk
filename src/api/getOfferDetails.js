import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

const getOfferDetails = offerId =>
  new Promise(resolve => {
    // eslint-disable-next-line no-unused-vars
    const token = localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE_KEY) || '';
    resolve({
      offerimg: 'https://webstoresdk.cleeng.com/assets/ff1e5e2f.png',
      offerTitle: `Some test offer (ID: ${offerId})`,
      customerCurrencySymbol: '$',
      offerPrice: 12,
      freePeriods: 2,
      hasTrial: false,
      offerPeriod: '',
      offerDescription:
        'Monthly plan. Renews automatically. Cancel anytime you want.'
    });
  });

export default getOfferDetails;
