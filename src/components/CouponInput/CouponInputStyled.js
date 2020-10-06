import styled, { css } from 'styled-components';
import * as Colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input/InputConstants';

export const InputComponentStyled = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 300px;
`;

export const MessageStyled = styled.div`
  color: ${props =>
    props.messageType === MESSAGE_TYPE_SUCCESS
      ? Colors.ConfirmColor
      : Colors.ErrorColor};
  border-radius: 5px;

  font-size: 12px;

  opacity: ${props => (props.showMessage ? 1 : 0)};
  transition: opacity 250ms linear;
`;

export const InputElementWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

  border: 1px solid ${Colors.LineColor};
  border-radius: 21px;

  background: white;
  transition: 0.2s ease-in-out;
`;
export const InputElementStyled = styled.input`
  flex-grow: 1;
  position: relative;
  width: 0px;
  transition: width 0.3s, margin 0.3s;

  color: ${Colors.MainColor};
  padding: 0;

  border: none;
  outline: none;

  font-size: 15px;
  line-height: 1.3;
  ${props =>
    props.isOpened &&
    css`
      width: 198px
      max-width: 198px;
      left: 15px;
      padding-right: 25px;
      ${media.small`
        width: 100%;
        max-width: 100%;
      `}
    `}

  ${props =>
    props.readOnly &&
    css`
      opacity: 0.5;
    `}
`;
