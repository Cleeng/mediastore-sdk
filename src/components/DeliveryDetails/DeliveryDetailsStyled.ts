import styled from 'styled-components';
import * as colors from 'styles/variables';

export const DeliveryDetailsStyled = styled.section.attrs(() => ({
  className: 'msd__deliveryDetails'
}))`
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

export const StyledButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 176px;
  height: 96px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${(props) =>
    props.$isActive
      ? props.theme.successColor || colors.ConfirmColor
      : colors.LineColor};
  color: ${(props) =>
    props.$isActive
      ? props.theme.successColor || colors.ConfirmColor
      : '#CCD5E2'};
  background-color: white;
  font-size: 12px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 50%;
  }

  svg {
    overflow: visible;

    path {
      fill: ${(props) =>
        props.$isActive
          ? props.theme.successColor || colors.ConfirmColor
          : '#CCD5E2'};
    }
  }
`;
