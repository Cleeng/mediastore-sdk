import React from 'react';
import { FooterStyled, ProductByStyled, SecurityStyled } from './FooterStyled';
import logo from './img/cleeng-logo-sm.png';
import security from './img/security.svg';

const Footer = () => (
  <FooterStyled>
    <ProductByStyled>
      Powered by
      <a href="https://cleeng.com" rel="noopener noreferrer" target="_blank">
        <img src={logo} alt="Cleeng" />
      </a>
    </ProductByStyled>
    <SecurityStyled>
      <img src={security} alt="" />
      Secured checkout
    </SecurityStyled>
  </FooterStyled>
);

export default Footer;
