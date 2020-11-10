import { setData, getData } from 'util/appConfigHelper';

const saveOfferId = (location, setOfferId) => {
  const offerIdFromQuery = new URLSearchParams(location.search).get('offer');
  if (offerIdFromQuery) {
    setOfferId(offerIdFromQuery);
    setData('CLEENG_OFFER_ID', offerIdFromQuery);
    setData('CLEENG_OFFER_TYPE', offerIdFromQuery.charAt(0));
  } else {
    setOfferId(getData('CLEENG_OFFER_ID') || '');
  }
};

export default saveOfferId;
