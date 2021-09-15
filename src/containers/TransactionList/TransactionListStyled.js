import styled from 'styled-components';
import { FontColor, BackgroundColor } from 'styles/variables';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__transactions-list__wrapper'
}))`
  width: 100%;
  padding: 20px;
  background: ${BackgroundColor};
`;

export const HeaderStyled = styled.div`
  color: ${FontColor};

  font-size: 14px;
  font-weight: 700;
`;
