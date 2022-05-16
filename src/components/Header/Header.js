import React from 'react';
import PropTypes from 'prop-types';
import { HeaderStyled, LogoStyled } from './HeaderStyled';
import headerLogo from './img/logo.png';

const Header = ({ children }) => {
  return (
    <HeaderStyled>
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
