import React from 'react';
import PropTypes from 'prop-types';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { CardTypesIcons } from './Payment.const';
import {
  CardStyled,
  CardWrapStyled,
  CardTypeStyled,
  CardNumberStyled,
  CardExpirationStyled,
  CardExpirationLabel,
  CardExpirationDateStyled,
  CardEditStyled
} from './PaymentCardStyled';

const PaymentCard = ({
  isDataLoaded,
  activePaymentMethod,
  showInnerPopup,
  t
}) => {
  const { paymentMethodSpecificParams } = activePaymentMethod;
  const LogoComponent =
    paymentMethodSpecificParams &&
    CardTypesIcons[paymentMethodSpecificParams.variant]
      ? CardTypesIcons[paymentMethodSpecificParams.variant]
      : CardTypesIcons[activePaymentMethod.paymentMethod] || null;

  return (
    <CardWrapStyled type={activePaymentMethod.paymentMethod}>
      {isDataLoaded ? (
        <CardStyled>
          {LogoComponent && (
            <CardTypeStyled>
              <LogoComponent />
            </CardTypeStyled>
          )}
          {paymentMethodSpecificParams?.lastCardFourDigits && (
            <CardNumberStyled>
              **** **** **** {paymentMethodSpecificParams.lastCardFourDigits}
            </CardNumberStyled>
          )}
          {paymentMethodSpecificParams?.cardExpirationDate && (
            <CardExpirationStyled>
              <CardExpirationLabel>{t('Expiry date')}</CardExpirationLabel>
              <CardExpirationDateStyled>
                {paymentMethodSpecificParams.cardExpirationDate}
              </CardExpirationDateStyled>
            </CardExpirationStyled>
          )}
          {paymentMethodSpecificParams?.holderName &&
            !paymentMethodSpecificParams?.cardExpirationDate && (
              <CardExpirationStyled>
                <CardExpirationLabel>{t('Holder name')}</CardExpirationLabel>
                <CardExpirationDateStyled>
                  {paymentMethodSpecificParams.holderName}
                </CardExpirationDateStyled>
              </CardExpirationStyled>
            )}
          <CardEditStyled onClick={() => showInnerPopup()}>
            {t('Edit payment info')}
          </CardEditStyled>
        </CardStyled>
      ) : (
        <SkeletonWrapper height={166} />
      )}
    </CardWrapStyled>
  );
};

PaymentCard.propTypes = {
  showInnerPopup: PropTypes.func,
  activePaymentMethod: PropTypes.objectOf(PropTypes.any),
  isDataLoaded: PropTypes.bool,
  t: PropTypes.func
};

PaymentCard.defaultProps = {
  showInnerPopup: () => {},
  activePaymentMethod: {},
  isDataLoaded: true,
  t: k => k
};

export default PaymentCard;
