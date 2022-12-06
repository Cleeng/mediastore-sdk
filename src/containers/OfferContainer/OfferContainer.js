import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import Offer from 'components/Offer';
import ErrorPage from 'components/ErrorPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import { updateOrder, getPaymentMethods } from 'api';
import { setData, getData, removeData } from 'util/appConfigHelper';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import labeling from '../labeling';
import {
  StyledLoaderContainer,
  StyledLoaderContent
} from './StyledOfferContainer';
import { fetchOffer, setFreeOffer } from '../../redux/offerSlice';
import {
  fetchCreateOrder,
  fetchGetOrder,
  fetchUpdateOrder
} from '../../redux/orderSlice';
import eventDispatcher, {
  MSSDK_COUPON_FAILED,
  MSSDK_COUPON_SUCCESSFUL, MSSDK_PURCHASE_LOADED
} from '../../util/eventDispatcher';

const OfferContainer = ({ onSuccess, t }) => {
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

  const dispatch = useDispatch();
  const { availablePaymentMethods, offerId } = useSelector(
    state => state.checkout
  );
  const { order, loading: isOrderLoading } = useSelector(state => state.order);
  const { offer, loading: isOfferLoading, isOfferFree } = useSelector(state => state.offer);

  const createOrderHandler = async longOfferId => {
    const resultOrderAction = await dispatch(fetchCreateOrder(longOfferId));
    const {
      id,
      totalPrice,
      discount: { applied }
    } = unwrapResult(resultOrderAction);
    if (totalPrice === 0 && !applied) {
      dispatch(setFreeOffer(true));
    }
    setData('CLEENG_ORDER_ID', id);
  };

  const reuseSavedOrder = (id, longOfferId) => {
    dispatch(fetchGetOrder(id))
      .then(() => {
        const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));
        if (
          !(order.offerId === longOfferId && order.customerId === customerId)
        ) {
          removeData('CLEENG_ORDER_ID');
          createOrderHandler(longOfferId);
        }
      })
      .catch(() => {
        removeData('CLEENG_ORDER_ID');
        createOrderHandler(longOfferId);
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
    dispatch(
      fetchUpdateOrder({
        id: order.id,
        couponCode
      })
    )
      .then(() => {
        eventDispatcher(MSSDK_COUPON_SUCCESSFUL, {
          detail: {
            coupon: couponCode,
            source: 'checkout'
          }
        });
      })
      .catch(() => {
        eventDispatcher(MSSDK_COUPON_FAILED, {
          detail: {
            coupon: couponCode,
            source: 'checkout'
          }
        });
      });
  };

  useEffect(() => {
    if (!offerId) {
      setErrorMsg('Offer not set');
      return;
    }

    const init = async () => {
      const resultOfferAction = await dispatch(fetchOffer(offerId));
      const { offerId: id } = unwrapResult(resultOfferAction);
      setData('CLEENG_OFFER_ID', id);
      setData('CLEENG_OFFER_TYPE', id.charAt(0));
      const orderId = getData('CLEENG_ORDER_ID');
      if (orderId) {
        reuseSavedOrder(orderId, id);
      } else {
        createOrderHandler(id);
      }
    };
    init();

    if (offerId === '' && !getData('CLEENG_OFFER_ID')) {
      setErrorMsg('Offer not set');
    }
  }, []);

  useEffect(() => {
    if (order.id) {
      setIsLoading(false);
    }
  }, [order]);

  useEffect(() => {
    if (isOfferFree) paymentMethodsHandler();
  }, [isOfferFree]);

  useEffect(() => {
    if (!isLoading || errorMsg) {
      eventDispatcher(MSSDK_PURCHASE_LOADED);
    }
  }, [isLoading, errorMsg]);

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

  if (isLoading || isOfferLoading || isOrderLoading) {
    return (
      <StyledLoaderContainer>
        <Header />
        <StyledLoaderContent>
          <Loader />
        </StyledLoaderContent>
        <Footer />
      </StyledLoaderContainer>
    );
  }

  return (
    <Offer
      offerDetails={offer}
      orderDetails={order}
      couponProps={{
        ...order.couponDetails,
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
  onSuccess: PropTypes.func,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  t: PropTypes.func
};
OfferContainer.defaultProps = {
  onSuccess: () => {},
  urlProps: {},
  t: k => k
};

export default withTranslation()(labeling()(OfferContainer));
// export default OfferContainer;
