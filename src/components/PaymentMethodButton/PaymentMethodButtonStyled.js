import styled from 'styled-components';
import Button from 'components/Button';
import * as variables from 'styles/variables';

export const StyledButton = styled(Button)`
  max-width: 160px;
  height: 90px;
  background-color: ${variables.White};
  border: 1px solid ${variables.LineColor};
  border-radius: 7px;

  svg {
    path {
      fill: ${variables.MainColor};
    }
  }

  &:hover,
  &:focus {
    color: ${variables.White};
    svg {
      path {
        fill: ${variables.White};
      }
    }
  }
`;

export const StyledMethodName = styled.div`
  text-transform: uppercase;
`;
