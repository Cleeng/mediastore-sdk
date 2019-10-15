import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

export const BUTTON_TYPE = {
  DEFAULT: '',
  GOOGLE: 'google',
  FB: 'fb',
  CREDIT_CARD: 'creditcard'
};

const Button = ({ variant, type, onClickFn, children, disabled }) => (
  <ButtonStyled
    variant={variant}
    type={type}
    onClick={onClickFn}
    disabled={disabled}
  >
    {children}
  </ButtonStyled>
);

export default Button;

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(BUTTON_TYPE)),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  onClickFn: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  variant: BUTTON_TYPE.DEFAULT,
  children: '',
  type: 'button',
  onClickFn: () => {},
  disabled: false
};
