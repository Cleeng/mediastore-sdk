import styled from 'styled-components';
import { BackgroundColor } from 'styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__subscription-switches__wrapper'
}))`
  width: 100%;
  padding: 20px;
  background: ${BackgroundColor};
`;
