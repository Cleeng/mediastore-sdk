import { selectOnlyOffer } from 'appRedux/offerSlice';
import {
  selectPayment,
  submitPaymentWithoutDetails
} from 'appRedux/paymentSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import Button from 'components/Button';
import Loader from 'components/Loader';
import useCaptchaVerification from 'hooks/useCaptchaVerification';
import { useCallback, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { dateFormat, type Period, periodMapper } from 'util/planHelper';
import type { FreeOfferProps } from './FreeOffer.types';
import {
  ButtonWrapperStyled,
  CardStyled,
  DescriptionStyled,
  ErrorMessageStyled,
  PublisherDescriptionStyled,
  SubscriptionIconStyled,
  SubTextStyled,
  TitleStyled,
  WrapStyled
} from './FreeOfferStyled';

type GenerateDescriptionForFreeOfferArguments = {
  offerType: string;
  period: string;
  expiresAt: number;
  startTime: number;
  t: (
    translationKey: string,
    fallbackText: string,
    options?: Record<string, string>
  ) => string;
};

const generateDescriptionForFreeOffer = ({
  expiresAt,
  offerType,
  period,
  startTime,
  t
}: GenerateDescriptionForFreeOfferArguments) => {
  switch (offerType) {
    case 'S': {
      return t('free-offer.subscription', 'Free subscription');
    }
    case 'P': {
      const isPassForDays = !period && Number(expiresAt) < 1000;
      if (isPassForDays) {
        return t(`free-offer.duration-pass`, `{{days}}-Day free pass`, {
          days: String(expiresAt)
        });
      }
      if (!period) {
        return t('free-offer.pass', 'Access until {{date}}', {
          date: dateFormat(expiresAt, true)
        });
      }
      return `${t(
        `period.${period}`,
        periodMapper[period as Period].accessText as string
      )} ${t('free-offer.free-pass', 'free pass')}`;
    }
    case 'E': {
      return t('free-offer.event', 'Free event {{date}}', {
        date: startTime ? dateFormat(startTime, true) : ''
      });
    }
    case 'R': {
      return `${t(
        `period.${period}`,
        periodMapper[period as Period].accessText as string
      )} ${t('free-offer.free-access', 'free access')}`;
    }
    case 'A':
      return t('free-offer.unlimited-access', 'Unlimited access');
    default:
      return '';
  }
};

const FreeOffer = ({ onPaymentComplete }: FreeOfferProps) => {
  const { loading: isLoading, error } = useAppSelector(selectPayment);
  const {
    period,
    expiresAt,
    startTime,
    offerTitle,
    offerId,
    offerDescription
  } = useAppSelector(selectOnlyOffer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { getCaptchaToken, recaptchaRef, showCaptchaOnPurchase, sitekey } =
    useCaptchaVerification();
  const [captchaError, setCaptchaError] = useState('');

  const offerType = offerId?.charAt(0);
  const icon = period || offerType;
  const description = generateDescriptionForFreeOffer({
    expiresAt,
    offerType,
    period,
    startTime,
    t
  });

  const getAccessToFreeOffer = useCallback(async () => {
    if (showCaptchaOnPurchase) {
      const { hasCaptchaSucceeded, captchaToken, recaptchaError } =
        await getCaptchaToken();
      if (!hasCaptchaSucceeded) {
        setCaptchaError(recaptchaError);
        return;
      }
      dispatch(submitPaymentWithoutDetails(captchaToken))
        .unwrap()
        .then(onPaymentComplete);
      return;
    }
    dispatch(submitPaymentWithoutDetails()).unwrap().then(onPaymentComplete);
  }, [showCaptchaOnPurchase, getCaptchaToken]);

  return (
    <WrapStyled>
      <CardStyled>
        <SubscriptionIconStyled icon={icon} />
        <TitleStyled>{t(`offer-title-${offerId}`, offerTitle)}</TitleStyled>
        {description && <DescriptionStyled>{description}</DescriptionStyled>}
        {offerDescription && (
          <PublisherDescriptionStyled>
            {t('free-offer.publisher-description', offerDescription)}
          </PublisherDescriptionStyled>
        )}
        <ButtonWrapperStyled>
          <Button
            variant='confirm'
            width='200px'
            onClickFn={getAccessToFreeOffer}
            disabled={isLoading}
          >
            <>
              {isLoading ? (
                <Loader buttonLoader color='#ffffff' />
              ) : (
                t('free-offer.get-access', 'Get Access')
              )}
            </>
          </Button>
          {error && (
            <ErrorMessageStyled>
              {t(error.translationKey, error.message as string)}
            </ErrorMessageStyled>
          )}
          {captchaError && (
            <ErrorMessageStyled>{captchaError}</ErrorMessageStyled>
          )}
        </ButtonWrapperStyled>
        {showCaptchaOnPurchase && (
          <ReCAPTCHA
            ref={recaptchaRef}
            size='invisible'
            badge='bottomright'
            sitekey={sitekey}
          />
        )}
        <SubTextStyled>
          {t('free-offer.no-cost', 'Free, no additional cost')}
        </SubTextStyled>
      </CardStyled>
    </WrapStyled>
  );
};

export default FreeOffer;
