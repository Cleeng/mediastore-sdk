import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { periodMapper, dateFormat, Period } from 'util/planHelper';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { submitPaymentWithoutDetails, selectPayment } from 'redux/paymentSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectOnlyOffer } from 'redux/offerSlice';
import {
  WrapStyled,
  TitleStyled,
  DescriptionStyled,
  SubTextStyled,
  CardStyled,
  SubscriptionIconStyled,
  ButtonWrapperStyled,
  ErrorMessageStyled
} from './FreeOfferStyled';
import { FreeOfferProps } from './FreeOffer.types';

const FreeOffer = ({ onPaymentComplete }: FreeOfferProps) => {
  const { loading: isLoading, error } = useAppSelector(selectPayment);
  const { period, expiresAt, startTime, offerTitle, offerId } = useAppSelector(
    selectOnlyOffer
  );
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const offerType = offerId?.charAt(0);
  const icon = period || offerType;

  const generateDescriptionForFreeOffer = () => {
    switch (offerType) {
      case 'S': {
        return t('free-offer.subscription', 'Free subscription');
      }
      case 'P': {
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

  const getAccessToFreeOffer = useCallback(() => {
    dispatch(submitPaymentWithoutDetails())
      .unwrap()
      .then(onPaymentComplete);
  }, []);

  return (
    <WrapStyled>
      <CardStyled>
        <SubscriptionIconStyled icon={icon} />
        <TitleStyled>{t(`offer-title-${offerId}`, offerTitle)}</TitleStyled>
        <DescriptionStyled>
          {generateDescriptionForFreeOffer()}
        </DescriptionStyled>
        <ButtonWrapperStyled>
          <Button
            theme="confirm"
            width="200px"
            onClickFn={getAccessToFreeOffer}
            disabled={isLoading}
          >
            <>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
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
        </ButtonWrapperStyled>
        <SubTextStyled>
          {t('free-offer.no-cost', 'Free, no additional cost')}
        </SubTextStyled>
      </CardStyled>
    </WrapStyled>
  );
};

export default FreeOffer;
