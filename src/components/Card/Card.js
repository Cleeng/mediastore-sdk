import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

const Card = ({ className, children, withShadow, withBorder }) => (
  <WrapStyled
    withShadow={withShadow}
    className={className}
    withBorder={withBorder}
  >
    {children}
  </WrapStyled>
);

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  withShadow: PropTypes.bool,
  className: PropTypes.string,
  withBorder: PropTypes.bool
};

Card.defaultProps = {
  children: '',
  withShadow: false,
  className: '',
  withBorder: false
};
