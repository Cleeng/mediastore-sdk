import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { MyAccountTextColor } from 'styles/variables';
import { NavLink } from 'react-router-dom';

export const WrapStyled = styled.nav`
  padding: 26px 0;
`;

export const HeadingStyled = styled.div`
  margin-bottom: 18px;

  color: ${MyAccountTextColor};

  font-size: 14px;
  font-weight: 700;
`;

export const ItemsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  ${mediaFrom.small`
    flex-direction: column;
  `}
`;

export const ItemStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;

  transition: opacity 0.1s;
  opacity: 0.3;

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

  ${mediaFrom.small`
    flex-direction: row;
    align-items: center;

    padding: 0 26px;
    margin-bottom: 16px;
    
    border-radius: 30px;
    
    opacity: 0.54;
  `}
`;

export const ItemWrapStyled = styled.div`
  margin-right: 16px;
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

  ${mediaFrom.small`
    margin-right: 0;
  `}
`;

export const ItemLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;

  transition: opacity 0.1s;
  opacity: 0.3;

  &.active {
    opacity: 1;
    ${mediaFrom.small`
      background-color: #182C7A;
  `}
  }

  ${mediaFrom.small`
    flex-direction: row;
    align-items: center;

    padding: 0 26px;
    margin-bottom: 16px;
    
    border-radius: 30px;
    
    opacity: 0.54;
  `}
`;

export const ItemIconWrapStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;

  border: 1px solid #fff;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #0000001a;

  ${mediaFrom.small`
    border: 0;
  `}
`;

export const ItemIconStyled = styled.img`
  height: 23px;
  width: auto;
`;

export const ItemLabelStyled = styled.div`
  width: 60px;
  margin-top: 12px;

  color: #fff;

  font-size: 11px;
  line-height: 16px;
  text-align: center;

  ${mediaFrom.small`
    width: 100%;
    margin-top: 0;
  `}
`;
