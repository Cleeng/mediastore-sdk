import styled, { keyframes, css } from 'styled-components';
import { MainColor } from 'styles/variables';

export const LoaderKeyframeStyled = keyframes`
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }
`;

export const LoaderStyled = styled.div`
  margin: 0 auto;
  position: relative;
  width: 64px;
  height: 64px;
  ${props =>
    props.isMyAccount &&
    css`
      margin: 50px auto;
    `};

  & div {
    position: absolute;
    width: 5px;
    height: 5px;
    background: ${props => (props.color ? props.color : '#d4d4d4')};
    border-radius: 50%;
    animation: ${LoaderKeyframeStyled} 1.2s linear infinite;
    ${props =>
      props.isMyAccount &&
      css`
        background: ${MainColor};
      `};
  }

  & div:nth-child(1) {
    animation-delay: 0s;
    top: 29px;
    left: 53px;
  }

  & div:nth-child(2) {
    animation-delay: -0.1s;
    top: 18px;
    left: 50px;
  }

  & div:nth-child(3) {
    animation-delay: -0.2s;
    top: 9px;
    left: 41px;
  }

  & div:nth-child(4) {
    animation-delay: -0.3s;
    top: 6px;
    left: 29px;
  }

  & div:nth-child(5) {
    animation-delay: -0.4s;
    top: 9px;
    left: 18px;
  }

  & div:nth-child(6) {
    animation-delay: -0.5s;
    top: 18px;
    left: 9px;
  }

  & div:nth-child(7) {
    animation-delay: -0.6s;
    top: 29px;
    left: 6px;
  }

  & div:nth-child(8) {
    animation-delay: -0.7s;
    top: 41px;
    left: 9px;
  }

  & div:nth-child(9) {
    animation-delay: -0.8s;
    top: 50px;
    left: 18px;
  }

  & div:nth-child(10) {
    animation-delay: -0.9s;
    top: 53px;
    left: 29px;
  }

  & div:nth-child(11) {
    animation-delay: -1s;
    top: 50px;
    left: 41px;
  }

  & div:nth-child(12) {
    animation-delay: -1.1s;
    top: 41px;
    left: 50px;
  }

  ${props =>
    props.buttonLoader &&
    css`
      width: 18px;
      height: 18px;
      transform: scale(0.4) translate(-20px, -25px);
    `}

  ${props =>
    props.smallLoader &&
    css`
      position: absolute;
      right: 0;
      top: 0;

      height: 11px;
      width: 13px;
      transform: translateY(100%) translateX(-100%) scale(0.3);
    `}
`;
