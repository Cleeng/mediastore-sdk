import styled, { css } from 'styled-components';
import { MainColor, LineColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';
import Card from 'components/Card';

export const CardStyled = styled(Card)`
  border: 1px solid ${LineColor};
  height: 100%;
  min-height: 500px;
  display: flex;
  padding: 0;
  margin: 0;
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
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  width: 100%;
`;

export const DotsWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  ${props =>
    props.currentStep &&
    css`
      span:nth-child(-n + ${props.currentStep}) {
        background: ${MainColor};
      }
    `}
`;
export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${MainColor};
  ${media.small`
    margin: 30px 0 0 0;
  `}
`;

export const DotStyled = styled.span`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${LineColor};
  margin-right: 10px;
`;

export const HeaderTitleStyled = styled.h1`
  font-size: 14px;
  margin: 0;
`;

/* USE IT FOR CHILDREN */

export const ContentStyled = styled.div`
  text-align: center;
  margin: auto;
  width: 80%;

  ${media.small`
    width: 90%;
  `}
`;

export const TitleStyled = styled.h1`
  font-size: 26px;
  color: ${MainColor};
  font-weight: 600;
  text-transform: capitalize;
  line-height: 1.2;

  ${media.small`
    font-size: 27px;
  `}

  ${props =>
    props.step === 2 &&
    css`
      font-size: 20px;
      ${media.small`
        font-size: 20px;
      `}
    `}
`;

export const TextStyled = styled.p`
  color: ${MainColor};
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.5;
  margin: 24px 0;
`;

export const MailStyled = styled.span`
  font-weight: 700;
`;

export const ButtonWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${props => (props.removeMargin ? '0' : '60px')};

  button {
    text-transform: capitalize;
    width: 40%;
    margin: 0 5px;
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
