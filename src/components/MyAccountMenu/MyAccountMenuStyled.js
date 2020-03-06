import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  HeadingColor,
  MyAccountMenu,
  MyAccountMenuActive,
  MyAccountTextGray,
  MyAccountMainColor
} from 'styles/variables';
import { NavLink } from 'react-router-dom';

export const WrapStyled = styled.nav`
  padding: 26px 0;
`;

export const HeadingStyled = styled.div`
  margin-bottom: 18px;

  color: ${HeadingColor};

  font-size: 14px;
  font-weight: 700;
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
    ${mediaFrom.small`
      background-color: #182C7A;
  `}
  }

  ${mediaFrom.smallest`
      margin-right: 16px;
  `}

  ${mediaFrom.small`
    margin-right: 0;
  `}
`;

export const ItemIconWrapStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    fill: ${MyAccountTextGray};
  }

  ${mediaFrom.small`
    border: 0;
    height: 50px;
  `}
`;

export const ItemLabelStyled = styled.div`
  width: 60px;
  margin-top: 12px;

  color: ${MyAccountTextGray};

  font-size: 11px;
  line-height: 16px;
  text-align: center;

  ${mediaFrom.small`
    width: 100%;
    margin-top: 0;
  `}
`;

export const ItemLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0;
  border-radius: 12px;

  transition: opacity 0.1s;

  background-color: ${MyAccountMenu};

  &.active {
    background-color: ${MyAccountMenuActive};
    color: ${MyAccountTextGray};

    ${ItemIconWrapStyled} {
      path {
        fill: ${MyAccountMainColor};
      }
    }

    ${ItemLabelStyled} {
      color: ${MyAccountMainColor};
    }
  }

  ${mediaFrom.small`
    flex-direction: row;
    align-items: center;

    padding: 0 26px;
    margin-bottom: 16px;
    
    border-radius: 8px;
    
  `}
`;
