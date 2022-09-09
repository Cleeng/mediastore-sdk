import React from 'react';
import PropTypes from 'prop-types';
import MyAccountError from 'components/MyAccountError';

import {
  WrapperStyled,
  CardStyled,
  HeaderStyled,
  HeaderTitleStyled,
  DotsWrapperStyled,
  DotStyled
} from './InnerPopupWrapperStyled';

const InnerPopupWrapper = ({
  steps,
  popupTitle,
  currentStep,
  children,
  isError
}) => (
  <CardStyled>
    {isError ? (
      <MyAccountError generalError centered />
    ) : (
      <WrapperStyled>
        <HeaderStyled>
          <DotsWrapperStyled currentStep={currentStep}>
            {steps > 1 &&
              Array.from({ length: steps }, (_, k) => <DotStyled key={k} />)}
          </DotsWrapperStyled>
          <HeaderTitleStyled>{popupTitle}</HeaderTitleStyled>
        </HeaderStyled>
        {children}
      </WrapperStyled>
    )}
  </CardStyled>
);

InnerPopupWrapper.propTypes = {
  steps: PropTypes.number.isRequired,
  popupTitle: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  isError: PropTypes.bool
};

InnerPopupWrapper.defaultProps = {
  popupTitle: '',
  isError: false
};

export default InnerPopupWrapper;
