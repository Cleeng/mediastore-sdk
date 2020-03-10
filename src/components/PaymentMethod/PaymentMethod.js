import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import labeling from 'containers/labeling';
import Card from 'components/Card';

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
  Message,
  InfoMessageStyled
} from './PaymentMethodStyled';

class PaymentMethod extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paymentDetails, t } = this.props;

    return (
      <WrapStyled>
        {paymentDetails.length === 0 ? (
          <Card>
            <InfoMessageStyled>
              {t('There are no payment methods cofigured')}
            </InfoMessageStyled>
          </Card>
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
                  <CardWrapStyled key={method.id}>
                    <CardStyled>
                      <CardTypeStyled>
                        {CardTypesIcons[variant]
                          ? CardTypesIcons[variant].render()
                          : null}
                      </CardTypeStyled>
                      <CardNumberStyled>
                        **** **** **** {lastCardFourDigits}
                      </CardNumberStyled>
                      <CardExpirationStyled>
                        <CardExpirationLabel>
                          {t('Expire Date')}
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
                  Payment by {method.paymentMethod} is not supported
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
  t: PropTypes.func
};

PaymentMethod.defaultProps = {
  paymentDetails: [],
  t: k => k
};

export { PaymentMethod as PurePaymentMethod };

export default withTranslation()(labeling()(PaymentMethod));
