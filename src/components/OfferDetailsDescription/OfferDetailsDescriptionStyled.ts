import styled from 'styled-components';
import { TinyFont, LightFont } from 'styles/variables';

export const DetailsStyled = styled.p.attrs(() => ({
  className: 'msd__checkout-card-details__description'
}))`
  font-size: ${TinyFont};
  font-weight: ${LightFont};
  line-height: 17px;
  white-space: pre-line;
  margin: 9px 0;
`;

export const IconStyled = styled.span.attrs(() => ({
  className: 'msd__checkout-card-details__icon'
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

export const LineWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;
