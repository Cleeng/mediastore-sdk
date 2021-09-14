import styled from 'styled-components';
import { BackgroundColor, LineColor, ConfirmColor } from 'styles/variables';

export const MessageBoxStyled = styled.div.attrs(() => ({
  className: 'msd__message-box'
}))`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${BackgroundColor};
  border: 1px solid ${LineColor};
  border-radius: 7px;
`;

export const MessageBoxIconWrapStyled = styled.div.attrs(() => ({
  className: 'msd__message-box__icon'
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;
  height: 18px;
  background-color: ${ConfirmColor};
  border-radius: 3px;

  svg {
    height: 12px;
    fill: #fff;
  }
`;

export const MessageBoxMessageStyled = styled.div.attrs(() => ({
  className: 'msd__message-box__text'
}))`
  margin-left: 13px;
  font-size: 12px;
  color: ${ConfirmColor};
`;
