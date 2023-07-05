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
  gap: 24px; // different than design (21px)
`;

export const StyledButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 176px; // different than design (177px)
  height: 96px; // different than design (95px)
  border-radius: 12px; // ?
  border: 1px solid; // ?
  border-color: ${({ isActive }) =>
    isActive
      ? '#4EB7A1'
      : colors.LineColor}; // inactive should be same as font and icon?
  color: ${({ isActive }) => (isActive ? '#4EB7A1' : '#CCD5E2')};
  background-color: white;
  font-size: 12px; // ?
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 50%;
  }

  svg path {
    fill: ${({ isActive }) =>
      isActive ? '#4EB7A1' : '#CCD5E2'}; // maybe make same as LineColor
  }
`;
