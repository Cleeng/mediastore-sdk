import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [isGift, setIsGift] = useState(false);

  const { t } = useTranslation();

  return (
    <DeliveryDetailsStyled>
      <SectionHeader marginTop="25px" center>
        <>{t('deliverydetails.title', 'Delivery details')}</>
      </SectionHeader>
      <ButtonsContainer>
        <StyledButton isActive={!isGift} onClick={() => setIsGift(false)}>
          <CardIcon /> {/* unify this Icon with card.svg? */}
          Purchase for myself
        </StyledButton>
        <StyledButton isActive={isGift} onClick={() => setIsGift(true)}>
          <GiftIcon />
          Purchase as a gift
        </StyledButton>
      </ButtonsContainer>
      <>{isGift && <RecipientForm />}</>
    </DeliveryDetailsStyled>
  );
};

export default DeliveryDetails;
