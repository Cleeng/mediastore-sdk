import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { MyAccountContentColor } from 'styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const WrapStyled = styled.main`
  flex-grow: 1;
  min-height: 100%;

  padding: 26px;

  border-radius: 20px 20px 0 0;
  background-color: ${MyAccountContentColor};

  ${mediaFrom.small`
    border-radius: 20px;
  `}
`;
