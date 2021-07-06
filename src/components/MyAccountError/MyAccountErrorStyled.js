import styled, { css } from 'styled-components';
import { MainColor, IconsColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const WrapStyled = styled.div`
  position: relative;
  max-width: ${props => (props.fullWidth ? 'unset' : '320px')};

  padding: 18px;
  margin: ${props => (props.margin ? props.margin : '0 auto 32px auto')} ;

  text-align: center;
  line-height: 1.4;

  ${props =>
    props.withBorder &&
    css`
      border: 1px dashed ${IconsColor};
      border-radius: 20px;
      padding: 35px 0;
    `}

  ${props =>
    props.fullHeight &&
    css`
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      ${media.small`
        min-height: 100vh;
      `}
    `}

    ${props =>
      props.centered &&
      css`
        margin: auto;
      `}

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        opacity: 0;
        border-radius: 20px;
        box-shadow: 0px 0px 14px 0px #86868642;
        transition: opacity 0.2s ease-in-out;
      }
      &:hover {
        &:after {
          opacity: 1;
        }
      }
    `}
`;

export const TitleStyled = styled.div`
  max-width: 380px;
  margin: 10px auto 0 auto;

  color: ${MainColor};

  font-size: 16px;
`;

export const SubTitleStyled = styled.div`
  color: ${MainColor};

  font-size: 13px;

  max-width: 310px;
  margin: 5px auto 0 auto;
`;

export const IconStyled = styled.div`
  margin: auto auto 10px auto;
  svg {
    max-width: 100%;
  }
`;
