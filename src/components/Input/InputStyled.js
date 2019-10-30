import styled, { css } from 'styled-components';
import failIcon from 'assets/images/input/fail.svg';
import successIcon from 'assets/images/input/success.svg';
import {
  MainColor,
  LightGrey,
  MainTextColor,
  MediumGrey,
  PassOffer,
  ErrorOffer,
  TextFieldBorderFilter
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

  padding: 15px 0 13px;

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
  line-height: 1.3;
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
  top: 57px;
  left: 0;
  width: 100%;

  content: '';
  color: ${ErrorOffer};

  font-family: 'Geomanist';
  font-size: 12px;
  font-weight: 300;
  text-align: left;
`;

export const StyledPasswordVisibility = styled.img`
  height: 20px;
  width: 20px;
  filter: ${TextFieldBorderFilter};
`;
export const StyledButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  padding: 0;
  position: relative;
  margin-right: 5px;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: scale(1.5);
    height: 100%;
    background-color: rgba(0, 0, 0, 0.08);
    z-index: 0;
    content: '';
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
  }
`;
