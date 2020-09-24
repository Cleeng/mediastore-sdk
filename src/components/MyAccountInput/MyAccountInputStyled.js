import styled, { css } from 'styled-components';
import {
  MainColor,
  BackgroundColor,
  LineColor,
  ErrorColor
} from 'styles/variables';

export const WrapStyled = styled.div`
  position: relative;
  margin-bottom: 12px;

  ${props =>
    props.hideInput &&
    css`
      display: none;
    `};
`;

export const InputElementLabelStyled = styled.label`
  display: block;
  margin-bottom: 12px;
  color: ${MainColor};
  font-size: 13px;
`;

export const InputElementStyled = styled.input`
  width: 100%;
  padding: 10px 16px;

  border: 1px solid ${LineColor};
  border-radius: 4px;
  font-size: 13px;
  line-height: 13px;

  &:focus,
  &:active {
    border: 1px solid ${LineColor};
  }

  &:disabled {
    background-color: ${BackgroundColor};
    color: ${MainColor};
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid ${ErrorColor};
    `}
`;
