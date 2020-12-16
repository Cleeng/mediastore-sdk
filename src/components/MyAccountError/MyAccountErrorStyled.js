import styled, { css } from 'styled-components';
import { MainColor } from 'styles/variables';
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
      border: 1px dashed ${MainColor};
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
`;

export const TitleStyled = styled.div`
  max-width: 380px;
  margin: auto auto 5px auto;

  color: ${MainColor};

  font-size: 16px;
`;

export const SubTitleStyled = styled.div`
  color: ${MainColor};

  font-size: 13px;

  max-width: 310px;
  margin: auto;
`;

export const IconStyled = styled.div`
  margin: 0 auto 10px auto;
  svg {
    max-width: 100%;
  }
`;
