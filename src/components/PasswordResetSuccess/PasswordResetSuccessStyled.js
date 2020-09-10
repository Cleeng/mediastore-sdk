import styled, { keyframes } from 'styled-components';
import * as colors from 'styles/variables';

export const PasswordResetSuccessPageStyled = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;
  text-align: center;
  line-height: 1.3em;
  font-size: 15px;
  color: ${colors.MainColor};
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

export const StyledLink = styled.span`
  font-family: 'Geomanist';
  color: ${colors.MainColor};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export const NoteStyled = styled.div`
  margin: 35px 35px 0;
  padding-top: 20px;
  border-top: 1px ${colors.MediumGrey} solid;
  font-size: 13px;
`;

export const Loader = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-color: #5cb85c;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: 7em;
  height: 7em;
  transition: border 500ms ease-out;
`;

const animateCheckmark = keyframes`
    0% {
      height: 0;
      width: 0;
      opacity: 1;
    }

    20% {
      height: 0;
      width: 1.75em;
      opacity: 1;
    }

    40% {
      height: 3.5em;
      width: 1.75em;
      opacity: 1;
    }

    100% {
      height: 3.5em;
      width: 1.75em;
      opacity: 1;
    }
  `;

export const Checkmark = styled.div`
  animation-duration: 800ms;
  animation-timing-function: ease;
  animation-name: ${animateCheckmark};
  transform: scaleX(-1) rotate(135deg);
  opacity: 1;
  height: 3.5em;
  width: 1.75em;
  transform-origin: left top;
  border-right: 3px solid #5cb85c;
  border-top: 3px solid #5cb85c;
  content: '';
  left: 1.75em;
  top: 3.5em;
  position: absolute;
`;
