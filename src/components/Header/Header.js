import React from 'react';
import PropTypes from 'prop-types';
import { HeaderStyled, LogoStyled } from './HeaderStyled';

const Header = ({ children }) => {
  return (
    <HeaderStyled>
      <LogoStyled />
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
