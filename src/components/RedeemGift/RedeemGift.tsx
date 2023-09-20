import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { fetchRedeemGift, fetchVerifyGift, selectGift } from 'redux/giftSlice';
import { fetchOffer, selectOffer } from 'redux/offerSlice';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SectionHeader from 'components/SectionHeader';
import MyAccountInput from 'components/MyAccountInput';
import OfferCheckoutCard from 'components/OfferCheckoutCard';
import Loader from 'components/Loader';
import Auth from 'services/auth';
import ThankYouPage from './ThankYouPage';
import {
  InputWrapperStyled,
  OfferWrapperStyled,
  RedeemGiftWrapperStyled,
  WrapperStyled
} from './RedeemGift.styled';

type RedeemGiftProps = {
  onBackClick: () => void;
  onSuccess: (...args: unknown[]) => void;
};

const RedeemGift = ({ onBackClick, onSuccess }: RedeemGiftProps) => {
  const [giftCode, setGiftCode] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const [isGiftRedeemed, setIsGiftRedeemed] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    error,
    isRedeemLoading,
    isVerifyLoading,
    verifiedGift: { redeemable }
  } = useAppSelector(selectGift);

  const { loading: isOfferLoading } = useAppSelector(selectOffer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGiftCode(e.target.value);

  const handleVerifyGift = async () => {
    const { offerId } = await dispatch(fetchVerifyGift(giftCode))
      .unwrap()
      .catch(err => {
        setShowOffer(false);
        throw new Error(err);
      });

    if (offerId) {
      setShowOffer(true);
      await dispatch(fetchOffer(offerId));
    }
  };

  const handleRedeemGift = async () => {
    await dispatch(fetchRedeemGift(giftCode))
      .unwrap()
      .catch(err => {
        throw new Error(err);
      });

    setIsGiftRedeemed(true);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const giftCodeParam = urlParams.get('giftCode');

    if (giftCodeParam) {
      setGiftCode(giftCodeParam);
    }
  }, [window.location.search]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isGiftRedeemed) {
      timer = setTimeout(() => {
        onSuccess();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isGiftRedeemed]);

  const isConfirmButtonDisabled =
    !redeemable || isVerifyLoading || isOfferLoading;

  return (
    <WrapperStyled>
      <Header onBackClick={onBackClick} />
      {Auth.isLogged() && (
        <>
          {isGiftRedeemed ? (
            <ThankYouPage />
          ) : (
            <RedeemGiftWrapperStyled>
              <SectionHeader center paddingBottom="10px">
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
                </Button>
              </InputWrapperStyled>
              {showOffer && (
                <OfferWrapperStyled>
                  <OfferCheckoutCard isRedeemGift />
                </OfferWrapperStyled>
              )}
              <Button
                disabled={isConfirmButtonDisabled}
                theme="confirm"
                onClickFn={handleRedeemGift}
              >
                {isRedeemLoading ? (
                  <Loader buttonLoader color="#ffffff" />
                ) : (
                  t('redeem-gift.button.confirm', 'Confirm & proceed')
                )}
              </Button>
            </RedeemGiftWrapperStyled>
          )}
          <Footer />
        </>
      )}
    </WrapperStyled>
  );
};

export default RedeemGift;
