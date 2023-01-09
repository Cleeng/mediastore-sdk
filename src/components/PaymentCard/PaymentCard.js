import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import Card from 'components/Card';
import { CardTypes } from './Payment.const';
import {
  CardStyled,
  CardTypeStyled,
  CardNumberStyled,
  CardExpirationStyled,
  CardExpirationLabel,
  CardExpirationDateStyled,
  CardEditStyled,
  CardHeaderStyled,
  CardInfoStyled,
  CardDetailsStyled,
  CardDetailsNameStyled,
  CardDetailsNameWrapStyled,
  CardInfoWrapStyled
} from './PaymentCardStyled';

const PaymentCard = ({ isDataLoaded, details, showInnerPopup }) => {
  const { t } = useTranslation();
  const { paymentMethodSpecificParams, paymentMethod } = details;

  let LogoComponent = null;
  let methodTitle = '';
  if (
    paymentMethod === 'card' &&
    CardTypes[paymentMethodSpecificParams.variant]
  ) {
    LogoComponent = CardTypes[paymentMethodSpecificParams.variant]?.icon;
    methodTitle = CardTypes[paymentMethodSpecificParams.variant]?.title;
  } else if (paymentMethod === 'paypal') {
    LogoComponent = CardTypes[paymentMethod]?.icon;
    methodTitle = CardTypes[paymentMethod]?.title;
  } else {
    LogoComponent = CardTypes[details.paymentMethod]?.icon;
    methodTitle = CardTypes[details.paymentMethod]?.title;
  }

  return (
    <Card withBorder type={details.paymentMethod}>
      {isDataLoaded ? (
        <CardStyled>
          <CardHeaderStyled>Payment method</CardHeaderStyled>
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
                window.dispatchEvent(
                  new CustomEvent('MSSDK:edit-payment-button-clicked', {
                    detail: {
                      paymentMethod
                    }
                  })
                );
              }}
            >
              {t('Edit payment info')}
            </CardEditStyled>
          </CardInfoWrapStyled>
        </CardStyled>
      ) : (
        <SkeletonWrapper height={166} />
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
