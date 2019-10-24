import styled, { css } from 'styled-components';
import failIcon from 'assets/images/input/fail.svg';
import successIcon from 'assets/images/input/success.svg';
import {
  MainColor,
  LightGrey,
  MainTextColor,
  MediumGrey,
  PassOffer,
  ErrorOffer
} from 'styles/variables';
import { MESSAGE_TYPE_SUCCESS } from './InputConstants';

export const InputComponentStyled = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
`;

export const InputElementWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  padding: 17px 0 13px;

  background: white;
  border-bottom: 1px solid ${LightGrey};
  &:focus-within {
    border-bottom-color: ${MainColor};
  }
  ${props =>
    props.error &&
    css`
      border-bottom-color: ${ErrorOffer};
    `}

  ${props =>
    props.icon &&
    css`
      &::before {
        content: url(${props.icon});
      }
    `};

  ${props =>
    props.showMessage &&
    css`
      &::after {
        content: url(${props.messageType === MESSAGE_TYPE_SUCCESS
          ? successIcon
          : failIcon});
      }
    `};
`;

export const InputElementStyled = styled.input`
  flex-grow: 1;
  position: relative;

  margin: 0 15px;

  color: ${MainTextColor};
  border: none;
  outline: none;

  font-size: 15px;
`;

export const MessageStyled = styled.div`
  padding: 10px;

  background-color: ${MediumGrey};
  color: ${props =>
    props.messageType === MESSAGE_TYPE_SUCCESS ? PassOffer : ErrorOffer};
  border-radius: 5px;

  font-size: 12px;

  opacity: ${props => (props.showMessage ? 1 : 0)};
  transition: opacity 250ms linear;
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;

  content: '';
  color: ${ErrorOffer};

  font-family: 'Geomanist';
  font-size: 12px;
  font-weight: 300;
  text-align: left;
`;
