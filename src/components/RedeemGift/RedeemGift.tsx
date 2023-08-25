import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SectionHeader from 'components/SectionHeader';
import MyAccountInput from 'components/MyAccountInput';
import {
  InputWrapperStyled,
  RedeemGiftWrapperStyled,
  WrapperStyled
} from './RedeemGift.styled';

const RedeemGift = () => {
  const { t } = useTranslation();

  const [giftCode, setGiftCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGiftCode(e.target.value);

  return (
    <WrapperStyled>
      <Header />
      <RedeemGiftWrapperStyled>
        <SectionHeader center paddingBottom="10px">
          {t('redeem-gift.button.header', 'Redeem your gift')}
        </SectionHeader>
        <InputWrapperStyled>
          <MyAccountInput
            // error={t(
            //   confirmRecipientEmail.translationKey,
            //   confirmRecipientEmail.error
            // )}
            onChange={handleChange}
            name="giftCode"
            type="text"
            value={giftCode}
            placeholder="XXXX-XXXX"
          />
          <Button disabled={!giftCode} theme="confirm" onClickFn={() => null}>
            {t('redeem-gift.button.verify', 'Verify')}
          </Button>
        </InputWrapperStyled>
        <Button disabled theme="confirm" onClickFn={() => null}>
          {t('redeem-gift.button.confirm', 'Confirm & proceed')}
        </Button>
      </RedeemGiftWrapperStyled>
      <Footer />
    </WrapperStyled>
  );
};

export default RedeemGift;
