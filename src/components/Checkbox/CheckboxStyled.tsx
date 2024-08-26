import styled, { css } from 'styled-components';
import {
  FontColor,
  ErrorColor,
  ConfirmColor,
  LineColor,
  FocusColor
} from '../../styles/variables';

type CheckboxStyledProps = {
  $disabled: boolean;
  $className: string;
};
type ConsentDefinitionStyledProps = {
  $checked: boolean;
};
type CheckFrameStyledProps = {
  $error?: boolean;
  $checked?: boolean;
  $isRadioButton?: boolean;
  $isMyAccount?: boolean;
};
type CheckMarkStyledProps = {
  $isRadioButton?: boolean;
  $isMyAccount?: boolean;
};
type TermsLinkStyledProps = {
  $isPayPal?: boolean;
  $checked: boolean;
};

export const HiddenCheckboxInput = styled.input`
  position: absolute;
  width: 1em;
  height: 1em;
  opacity: 0;
`;

export const CheckboxStyled = styled.label.attrs(
  (props: CheckboxStyledProps) => ({
    className: `msd__consents ${
      props.$disabled ? 'msd__consents--disabled' : ''
    } ${props.$className}`
  })
)<CheckboxStyledProps>`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-top: 10px;

  align-items: center;
  font-size: 13px;
  color: ${FontColor};

  &:focus {
    outline: none;
  }
  &:first-of-type {
    margin-top: 0;
  }
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.7;
    `}
`;

export const ConsentDefinitionStyled = styled.div.attrs(
  (props: ConsentDefinitionStyledProps) => ({
    className: `msd__consents__text ${
      props.$checked ? 'msd__consents__text--checked' : ''
    }`
  })
)<ConsentDefinitionStyledProps>`
  position: relative;
  padding-inline-start: 10px;
  margin-top: 0;

  font-weight: 400;
  text-align: left;

  user-select: none;
  a {
    color: ${FontColor};

    text-decoration: underline;
    &:focus {
      outline: 2px solid ${FocusColor};
    }
  }
  opacity: 0.8;
  ${(props) =>
    props.$checked &&
    css`
      opacity: 1;
    `}
`;

export const CheckFrameStyled = styled.div.attrs(
  (props: CheckFrameStyledProps) => ({
    className: `msd__consents__frame ${
      props.$error ? 'msd__consents__frame--error' : ''
    } ${props.$checked ? 'msd__consents__frame--checked' : ''}
  ${props.$isRadioButton ? 'msd__consents__frame--radio' : ''}`
  })
)<CheckFrameStyledProps>`
  position: relative;
  box-sizing: border-box;

  border: 1px solid ${LineColor};
  border-radius: 2px;
  width: 20px;
  min-width: 20px;
  height: 20px;

  &:focus {
    outline: 2px solid ${FocusColor};
  }
  ${(props) =>
    props.$error &&
    css`
      border-color: ${ErrorColor};
    `}
  ${(props) =>
    props.$isRadioButton &&
    css`
      border-radius: 50%;
    `}
  ${(props) =>
    props.$isRadioButton &&
    props.$checked &&
    css`
      border: 1px solid ${ConfirmColor};
    `}
`;

export const CheckMarkStyled = styled.div.attrs(
  (props: CheckMarkStyledProps) => ({
    className: `msd__consents__check-mark ${
      props.$isRadioButton ? 'msd__consents__check-mark--radio' : ''
    } ${props.$isMyAccount ? 'msd__consents__check-mark--account' : ''}`
  })
)<CheckMarkStyledProps>`
  position: absolute;

  width: 13px;
  height: 10px;
  top: -1px;
  left: -1px;

  svg {
    fill: ${ConfirmColor};
  }

  ${(props) =>
    props.$isRadioButton &&
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 12px;
      height: 12px;

      background: ${ConfirmColor};
      border-radius: 50%;
    `}
  ${(props) =>
    props.$isMyAccount &&
    css`
      width: 20px;
      height: 20px;
      top: -1px;
      left: -1px;
    `}
`;

export const ErrorFieldStyled = styled.div`
  position: relative;

  width: 100%;
  margin-top: 10px;

  color: ${ErrorColor};

  font-size: 12px;
  font-weight: 300;
  text-align: center;
`;

export const TermsLinkStyled = styled.a<TermsLinkStyledProps>`
  padding-inline-start: ${(props) => (props.$isPayPal ? '31px' : '33px')};
  position: relative;
  top: ${({ $isPayPal }) => ($isPayPal ? '0' : '-20px')};
  font-weight: 400;
  font-size: 11px;
  line-height: 17px;
  text-align: left;
  color: ${FontColor};
  text-decoration: underline;
  opacity: 0.8;

  ${(props) =>
    props.$checked &&
    css`
      opacity: 1;
    `}
`;
