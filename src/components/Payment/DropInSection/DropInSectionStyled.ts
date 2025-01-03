import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { ConfirmColor } from 'styles/variables';
import { DropInSectionWrapperStyled } from './DropInSection.types';

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__custom-dropin--wrapper'
}))<DropInSectionWrapperStyled>`
  max-width: 376px;
  margin: 0 auto;
  min-height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.White};
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$isSelected ? props.theme.successColor || ConfirmColor : '#D3DBE6'};
  cursor: ${(props) => (props.$fadeOutSection ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$fadeOutSection ? '.2' : '1')};

  &:hover .adyen-checkout__payment-method__radio {
    box-shadow: 0 0 3px 1px #808080;
  }
  .adyen-checkout__payment-method__radio--selected {
    background-color: ${(props) => props.theme.successColor || ConfirmColor};
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
  padding-block: 12px;
  padding-inline: 50px 16px;

  ${media.small`
    max-width: 400px;
  `}
`;

export const TitleStyled = styled.span.attrs(() => ({
  className: 'msd__custom-dropin-title'
}))`
  margin-inline-start: 10px;
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
