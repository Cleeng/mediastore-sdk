import styled, { css } from 'styled-components';
import { media } from 'styles/BreakPoints';

export const InputComponentStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  padding: 10px;
  width: 100%;
`;

export const LabelStyled = styled.label.attrs(() => ({
  className: 'msd__input__label'
}))`
  position: absolute;
  top: 17px;
  left: 14px;

  margin: 0;
  padding: 0 3px;

  color: ${({ theme }) => theme.FontColor};
  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${props =>
    props.withIcon &&
    css`
      left: 40px;
    `}

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;

    width: 100%;
    height: 15px;

    background: ${({ theme }) => theme.BackgroundColor};

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

  ${props =>
    props.hasValue &&
    props.withIcon &&
    css`
      transform: translate(-26px, -25px) scaleY(0.9);
    `}
`;

export const InputElementWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__input__wrapper'
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  padding: 13px 0 14px;

  background: transparent;
  border: 1px solid #b7bfca;
  transition: 0.2s ease-in-out;

  &:focus-within {
    border-color: ${({ theme }) => theme.ConfirmColor};
    ${LabelStyled} {
      color: ${({ theme }) => theme.ConfirmColor};
      transform: translate(0, -25px) scaleY(0.9);
      &::after {
        opacity: 1;
      }
    }
  }

  ${props =>
    props.icon &&
    css`
      &::before {
        content: url(${props.icon});
      }
    `};
`;

export const InputElementStyled = styled.input.attrs(() => ({
  className: 'msd__input'
}))`
  flex-grow: 1;
  position: relative;
  width: auto;

  margin: 0 15px;

  color: ${({ theme }) => theme.FontColor};
  background: transparent;
  border: none;
  outline: none;

  font-size: 15px;
  line-height: 1.3;

  &:focus + label {
    transform: translate(0, -25px) scaleY(0.9);
    color: ${({ theme }) => theme.ConfirmColor};
    ${props =>
      props.withIcon &&
      css`
        transform: translate(-26px, -25px) scaleY(0.9);
      `}
    &::after {
      opacity: 1;
    }
  }

  ${props =>
    props.floatingLabels === false &&
    css`
      & + label {
        transform: translate(0, -25px) scaleY(0.9);
        &::after {
          opacity: 1;
        }
      }
    `}

  ${media.small`
    width: 100%;
  `}

  ${props =>
    props.type === 'date' &&
    css`
      text-transform: uppercase;
      &::-webkit-inner-spin-button,
      &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
      }
      & + label {
        transform: translate(-26px, -25px) scaleY(0.9);
        &::after {
          opacity: 1;
        }
      }
    `}
`;

export const ErrorWrapper = styled.div.attrs(() => ({
  className: 'msd__error'
}))`
  width: 100%;
  height: 13px;
  margin-top: 8px;

  content: '';
  color: ${({ theme }) => theme.ErrorColor};
  transition: 0.2s ease-in-out;

  ${props =>
    props.passwordStrength &&
    css`
      color: ${props.theme.PasswordStrengthColors[props.passwordStrength]};
    `}

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

export const StyledPasswordVisibility = styled.img.attrs(() => ({
  className: 'msd__icon--password'
}))`
  height: 20px;
  width: 20px;
  filter: ${({ theme }) => theme.TextFieldBorderFilter};
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

export const InputRequiredStyled = styled.span.attrs(() => ({
  className: 'msd__icon__required--error'
}))`
  display: block;
  position: absolute;
  right: 16px;
  height: 9px;
  font-size: 12px;
  line-height: 12px;
  top: 50%;
  color: ${({ theme }) => theme.ErrorColor};
  transform: translate(0, -50%);
  z-index: 1;
`;
