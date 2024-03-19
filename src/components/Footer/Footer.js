import React from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as SecurityIcon } from 'assets/images/security.svg';
import { ReactComponent as CleengLogo } from 'assets/images/cleeng.svg';
import {
  FooterStyled,
  ProductByStyled,
  SecurityStyled,
  CleengLogoWrapperStyled
} from './FooterStyled';

const Footer = ({ className, isInPopup, isCheckout, isTransparent }) => (
  <FooterStyled
    $isInPopup={isInPopup}
    $isTransparent={isTransparent}
    className={className}
  >
    <ProductByStyled>
      Powered by
      <CleengLogoWrapperStyled
        href="https://cleeng.com/who-are-cleeng"
        rel="noopener noreferrer"
        target="_blank"
      >
        <CleengLogo title="Cleeng logo" />
      </CleengLogoWrapperStyled>
    </ProductByStyled>
    {isCheckout && (
      <SecurityStyled>
        <SecurityIcon />
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
