import styled from 'styled-components';
import * as colors from 'styles/variables';

export const PasswordResetPageStyled = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;

  color: ${colors.MainTextColor};

  text-align: center;
  line-height: 1.3em;
  font-size: 15px;
  font-family: 'Geomanist';
  font-weight: bold;
  & button {
    margin-top: 30px;
  }
`;

export const StyledTitle = styled.div`
  margin: 40px 0 25px 0;

  font-size: 25px;
  font-weight: 600;
`;

export const StyledMessage = styled.div`
  font-family: 'Geomanist';
  font-weight: 300;
  & strong {
    font-weight: bold;
  }
`;

export const InnerWrapper = styled.div`
  width: 80%;
  margin: 30px auto 0 auto;
`;
