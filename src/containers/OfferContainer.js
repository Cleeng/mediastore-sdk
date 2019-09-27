import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getOfferDetails from '../api/getOfferDetails';
import Offer from '../components/Offer';

const OfferContainer = ({ offerId }) => {
  const [offerDetails, setOfferDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getOfferDetails(offerId)
      .then(offerDetailsResponse => {
        if (isMounted) {
          setOfferDetails(offerDetailsResponse);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <Redirect to="/login" />;
  }
  if (offerDetails) {
    return (
      <Offer
        offerDetails={offerDetails}
        price={offerDetails.price}
        priceBeforeDiscount={offerDetails.price}
        couponApplied={false}
      />
    );
  }
  return null;
};

OfferContainer.propTypes = {
  offerId: PropTypes.string.isRequired
};

export default OfferContainer;
