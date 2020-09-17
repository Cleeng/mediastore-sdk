import styled, { css } from 'styled-components';
import * as Colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const InputComponentStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  padding: 10px;
  width: 100%;
`;

export const InputElementWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  padding: 13px 0 14px;

  background: white;
  border: 1px solid ${Colors.MediumGrey};
  transition: 0.2s ease-in-out;

  &:focus-within {
    border-color: ${Colors.ConfirmColor};
  }

  ${props =>
    props.icon &&
    css`
      &::before {
        content: url(${props.icon});
      }
    `};
`;

export const LabelStyled = styled.label`
  position: absolute;
  top: 17px;
  left: 14px;

  margin: 0;
  padding: 0 3px;

  color: ${Colors.MainColor};
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;

    width: 100%;
    height: 15px;

    background: #fff;

    z-index: -1;
    opacity: 0;
  }

  ${props =>
    props.hasValue &&
    css`
      transform: translate(0, -25px) scaleY(0.9);
      &::after {
        opacity: 1;
      }
    `}
`;

export const InputElementStyled = styled.input`
  flex-grow: 1;
  position: relative;
  width: auto;

  margin: 0 15px;

  color: ${Colors.MainColor};
  border: none;
  outline: none;

  font-size: 15px;
  line-height: 1.3;

  &:focus + label {
    transform: translate(0, -25px) scaleY(0.9);
    color: ${Colors.ConfirmColor};
    &::after {
      opacity: 1;
    }
  }

  ${media.small`
    width: 100%;
  `}
`;

export const ErrorWrapper = styled.div`
  width: 100%;
  height: 13px;
  margin-top: 8px;

  content: '';
  color: ${Colors.ErrorColor};
  transition: 0.2s ease-in-out;

  ${props =>
    props.passwordStrength &&
    css`
      color: ${Colors[props.passwordStrength]};
    `}

  font-family: 'Geomanist';
  font-size: 13px;
  text-align: left;

  ${props =>
    props.isMyAccount &&
    css`
      position: relative;
      margin: 5px 0 10px 0;
      top: unset;
    `}
`;

export const StyledPasswordVisibility = styled.img`
  height: 20px;
  width: 20px;
  filter: ${Colors.TextFieldBorderFilter};
`;
export const StyledButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  padding: 0;
  position: relative;
  margin-right: 15px;
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
  &:hover::after,
  &:focus::after {
    opacity: 1;
  }
`;
