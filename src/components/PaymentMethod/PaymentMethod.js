import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
  Message
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
      </WrapStyled>
    );
  }
}

export default PaymentMethod;

PaymentMethod.propTypes = {
  paymentDetails: PropTypes.arrayOf(PropTypes.any),
  t: PropTypes.func
};

PaymentMethod.defaultProps = {
  paymentDetails: [],
  t: k => k
};
