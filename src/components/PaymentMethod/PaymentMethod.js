import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import { MyAccountMainColor } from 'styles/variables';

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
  StyledLoaderContainer,
  Message
} from './PaymentMethodStyled';

class PaymentMethod extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paymentDetails } = this.props;

    return (
      <WrapStyled>
        {paymentDetails.length ? (
          <PaymentDetailsStyled>
            {paymentDetails.map(card => {
              const {
                // variant,
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
                        <CardExpirationLabel>Expire Date</CardExpirationLabel>
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
        ) : (
          <StyledLoaderContainer>
            <Loader color={MyAccountMainColor} />
          </StyledLoaderContainer>
        )}
      </WrapStyled>
    );
  }
}

export default PaymentMethod;

PaymentMethod.propTypes = {
  paymentDetails: PropTypes.arrayOf(PropTypes.any)
};

PaymentMethod.defaultProps = {
  paymentDetails: []
};
