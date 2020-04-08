/* eslint-disable no-nested-ternary */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import labeling from 'containers/labeling';
import MyAccountError from 'components/MyAccountError/MyAccountError';
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

class PaymentMethod extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paymentDetails, error, t } = this.props;
    return (
      <WrapStyled>
        {error.length !== 0 ? (
          <MyAccountError serverError />
        ) : paymentDetails.length === 0 ? (
          <MyAccountError
            title={t('No card added!')}
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
                const LogoComponent = CardTypesIcons[variant]
                  ? CardTypesIcons[variant]
                  : React.Fragment;
                return (
                  <CardWrapStyled key={method.id}>
                    <CardStyled>
                      <CardTypeStyled>
                        <LogoComponent />
                      </CardTypeStyled>
                      <CardNumberStyled>
                        **** **** **** {lastCardFourDigits}
                      </CardNumberStyled>
                      <CardExpirationStyled>
                        <CardExpirationLabel>
                          {t('Expiry date')}
                        </CardExpirationLabel>
                        <CardExpirationDateStyled>
                          {cardExpirationDate}
                        </CardExpirationDateStyled>
                      </CardExpirationStyled>
                      {/* <CardEditStyled>Edit</CardEditStyled> */}
                    </CardStyled>
                  </CardWrapStyled>
                );
              }
              if (method.paymentMethod === 'paypal')
                return (
                  <CardWrapStyled key={method.id} type={method.paymentMethod}>
                    <CardStyled>
                      <CardTypeStyled>
                        {CardTypesIcons[method.paymentMethod].render()}
                      </CardTypeStyled>
                      {/* <CardEditStyled>Edit</CardEditStyled> */}
                    </CardStyled>
                  </CardWrapStyled>
                );
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
  }
}

PaymentMethod.propTypes = {
  paymentDetails: PropTypes.arrayOf(PropTypes.any),
  error: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func
};

PaymentMethod.defaultProps = {
  paymentDetails: [],
  error: [],
  t: k => k
};

export { PaymentMethod as PurePaymentMethod };

export default withTranslation()(labeling()(PaymentMethod));
