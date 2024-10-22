import styled from 'styled-components';
import { BackgroundColor } from 'styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const WrapStyled = styled.div`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: ${(props) => props.theme.backgroundColor || BackgroundColor};
`;
