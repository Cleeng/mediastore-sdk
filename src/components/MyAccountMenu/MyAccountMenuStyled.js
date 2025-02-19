import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { isRTL } from 'styles/RTLHelper';
import { MyAccountTextGray, FontColor, ConfirmColor } from 'styles/variables';

export const WrapStyled = styled.nav`
  padding: 10px 0;

  ${mediaFrom.small`
    padding: 26px 0;
  `}
`;

export const ItemsStyled = styled.div.attrs(() => ({
  className: 'msd__account-sidebar__items'
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mediaFrom.smallest`
    justify-content: flex-start;
  `}

  ${mediaFrom.small`
    flex-direction: column;
  `}
`;

export const ItemWrapStyled = styled.div.attrs(() => ({
  className: 'msd__account-sidebar__item'
}))`
  ${(props) =>
    !props.$visibleOnDesktop &&
    css`
      ${mediaFrom.small`
        display: none;
      `}
    `}

  &.active {
    opacity: 1;
  }

  ${mediaFrom.smallest`
      margin-right: 16px;
  `}

  ${mediaFrom.small`
    margin-right: 0;
  `}
`;

export const ItemIconWrapStyled = styled.div.attrs(() => ({
  className: 'msd__account-sidebar__icon'
}))`
  display: none;
  justify-content: center;
  align-items: center;

  path {
    opacity: 0.4;
    fill: ${MyAccountTextGray};
  }

  ${mediaFrom.small`
    display: flex;
    border: 0;
    height: 50px;
    width: 30px;
  `}
`;

export const ItemLabelStyled = styled.div.attrs(() => ({
  className: 'msd__account-sidebar__label'
}))`
  opacity: 0.4;
  width: auto;
  margin: auto;

  color: ${(props) => props.theme.fontColor || FontColor};
  font-size: 13px;

  font-weight: 700;
  line-height: 21px;

  transition: all 0.1s ease-in-out;

  &:after {
    display: block;
    content: '';
    border-bottom: 2px solid
      ${(props) => props.theme.successColor || ConfirmColor};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 0% 50%;

    ${isRTL() &&
    css`
      transform-origin: 100% 50%;
    `}
  }

  ${mediaFrom.small`
    margin: auto 20px auto 20px;
    font-size: 15px;
  `}
`;

export const ItemStyled = styled.div.attrs(() => ({
  className: 'msd__account-sidebar__item'
}))`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0;
  border-radius: 12px;

  transition: opacity 0.1s;

  &:hover {
    cursor: pointer;
    ${ItemLabelStyled} {
      &:after {
        transform: scaleX(1);
      }
      opacity: 1;
    }
  }

  ${(props) =>
    props.$isActive &&
    css`
      ${ItemIconWrapStyled} {
        path {
          opacity: 1;
          fill: ${props.theme.successColor || ConfirmColor};
        }
      }

      ${ItemLabelStyled} {
        &:after {
          transform: scaleX(1);
        }
        opacity: 1;
      }
    `}

  ${mediaFrom.small`
    flex-direction: row;
    align-items: center;

    padding: 0 26px 0 0;
    margin-bottom: 16px;

    border-radius: 8px;
  `}
`;
