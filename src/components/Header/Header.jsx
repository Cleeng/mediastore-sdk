import React from 'react';
import PropTypes from 'prop-types';
import { ArrowStyled, HeaderStyled, LogoStyled } from './HeaderStyled';

const Header = ({ children, onBackClick }) => {
  return (
    <HeaderStyled>
      {onBackClick && <ArrowStyled onClick={onBackClick} />}
      <LogoStyled />
      {children}
    </HeaderStyled>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  onBackClick: PropTypes.func
};
Header.defaultProps = {
  children: null,
  onBackClick: null
};

export default Header;
