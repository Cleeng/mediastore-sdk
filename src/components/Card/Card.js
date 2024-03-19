import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './CardStyled';

const Card = ({ as, className, children, withShadow, withBorder }) => (
  <WrapStyled
    as={as}
    $withShadow={withShadow}
    className={className}
    $withBorder={withBorder}
  >
    {children}
  </WrapStyled>
);

export default Card;

Card.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  withShadow: PropTypes.bool,
  className: PropTypes.string,
  withBorder: PropTypes.bool
};

Card.defaultProps = {
  as: 'article',
  children: '',
  withShadow: false,
  className: '',
  withBorder: false
};
