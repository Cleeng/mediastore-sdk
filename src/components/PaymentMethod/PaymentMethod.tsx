import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from 'assets/images/add.svg';
import MyAccountError from 'components/MyAccountError';
import PaymentCard from 'components/PaymentCard';
import {
  fetchPaymentDetails,
  selectPaymentDetails
} from 'appRedux/paymentDetailsSlice';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'appRedux/popupSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { PaymentDetail } from 'api/Customer/types';
import { WrapStyled, CardsWrapper, Message } from './PaymentMethodStyled';
import PaymentCardSkeleton from '../PaymentCardSkeleton/PaymentCardSkeleton';

const PaymentMethod = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { paymentDetails, error, loading, activeOrBoundPaymentDetails } =
    useAppSelector(selectPaymentDetails);

  const renderPaymentMethodItem = (paymentDetail: PaymentDetail) => {
    const { paymentMethod, id } = paymentDetail;
    switch (paymentMethod) {
      case 'card':
      case 'paypal':
      case 'apple':
      case 'android':
      case 'amazon':
      case 'roku':
      case 'googlepay':
      case 'applepay':
      case 'ideal':
      case 'bancontact_card':
      case 'bancontact_mobile':
      case 'gcash':
        return <PaymentCard key={id} details={paymentDetail} />;
      default:
        return (
          <Message>
            {t(
              'paymentmethod.managed-by-external-service',
              'Managed by external service'
            )}
          </Message>
        );
    }
  };
  const activeItems = activeOrBoundPaymentDetails.find((item) => item.active);

  useEffect(() => {
    if (paymentDetails?.length === 0) {
      dispatch(fetchPaymentDetails());
    }
  }, []);

  if (loading) {
    return (
      <CardsWrapper $numberOfItems={1}>
        <PaymentCardSkeleton />
      </CardsWrapper>
    );
  }

  if (error) {
    return (
      <WrapStyled>
        <MyAccountError generalError />
      </WrapStyled>
    );
  }

  if (!activeItems) {
    return (
      <WrapStyled>
        <CardsWrapper $numberOfItems={1}>
          <MyAccountError
            icon={AddIcon}
            title={t(
              'paymentmethod.no-active-method.title',
              'Add a payment method!'
            )}
            subtitle={t(
              'paymentmethod.no-active-method.subtitle',
              'Set up a new payment method for your account'
            )}
            withBorder
            onClick={() => {
              dispatch(
                updatePaymentDetailsPopup({
                  isOpen: true,
                  isLoading: false,
                  step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE
                })
              );
            }}
            direction='row'
            fullWidth
          />
        </CardsWrapper>
      </WrapStyled>
    );
  }

  return (
    <WrapStyled>
      <CardsWrapper $numberOfItems={activeOrBoundPaymentDetails.length}>
        {activeOrBoundPaymentDetails.map((paymentDetail) =>
          renderPaymentMethodItem(paymentDetail)
        )}
      </CardsWrapper>
    </WrapStyled>
  );
};

export default PaymentMethod;
