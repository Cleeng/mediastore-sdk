import styled, { css } from 'styled-components';
import {
  FontColor,
  ErrorColor,
  ConfirmColor,
  LineColor,
  FocusColor
} from '../../styles/variables';
import tickIcon from '../../assets/images/input/tickIB.svg';
import enableIcon from '../../assets/images/input/enable_checkIB.svg';

export const CheckboxStyled = styled.div.attrs(props => ({
  className: `msd__consents ${props.disabled ? 'msd__consents--disabled' : ''}`
}))`
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
  ${props =>
    props.disabled &&
    css`
      opacity: 0.7;
    `}
`;

export const ConsentDefinitionStyled = styled.div.attrs(props => ({
  className: `msd__consents__text ${
    props.checked ? 'msd__consents__text--checked' : ''
  }`
}))`
  position: relative;
  padding-left: 10px;
  margin-top: 0;

  font-weight: 400;
  text-align: left;
  a {
    color: ${FontColor};

    text-decoration: underline;
    &:focus {
      outline: 2px solid ${FocusColor};
    }
  }
  opacity: 0.8;
  ${props =>
    props.checked &&
    css`
      opacity: 1;
    `}
`;

export const CheckFrameStyled = styled.div.attrs(props => ({
  className: `msd__consents__frame ${
    props.error ? 'msd__consents__frame--error' : ''
  } ${props.checked ? 'msd__consents__frame--checked' : ''}
  ${props.isRadioButton ? 'msd__consents__frame--radio' : ''} ${
    props.isMyAccount ? 'msd__consents__frame--account' : ''
  }`
}))`
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
  ${props =>
    props.error &&
    css`
      border-color: ${ErrorColor};
    `}
  ${props =>
    props.isRadioButton &&
    css`
      border-radius: 50%;
    `}
  ${props =>
    props.isRadioButton &&
    props.checked &&
    css`
      border: 1px solid ${ConfirmColor};
    `}

  ${props =>
    props.isMyAccount &&
    props.checked &&
    css`
      border-color: ${ConfirmColor};
    `}
`;

export const CheckMarkStyled = styled.div.attrs(props => ({
  className: `msd__consents__check-mark ${
    props.isRadioButton ? 'msd__consents__check-mark--radio' : ''
  } ${props.isMyAccount ? 'msd__consents__check-mark--account' : ''}`
}))`
  position: absolute;

  width: 13px;
  height: 10px;
  top: 4px;
  left: 3px;

  background-image: url(${tickIcon});
  background-repeat: no-repeat;
  ${props =>
    props.isRadioButton &&
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 12px;
      height: 12px;

      background: ${ConfirmColor};
      border-radius: 50%;
    `}
  ${props =>
    props.isMyAccount &&
    css`
      width: 20px;
      height: 20px;
      top: -1px;
      left: -1px;
      background-image: url(${enableIcon});
      background-position: center;
      background-size: cover;
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
