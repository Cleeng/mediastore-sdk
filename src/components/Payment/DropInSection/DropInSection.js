import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PayPalIcon } from 'assets/images/paymentMethods/PPicon.svg';
import classNames from 'classnames';
import {
  IconWrapperStyled,
  TextStyled,
  TitleStyled,
  WrapperStyled
} from './DropInSectionStyled';

const DropInSection = ({
  children,
  selectPaymentMethod,
  isSelected,
  title,
  logo,
  isCardAvailable,
  fadeOutSection
}) => {
  const mapImage = {
    paypal: PayPalIcon
  };
  const LogoComponent = mapImage[logo];
  return (
    <WrapperStyled
      isSelected={isSelected}
      isCardAvailable={isCardAvailable}
      onClick={() => !fadeOutSection && selectPaymentMethod('paypal')}
      fadeOutSection={fadeOutSection}
    >
      <TextStyled>
        <span
          className={classNames('adyen-checkout__payment-method__radio', {
            'adyen-checkout__payment-method__radio--selected': isSelected
          })}
          aria-hidden={!isSelected}
        />
        <IconWrapperStyled>
          {LogoComponent && <LogoComponent />}
        </IconWrapperStyled>
        <TitleStyled>{title}</TitleStyled>
      </TextStyled>
      {isSelected && children}
    </WrapperStyled>
  );
};

DropInSection.propTypes = {
  selectPaymentMethod: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isCardAvailable: PropTypes.bool.isRequired,
  fadeOutSection: PropTypes.bool.isRequired
};

export default DropInSection;
