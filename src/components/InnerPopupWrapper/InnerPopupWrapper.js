import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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
  isError,
  t
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
          <HeaderTitleStyled>{t(popupTitle)}</HeaderTitleStyled>
        </HeaderStyled>
        {children}
      </WrapperStyled>
    )}
  </CardStyled>
);

InnerPopupWrapper.propTypes = {
  steps: PropTypes.number.isRequired,
  popupTitle: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  isError: PropTypes.bool.isRequired,
  t: PropTypes.func
};

InnerPopupWrapper.defaultProps = {
  t: k => k
};

export { InnerPopupWrapper as PureInnerPopupWrapper };

export default withTranslation()(labeling()(InnerPopupWrapper));
