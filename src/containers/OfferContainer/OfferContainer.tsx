import { useEffect, useState } from 'react';
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
import {
  fetchOffer,
  fetchOfferV2,
  setFreeOffer,
  selectOffer
} from 'redux/offerSlice';
import {
  init as initValues,
  selectPublisherConfig
} from 'redux/publisherConfigSlice';
import {
  fetchCreateOrder,
  fetchGetOrder,
  fetchUpdateCoupon,
  clearOrder,
  selectOrder,
  setOrderCouponMessage,
  fetchUpdateOrder
} from 'redux/orderSlice';
import { Order } from 'redux/types';
import eventDispatcher, {
  MSSDK_COUPON_FAILED,
  MSSDK_COUPON_SUCCESSFUL,
  MSSDK_GOOD_NEWS,
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
  isCheckout = false,
  offerId: offerIdProp,
  onSuccess,
  onRedeemClick,
  hideRedeemButton
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

      const freeOfferPaymentMethod = paymentMethods.find(
        method => method.paymentGateway === 'free-offer'
      );
      if (freeOfferPaymentMethod) {
        updateOrder(orderId, {
          paymentMethodId: freeOfferPaymentMethod.id
        });
      }
    });
  };

  const createOrderHandler = async (
    longOfferId: string,
    accessGranted?: boolean,
    giftable?: boolean
  ) => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseAsGiftParam = urlParams.get('purchaseAsGift');

    let resultOrderAction;

    if (giftable && (accessGranted || purchaseAsGiftParam === 'true')) {
      resultOrderAction = await dispatch(
        fetchCreateOrder({ offerId: longOfferId, buyAsAGift: true })
      );
    } else {
      resultOrderAction = await dispatch(
        fetchCreateOrder({ offerId: longOfferId, buyAsAGift: false })
      );
    }

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

  const reuseSavedOrder = async (id: string, longOfferId: string) => {
    await dispatch(fetchGetOrder(id))
      .unwrap()
      .then(orderResponse => {
        checkIfCouponPaymentGatewayExists(orderResponse);

        const { customerId } = jwtDecode<{ customerId: number }>(
          getData('CLEENG_AUTH_TOKEN')
        );
        if (
          !(
            orderResponse.offerId === longOfferId &&
            orderResponse.customerId === customerId
          ) ||
          !orderResponse?.paymentMethodId
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

  const checkIfCouponPaymentGatewayExists = (orderObj: Order) => {
    const {
      id,
      totalPrice,
      requiredPaymentDetails,
      discount: { applied }
    } = orderObj;

    if (applied && totalPrice === 0 && !requiredPaymentDetails) {
      getPaymentMethods().then(paymentMethodResponse => {
        const {
          responseData: { paymentMethods }
        } = paymentMethodResponse;

        const freeOfferPaymentMethod = paymentMethods.find(
          method => method.paymentGateway === 'coupon'
        );

        if (!freeOfferPaymentMethod?.id) {
          setErrorMsg('No payment method found');
          return;
        }

        dispatch(
          fetchUpdateOrder({
            id,
            payload: {
              paymentMethodId: freeOfferPaymentMethod?.id
            }
          })
        );
      });
    }
  };

  const onCouponSubmit = (couponCode: string) => {
    if (!couponCode) {
      dispatch(
        setOrderCouponMessage({
          messageType: 'fail',
          translationKey: 'coupon-input.error',
          showMessage: true,
          message: 'Please provide a valid coupon code.'
        })
      );

      return;
    }

    dispatch(
      fetchUpdateCoupon({
        id: order.id,
        couponCode
      })
    )
      .unwrap()
      .then(orderResponse => {
        checkIfCouponPaymentGatewayExists(orderResponse);

        eventDispatcher(MSSDK_COUPON_SUCCESSFUL, {
          detail: {
            coupon: couponCode,
            source: 'checkout'
          },
          order
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
    return () => {
      dispatch(clearOrder());
    };
  }, []);

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
      const resultOfferV2Action = await dispatch(
        fetchOfferV2(offerId.split('_')[0])
      );

      const { accessGranted, offerId: id } = unwrapResult(resultOfferAction);
      const { giftable } = unwrapResult(resultOfferV2Action);

      setData('CLEENG_OFFER_ID', id);
      setData('CLEENG_OFFER_TYPE', id.charAt(0));
      const orderId = getData('CLEENG_ORDER_ID');

      if (orderId) {
        await reuseSavedOrder(orderId, id);
      } else {
        await createOrderHandler(id, accessGranted as boolean, giftable);
      }
    };
    init();

    if (offerId === '' && !getData('CLEENG_OFFER_ID')) {
      setErrorMsg('Offer not set');
    }
  }, [offerIdProp]);

  useEffect(() => {
    if (!isOrderLoading || errorMsg || offerError || orderError) {
      eventDispatcher(MSSDK_PURCHASE_LOADED, {
        order
      });
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
      inactive: ['inactive'],
      isNotAuth: [''],
      paymentMethodNotFound: ['No payment method found']
    };
    const types = Object.keys(errorTypes) as Errors[];
    if (!err) return undefined;

    return types.find(type =>
      errorTypes[type].find(item => item.includes(err) || err.includes(item))
    );
  };

  if (errorMsg || offerError || orderError) {
    const type = errorMapping(errorMsg || offerError || orderError);
    if (type === 'alreadyHaveAccess') {
      eventDispatcher(MSSDK_GOOD_NEWS);
    }
    return <ErrorPage type={type} />;
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
    <Offer
      hideRedeemButton={hideRedeemButton}
      isCheckout={isCheckout}
      onCouponSubmit={onCouponSubmit}
      onPaymentComplete={onSuccess}
      onRedeemClick={onRedeemClick}
    />
  );
};

export default withPaymentFinalizationHandler(OfferContainer);
