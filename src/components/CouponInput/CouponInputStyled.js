import styled, { css } from 'styled-components';
import failIcon from 'assets/images/input/fail.svg';
import successIcon from 'assets/images/input/success.svg';
import * as Colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input/InputConstants';

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

export const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  outline: 0;

  text-align: center;
  text-decoration: none;
  letter-spacing: 0.025em;
  font-family: 'Geomanist';

  cursor: pointer;
  width: min-content;
  height: 34px;
  margin: 0 0 18px auto;

  background-color: ${Colors.LightGrey};
  border: 1px solid ${Colors.ButtonBorder};
  color: ${Colors.MainTextColor};
  padding: 0px 10px;

  font-size: 12px;
  line-height: 34px;
  &:disabled {
    opacity: 0.6;
    &:hover {
      cursor: not-allowed;
      background-color: ${Colors.LightGrey};
    }
  }
  ${media.smallest`
        font-size: 13px;
        padding: 0px 10px;
      `}
`;
