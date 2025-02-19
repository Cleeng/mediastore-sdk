import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import * as Colors from 'styles/variables';

type ReactSelectStyledProps = {
  $isMyAccount: boolean | undefined;
  $required: boolean;
};
export const SelectStyled = styled.div.attrs(() => ({
  className: 'msd__select__wrapper'
}))`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
`;

export const ReactSelectStyled = styled(ReactSelect).attrs(() => ({
  className: 'msd__select'
}))<ReactSelectStyledProps>`
  &:focus-within,
  &:focus {
    border-color: ${(props) => props.theme.successColor || Colors.ConfirmColor};
  }
  .react-select__control {
    background: white;
    border: 1px solid ${Colors.MediumGrey};
    border-radius: 0;
    transition: 0.2s ease-in-out;
    &--is-focused {
      &:focus-within,
      &:focus {
        border-color: ${(props) =>
          props.theme.successColor || Colors.ConfirmColor};
        box-shadow: none;
      }
    }
    &--is-disabled {
      background-color: ${(props) =>
        props.theme.backgroundColor || Colors.BackgroundColor};
    }
  }
  .react-select__placeholder {
    color: ${(props) => props.theme.fontColor || Colors.FontColor};
  }
  .react-select__value-container {
    padding: 13px 15px 14px;
    color: ${(props) => props.theme.fontColor || Colors.FontColor};
  }
  .react-select__menu {
    border-radius: 0px;
  }
  .react-select__menu-list {
  }
  .react-select__option {
    padding: 13px 15px 14px;
    text-align: left;
    &--is-focused {
      background-color: ${Colors.MediumGrey};
    }
    &--is-selected {
      color: ${(props) => props.theme.successColor || Colors.ConfirmColor};
      background-color: #fff;
    }
  }
  ${(props) =>
    props.$isMyAccount &&
    css`
      .react-select__control {
        border: 1px solid #d3dbe6;
        border-radius: 4px;
      }
      .react-select__value-container {
        padding: 0 16px;
        font-size: 13px;
      }
    `}
  ${(props) =>
    props.$required &&
    css`
      .react-select__value-container {
        &::after {
          display: block;
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translate(0, -50%);
          content: '*';
          height: 9px;
          font-size: 12px;
          line-height: 12px;
          color: ${props.theme.errorColor || Colors.ErrorColor};
        }
      }
    `}
`;
