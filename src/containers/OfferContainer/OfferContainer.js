import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Offer from 'components/Offer';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
// import { withTranslation } from 'react-i18next';
import ErrorPage from 'components/ErrorPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import {
  getOfferDetails,
  createOrder,
  updateOrder,
  getPaymentMethods
} from 'api';
import saveOfferId from 'util/offerIdHelper';
import { setData, getData } from 'util/appConfigHelper';
import {
  StyledLoaderContainer,
  StyledLoaderContent
} from './StyledOfferContainer';
// import labeling from '../labeling';

class OfferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerDetails: null,
      couponProps: null,
      error: '',
      offerId: null,
      isFreeOffer: false,
      isFreeOrderReady: false,
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
    const { urlProps, offerId } = this.props;
    if (urlProps.location) {
      saveOfferId(urlProps.location, this.setOfferId);
    } else if (offerId) {
      this.setOfferId(offerId);
    } else {
      this.setOfferId(getData('CLEENG_OFFER_ID'));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { offerId } = this.state;
    if (offerId !== prevState.offerId) {
      if (offerId) {
        getOfferDetails(offerId).then(offerDetailsResponse => {
          if (offerDetailsResponse.errors.length) {
            this.setState({ error: offerDetailsResponse.errors[0] });
          } else {
            this.setState({
              offerId: offerDetailsResponse.offerId,
              offerDetails: offerDetailsResponse.responseData
            });
            if (
              offerDetailsResponse &&
              offerDetailsResponse.responseData &&
              offerDetailsResponse.responseData.offerId
            )
              createOrder(offerDetailsResponse.responseData.offerId).then(
                orderDetailsResponse => {
                  const { errors } = orderDetailsResponse;
                  if (errors.length) {
                    this.setState({ error: errors[0] });
                    return;
                  }
                  const {
                    responseData: { order }
                  } = orderDetailsResponse;
                  const isFreeOffer =
                    order.totalPrice === 0 && !order.discount.applied;
                  this.setState({
                    orderDetails: order,
                    isOrderCreated: true,
                    isFreeOffer
                  });
                  setData('CLEENG_ORDER_ID', order.id);

                  if (isFreeOffer) {
                    getPaymentMethods().then(paymentMethodResponse => {
                      const {
                        responseData: { paymentMethods }
                      } = paymentMethodResponse;
                      const properPaymentMethodId = paymentMethods.find(
                        method =>
                          getData('CLEENG_OFFER_TYPE') === 'S'
                            ? method.methodName === 'manual'
                            : method.methodName !== 'manual'
                      );
                      updateOrder(order.id, {
                        paymentMethodId: properPaymentMethodId
                          ? properPaymentMethodId.id
                          : 0
                      }).then(() => {
                        this.setState({
                          isFreeOrderReady: true
                        });
                      });
                    });
                  }
                }
              );
          }
        });
      } else if (offerId === '') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ error: 'Offer not set' });
      }
    }
  }

  updatePriceBreakdown = updatedOrder => {
    this.setState({
      orderDetails: updatedOrder
    });
  };

  setOfferId = value => this.setState({ offerId: value });

  onCouponSubmit = couponCode => {
    if (couponCode === '') {
      return;
    }
    this.setState({
      couponProps: {
        couponLoading: true
      }
    });
    const {
      orderDetails: { id }
    } = this.state;
    updateOrder(id, {
      couponCode
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
      isOrderCreated,
      isFreeOffer,
      isFreeOrderReady
    } = this.state;
    const { onSuccess, t } = this.props;
    if (error) {
      if (error.includes('Offer is blocked for country')) {
        return <ErrorPage type="cannotPurchase" />;
      }
      if (
        error.includes(`doesn't exist.`) ||
        error.includes('does not exist.') ||
        error.includes('Invalid param offerId') ||
        error.includes('Offer not set')
      ) {
        return <ErrorPage type="offerNotExist" />;
      }
      if (error.includes('Access already granted')) {
        return <ErrorPage type="alreadyHaveAccess" />;
      }
      if (error.includes('Request failed with status code 500')) {
        return <ErrorPage type="generalError" />;
      }
    }
    return offerDetails &&
      isOrderCreated &&
      (isFreeOffer ? isFreeOrderReady : true) ? (
      <Offer
        offerDetails={offerDetails}
        orderDetails={orderDetails}
        couponProps={{
          ...couponProps,
          onSubmit: this.onCouponSubmit
        }}
        onPaymentComplete={onSuccess}
        updatePriceBreakdown={this.updatePriceBreakdown}
        t={t}
      />
    ) : (
      <StyledLoaderContainer>
        <Header />
        <StyledLoaderContent>
          <Loader />
        </StyledLoaderContent>
        <Footer />
      </StyledLoaderContainer>
    );
  }
}

OfferContainer.propTypes = {
  offerId: PropTypes.string,
  onSuccess: PropTypes.func,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  t: PropTypes.func
};
OfferContainer.defaultProps = {
  offerId: '',
  onSuccess: () => {},
  urlProps: {},
  t: k => k
};

export { OfferContainer as PureOfferContainer };

// export default withTranslation()(labeling()(OfferContainer));
export default OfferContainer;
