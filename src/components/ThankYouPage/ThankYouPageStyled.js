import styled from 'styled-components';
import * as colors from 'styles/variables';

export const ThankYouPageStyled = styled.main`
  max-width: 420px;
  margin: 0 auto;
  padding: 50px 0 80px;
  text-align: center;
  line-height: 1.3em;
  font-size: 15px;
  color: ${colors.MainColor};
  font-family: 'Geomanist';
  font-weight: bold;
`;

export const IconStyled = styled.img``;

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
  color: ${colors.MainColor};
  padding-left: 4px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
