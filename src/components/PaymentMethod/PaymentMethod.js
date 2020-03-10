import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';

import visaLogo from './img/visa.png';

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
            {paymentDetails.map(card => {
              const {
                lastCardFourDigits,
                cardExpirationDate
              } = card.paymentMethodSpecificParams;
              if (card.paymentMethod === 'card')
                return (
                  <CardWrapStyled key={card.id}>
                    <CardStyled>
                      <CardTypeStyled src={visaLogo} />
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
              return (
                <Message key="message">
                  Payment by {card.paymentMethod} is not supported
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
