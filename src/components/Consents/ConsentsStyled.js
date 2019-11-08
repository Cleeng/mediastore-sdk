import styled from 'styled-components';
import { ErrorOffer, MainTextColor } from 'styles/variables';

export const ConsentsWrapperStyled = styled.div`
  position: relative;
  font-family: 'Geomanist';
  font-weight: 300;
  font-size: 13px;
  margin-top: 30px;
  color: ${MainTextColor};

  & button {
    margin-top: 35px;
  }
`;

export const ConsentsErrorStyled = styled.div`
  color: ${ErrorOffer};
  font-family: 'Geomanist';
  font-weight: 300;
  font-size: 12px;
  width: 100%;
  position: absolute;
  bottom: -21px;
`;
