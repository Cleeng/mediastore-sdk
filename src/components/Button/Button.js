import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

const buttonTypes = {
  default: '',
  google: 'google',
  fb: 'fb',
  '': ''
};

const Button = ({ variant, type, onClickFn, children }) => (
  <ButtonStyled variant={variant} type={type} onClick={onClickFn}>
    {children}
  </ButtonStyled>
);

export default Button;

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(buttonTypes)),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  onClickFn: PropTypes.func
};

Button.defaultProps = {
  variant: buttonTypes.default,
  children: '',
  type: 'button',
  onClickFn: () => {}
};
