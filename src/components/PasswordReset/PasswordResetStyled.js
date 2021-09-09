import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const PasswordResetPageStyled = styled.main.attrs(() => ({
  className: 'msd__rest-password'
}))`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;

  color: ${colors.MainColor};

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
  className: 'msd__rest-password__title'
}))`
  margin: 40px 0 25px 0;

  font-size: 25px;
  font-weight: 600;
`;

export const StyledMessage = styled.div.attrs(() => ({
  className: 'msd__rest-password__message'
}))`
  font-weight: 300;
  & strong {
    font-weight: bold;
  }
`;

export const FormStyled = styled.form.attrs(() => ({
  className: 'msd__rest-password__form'
}))`
  width: 80%;

  margin: 30px auto 50px auto;

  ${media.smallest`
    width:100%;
  `}
`;
