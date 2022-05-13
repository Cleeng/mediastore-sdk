import React from 'react';
import PropTypes from 'prop-types';
import { isHeaderOff } from 'util/layoutHelper';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.png';

const Header = ({ children }) => {
  return (
    <HeaderStyled switchOff={isHeaderOff()}>
      <LogoStyled logoSrc={headerLogo} />
      {children}
    </HeaderStyled>
  );
};

Header.propTypes = {
  children: PropTypes.node
};
Header.defaultProps = {
  children: null
};

export default Header;
