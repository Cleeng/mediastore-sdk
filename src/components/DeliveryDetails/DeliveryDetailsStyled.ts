import styled from 'styled-components';
import { FontColor } from 'styles/variables';
import * as colors from 'styles/variables';

// attrs with classNames needed?

export const DeliveryDetailsStyled = styled.section.attrs(() => ({
  className: 'msd__deliveryDetails'
}))`
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 21px; // ?
`;

export const StyledButton = styled.button<{ isActive: boolean }>`
  width: 177px; // ?
  height: 95px;
  border-radius: 12px; // ?
  border: 1px solid; // ?
  border-color: ${({ isActive }) => (isActive ? '#4641e9' : colors.LineColor)};
  color: ${FontColor};
  background-color: white;
  font-size: 12px; // ?
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 50%;
  }
`;
