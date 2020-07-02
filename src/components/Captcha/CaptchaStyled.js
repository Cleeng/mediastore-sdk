import styled from 'styled-components';
import { ErrorColor } from 'styles/variables';

export const StyledRecaptcha = styled.div`
  width: 100%;
  margin-top: 25px;

  iframe {
    height: 78px;
  }
`;

export const StyledErrorDiv = styled.div`
  position: relative;
  top: 5px;

  left: 5px;
  width: 100%;

  color: ${ErrorColor};

  text-align: left;
  font-size: 13px;
  font-family: 'Geomanist';

  overflow: visible;
`;
