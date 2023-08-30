import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { fetchRedeemGift, fetchVerifyGift, selectGift } from 'redux/giftSlice';
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
  const [showOffer, setShowOffer] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isRedeemLoading, setIsRedeemLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    error,
    verifiedGift: { redeemable }
  } = useAppSelector(selectGift);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGiftCode(e.target.value);

  const handleVerifyGift = async () => {
    setIsVerifyLoading(true);
    try {
      const resultVerifyGiftAction = await dispatch(
        fetchVerifyGift(giftCode)
      ).unwrap();

      const { offerId } = resultVerifyGiftAction;

      if (offerId) {
        setShowOffer(true);
        await dispatch(fetchOffer(offerId));
      }

      setIsVerifyLoading(false);
    } catch (e) {
      setShowOffer(false);
      setIsVerifyLoading(false);
    }
  };

  const handleRedeemGift = async () => {
    setIsRedeemLoading(true);
    try {
      await dispatch(fetchRedeemGift(giftCode));

      setIsRedeemLoading(false);
    } catch (e) {
      setIsRedeemLoading(false);
    }
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
          {/* add translation */}
          {t('redeem-gift.button.header', 'Redeem your gift')}
        </SectionHeader>
        <InputWrapperStyled>
          <MyAccountInput
            error={error}
            onChange={handleChange}
            name="giftCode"
            type="text"
            value={giftCode}
            placeholder="XXXX-XXXX"
          />
          <Button
            disabled={!giftCode}
            theme="confirm"
            onClickFn={handleVerifyGift}
          >
            {isVerifyLoading ? (
              <Loader buttonLoader color="#ffffff" />
            ) : (
              t('redeem-gift.button.verify', 'Verify')
            )}
            {/* add translation */}
          </Button>
        </InputWrapperStyled>
        {showOffer && (
          <OfferWrapperStyled>
            <OfferCheckoutCard isRedeemGift />
          </OfferWrapperStyled>
        )}
        <Button
          disabled={!redeemable || isVerifyLoading}
          theme="confirm"
          onClickFn={handleRedeemGift}
        >
          {isRedeemLoading ? (
            <Loader buttonLoader color="#ffffff" />
          ) : (
            t('redeem-gift.button.confirm', 'Confirm & proceed')
          )}
          {/* add translation */}
        </Button>
      </RedeemGiftWrapperStyled>
      <Footer />
    </WrapperStyled>
  );
};

export default RedeemGift;
