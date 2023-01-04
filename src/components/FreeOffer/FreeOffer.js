import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { periodMapper, dateFormat } from 'util/planHelper';
import labeling from 'containers/labeling';
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

const FreeOffer = ({ onPaymentComplete, t }) => {
  const { loading: isLoading, error } = useSelector(state => state.payment);
  const { period, expiresAt, startTime, offerTitle, offerId } = useSelector(
    state => state.offer.offer
  );
  const dispatch = useDispatch();

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
        return `${periodMapper[period].accessText} free pass`;
      }
      case 'E': {
        return `Free event ${startTime ? dateFormat(startTime, true) : ''}`;
      }
      case 'R': {
        return `${periodMapper[period].accessText} free access`;
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

FreeOffer.propTypes = {
  onPaymentComplete: PropTypes.func.isRequired,
  t: PropTypes.func
};

FreeOffer.defaultProps = {
  t: k => k
};

export { FreeOffer as PureFreeOffer };

export default withTranslation()(labeling()(FreeOffer));
