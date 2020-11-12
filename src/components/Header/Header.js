import React from 'react';
import PropTypes from 'prop-types';
import { isHeaderOff } from 'util/layoutHelper';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.png';

const Header = ({ withoutLogo, children }) => (
  <HeaderStyled switchOff={isHeaderOff()}>
    {!withoutLogo && <LogoStyled logoSrc={headerLogo} />}
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
