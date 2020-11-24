import React from 'react';
import { PropTypes } from 'prop-types';
import { FooterStyled, ProductByStyled, SecurityStyled } from './FooterStyled';
import logo from './img/cleeng-logo-sm.png';
import security from './img/security.svg';

const Footer = ({ className, isInPopup, isCheckout, isTransparent }) => (
  <FooterStyled
    isInPopup={isInPopup}
    isTransparent={isTransparent}
    className={className}
  >
    <ProductByStyled>
      Powered by
      <a
        href="https://cleeng.com/who-are-cleeng"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={logo} alt="Cleeng" />
      </a>
    </ProductByStyled>
    {isCheckout && (
      <SecurityStyled>
        <img src={security} alt="" />
        Secured checkout
      </SecurityStyled>
    )}
  </FooterStyled>
);

Footer.propTypes = {
  isInPopup: PropTypes.bool,
  isCheckout: PropTypes.bool,
  isTransparent: PropTypes.bool,
  className: PropTypes.string
};

Footer.defaultProps = {
  isInPopup: false,
  isCheckout: true,
  isTransparent: false,
  className: ''
};

export default Footer;
