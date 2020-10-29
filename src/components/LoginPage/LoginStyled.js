import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const ContentWrapperStyled = styled.main`
  position: relative;

  width: 55%;
  margin: 0 auto;
  padding-bottom: 70px;

  text-align: center;

  ${media.small`
    width: 80%;
  `}
`;

export const FromStyled = styled.form`
  padding-top: 40px;
  & input {
    position: relative;
  }
`;

export const SocialStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  margin-top: 10px;

  p {
    margin-top: 20px;
  }

  button {
    width: 48%;
    margin: 10px 0 0 0;
  }

  ${media.smallest`
    flex-direction: column;
    
    margin-bottom: 20px;
    
    button{
      width: 100%;

      margin: 5px 0;
    }
  `}
`;

export const SeparatorStyled = styled.div`
  display: block;
  width: 100%;

  padding: 20px 0;

  color: ${colors.MainColor};

  text-align: center;
  font-size: 13px;

  overflow: hidden;

  &::before,
  &::after {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    content: '';
    height: 1px;
    width: 40%;

    background-color: ${colors.MediumGrey};
  }
  &::before {
    right: 5%;

    margin-left: -50%;
  }
  &::after {
    left: 5%;
    margin-right: -50%;
  }
`;

export const FormErrorStyled = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;

  color: ${colors.ErrorColor};

  font-size: 13px;
  font-weight: 600;
  font-family: 'Geomanist';

  a {
    color: ${colors.ErrorColor};
    font-weight: 600;
    text-decoration: underline;
  }
`;

export const FormSuccessStyled = styled.h1`
  color: ${colors.ConfirmColor};
  position: absolute;
  top: 20px;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Geomanist';
`;
