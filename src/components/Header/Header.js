import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.svg';
import Button from '../Button/Button';

const Header = ({ showBackIcon }) => (
  <HeaderStyled>
    {showBackIcon && (
      <Link to="/login">
        <Button variant="back">Back</Button>
      </Link>
    )}
    <LogoStyled>
      <img src={headerLogo} alt="logo" />
    </LogoStyled>
  </HeaderStyled>
);

Header.propTypes = {
  showBackIcon: PropTypes.bool
};
Header.defaultProps = {
  showBackIcon: false
};

export default Header;
