import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getOfferDetails from 'api/getOfferDetails';
import Offer from 'components/Offer';
import applyCoupon from 'api/applyCoupon';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import ErrorPage from 'components/ErrorPage';
import saveOfferId from '../util/offerIdHelper';

const OfferContainer = ({ onPaymentComplete, urlProps }) => {
  const [offerDetails, setOfferDetails] = useState(null);
  const [couponProps, setCouponProps] = useState(null);
  const [error, setError] = useState(null);
  const [offerId, setOfferId] = useState(null);

  useEffect(() => {
    if (offerId) {
      getOfferDetails(offerId).then(offerDetailsResponse => {
        if (offerDetailsResponse.errors.length) {
          setError(offerDetailsResponse.errors[0]);
        } else {
          setOfferDetails(offerDetailsResponse.responseData);
        }
      });
    } else if (offerId === '') {
      setError('Offer not set');
    }
  }, [offerId]);

  useEffect(() => {
    saveOfferId(urlProps.location, setOfferId);
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
    if (error.includes('Offer is blocked for country')) {
      return <ErrorPage type="cannotPurchase" />;
    }
    if (
      error.includes('does not exist.') ||
      error.includes('Invalid param offerId') ||
      error.includes('Offer not set')
    ) {
      return <ErrorPage type="offerNotExist" />;
    }
    if (error.includes('Access already granted')) {
      return <ErrorPage type="alreadyHaveAccess" />;
    }
    return <Redirect to="/login" />;
  }

  return (
    offerDetails && (
      <Offer
        offerDetails={offerDetails}
        couponProps={{
          ...couponProps,
          onSubmit: onCouponSubmit
        }}
        onPaymentComplete={onPaymentComplete}
      />
    )
  );
};

OfferContainer.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  })
};
OfferContainer.defaultProps = {
  urlProps: {}
};

export default OfferContainer;
