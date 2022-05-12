import React from 'react';
import PropTypes from 'prop-types';
import { getTheme } from 'util/appConfigHelper';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.png';

const Header = ({ withoutLogo, children }) => {
  const { logoUrl } = getTheme() || {};
  const logo = logoUrl || headerLogo;
  return (
    <HeaderStyled>
      {!withoutLogo && <LogoStyled logoSrc={logo} />}
      {children}
    </HeaderStyled>
  );
};

Header.propTypes = {
  withoutLogo: PropTypes.bool,
  children: PropTypes.node
};
Header.defaultProps = {
  withoutLogo: false,
  children: null
};

export default Header;
