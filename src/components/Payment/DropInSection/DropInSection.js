import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PayPalIcon } from 'assets/images/paymentMethods/PPicon.svg';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import {
  IconWrapperStyled,
  TextStyled,
  TitleStyled,
  WrapperStyled
} from './DropInSectionStyled';

const DropInSection = ({
  children,
  selectPaymentMethod,
  title,
  logo,
  isLoading
}) => {
  const { selectedPaymentMethod } = useSelector(state => state.paymentMethods);
  const isSelected = selectedPaymentMethod?.methodName === title.toLowerCase();
  const fadeOutSection =
    isLoading && selectedPaymentMethod?.methodName !== title.toLowerCase();
  const mapImage = {
    paypal: PayPalIcon
  };
  const LogoComponent = mapImage[logo];

  const handleOnClick = () => {
    if (!fadeOutSection && selectedPaymentMethod?.methodName !== 'paypal') {
      selectPaymentMethod('paypal');
    }
  };

  return (
    <WrapperStyled
      isSelected={isSelected}
      onClick={handleOnClick}
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
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default DropInSection;
