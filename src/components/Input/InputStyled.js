import styled, { css } from 'styled-components';
import * as Colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const InputComponentStyled = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  width: 100%;
`;

export const InputElementWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  padding: 15px 0 13px;

  background: white;
  border-bottom: 1px solid ${Colors.MediumGrey};
  transition: .2s ease-in-out;
  ${props =>
    !props.passwordStrength &&
    css`
      &:focus-within {
        border-bottom-color: ${Colors.MainColor};
      }
    `}

  ${props =>
    props.passwordStrength &&
    css`
      border-bottom-color: ${Colors[props.passwordStrength]};
    `}

  ${props =>
    props.error &&
    css`
      border-bottom-color: ${Colors.ErrorColor};
    `}

  ${props =>
    props.icon &&
    css`
      &::before {
        content: url(${props.icon});
      }
    `};

  ${props =>
    props.passwordStrength &&
    css`
      border-bottom-color: ${Colors[props.passwordStrength]};
    `}
`;

export const InputElementStyled = styled.input`
  flex-grow: 1;
  position: relative;
  width: auto;

  margin: 0 15px;

  color: ${Colors.InputText};
  border: none;
  outline: none;

  font-size: 15px;
  line-height: 1.3;

  ${media.small`
    width: 100%;
  `}
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  top: 57px;
  left: 0;
  width: 100%;

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
  &:hover::after,
  &:focus::after {
    opacity: 1;
  }
`;
