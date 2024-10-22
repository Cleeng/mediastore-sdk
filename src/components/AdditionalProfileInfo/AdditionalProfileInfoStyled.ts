import styled from 'styled-components';
import { ConfirmColor, ErrorColor, FontColor } from 'styles/variables';
import { MESSAGE_TYPE, MessageType } from 'types/hooks.types';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__profile-capture__wrapper'
}))``;

export const MessageStyled = styled.div.attrs(() => ({
  className: 'msd__profile-capture__message'
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

export const InputWrapStyled = styled.div`
  margin-bottom: 20px;
`;

export const InputLabelStyled = styled.div.attrs(() => ({
  className: 'msd__profile-capture__label'
}))`
  display: block;
  margin-bottom: 12px;
  color: ${(props) => props.theme.fontColor || FontColor};
  font-size: 13px;
`;
