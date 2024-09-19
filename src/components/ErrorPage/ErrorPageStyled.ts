import styled from 'styled-components';
import * as colors from 'styles/variables';

export const ErrorPageWrapper = styled.div.attrs(() => ({
  className: 'msd__error-page'
}))`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
`;

export const ErrorPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  min-height: 350px;
  margin: 0 auto;
  padding: 80px 120px 70px;

  background-color: ${(props) =>
    props.theme.backgroundColor || colors.BackgroundColor};
  color: ${(props) => props.theme.fontColor || colors.FontColor};

  font-size: 15px;
`;

export const MessageStyled = styled.div`
  margin-top: 30px;

  font-size: 25px;
  font-weight: 300;
  line-height: 1.3em;
  text-align: center;
`;
export const IconStyled = styled.div`
  width: 100px;
  height: auto;
`;
