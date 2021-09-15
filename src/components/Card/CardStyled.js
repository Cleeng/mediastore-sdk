import styled, { css } from 'styled-components';
import { CardColor } from 'styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__account__card'
}))`
  position: relative;
  width: 100%;

  padding: 18px;
  border-radius: 12px;

  margin-bottom: 39px;

  background-color: ${CardColor};

  ${props =>
    props.withShadow &&
    css`
      box-shadow: 0px 3px 50px #0000001f;
    `}
  ${props =>
    props.withBorder &&
    css`
      border: 1px solid #d3dbe6;
    `}
`;
