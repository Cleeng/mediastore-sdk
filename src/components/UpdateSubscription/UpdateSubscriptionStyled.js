import styled, { keyframes } from 'styled-components';
import { MyAccountTextDark2, DisabledInputColor } from 'styles/variables';
import { mediaFrom, media } from 'styles/BreakPoints';
import Card from 'components/Card';
import Footer from 'components/Footer';

export const SurveyCard = styled(Card)`
  min-height: 500px;
  display: flex;
  ${media.small`
    display: flex;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  `};
`;

export const WrapperStyled = styled.div`
  padding: 30px 10px;
  margin: auto;
`;
export const HeaderStyled = styled.h1`
  margin-bottom: 15px;

  color: ${MyAccountTextDark2};

  font-size: 18px;
  font-weight: 700;
`;

export const SubTitleStyled = styled.p`
  margin-bottom: 20px;

  color: ${MyAccountTextDark2};

  font-size: 13px;
  line-height: 20px;

  ${mediaFrom.small`
    max-width: 80%;
  `};
`;

export const ReasonsWrapper = styled.ul`
  margin: 30px 0;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 40%;
    margin: 0 5px;
    font-weight: 700;
    &:disabled {
      cursor: not-allowed;
      background: ${DisabledInputColor};
    }
  }
`;

export const StyledItem = styled.li`
  margin: 0 0 20px 0;
  color: ${MyAccountTextDark2};

  font-size: 13px;
`;
export const UnsubscribedWrapper = styled.div`
  text-align: center;
  padding: 80px 0;
  p {
    margin: auto;
  }
  img {
    margin-bottom: 20px;
  }
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
  margin-bottom: 20px;
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

export const StrongStyled = styled.strong`
  text-transform: uppercase;
`;
export const FooterStyled = styled(Footer)`
  ${mediaFrom.small`
    display: none
  `}
`;
