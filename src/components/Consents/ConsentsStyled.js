import styled from 'styled-components';
import { ErrorColor } from 'styles/variables';

export const ConsentsWrapperStyled = styled.div`
  position: relative;

  padding-bottom: 10px;

  font-family: 'Geomanist';
  font-weight: 300;

  & button {
    margin-top: 35px;
  }
  & a {
    font-family: 'Geomanist';
    font-weight: 600;
  }
`;

export const ConsentsErrorStyled = styled.div`
  width: 100%;
  height: 13px;

  color: ${ErrorColor};

  font-family: 'Geomanist';
  font-size: 13px;
`;

export const InvisibleLegend = styled.legend`
  position: absolute;
  clip: rect(0 0 0 0);

  height: 1px;
  width: 1px;

  margin: -1px;
  padding: 0;

  overflow: hidden;
`;

export const GeneralErrorStyled = styled.p`
  margin-bottom: 30px;
  color: ${ErrorColor};
  font-size: 13px;
`;
