import styled from 'styled-components';
import * as colors from 'styles/variables';

export const PasswordResetPageStyled = styled.div`
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

export const StyledTitle = styled.div`
  font-size: 25px;
  margin-top: 75px;
  margin-bottom: 25px;
  font-weight: 600;
`;

export const StyledMessage = styled.div`
  font-family: 'Geomanist';
  font-weight: 300;
  & strong {
    font-weight: bold;
  }
`;
