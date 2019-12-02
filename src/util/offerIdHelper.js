const saveOfferId = (location, setOfferId) => {
  const offerIdFromQuery = new URLSearchParams(location.search).get('offer');
  if (offerIdFromQuery) {
    setOfferId(offerIdFromQuery);
    localStorage.setItem('CLEENG_OFFER_ID', offerIdFromQuery);
  } else {
    setOfferId(localStorage.getItem('CLEENG_OFFER_ID') || '');
  }
};

export default saveOfferId;
