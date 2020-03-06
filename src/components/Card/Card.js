import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

const Card = ({ children }) => <WrapStyled>{children}</WrapStyled>;

export default Card;

Card.propTypes = {
  children: PropTypes.node
};

Card.defaultProps = {
  children: ''
};
