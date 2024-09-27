import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { ConfirmColor } from 'styles/variables';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Card from 'components/Card';
import { ButtonStyledProps } from 'components/Button/Button.types';

export const CardStyled = styled(Card).attrs(() => ({
  className: 'msd__profile-consents__card'
}))<{ showConsentsOnly: boolean }>`
  margin-bottom: 0;

  ${(props) =>
    props.showConsentsOnly &&
    css`
      padding: 0 0 20px 0;
      border: none;
      background: transparent;
      &:first-child {
        margin-top: 0;
      }
    `}
`;
export const ButtonStyled = styled(Button).attrs(() => ({
  className: 'msd__profile-consents__button'
}))<ButtonStyledProps>`
  margin: 20px 0 10px 0;
  width: 48%;
  min-width: 100px;

  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}

  ${mediaFrom.small`
    margin: 20px 0 0 5px;
    width: unset;
    max-width: unset;
  `}
`;

export const CheckboxStyled = styled(Checkbox).attrs(() => ({
  className: 'msd__profile-consents__checkbox'
}))<{ $hide: boolean }>`
  align-items: flex-start;
  line-height: 1.3rem;

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
    `}

  ${(props) =>
    props.$hide &&
    css`
      display: none;
    `}
`;
export const ButtonWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__profile-buttons__wrapper'
}))`
  display: flex;
  justify-content: flex-end;
`;

export const InfoStyled = styled.div.attrs(() => ({
  className: 'msd__profile__info'
}))`
  font-size: 13px;
  opacity: 0.6;
  margin-top: 15px;
`;

export const SuccessMessageStyled = styled.h6.attrs(() => ({
  className: 'msd__message--success'
}))`
  color: ${(props) => props.theme.successColor || ConfirmColor};
  text-align: center;
  margin: 5px 0 15px 0;
  font-size: 12px;
  position: relative;
`;
