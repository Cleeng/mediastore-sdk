import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { fetchRedeemGift, fetchVerifyGift, selectGift } from 'redux/giftSlice';
import { fetchOffer } from 'redux/offerSlice';
import { ReactComponent as CheckmarkIcon } from 'assets/images/greenCheckmark.svg';
import { getData } from 'util/appConfigHelper';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';
import SectionHeader from 'components/SectionHeader';
import MyAccountInput from 'components/MyAccountInput';
import OfferCheckoutCard from 'components/OfferCheckoutCard';
import Loader from 'components/Loader';
import {
  HeaderStyled,
  InfoTextStyled,
  InputWrapperStyled,
  OfferWrapperStyled,
  RedeemGiftWrapperStyled,
  ThankYouPageStyled,
  WrapperStyled
} from './RedeemGift.styled';

const RedeemGift = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGiftCode(e.target.value);

  const handleVerifyGift = async () => {
    const resultVerifyGiftAction = await dispatch(fetchVerifyGift(giftCode))
      .unwrap()
      .catch(err => {
        setShowOffer(false);
        throw new Error(err);
      });

    const { offerId } = resultVerifyGiftAction;

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

  return (
    <WrapperStyled>
      <Header />
      {isGiftRedeemed ? (
        <ThankYouPageStyled>
          <CheckmarkIcon />
          <HeaderStyled>
            {t('redeem-gift.thank-you-page.header', 'Thank You!')}
          </HeaderStyled>

          <InfoTextStyled>
            <p>
              {t(
                'redeem-gift.thank-you-page.manage-text1',
                'Your gift have been successfully redeemed.'
              )}
            </p>
            <Trans i18nKey="redeem-gift.thank-you-page.manage-text2">
              We hope you love it. If you need help from us with your account,
              you can always find it
              <LinkStyled
                href={getData('CLEENG_MY_ACCOUNT_URL')}
                target="_blank"
                rel="noopener noreferrer"
              >
                here.
              </LinkStyled>
            </Trans>
          </InfoTextStyled>
        </ThankYouPageStyled>
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
            disabled={!redeemable || isVerifyLoading}
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
    </WrapperStyled>
  );
};

export default RedeemGift;
