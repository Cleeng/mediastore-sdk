import React, { Component } from 'react';
import { WrapStyled, HeaderStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WrapStyled>
        <HeaderStyled>Plan Details</HeaderStyled>
      </WrapStyled>
    );
  }
}

export default PlanDetails;
