import React, { Component } from 'react';
import { WrapStyled, HeaderStyled } from './QuickActionsStyled';

class QuickActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WrapStyled>
        <HeaderStyled>Quick Actions</HeaderStyled>
      </WrapStyled>
    );
  }
}

export default QuickActions;
