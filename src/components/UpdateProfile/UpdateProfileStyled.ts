import styled from 'styled-components';
import * as colors from 'styles/variables';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__user-profile__wrapper'
}))`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: ${(props) =>
    props.theme.backgroundColor || colors.BackgroundColor};
`;

export const SectionStyled = styled.section``;
