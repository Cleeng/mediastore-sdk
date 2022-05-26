import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Offer from 'components/Offer';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import ErrorPage from 'components/ErrorPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import {
  getOfferDetails,
  createOrder,
  updateOrder,
  getPaymentMethods,
  getOrder
} from 'api';
import saveOfferId from 'util/offerIdHelper';
import { setData, getData, removeData } from 'util/appConfigHelper';
import {
  StyledLoaderContainer,
  StyledLoaderContent
} from './StyledOfferContainer';
// import { withTranslation } from 'react-i18next';
// import labeling from '../labeling';

const OfferContainer = ({
  urlProps: { location },
  offerId: propOfferId,
  onSuccess,
  availablePaymentMethods,
  t
}) => {
  const [offerId, setOfferId] = useState(
    propOfferId || getData('CLEENG_OFFER_ID')
  );
  const [isOfferFree, setIsOfferFree] = useState(false);

  const [offerDetails, setOfferDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    priceBreakdown: {
      offerPrice: 0,
      discountedPrice: 0,
      discountAmount: 0
    },
    discount: {
      applied: false
    }
  });

  const [errorMsg, setErrorMsg] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [couponDetails, setCouponDetails] = useState(null);

  const createOrderHandler = () => {
    createOrder(offerId).then(orderDetailsResponse => {
      const { errors } = orderDetailsResponse;
      if (errors.length) {
        setErrorMsg(errors[0]);
        return;
      }
      const {
        responseData: { order }
      } = orderDetailsResponse;
      setOrderDetails(order);
      setData('CLEENG_ORDER_ID', order.id);
    });
  };

  const reuseSavedOrder = id => {
    getOrder(id)
      .then(orderResponse => {
        if (orderResponse.errors.length) {
          removeData('CLEENG_ORDER_ID');
          createOrderHandler();
          return;
        }
        const {
          responseData: { order }
        } = orderResponse;
        if (order.offerId === offerId) {
          setOrderDetails(order);
        } else {
          removeData('CLEENG_ORDER_ID');
          createOrderHandler();
        }
      })
      .catch(() => {
        removeData('CLEENG_ORDER_ID');
        createOrderHandler();
      });
  };

  const paymentMethodsHandler = () => {
    getPaymentMethods().then(paymentMethodResponse => {
      const {
        responseData: { paymentMethods }
      } = paymentMethodResponse;
      const properPaymentMethodId = paymentMethods.find(method =>
        getData('CLEENG_OFFER_TYPE') === 'S'
          ? method.methodName === 'manual'
          : method.methodName !== 'manual'
      );
      updateOrder(orderDetails.id, {
        paymentMethodId: properPaymentMethodId ? properPaymentMethodId.id : 0
      });
    });
  };

  const onCouponSubmit = couponCode => {
    if (couponCode === '') return;
    setCouponDetails(() => ({
      couponLoading: true
    }));
    updateOrder(orderDetails.id, {
      couponCode
    }).then(result => {
      if (result.errors.length) {
        setCouponDetails({
          couponLoading: false,
          showMessage: true,
          message:
            'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
          messageType: MESSAGE_TYPE_FAIL
        });
      } else {
        setOrderDetails(result.responseData.order);
        setCouponDetails({
          couponLoading: false,
          showMessage: true,
          message: 'Your coupon has been applied!',
          messageType: MESSAGE_TYPE_SUCCESS
        });
      }
    });
  };

  useEffect(() => {
    if (location) {
      saveOfferId(location, setOfferId);
    }
    if (offerId && !offerDetails) {
      getOfferDetails(offerId).then(offerDetailsResponse => {
        if (offerDetailsResponse.errors.length) {
          setErrorMsg(offerDetailsResponse.errors[0]);
          return;
        }
        const { responseData } = offerDetailsResponse;
        setOfferDetails(responseData);
        setOfferId(responseData.offerId);
        setData('CLEENG_OFFER_ID', responseData.offerId);
        setData('CLEENG_OFFER_TYPE', responseData.offerId.charAt(0));

        const orderId = getData('CLEENG_ORDER_ID');
        if (orderId) {
          reuseSavedOrder(orderId);
        } else {
          createOrderHandler();
        }
      });
    }
    if (offerId === '') {
      setErrorMsg('Offer not set');
    }
  }, []);

  useEffect(() => {
    if (
      orderDetails &&
      orderDetails.totalPrice === 0 &&
      !orderDetails.discount.applied
    ) {
      setIsOfferFree(true);
    }
    if (orderDetails.id) {
      setIsLoading(false);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (isOfferFree) paymentMethodsHandler();
  }, [isOfferFree]);

  const errorMapping = err => {
    const errorTypes = {
      cannotPurchase: ['Offer is blocked for country'],
      offerNotExist: [
        "doesn't exist",
        'does not exist',
        'Invalid param offerId',
        'Offer not set'
      ],
      alreadyHaveAccess: ['Access already granted'],
      generalError: ['Request failed with status code 500'],
      inactive: ['inactive']
    };
    const types = Object.keys(errorTypes);
    return types.find(type =>
      errorTypes[type].find(item => item.includes(err) || err.includes(item))
    );
  };
  if (errorMsg) {
    return <ErrorPage type={errorMapping(errorMsg)} />;
  }

  return isLoading ? (
    <StyledLoaderContainer>
      <Header />
      <StyledLoaderContent>
        <Loader />
      </StyledLoaderContent>
      <Footer />
    </StyledLoaderContainer>
  ) : (
    <Offer
      offerDetails={offerDetails}
      orderDetails={orderDetails}
      couponProps={{
        ...couponDetails,
        onSubmit: onCouponSubmit
      }}
      onPaymentComplete={onSuccess}
      updatePriceBreakdown={updatedOrder => setOrderDetails(updatedOrder)}
      availablePaymentMethods={availablePaymentMethods}
      t={t}
    />
  );
};

OfferContainer.propTypes = {
  offerId: PropTypes.string,
  onSuccess: PropTypes.func,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  t: PropTypes.func,
  availablePaymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      methodName: PropTypes.string.isRequired,
      paymentGateway: PropTypes.string.isRequired,
      default: PropTypes.bool
    })
  )
};
OfferContainer.defaultProps = {
  offerId: '',
  onSuccess: () => {},
  urlProps: {},
  t: k => k,
  availablePaymentMethods: null
};

// export default withTranslation()(labeling()(OfferContainer));
export default OfferContainer;
