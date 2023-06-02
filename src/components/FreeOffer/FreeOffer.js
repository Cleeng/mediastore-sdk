import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { periodMapper, dateFormat } from 'util/planHelper';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { submitPaymentWithoutDetails } from 'redux/paymentSlice';
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

const FreeOffer = ({ onPaymentComplete }) => {
  const { loading: isLoading, error } = useSelector(state => state.payment);
  const { period, expiresAt, startTime, offerTitle, offerId } = useSelector(
    state => state.offer.offer
  );
  const dispatch = useDispatch();

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
        // how to translate it?
        return `${periodMapper[period].accessText} free pass`;
      }
      case 'E': {
        return t('free-offer.event', 'Free event {{date}}', {
          date: startTime ? dateFormat(startTime, true) : ''
        });
      }
      case 'R': {
        // how to translate it?
        return `${periodMapper[period].accessText} free access`;
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
            {isLoading ? (
              <Loader buttonLoader color="#ffffff" />
            ) : (
              t('free-offer.get-access', 'Get Access')
            )}
          </Button>
          {error && <ErrorMessageStyled>{t(error)}</ErrorMessageStyled>}
        </ButtonWrapperStyled>
        <SubTextStyled>
          {t('free-offer.no-cost', 'Free, no additional cost')}
        </SubTextStyled>
      </CardStyled>
    </WrapStyled>
  );
};

FreeOffer.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired
};

export { FreeOffer as PureFreeOffer };

export default FreeOffer;
