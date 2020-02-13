import React, { Component } from 'react';
import { WrapStyled, HeaderStyled } from './PaymentInfoStyled';

class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WrapStyled>
        <HeaderStyled>Payment method</HeaderStyled>
      </WrapStyled>
    );
  }
}

export default PaymentInfo;
