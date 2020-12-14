import styled, { css, keyframes } from 'styled-components';
import { media } from 'styles/BreakPoints';
import { MainColor, LineColor, ErrorColor } from 'styles/variables';
import Button from 'components/Button';

const fadeInOpacity = keyframes`
	0% {
		opacity: 0;
    transform: scale(0.97);
	}
  80%{
    transform: scale(1);
  }
	100% {
		opacity: 1;
	}
`;

export const WrapperStyled = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  line-height: normal;

  ${media.small`
    min-height: 100vh;
  `}

  opacity: 1;
  animation: ${fadeInOpacity} 1 ease-in 0.4s;
`;

export const ContentStyled = styled.div`
  text-align: center;
  margin: auto;
  width: 50%;

  ${media.small`
    width: 90%;
  `}
`;
export const ButtonWrapperStyled = styled.div`
  width: 50%;
  margin: 0 auto 100px auto;

  ${media.small`
    width: 80%;
  `}
`;
export const TitleStyled = styled.h1`
  font-size: 30px;
  color: ${MainColor};
  font-weight: 700;

  ${media.small`
    font-size: 27px;
  `}
`;

export const TextStyled = styled.p`
  color: ${MainColor};
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.5;
  margin: 20px 0;

  ${props =>
    props.step === 2 &&
    css`
      opacity: 0.6;
      text-align: left;
    `}
`;

export const ImageStyled = styled.img`
  margin-top: 50px;
`;

export const ButtonStyled = styled(Button)`
  margin: 0 auto;
  &:disabled {
    cursor: not-allowed;
    background: ${LineColor};
  }
`;

export const InfoStyled = styled.span`
  color: ${ErrorColor};
  font-size: 13px;
  margin-bottom: 25px;
  display: block;
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
  width: 90%;
  margin: 50px 0 0 0;
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

export const InnerWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
