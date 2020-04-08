import styled from 'styled-components';
import * as colors from 'styles/variables';

export const ThankYouPageStyled = styled.main`
  margin: 0 35px;
  padding: 40px 0;
  text-align: center;
  line-height: 1.3em;
  font-size: 15px;
  color: ${colors.MainTextColor};
  font-family: 'Geomanist';
  font-weight: bold;
`;

export const TitleStyled = styled.div`
  font-size: 25px;
  margin: 30px 0;
  font-weight: 600;
`;

export const MessageStyled = styled.div`
  font-family: 'Geomanist';
  font-weight: 300;
  & strong {
    font-weight: bold;
  }
`;

export const LinkStyled = styled.a`
  font-family: 'Geomanist';
  color: ${colors.MainTextColor};
  padding-left: 4px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export const SocialsStyled = styled.div`
  border-top: 1px ${colors.MediumGrey} solid;
  padding-top: 20px;
  margin: 70px 0 20px 0;
`;

export const ButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 65px;

    &::before {
      left: 50%;
      transform: translate(-45%, -50%);
    }
  }
  & button:first-child {
    margin-right: 13px;
  }
`;

export const ShareStyled = styled.div`
  color: ${colors.MainTextColor};
  font-family: 'Geomanist';
  font-weight: 300;
  font-size: 13px;
  margin-top: 15px;
`;
