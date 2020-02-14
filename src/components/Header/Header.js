import React from 'react';
import PropTypes from 'prop-types';
import Logout from 'components/Logout/Logout';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.svg';
import Button from '../Button/Button';

const Header = ({ showBackIcon, showLogOutButton }) => (
  <HeaderStyled>
    {showBackIcon && (
      <Button isLink to="/login" variant="back">
        Back
      </Button>
    )}
    {showLogOutButton && <Logout />}
    <LogoStyled>
      <img src={headerLogo} alt="logo" />
    </LogoStyled>
  </HeaderStyled>
);

Header.propTypes = {
  showBackIcon: PropTypes.bool,
  showLogOutButton: PropTypes.bool
};
Header.defaultProps = {
  showBackIcon: false,
  showLogOutButton: false
};

export default Header;
