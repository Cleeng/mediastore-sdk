import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getOfferDetails from '../api/getOfferDetails';
import Offer from '../components/Offer';

const OfferContainer = ({ offerId }) => {
  const [offerDetails, setOfferDetails] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getOfferDetails(offerId).then(offerDetailsResponse => {
      if (isMounted) {
        setOfferDetails(offerDetailsResponse);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return offerDetails ? (
    <Offer
      offerDetails={offerDetails}
      price={offerDetails.offerPrice}
      priceBeforeDiscount={offerDetails.offerPrice}
      couponApplied={false}
    />
  ) : null;
};

OfferContainer.propTypes = {
  offerId: PropTypes.string.isRequired
};

export default OfferContainer;
