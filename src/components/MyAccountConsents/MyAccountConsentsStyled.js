import styled, { css } from 'styled-components';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Card from 'components/Card';
import { mediaFrom } from 'styles/BreakPoints';
import { ConfirmColor } from 'styles/variables';

export const CardStyled = styled(Card)`
  margin-bottom: 0;

  ${props =>
    props.showConsentsOnly &&
    css`
      padding: 0 0 20px 0;
      border: none;
      background: transparent;
    `}
`;
export const ButtonStyled = styled(Button)`
  margin: 20px 0 10px 0;
  width: 48%;

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${mediaFrom.small &&
    css`
      margin: 20px 0 0 5px;
      width: unset;
      max-width: unset;
    `}
`;

export const CheckboxStyled = styled(Checkbox)`
  align-items: flex-start;
  line-height: 1.3rem;

  ${props =>
    props.disabled &&
    css`
      cursor: default;
    `}

  ${props =>
    props.hide &&
    css`
      display: none;
    `}
`;
export const ButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoStyled = styled.div`
  font-size: 13px;
  opacity: 0.6;
  margin-top: 15px;
`;

export const SuccessMessageStyled = styled.h6`
  color: ${ConfirmColor};
  text-align: center;
  margin: 5px 0 15px 0;
  font-size: 12px;
  position: relative;
`;
