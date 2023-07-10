import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Offer from 'components/Offer';
import ErrorPage from 'components/ErrorPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import { updateOrder, getPaymentMethods } from 'api';
import { setData, getData, removeData } from 'util/appConfigHelper';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchOffer, setFreeOffer, selectOffer } from 'redux/offerSlice';
import {
  init as initValues,
  selectPublisherConfig
} from 'redux/publisherConfigSlice';
import {
  fetchCreateOrder,
  fetchGetOrder,
  fetchUpdateCoupon,
  selectOrder
} from 'redux/orderSlice';
import eventDispatcher, {
  MSSDK_COUPON_FAILED,
  MSSDK_COUPON_SUCCESSFUL,
  MSSDK_PURCHASE_LOADED
} from 'util/eventDispatcher';
import withPaymentFinalizationHandler from 'containers/withPaymentFinalizationHandler';
import { Errors } from 'components/ErrorPage/ErrorPage.types';
import {
  StyledLoaderContainer,
  StyledLoaderContent
} from './StyledOfferContainer';
import { OfferContainerProps } from './OfferContainer.types';

const OfferContainer = ({
  adyenConfiguration: adyenConfigurationProp,
  couponCode: couponCodeProp,
  offerId: offerIdProp,
  onSuccess
}: OfferContainerProps) => {
  const [errorMsg, setErrorMsg] = useState<string>();

  const dispatch = useAppDispatch();
  const {
    offerId: offerIdStore,
    adyenConfiguration: adyenConfigurationStore
  } = useAppSelector(selectPublisherConfig);
  const { order, loading: isOrderLoading, error: orderError } = useAppSelector(
    selectOrder
  );
  const { error: offerError } = useAppSelector(selectOffer);

  const offerId = offerIdProp || offerIdStore;
  const adyenConfiguration = adyenConfigurationProp || adyenConfigurationStore;

  const freeOfferPaymentMethodHandler = (orderId: number) => {
    getPaymentMethods().then(paymentMethodResponse => {
      const {
        responseData: { paymentMethods }
      } = paymentMethodResponse;
      const properPaymentMethodId = paymentMethods.find(method =>
        getData('CLEENG_OFFER_TYPE') === 'S'
          ? method.methodName === 'manual'
          : method.methodName !== 'manual'
      );
      if (properPaymentMethodId) {
        updateOrder(orderId, {
          paymentMethodId: properPaymentMethodId.id
        });
      }
    });
  };

  const createOrderHandler = async (longOfferId: string) => {
    const resultOrderAction = await dispatch(fetchCreateOrder(longOfferId));
    const {
      id,
      totalPrice,
      discount: { applied }
    } = unwrapResult(resultOrderAction);
    if (totalPrice === 0 && !applied) {
      freeOfferPaymentMethodHandler(id);
      dispatch(setFreeOffer(true));
    }
    setData('CLEENG_ORDER_ID', id);
  };

  const reuseSavedOrder = (id: string, longOfferId: string) => {
    dispatch(fetchGetOrder(id))
      .unwrap()
      .then(orderResponse => {
        const { customerId } = jwtDecode<{ customerId: number }>(
          getData('CLEENG_AUTH_TOKEN')
        );
        if (
          !(
            orderResponse.offerId === longOfferId &&
            orderResponse.customerId === customerId
          )
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

  const onCouponSubmit = (couponCode: string) => {
    if (couponCode === '') return;

    dispatch(
      fetchUpdateCoupon({
        id: order.id,
        couponCode
      })
    )
      .unwrap()
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
    dispatch(
      initValues({
        offerId,
        adyenConfiguration
      })
    );
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
        await createOrderHandler(id);
      }
    };
    init();

    if (offerId === '' && !getData('CLEENG_OFFER_ID')) {
      setErrorMsg('Offer not set');
    }
  }, [offerIdProp]);

  useEffect(() => {
    if (!isOrderLoading || errorMsg || offerError || orderError) {
      eventDispatcher(MSSDK_PURCHASE_LOADED);
    }
  }, [isOrderLoading, errorMsg, offerError, offerError]);

  useEffect(() => {
    if (couponCodeProp && order.id !== 0) {
      onCouponSubmit(couponCodeProp);
    }
  }, [couponCodeProp, order.id]);

  const errorMapping = (err: string | undefined | null) => {
    const errorTypes: Record<Errors, string[]> = {
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
    const types = Object.keys(errorTypes) as Errors[];
    if (!err) return undefined;
    return types.find(type =>
      errorTypes[type].find(item => item.includes(err) || err.includes(item))
    );
  };
  if (errorMsg || offerError || orderError) {
    return (
      <ErrorPage type={errorMapping(errorMsg || offerError || orderError)} />
    );
  }

  if (isOrderLoading) {
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
    <Offer onCouponSubmit={onCouponSubmit} onPaymentComplete={onSuccess} />
  );
};

export default withPaymentFinalizationHandler(OfferContainer);
