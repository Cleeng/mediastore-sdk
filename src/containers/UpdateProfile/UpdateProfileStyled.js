import styled from 'styled-components';
import * as colors from 'styles/variables';

const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__user-profile__wrapper'
}))`
  width: 100%;
  padding: 20px;
  background: ${colors.BackgroundColor};
`;

export default WrapStyled;
