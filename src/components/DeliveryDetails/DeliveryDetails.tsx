import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  resetDeliveryDetailsState,
  selectDeliveryDetails,
  setIsGift
} from 'redux/deliveryDetailsSlice';
import { selectOffer } from 'redux/offerSlice';
import { ReactComponent as GiftIcon } from 'assets/images/gift.svg';
import { ReactComponent as CardIcon } from 'assets/images/paymentMethods/card2.svg';
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

  const {
    offer: { accessGranted }
  } = useAppSelector(selectOffer);

  useEffect(() => {
    if (accessGranted) {
      dispatch(setIsGift(true));
    }

    return () => {
      dispatch(resetDeliveryDetailsState());
    };
  }, [accessGranted]);

  return (
    <>
      <DeliveryDetailsStyled>
        <SectionHeader marginTop="25px" center>
          <>{t('deliverydetails.title', 'Delivery details')}</>
        </SectionHeader>
        <ButtonsContainer>
          <StyledButton
            isActive={!isGift}
            onClick={() => dispatch(setIsGift(false))}
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
            isActive={isGift}
            onClick={() => dispatch(setIsGift(true))}
            disabled={!giftable}
          >
            <GiftIcon />
            {t('deliverydetails.button.purchase-as-gift', 'Purchase as a gift')}
          </StyledButton>
        </ButtonsContainer>
        <>{isGift && <RecipientForm />}</>
      </DeliveryDetailsStyled>
    </>
  );
};

export default DeliveryDetails;
