import styled from 'styled-components';
import * as colors from 'styles/variables';

export const ErrorPageStyled = styled.div`
  width: 80%;
  min-height: 350px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  color: ${colors.MainTextColor};
  font-family: 'Geomanist';
`;

export const MessageStyled = styled.div`
  margin-top: 10%;
  font-size: 25px;
  font-weight: 300;
  line-height: 1.3em;
  text-align: center;
`;
export const IconStyled = styled.img`
  width: 60px;
  height: 60px;
`;
