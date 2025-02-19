import styled from 'styled-components';
import { ConfirmColor, ErrorColor } from 'styles/variables';
import { MESSAGE_TYPE, MessageType } from 'types/hooks.types';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__profile-address'
}))``;

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  &:first-child {
    margin-right: 25px;
  }

  & > * {
    width: 100%;
    &:first-child {
      margin-right: 25px;
    }
  }
`;

export const MessageStyled = styled.div.attrs(() => ({
  className: 'msd__profile-message--success'
}))<{ $type: MessageType }>`
  color: ${({ $type, theme }) =>
    $type === MESSAGE_TYPE.SUCCESS
      ? theme.successColor || ConfirmColor
      : theme.errorColor || ErrorColor};
  text-align: center;
  margin: 5px 0 15px 0;
  font-size: 12px;
  position: relative;
`;
