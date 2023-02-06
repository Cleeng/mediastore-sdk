import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';

export const BUTTON_SIZE = {
  BIG: 'big',
  NORMAL: 'normal'
};

export const BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SIMPLE: 'simple',
  NAVLINK: 'navLink',
  LINK: 'link',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
  PAYPAL: 'paypal',
  DANGER: 'danger'
};

const Button = ({
  type,
  onClickFn,
  disabled,
  children,
  label,
  size,
  theme,
  fontSize,
  margin,
  fontWeight,
  width,
  icon,
  padding,
  className
}) => {
  const ButtonProps = {
    type,
    onClick: onClickFn
  };
  return (
    <ButtonStyled
      {...ButtonProps}
      disabled={disabled}
      aria-label={label}
      size={size}
      theme={theme}
      fontSize={fontSize}
      margin={margin}
      fontWeight={fontWeight}
      width={width}
      icon={icon}
      padding={padding}
      className={className}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;

Button.propTypes = {
  size: PropTypes.oneOf(Object.values(BUTTON_SIZE)),
  theme: PropTypes.oneOf(Object.values(BUTTON_THEME)),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ]),
  type: PropTypes.string,
  onClickFn: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fontSize: PropTypes.string,
  margin: PropTypes.string,
  fontWeight: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  size: null,
  theme: BUTTON_THEME.PRIMARY,
  children: '',
  type: 'button',
  onClickFn: () => {},
  disabled: false,
  label: null,
  fontSize: null,
  margin: null,
  fontWeight: null,
  width: null,
  icon: null,
  padding: null,
  className: ''
};
