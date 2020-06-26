import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

const Card = ({ className, children, withShadow }) => (
  <WrapStyled withShadow={withShadow} className={className}>
    {children}
  </WrapStyled>
);

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  withShadow: PropTypes.bool,
  className: PropTypes.string
};

Card.defaultProps = {
  children: '',
  withShadow: false,
  className: ''
};
