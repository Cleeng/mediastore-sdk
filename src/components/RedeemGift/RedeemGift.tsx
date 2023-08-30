import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/store';
import { fetchVerifyGift } from 'redux/giftSlice';
import { fetchOffer } from 'redux/offerSlice';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SectionHeader from 'components/SectionHeader';
import MyAccountInput from 'components/MyAccountInput';
import OfferCheckoutCard from 'components/OfferCheckoutCard';
import Loader from 'components/Loader';
import {
  InputWrapperStyled,
  OfferWrapperStyled,
  RedeemGiftWrapperStyled,
  WrapperStyled
} from './RedeemGift.styled';

const RedeemGift = () => {
  const [giftCode, setGiftCode] = useState('');
  const [error, setError] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGiftCode(e.target.value);

  const handleVerify = async () => {
    setIsVerifyLoading(true);
    const response = await dispatch(fetchVerifyGift(giftCode));

    if (response?.error) {
      setIsVerifyLoading(false);

      setError(response.payload as string);
    }

    const {
      payload: { offerId }
    } = response;

    setShowOffer(true);

    setIsVerifyLoading(false);

    dispatch(fetchOffer(offerId));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const giftCodeParam = urlParams.get('giftCode');

    if (giftCodeParam) {
      setGiftCode(giftCodeParam);
    }
  }, [window.location.search]);

  return (
    <WrapperStyled>
      <Header />
      <RedeemGiftWrapperStyled>
        <SectionHeader center paddingBottom="10px">
          {t('redeem-gift.button.header', 'Redeem your gift')}
        </SectionHeader>
        <InputWrapperStyled>
          <MyAccountInput
            // add error in future task
            error={error}
            onChange={handleChange}
            name="giftCode"
            type="text"
            value={giftCode}
            placeholder="XXXX-XXXX"
          />
          <Button disabled={!giftCode} theme="confirm" onClickFn={handleVerify}>
            {isVerifyLoading ? (
              <Loader buttonLoader color="#ffffff" />
            ) : (
              t('redeem-gift.button.verify', 'Verify')
            )}
          </Button>
        </InputWrapperStyled>
        {showOffer && (
          <OfferWrapperStyled>
            <OfferCheckoutCard isRedeemGift />
          </OfferWrapperStyled>
        )}
        <Button disabled theme="confirm" onClickFn={() => null}>
          {t('redeem-gift.button.confirm', 'Confirm & proceed')}
        </Button>
      </RedeemGiftWrapperStyled>
      <Footer />
    </WrapperStyled>
  );
};

export default RedeemGift;
