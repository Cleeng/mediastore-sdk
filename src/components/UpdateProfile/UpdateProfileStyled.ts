import styled from 'styled-components';
import * as colors from 'styles/variables';

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__user-profile__wrapper'
}))`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: ${(props) =>
    props.theme.backgroundColor || colors.BackgroundColor};
`;
