/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { LineColor, FontColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__transactions__wrapper'
}))`
  position: relative;

  margin-bottom: 20px;

  ${media.small`
    button{
      width: 100%;
    }
  `}
`;

export const InsideWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__transactions__item'
}))`
  display: flex;
  justify-content: space-between;
  flex-wrap: no-wrap;

  padding: 18px 0;
  border-bottom: 1px solid ${LineColor};

  ${props =>
    (props.length === 1 &&
      css`
        padding: 0;
        border-bottom: none;
      `) ||
    (props.length !== 1 &&
      css`
        &:first-child {
          padding: 0 0 18px 0;
        }

        &:last-child {
          padding: 18px 0 0 0;
          border-bottom: none;
        }
      `)}
`;

export const TransactionListStyled = styled.div.attrs(() => ({
  className: 'msd__transactions__list'
}))`
  overflow: hidden;
`;

export const LeftBoxStyled = styled.div`
  max-width: 70%;
`;

export const RightBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  margin-left: 20px;
  text-align: right;
`;

export const TitleStyled = styled.h3.attrs(() => ({
  className: 'msd__transaction__title'
}))`
  color: ${FontColor};

  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
  margin: 0;
`;
export const SubTitleStyled = styled.div.attrs(() => ({
  className: 'msd__transaction__subtitle'
}))`
  margin-top: 6px;

  color: ${FontColor};

  font-size: 12px;
`;
export const IdStyled = styled.div.attrs(() => ({
  className: 'msd__transaction__id'
}))`
  color: ${FontColor};

  font-size: 13px;
`;
export const DateStyled = styled.div.attrs(() => ({
  className: 'msd__transaction__date'
}))`
  margin-top: 6px;

  color: ${FontColor};

  font-size: 12px;
`;
export const ButtonTextStyled = styled.span.attrs(() => ({
  className: 'msd__transactions__button-text'
}))`
  position: relative;
  line-height: 1.2;
  &:after {
    position: absolute;
    right: -20px;
    bottom: 0;
    font-size: 11px;
    transform: scaleY(0.8) rotate(0deg);
    transition: all 0.3s ease-in-out;
    content: '▼';
    ${props =>
      props.isExpanded &&
      css`
        transform: scaleY(0.8) rotateX(180deg);
      `}
  }
`;
