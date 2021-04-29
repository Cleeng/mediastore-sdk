/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import MyAccountError from 'components/MyAccountError';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { CardTypesIcons } from './PaymentMethod.const';
import {
  WrapStyled,
  PaymentDetailsStyled,
  CardStyled,
  CardWrapStyled,
  CardTypeStyled,
  CardNumberStyled,
  CardExpirationStyled,
  CardExpirationLabel,
  CardExpirationDateStyled,
  // CardEditStyled,
  Message
} from './PaymentMethodStyled';

const PaymentCard = ({
  lastCardFourDigits,
  cardExpirationDate,
  variant,
  isDataLoaded,
  t
}) => {
  const LogoComponent = CardTypesIcons[variant]
    ? CardTypesIcons[variant]
    : React.Fragment;
  return (
    <CardWrapStyled>
      {isDataLoaded ? (
        <CardStyled>
          <CardTypeStyled>
            <LogoComponent />
          </CardTypeStyled>
          <CardNumberStyled>
            **** **** **** {lastCardFourDigits}
          </CardNumberStyled>
          <CardExpirationStyled>
            <CardExpirationLabel>{t('Expiry date')}</CardExpirationLabel>
            <CardExpirationDateStyled>
              {cardExpirationDate}
            </CardExpirationDateStyled>
          </CardExpirationStyled>
          {/* <CardEditStyled>Edit</CardEditStyled> */}
        </CardStyled>
      ) : (
        <SkeletonWrapper height={166} />
      )}
    </CardWrapStyled>
  );
};

PaymentCard.propTypes = {
  lastCardFourDigits: PropTypes.string,
  cardExpirationDate: PropTypes.string,
  variant: PropTypes.string,
  isDataLoaded: PropTypes.bool,
  t: PropTypes.func
};

PaymentCard.defaultProps = {
  lastCardFourDigits: '',
  cardExpirationDate: '',
  isDataLoaded: true,
  variant: '',
  t: k => k
};

const PaymentMethod = ({ paymentDetailsLoading, paymentDetails, error, t }) => {
  return paymentDetailsLoading ? (
    <PaymentCard isDataLoaded={false} />
  ) : (
    <WrapStyled>
      {error.length !== 0 ? (
        <MyAccountError generalError fullHeight />
      ) : paymentDetails.length === 0 ? (
        <MyAccountError
          title={t('No payment method added!')}
          subtitle={t('Add a card to start your plan')}
          withBorder
        />
      ) : (
        <PaymentDetailsStyled>
          {paymentDetails.map(method => {
            if (method.paymentMethod === 'card') {
              const {
                lastCardFourDigits,
                cardExpirationDate,
                variant
              } = method.paymentMethodSpecificParams;

              return (
                <PaymentCard
                  key={method.id}
                  lastCardFourDigits={lastCardFourDigits}
                  cardExpirationDate={cardExpirationDate}
                  variant={variant}
                />
              );
            }
            if (method.paymentMethod === 'paypal') {
              const LogoComponent = CardTypesIcons[method.paymentMethod]
                ? CardTypesIcons[method.paymentMethod]
                : React.Fragment;
              return (
                <CardWrapStyled key={method.id} type={method.paymentMethod}>
                  <CardStyled>
                    <CardTypeStyled>
                      <LogoComponent />
                    </CardTypeStyled>
                    {/* <CardEditStyled>Edit</CardEditStyled> */}
                  </CardStyled>
                </CardWrapStyled>
              );
            }
            return (
              <Message key="message">
                {t('Payment by ')} {method.paymentMethod}{' '}
                {t('is not supported')}
              </Message>
            );
          })}
        </PaymentDetailsStyled>
      )}
    </WrapStyled>
  );
};

PaymentMethod.propTypes = {
  paymentDetails: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.arrayOf(PropTypes.string),
  paymentDetailsLoading: PropTypes.bool,
  t: PropTypes.func
};

PaymentMethod.defaultProps = {
  paymentDetails: [],
  error: [],
  paymentDetailsLoading: false,
  t: k => k
};

export { PaymentMethod as PurePaymentMethod };

export default withTranslation()(labeling()(PaymentMethod));
