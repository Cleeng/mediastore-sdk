import React from 'react';
import PropTypes from 'prop-types';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.svg';

const Header = ({ withoutLogo, children }) => (
  <HeaderStyled>
    {!withoutLogo && (
      <LogoStyled>
        <img src={headerLogo} alt="Sport stream" />
      </LogoStyled>
    )}
    {children}
  </HeaderStyled>
);

Header.propTypes = {
  withoutLogo: PropTypes.bool,
  children: PropTypes.node
};
Header.defaultProps = {
  withoutLogo: false,
  children: null
};

export default Header;
