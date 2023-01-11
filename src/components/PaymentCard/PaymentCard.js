import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import Card from 'components/Card';
import eventDispatcher, {
  MSSDK_EDIT_PAYMENT_BUTTON_CLICKED
} from 'util/eventDispatcher';
import { CardTypes } from './Payment.const';
import {
  CardStyled,
  CardTypeStyled,
  CardNumberStyled,
  CardExpirationStyled,
  CardExpirationLabel,
  CardExpirationDateStyled,
  CardEditStyled,
  CardInfoStyled,
  CardDetailsStyled,
  CardDetailsNameStyled,
  CardDetailsNameWrapStyled,
  CardInfoWrapStyled,
  HolderNameStyled
} from './PaymentCardStyled';

const PaymentCardSkeleton = () => (
  <CardStyled>
    <CardInfoWrapStyled>
      <CardInfoStyled>
        <CardTypeStyled>
          <SkeletonWrapper height={16} width={28} />
        </CardTypeStyled>
        <CardDetailsStyled>
          <CardDetailsNameWrapStyled>
            <CardDetailsNameStyled>
              <SkeletonWrapper width={140} />
            </CardDetailsNameStyled>
          </CardDetailsNameWrapStyled>
          <CardExpirationStyled>
            <SkeletonWrapper width={100} />
          </CardExpirationStyled>
        </CardDetailsStyled>
      </CardInfoStyled>
      <SkeletonWrapper height={43} width={170} />
    </CardInfoWrapStyled>
  </CardStyled>
);

const PaymentCard = ({ isDataLoaded, details, showInnerPopup }) => {
  const { t } = useTranslation();
  const { paymentMethodSpecificParams, paymentMethod } = details;

  const getSpecificPaymentMethod = () => {
    if (paymentMethod === 'card') return paymentMethodSpecificParams.variant;
    return paymentMethod;
  };

  const { icon: LogoComponent, title: methodTitle } = isDataLoaded
    ? CardTypes[getSpecificPaymentMethod()]
    : { icon: null, title: '' };

  return (
    <Card withBorder type={details.paymentMethod}>
      {isDataLoaded ? (
        <CardStyled>
          <CardInfoWrapStyled>
            <CardInfoStyled>
              {LogoComponent && (
                <CardTypeStyled>
                  <LogoComponent />
                </CardTypeStyled>
              )}
              <CardDetailsStyled>
                <CardDetailsNameWrapStyled>
                  <CardDetailsNameStyled>{methodTitle}</CardDetailsNameStyled>
                  {paymentMethodSpecificParams?.lastCardFourDigits && (
                    <CardNumberStyled>
                      (**** {paymentMethodSpecificParams.lastCardFourDigits})
                    </CardNumberStyled>
                  )}
                  {paymentMethod === 'paypal' && (
                    <HolderNameStyled>
                      ({paymentMethodSpecificParams.holderName})
                    </HolderNameStyled>
                  )}
                </CardDetailsNameWrapStyled>
                {paymentMethodSpecificParams?.cardExpirationDate && (
                  <CardExpirationStyled>
                    <CardExpirationLabel>
                      {t('Expiry date')}
                    </CardExpirationLabel>
                    <CardExpirationDateStyled>
                      {paymentMethodSpecificParams.cardExpirationDate}
                    </CardExpirationDateStyled>
                  </CardExpirationStyled>
                )}
              </CardDetailsStyled>
            </CardInfoStyled>
            <CardEditStyled
              onClick={() => {
                showInnerPopup({
                  type: POPUP_TYPES.paymentDetails,
                  data: details
                });
                eventDispatcher(MSSDK_EDIT_PAYMENT_BUTTON_CLICKED, {
                  detail: {
                    paymentMethod
                  }
                });
              }}
            >
              {t('Edit payment info')}
            </CardEditStyled>
          </CardInfoWrapStyled>
        </CardStyled>
      ) : (
        <PaymentCardSkeleton />
      )}
    </Card>
  );
};

PaymentCard.propTypes = {
  showInnerPopup: PropTypes.func,
  details: PropTypes.objectOf(PropTypes.any),
  isDataLoaded: PropTypes.bool
};

PaymentCard.defaultProps = {
  showInnerPopup: () => {},
  details: {},
  isDataLoaded: true
};

export default PaymentCard;
