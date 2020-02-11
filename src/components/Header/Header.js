import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from 'components/Logout/Logout';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.svg';
import Button from '../Button/Button';

const Header = ({ showBackIcon, showLogOutButton }) => (
  <HeaderStyled>
    {showBackIcon && (
      <Link to="/login">
        <Button variant="back">Back</Button>
      </Link>
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
