import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { MyAccountTextGray, MainColor, ConfirmColor } from 'styles/variables';
import { NavLink } from 'react-router-dom';

export const WrapStyled = styled.nav`
  padding: 10px 0;

  ${mediaFrom.small`
    padding: 26px 0;
  `}
`;

export const ItemsStyled = styled.div`
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

export const ItemWrapStyled = styled.div`
  ${props =>
    !props.visibleOnDesktop &&
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

export const ItemIconWrapStyled = styled.div`
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
    width: 17px;
  `}
`;

export const ItemLabelStyled = styled.div`
  opacity: 0.4;
  width: auto;
  margin: auto;

  color: ${MainColor};
  border-bottom: 2px solid transparent;
  font-size: 13px;

  font-weight: 700;
  line-height: 21px;

  ${mediaFrom.small`
    margin: auto auto auto 20px;
   font-size: 15px;
  `}
`;

export const ItemLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0;
  border-radius: 12px;

  transition: opacity 0.1s;

  &.active {
    ${ItemIconWrapStyled} {
      path {
        opacity: 1;
        fill: ${ConfirmColor};
      }
    }

    ${ItemLabelStyled} {
      border-bottom: 2px solid ${ConfirmColor};
      opacity: 1;
    }
  }

  ${mediaFrom.small`
    flex-direction: row;
    align-items: center;

    padding: 0 26px 0 0;
    margin-bottom: 16px;

    border-radius: 8px;
  `}
`;
