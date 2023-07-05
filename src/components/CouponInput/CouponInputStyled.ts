import styled, { css } from 'styled-components';
import * as Colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input/InputConstants';
import {
  InputComponentStyledProps,
  MessageStyledProps,
  InputElementStyledProps,
  CloseButtonStyledProps
} from './CouponInput.types';

export const InputComponentStyled = styled.form.attrs(() => ({
  className: 'msd__coupon-input__wrapper',
  'data-testid': 'inputcomponent'
}))<InputComponentStyledProps>`
  display: flex;
  flex-direction: column;

  max-width: 300px;

  ${props =>
    props.fullWidth &&
    props.isOpened &&
    css`
      max-width: 100%;
      width: 100%;
    `};
`;

export const MessageStyled = styled.div.attrs(() => ({
  className: 'msd__coupon-input__message'
}))<MessageStyledProps>`
  color: ${props =>
    props.messageType === MESSAGE_TYPE_SUCCESS
      ? Colors.ConfirmColor
      : Colors.ErrorColor};
  border-radius: 5px;

  font-size: 12px;

  opacity: ${props => (props.showMessage ? 1 : 0)};
  transition: opacity 250ms linear;
`;

export const InputElementWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__coupon-input__wrapper--inner'
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

  border: 1px solid ${Colors.LineColor};
  border-radius: 30px;

  background: white;
  transition: 0.2s ease-in-out;

  /* &:focus-within {
    border-color: ${Colors.FocusColor};
  } */
  &:focus {
    outline: 1px solid #fab;
  }
`;

export const InputElementStyled = styled.input.attrs(() => ({
  className: 'msd__coupon-input__input',
  role: 'input'
}))<InputElementStyledProps>`
  flex-grow: 1;
  position: relative;
  width: 0px;

  padding: 0;

  border: none;
  outline: none;

  font-size: 15px;
  line-height: 1.3;
  ${props =>
    props.isOpened &&
    css`
      width: 198px;
      max-width: 198px;
      inset-inline-start: 37px;
      padding-right: 25px;
      ${media.small`
        width: 100%;
        max-width: 100%;
      `}

      ${props.fullWidth &&
        css`
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

export const CloseButtonStyled = styled.button.attrs(() => ({
  className: 'msd__coupon-input__close'
}))<CloseButtonStyledProps>`
  position: absolute;
  height: 22px;
  width: 22px;
  top: 50%;
  inset-inline-start: 7px;
  transform: translate(0, -50%);
  background-color: ${Colors.PrimaryColor};
  opacity: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    transform: scale(0.3);
    fill: ${Colors.White};
  }

  ${props =>
    props.isInputOpened &&
    css`
      opacity: 1;
    `}
`;
