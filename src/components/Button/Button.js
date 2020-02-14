import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonStyled from './ButtonStyled';

export const BUTTON_TYPE = {
  DEFAULT: '',
  SECONDARY: 'secondary',
  GOOGLE: 'google',
  FB: 'fb',
  PAYMENT: 'paymentmethod',
  LINK: 'link',
  BACK: 'back'
};

const Button = ({
  variant,
  type,
  onClickFn,
  disabled,
  children,
  isLink,
  to
}) => (
  <ButtonStyled
    as={isLink ? Link : 'button'}
    to={to}
    variant={variant}
    type={isLink ? null : type}
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
  disabled: PropTypes.bool,
  isLink: PropTypes.bool,
  to: PropTypes.string
};

Button.defaultProps = {
  variant: BUTTON_TYPE.DEFAULT,
  children: '',
  type: 'button',
  onClickFn: () => {},
  disabled: false,
  isLink: false,
  to: null
};
