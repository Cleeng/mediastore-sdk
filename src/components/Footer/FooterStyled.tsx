import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';

type FooterStyledProps = {
  $isTransparent?: boolean;
  $isInPopup?: boolean;
  className?: string;
};

export const FooterStyled = styled.footer.attrs((props: FooterStyledProps) => ({
  className: `msd__footer ${
    props.$isTransparent ? 'msd__footer--transparent' : ''
  }`
}))<FooterStyledProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 10px 34px;

  border-top: 1px solid ${colors.LineColor};
  background-color: ${(props) =>
    props.$isTransparent
      ? 'transparent'
      : props.theme.backgroundColor || colors.BackgroundColor};

  ${(props) =>
    props.$isTransparent &&
    css`
      border: none;
    `}

  ${(props) =>
    props.$isInPopup &&
    css`
      position: fixed;
      left: 0;
    `}
`;

export const ProductByStyled = styled.span.attrs(() => ({
  className: 'msd__footer__label--left'
}))`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.fontColor || colors.FontColor};

  font-size: 12px;
  font-weight: 300;
  & a {
    padding: 0 5px;
  }
`;

export const SecurityStyled = styled.div.attrs(() => ({
  className: 'msd__footer__label--right'
}))`
  color: ${(props) => props.theme.successColor || colors.ConfirmColor};

  font-size: 14px;
  min-width: 135px;

  & svg {
    padding-right: 5px;
    margin-bottom: -1px;
    max-height: 13px;

    path {
      fill: ${(props) =>
        props.theme.successColor || colors.ConfirmColor} !important;
    }
  }
`;

export const CleengLogoWrapperStyled = styled.a`
  svg {
    max-height: 12px;
    margin-bottom: -1px;
    width: 100%;
  }
`;
