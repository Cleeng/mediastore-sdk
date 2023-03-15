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
        return `Free subscription`;
      }
      case 'P': {
        if (!period) {
          return `Access until ${dateFormat(expiresAt, true)}`;
        }
        return `${periodMapper[period as Period].accessText} free pass`;
      }
      case 'E': {
        return `Free event ${startTime ? dateFormat(startTime, true) : ''}`;
      }
      case 'R': {
        return `${periodMapper[period as Period].accessText} free access`;
      }
      case 'A':
        return 'Unlimited access';
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
            {isLoading ? (
              <Loader buttonLoader color="#ffffff" />
            ) : (
              t('Get Access')
            )}
          </Button>
          {error && <ErrorMessageStyled>{t(error)}</ErrorMessageStyled>}
        </ButtonWrapperStyled>
        <SubTextStyled>{t('Free, no additional cost')}</SubTextStyled>
      </CardStyled>
    </WrapStyled>
  );
};

export default FreeOffer;
