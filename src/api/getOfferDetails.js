import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';
import mockOfferDetails from '../components/Offer/__mocks__/offerDetails';

const getOfferDetails = offerId =>
  new Promise(resolve => {
    // eslint-disable-next-line no-unused-vars
    const token = localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE_KEY) || '';
    resolve({
      ...mockOfferDetails,
      title: `Some test offer (ID: ${offerId})`
    });
  });

export default getOfferDetails;
