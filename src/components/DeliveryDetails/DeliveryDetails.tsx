import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectDeliveryDetails, setIsGift } from 'redux/deliveryDetailsSlice';
import { ReactComponent as GiftIcon } from 'assets/images/gift.svg';
import { ReactComponent as CardIcon } from 'assets/images/paymentMethods/card2.svg';
import SectionHeader from 'components/SectionHeader';
import RecipientForm from './RecipientForm';
import {
  ButtonsContainer,
  DeliveryDetailsStyled,
  StyledButton
} from './DeliveryDetailsStyled';

const DeliveryDetails = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { isGift } = useAppSelector(selectDeliveryDetails);

  return (
    <DeliveryDetailsStyled>
      <SectionHeader marginTop="25px" center>
        <>{t('deliverydetails.title', 'Delivery details')}</>
      </SectionHeader>
      <ButtonsContainer>
        <StyledButton
          isActive={!isGift}
          onClick={() => dispatch(setIsGift(false))}
        >
          <CardIcon /> {/* unify this Icon with card.svg? */}
          Purchase for myself
        </StyledButton>
        <StyledButton
          isActive={isGift}
          onClick={() => dispatch(setIsGift(true))}
        >
          <GiftIcon />
          Purchase as a gift
        </StyledButton>
      </ButtonsContainer>
      <>{isGift && <RecipientForm />}</>
    </DeliveryDetailsStyled>
  );
};

export default DeliveryDetails;
