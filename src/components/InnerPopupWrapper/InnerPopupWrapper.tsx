import React from 'react';
import MyAccountError from 'components/MyAccountError';

import {
  WrapperStyled,
  CardStyled,
  HeaderStyled,
  HeaderTitleStyled,
  DotsWrapperStyled,
  DotStyled
} from './InnerPopupWrapperStyled';
import { InnerPopupWrapperProps } from './InnerPopupWrapper.types';

const InnerPopupWrapper = ({
  steps,
  popupTitle,
  currentStep,
  children,
  isError
}: InnerPopupWrapperProps) => {
  return (
    <CardStyled>
      {isError ? (
        <MyAccountError generalError centered />
      ) : (
        <WrapperStyled>
          <HeaderStyled>
            <DotsWrapperStyled $currentStep={currentStep}>
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
};

export default InnerPopupWrapper;
