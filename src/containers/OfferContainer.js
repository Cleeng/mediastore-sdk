import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getOfferDetails from '../api/getOfferDetails';
import Offer from '../components/Offer';
import applyCoupon from '../api/applyCoupon';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from '../components/Input';

const OfferContainer = ({ offerId }) => {
  const [offerDetails, setOfferDetails] = useState(null);
  const [couponProps, setCouponProps] = useState(null);
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

  const onCouponSubmit = couponCode =>
    applyCoupon(couponCode)
      .then(result => {
        setOfferDetails({ ...offerDetails, ...result });
        setCouponProps({
          showMessage: true,
          message: 'Your coupon has been applied!',
          messageType: MESSAGE_TYPE_SUCCESS
        });
      })
      .catch(() => {
        setCouponProps({
          showMessage: true,
          message:
            'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
          messageType: MESSAGE_TYPE_FAIL
        });
      });

  if (error) {
    return <Redirect to="/login" />;
  }

  if (offerDetails) {
    return (
      <Offer
        offerDetails={offerDetails}
        couponProps={{
          ...couponProps,
          onSubmit: onCouponSubmit
        }}
      />
    );
  }
  return null;
};

OfferContainer.propTypes = {
  offerId: PropTypes.string.isRequired
};

export default OfferContainer;
