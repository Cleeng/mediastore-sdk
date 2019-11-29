import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Offer from 'components/Offer';
import getOfferDetails from 'api/getOfferDetails';
import createOrder from 'api/createOrder';
import updateOrder from 'api/updateOrder';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import { withTranslation } from 'react-i18next';
import ErrorPage from 'components/ErrorPage';
import Loader from 'components/Loader';
import saveOfferId from '../../util/offerIdHelper';
import StyledLoaderContainer from './StyledOfferContainer';
import labeling from '../labeling';

class OfferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerDetails: null,
      couponProps: null,
      error: '',
      offerId: null,
      orderDetails: {
        priceBreakdown: {
          offerPrice: 0,
          discountedPrice: 0,
          discountAmount: 0
        },
        discount: {
          applied: false
        }
      },
      isOrderCreated: false
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
        createOrder(offerId).then(orderDetailsResponse => {
          if (!orderDetailsResponse.errors.length) {
            this.setState({
              orderDetails: orderDetailsResponse.responseData.order,
              isOrderCreated: true
            });
            localStorage.setItem(
              'CLEENG_ORDER_ID',
              orderDetailsResponse.responseData.order.id
            );
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
    this.setState({
      couponProps: {
        couponLoading: true
      }
    });
    const {
      orderDetails: { id }
    } = this.state;
    const paymentId = localStorage.getItem('CLEENG_PAYMENT_METHOD_ID');
    updateOrder(id, {
      couponCode,
      paymentMethodId: Number(paymentId)
    }).then(result => {
      if (result.errors.length) {
        this.setState({
          couponProps: {
            couponLoading: false,
            showMessage: true,
            message:
              'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
            messageType: MESSAGE_TYPE_FAIL
          }
        });
      } else {
        this.setState({
          orderDetails: result.responseData.order,
          couponProps: {
            couponLoading: false,
            showMessage: true,
            message: 'Your coupon has been applied!',
            messageType: MESSAGE_TYPE_SUCCESS
          }
        });
      }
    });
  };

  render() {
    const {
      error,
      offerDetails,
      couponProps,
      orderDetails,
      isOrderCreated
    } = this.state;
    const { onPaymentComplete, t } = this.props;
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
    return offerDetails && isOrderCreated ? (
      <Offer
        offerDetails={offerDetails}
        orderDetails={orderDetails}
        couponProps={{
          ...couponProps,
          onSubmit: this.onCouponSubmit
        }}
        onPaymentComplete={onPaymentComplete}
        t={t}
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
  }),
  t: PropTypes.func
};
OfferContainer.defaultProps = {
  urlProps: {},
  t: k => k
};

export default withTranslation()(labeling()(OfferContainer));
