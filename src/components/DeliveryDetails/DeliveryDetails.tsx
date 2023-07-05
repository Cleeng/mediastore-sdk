import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeader from 'components/SectionHeader';
import { ReactComponent as CardIcon } from 'assets/images/paymentMethods/card2.svg';
import { ReactComponent as GiftIcon } from 'assets/images/gift.svg';
import {
  ButtonsContainer,
  DeliveryDetailsStyled,
  StyledButton
} from './DeliveryDetailsStyled';

const DeliveryDetails = () => {
  const [isGift, setIsGift] = useState(false);

  const { t } = useTranslation();

  // const isPurchaseForMyselfDisabled = i have this offer

  useEffect(() => {
    // if I have this offer setIsGift(true)
    // disable purchase for myself
  }, []);

  return (
    <DeliveryDetailsStyled>
      <SectionHeader marginTop="25px" center>
        <>{t('deliverydetails.title', 'Delivery details')}</>
      </SectionHeader>
      <ButtonsContainer>
        <StyledButton
          isActive={!isGift}
          disabled={false}
          onClick={() => setIsGift(false)}
        >
          <CardIcon />
          {/* unify with card1.svg? */}
          Purchase for myself
        </StyledButton>
        <StyledButton isActive={isGift} onClick={() => setIsGift(true)}>
          <GiftIcon />
          Purchase as a gift
        </StyledButton>
      </ButtonsContainer>
    </DeliveryDetailsStyled>
  );
};

export default DeliveryDetails;
