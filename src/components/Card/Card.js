import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

const Card = ({ children, withShadow }) => (
  <WrapStyled withShadow={withShadow}>{children}</WrapStyled>
);

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  withShadow: PropTypes.bool
};

Card.defaultProps = {
  children: '',
  withShadow: false
};
