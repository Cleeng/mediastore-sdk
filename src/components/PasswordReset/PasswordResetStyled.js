import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const PasswordResetWrapperStyled = styled.div`
  position: relative;
  background: ${colors.BackgroundColor};
  * {
    box-sizing: border-box;
  }
`;

export const PasswordResetPageStyled = styled.main.attrs(() => ({
  className: 'msd__reset-password'
}))`
  width: 100%;
  margin: 0 auto;
  padding: 40px 10%;

  color: ${colors.FontColor};

  text-align: center;
  line-height: 1.3em;
  font-size: 15px;

  font-weight: bold;
  & button {
    margin-top: 30px;
  }

  ${media.smallest`
    width:90%;
    & button {
      margin-top: 50px;
    }
  `}
`;

export const StyledTitle = styled.div.attrs(() => ({
  className: 'msd__reset-password__title'
}))`
  margin: 40px 0 25px 0;

  font-size: 25px;
  font-weight: 600;
`;

export const StyledMessage = styled.div.attrs(() => ({
  className: 'msd__reset-password__message'
}))`
  font-weight: 300;
  & strong {
    font-weight: bold;
  }
`;

export const FormStyled = styled.form.attrs(() => ({
  className: 'msd__reset-password__form'
}))`
  width: 80%;

  margin: 30px auto 50px auto;

  ${media.smallest`
    width:100%;
  `}
`;
