import styled, { css } from 'styled-components';
import { CardColor, LineColor, ConfirmColor } from 'styles/variables';

export const WrapStyled = styled.div`
  position: relative;

  margin-bottom: 20px;
`;

export const SubscriptionStyled = styled.div.attrs(() => ({
  className: 'msd__account__subscription'
}))`
  background: ${CardColor};
  border: 1px solid ${LineColor};
  border-radius: 12px;

  padding: 20px 18px;

  ${props =>
    props.onClick &&
    props.cursorPointer &&
    css`
      cursor: pointer;
    `}
  &:not(:last-child) {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -1px;
    left: -1px;

    content: '';
    z-index: -1;

    border-radius: 12px;
    border: 1px solid ${ConfirmColor};
    box-shadow: 0px 3px 20px #6767672c;

    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  ${props =>
    props.isSelected &&
    css`
      &::after {
        opacity: 1;
      }
    `}
`;

export const SubscriptionManageWrapStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonTextStyled = styled.span`
  position: relative;
  margin-right: 17px;
  font-family: inherit;
  font-weight: inherit;

  &:after {
    position: absolute;
    right: -17px;
    bottom: 0;
    font-size: 11px;
    ${props => (props.isExpanded ? "content: '▲'" : "content: '▼'")};
  }
`;

export const StatusMessageWrapStyled = styled.div.attrs(() => ({
  className: 'msd__account__message'
}))`
  margin-top: 20px;
`;
