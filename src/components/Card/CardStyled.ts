import styled, { css } from 'styled-components';
import { CardColor } from 'styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__account__card'
}))<{ $withShadow?: boolean; $withBorder?: boolean }>`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;
  width: 100%;

  padding: 18px;
  border-radius: 12px;

  margin-bottom: 32px;

  background-color: ${(props) => props.theme.cardColor || CardColor};

  ${(props) =>
    props.$withShadow &&
    css`
      box-shadow: 0px 3px 50px #0000001f;
    `}
  ${(props) =>
    props.$withBorder &&
    css`
      border: 1px solid #d3dbe6;
    `}
`;
