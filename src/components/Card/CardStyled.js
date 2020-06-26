import styled, { css } from 'styled-components';
import { CardColor } from 'styles/variables';
// eslint-disable-next-line import/prefer-default-export
export const WrapStyled = styled.div`
  position: relative;

  padding: 18px;
  border-radius: 12px;

  margin-bottom: 32px;

  background-color: ${CardColor};

  ${props =>
    props.withShadow &&
    css`
      box-shadow: 0px 3px 50px #0000001f;
    `}
`;
