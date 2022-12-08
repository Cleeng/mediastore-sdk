import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { ConfirmColor } from 'styles/variables';

export const PaymentStyled = styled.div.attrs(() => ({
  className: 'msd__payment'
}))`
  padding: 20px 35px 70px 35px;
  width: 100%;
  background-color: ${colors.BackgroundColor};
  border-top: 1px solid ${colors.LineColor};
  border-bottom: 1px solid ${colors.LineColor};
`;

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment'
}))`
  min-height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${({ isCardAvailable }) =>
    isCardAvailable ? '0 0 12px 12px' : '12px;'};
  background-color: ${colors.White};
  border: 1px solid
    ${({ isSelected }) => (isSelected ? ConfirmColor : '#D3DBE6')};
  cursor: ${({ fadeOutSection }) => (fadeOutSection ? 'default' : 'pointer')};
  opacity: ${({ fadeOutSection }) => (fadeOutSection ? '.2' : '1')};
`;

export const TextStyled = styled.div.attrs(() => ({
  className: 'msd__payment-text'
}))`
  max-width: 550px;
  margin: 0;
  padding: 16px 16px 16px 25px;
  text-align: center;
  line-height: 1.4em;
  color: #00112c;
  font-size: 1em;
  font-weight: 400;
  display: flex;
  align-items: center;
  ${media.small`
    width: 90%;
    max-width: 400px;
  `}
`;

export const TitleStyled = styled.span`
  margin-left: 15px;
`;

export const IconWrapperStyled = styled.div`
  border: 1px solid #a9a9bf;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 26px;
  border-radius: 4px;
`;

export const ChevronIconWrapperStyled = styled.div`
  margin-left: auto;
  svg {
    rotate: ${({ isSelected }) => (isSelected ? '180deg' : 0)};
  }
`;
