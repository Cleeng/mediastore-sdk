import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Chevron } from 'assets/images/chevron.svg';
import {
  ChevronIconWrapperStyled,
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
  return (
    <WrapperStyled
      isSelected={isSelected}
      isCardAvailable={isCardAvailable}
      onClick={() => !fadeOutSection && selectPaymentMethod('paypal')}
      fadeOutSection={fadeOutSection}
    >
      <TextStyled>
        <IconWrapperStyled>{logo}</IconWrapperStyled>
        <TitleStyled>{title}</TitleStyled>
        <ChevronIconWrapperStyled isSelected={isSelected}>
          <Chevron />
        </ChevronIconWrapperStyled>
      </TextStyled>
      {isSelected && children}
    </WrapperStyled>
  );
};

DropInSection.propTypes = {
  selectPaymentMethod: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isCardAvailable: PropTypes.bool.isRequired,
  fadeOutSection: PropTypes.bool.isRequired
};

export default DropInSection;
