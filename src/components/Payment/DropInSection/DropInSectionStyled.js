import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { ConfirmColor } from 'styles/variables';

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__custom-dropin--wrapper'
}))`
  max-width: 375px;
  margin: 0 auto;
  min-height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.White};
  border-radius: 12px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? ConfirmColor : '#D3DBE6')};
  cursor: ${({ fadeOutSection }) => (fadeOutSection ? 'default' : 'pointer')};
  opacity: ${({ fadeOutSection }) => (fadeOutSection ? '.2' : '1')};

  &:hover .adyen-checkout__payment-method__radio {
    box-shadow: 0 0 3px 1px #808080;
  }
  .adyen-checkout__payment-method__radio--selected {
    background-color: ${ConfirmColor};
  }
`;

export const TextStyled = styled.div.attrs(() => ({
  className: 'msd__custom-dropin-text'
}))`
  max-width: 550px;
  margin: 0;
  text-align: center;
  line-height: 1.4em;
  color: #00112c;
  font-size: 1em;
  font-weight: 400;
  display: flex;
  align-items: center;
  position: relative;
  padding: 12px 16px 12px 50px;
  ${media.small`
    max-width: 400px;
  `}
`;

export const TitleStyled = styled.span.attrs(() => ({
  className: 'msd__custom-dropin-title'
}))`
  margin-left: 10px;
`;

export const IconWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__custom-dropin--payment-icon'
}))`
  border: 1px solid #a9a9bf;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 26px;
  border-radius: 4px;
  svg {
    max-height: 100%;
    max-width: 100%;
    height: 26px;
    width: 31px;
  }
`;
