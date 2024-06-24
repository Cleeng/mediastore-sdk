import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import {
  resetDeliveryDetailsState,
  selectDeliveryDetails,
  setIsGift
} from 'appRedux/deliveryDetailsSlice';
import { selectOffer } from 'appRedux/offerSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'appRedux/orderSlice';
import GiftIcon from 'assets/images/gift.svg';
import CardIcon from 'assets/images/paymentMethods/card2.svg';
import SectionHeader from 'components/SectionHeader';
import RecipientForm from './RecipientForm';
import {
  ButtonsContainer,
  DeliveryDetailsStyled,
  StyledButton
} from './DeliveryDetailsStyled';

type DeliveryDetailsProps = {
  giftable: boolean;
};

const DeliveryDetails = ({ giftable }: DeliveryDetailsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isGift } = useAppSelector(selectDeliveryDetails);
  const { id: orderId } = useAppSelector(selectOnlyOrder);

  const handleSetIsGift = () => {
    dispatch(setIsGift(true));

    dispatch(
      fetchUpdateOrder({
        id: orderId,
        payload: {
          buyAsAGift: true
        }
      })
    )
      .unwrap()
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleSetIsNotGift = () => {
    dispatch(setIsGift(false));

    dispatch(
      fetchUpdateOrder({
        id: orderId,
        payload: {
          buyAsAGift: false
        }
      })
    )
      .unwrap()
      .catch((err) => {
        throw new Error(err);
      });
  };

  const {
    offer: { accessGranted }
  } = useAppSelector(selectOffer);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseAsGiftParam = urlParams.get('purchaseAsGift');

    if (accessGranted || purchaseAsGiftParam === 'true') {
      dispatch(setIsGift(true));
    } else {
      handleSetIsNotGift();
    }

    return () => {
      dispatch(resetDeliveryDetailsState());
    };
  }, [accessGranted, window.location.search]);

  return (
    <DeliveryDetailsStyled>
      <SectionHeader marginTop='25px' center>
        <>{t('deliverydetails.title', 'Delivery details')}</>
      </SectionHeader>
      <ButtonsContainer>
        <StyledButton
          $isActive={!isGift}
          onClick={handleSetIsNotGift}
          disabled={accessGranted}
        >
          <CardIcon />
          <>
            {t(
              'deliverydetails.button.purchase-for-myself',
              'Purchase for myself'
            )}
          </>
        </StyledButton>
        <StyledButton
          $isActive={isGift}
          onClick={handleSetIsGift}
          disabled={!giftable}
        >
          <GiftIcon />
          {t('deliverydetails.button.purchase-as-gift', 'Purchase as a gift')}
        </StyledButton>
      </ButtonsContainer>
      <>{isGift && <RecipientForm />}</>
    </DeliveryDetailsStyled>
  );
};

export default DeliveryDetails;
