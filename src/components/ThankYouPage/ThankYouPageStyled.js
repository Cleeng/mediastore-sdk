import styled from 'styled-components';
import * as colors from 'styles/variables';

export const ThankYouPageStyled = styled.div`
  width: 80%;
  margin: 0 auto;
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
  margin-top: 75px;
  margin-bottom: 25px;
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
  margin: 0 35px;
  border-top: 1px ${colors.LightGrey} solid;
  padding-top: 20px;
  margin-top: 35px;
`;

export const ButtonsStyled = styled.div`
  display: flex;
  justify-content: center;

  & button:first-child {
    margin-right: 13px;
  }
`;

export const ShareStyled = styled.div`
  color: ${colors.FontLightColor};
  font-family: 'Geomanist';
  font-weight: 300;
  font-size: 13px;
  margin-top: 15px;
`;
