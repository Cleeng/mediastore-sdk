import styled, { css } from 'styled-components';
import * as Colors from 'styles/variables';
import failIcon from 'assets/images/input/fail.svg';
import successIcon from 'assets/images/input/success.svg';
import { media } from 'styles/BreakPoints';
import { MESSAGE_TYPE_SUCCESS } from '../Input/InputConstants';

export const CouponInputWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const InputComponentStyled = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  width: 100%;
`;

export const MessageStyled = styled.div`
  padding: 10px;

  background-color: ${Colors.LightGrey};
  color: ${props =>
    props.messageType === MESSAGE_TYPE_SUCCESS
      ? Colors.MainColor
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

  padding: 15px 0 13px;

  background: white;
  border-bottom: 1px solid ${Colors.MediumGrey};
  transition: 0.2s ease-in-out;
  ${props =>
    props.showMessage &&
    css`
      &::after {
        position: absolute;
        right: 4px;
        top: 50%;

        padding: 0 0 0 5px;

        background: #fff;

        transform: translate(0%, -39%);

        content: url(${props.messageType === MESSAGE_TYPE_SUCCESS
          ? successIcon
          : failIcon});
      }
    `};
  ${props =>
    props.icon &&
    css`
      &::before {
        content: url(${props.icon});
      }
    `};
`;
export const InputElementStyled = styled.input`
  flex-grow: 1;
  position: relative;
  width: auto;

  margin: 0 25px 0 15px;

  color: ${Colors.InputText};
  ${props =>
    props.readOnly &&
    css`
      opacity: 0.5;
    `}
  border: none;
  outline: none;

  font-size: 15px;
  line-height: 1.3;

  ${media.small`
    width: 100%;
  `}
`;
export const CouponInputStyled = styled.input`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 35px;

  color: ${Colors.MainTextColor};
  border: none;
  border-bottom: 1px solid ${Colors.MediumGrey};
  outline: none;

  font-size: 15px;

  &:focus {
    border-bottom: 1px solid ${Colors.MainColor};
  }
`;
