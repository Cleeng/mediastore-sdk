import styled from 'styled-components';
import { FontColor } from 'styles/variables';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__profile-password'
}))``;

export const InnerWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OldPasswordStyled = styled.span.attrs(() => ({
  className: 'msd__profile-password__old'
}))`
  color: ${(props) => props.theme.fontColor || FontColor};
  letter-spacing: 2px;
  font-weight: 700;
`;
