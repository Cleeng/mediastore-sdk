import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getOfferDetails from 'api/getOfferDetails';
import Offer from 'components/Offer';
import applyCoupon from 'api/applyCoupon';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import ErrorPage from 'components/ErrorPage';
import Loader from 'components/Loader';
import saveOfferId from '../../util/offerIdHelper';
import StyledLoaderContainer from './StyledOfferContainer';

class OfferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerDetails: null,
      couponProps: null,
      error: '',
      offerId: null
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    saveOfferId(urlProps.location, this.setOfferId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { offerId } = this.state;
    if (offerId !== prevState.offerId) {
      if (offerId) {
        getOfferDetails(offerId).then(offerDetailsResponse => {
          if (offerDetailsResponse.errors.length) {
            this.setState({ error: offerDetailsResponse.errors[0] });
          } else {
            this.setState({ offerDetails: offerDetailsResponse.responseData });
          }
        });
      } else if (offerId === '') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ error: 'Offer not set' });
      }
    }
  }

  setOfferId = value => this.setState({ offerId: value });

  onCouponSubmit = couponCode => {
    const { offerDetails } = this.state;
    applyCoupon(couponCode)
      .then(result => {
        this.setState({ ...offerDetails, ...result });
        this.setCouponProps({
          showMessage: true,
          message: 'Your coupon has been applied!',
          messageType: MESSAGE_TYPE_SUCCESS
        });
      })
      .catch(() => {
        this.setCouponProps({
          showMessage: true,
          message:
            'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
          messageType: MESSAGE_TYPE_FAIL
        });
      });
  };

  render() {
    const { error, offerDetails, couponProps } = this.state;
    const { onPaymentComplete } = this.props;
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
    return offerDetails ? (
      <Offer
        offerDetails={offerDetails}
        couponProps={{
          ...couponProps,
          onSubmit: this.onCouponSubmit
        }}
        onPaymentComplete={onPaymentComplete}
      />
    ) : (
      <StyledLoaderContainer>
        <Loader />
      </StyledLoaderContainer>
    );
  }
}

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
