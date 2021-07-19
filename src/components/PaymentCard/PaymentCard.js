import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import { CardTypesIcons } from './Payment.const';
import {
  CardStyled,
  CardWrapStyled,
  CardTypeStyled,
  CardNumberStyled,
  CardExpirationStyled,
  CardExpirationLabel,
  CardExpirationDateStyled,
  CardEditStyled,
  MethodNameStyled
} from './PaymentCardStyled';

const INAPPS = ['android', 'apple', 'amazon', 'roku'];
const PaymentCard = ({ isDataLoaded, details, showInnerPopup }) => {
  const { t } = useTranslation();
  const { paymentMethodSpecificParams, paymentMethod } = details;
  const LogoComponent =
    paymentMethodSpecificParams &&
    CardTypesIcons[paymentMethodSpecificParams.variant]
      ? CardTypesIcons[paymentMethodSpecificParams.variant]
      : CardTypesIcons[details.paymentMethod] || null;

  return (
    <CardWrapStyled type={details.paymentMethod}>
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
          {INAPPS.includes(paymentMethod) && (
            <CardNumberStyled>
              {t('Billing via')}{' '}
              <MethodNameStyled>{paymentMethod}</MethodNameStyled>
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
          <CardEditStyled
            onClick={() =>
              showInnerPopup({
                type: POPUP_TYPES.paymentDetails,
                data: details
              })
            }
          >
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
  details: PropTypes.objectOf(PropTypes.any),
  isDataLoaded: PropTypes.bool
};

PaymentCard.defaultProps = {
  showInnerPopup: () => {},
  details: {},
  isDataLoaded: true
};

export default PaymentCard;
