import styled, { css } from 'styled-components';
import { FontColor, IconsColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const TitleStyled = styled.div.attrs(() => ({
  className: 'msd__info-box__title'
}))`
  max-width: 380px;
  margin: 10px auto 0 auto;

  color: ${FontColor};

  font-size: 16px;
`;

export const SubTitleStyled = styled.div.attrs(() => ({
  className: 'msd__info-box__subtitle'
}))`
  color: ${FontColor};

  font-size: 13px;

  max-width: 310px;
  margin: 5px auto 0 auto;

  a {
    text-decoration: underline;
  }
`;

export const IconStyled = styled.div.attrs(() => ({
  className: 'msd__info-box__icon'
}))`
  margin: auto auto 10px auto;
  svg {
    max-width: 490px;
  }
`;

export const DetailsStyled = styled.div.attrs(() => ({
  className: 'msd__info-details'
}))``;

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__info-box'
}))`
 * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;
  max-width: 320px;

  padding: 18px;
  margin: ${props => (props.margin ? props.margin : '0 auto 32px auto')} ;

  text-align: center;
  line-height: 1.4;

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      max-width: unset;
    `}
    
  ${props =>
    props.direction === 'row' &&
    css`
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

      ${DetailsStyled} {
        text-align: left;
        margin: auto 40px auto 40px;
      }
      ${TitleStyled} {
        margin: auto 0 auto 0;
      }
      ${IconStyled} {
        margin: auto 40px auto 40px;
      }
    `}
  
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
    ${props =>
      props.isSmallCard &&
      css`
        width: 265px;
        padding: 26px 0;
        height: 160px;
        margin: 0 auto;
        ${TitleStyled} {
          font-size: 14px;
        }
        ${SubTitleStyled} {
          font-size: 12px;
        }
        ${IconStyled} {
          margin: auto auto 5px auto;
        }
      `}
`;
