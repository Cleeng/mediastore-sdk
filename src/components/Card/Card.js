import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <WrapStyled>{children}</WrapStyled>;
  }
}

export default Card;

Card.propTypes = {
  children: PropTypes.node // oneOfType([PropTypes.string, PropTypes.element])
};

Card.defaultProps = {
  children: ''
};
