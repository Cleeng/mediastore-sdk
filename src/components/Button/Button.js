import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonStyled from './ButtonStyled';

export const BUTTON_VARIANT = {
  DEFAULT: '',
  SECONDARY: 'secondary',
  GOOGLE: 'google',
  FB: 'fb',
  PAYMENT: 'paymentmethod',
  LINK: 'link',
  BACK: 'back',
  COUPONAPPLY: 'couponApply'
};

const Button = ({
  variant,
  type,
  onClickFn,
  disabled,
  children,
  isLink,
  to,
  label
}) =>
  isLink ? (
    <ButtonStyled
      as={Link}
      to={to}
      variant={variant}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </ButtonStyled>
  ) : (
    <ButtonStyled
      variant={variant}
      type={type}
      onClick={onClickFn}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </ButtonStyled>
  );

export default Button;

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANT)),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  onClickFn: PropTypes.func,
  disabled: PropTypes.bool,
  isLink: PropTypes.bool,
  to: PropTypes.string,
  label: PropTypes.string
};

Button.defaultProps = {
  variant: BUTTON_VARIANT.DEFAULT,
  children: '',
  type: 'button',
  onClickFn: () => {},
  disabled: false,
  isLink: false,
  to: null,
  label: null
};
