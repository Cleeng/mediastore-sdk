import styled from 'styled-components';
import { MainTextColor, LightGrey, Strong } from 'styles/variables';

export const CouponInputWrapperStyled = styled.div`
  padding: 10px;
`;

export const CouponInputStyled = styled.input`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 35px;

  color: ${MainTextColor};
  border: none;
  border-bottom: 1px solid ${LightGrey};
  outline: none;

  font-size: 15px;

  &:focus {
    border-bottom: 1px solid ${Strong};
  }
`;
