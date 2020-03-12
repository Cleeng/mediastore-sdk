import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

const Card = ({ children, isShadow }) => (
  <WrapStyled isShadow={isShadow}>{children}</WrapStyled>
);

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  isShadow: PropTypes.bool
};

Card.defaultProps = {
  children: '',
  isShadow: false
};
