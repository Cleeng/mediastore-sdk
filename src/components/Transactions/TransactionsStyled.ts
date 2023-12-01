/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { LineColor, FontColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const WrapStyled = styled.article.attrs(() => ({
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

export const InsideWrapperStyled = styled.li.attrs(() => ({
  className: 'msd__transactions__item'
}))`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 18px 0;
  border-bottom: 1px solid ${LineColor};
  gap: 6px;

  &:first-child {
    padding: 0 0 18px 0;
  }

  &:last-child {
    padding: 18px 0 0 0;
    border-bottom: none;
  }

  &:only-child {
    border-bottom: none;
    padding: unset;
  }

  ${media.small`
    flex-direction: column;
  `}
`;

export const TransactionListStyled = styled.ul.attrs(() => ({
  className: 'msd__transactions__list'
}))`
  overflow: hidden;
`;

export const LeftBoxStyled = styled.div`
  display: flex;
`;

export const RightBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  margin-inline-start: 60px;
  text-align: end;
  justify-content: center;
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
  color: #727583cc;
  margin-top: 6px;

  font-size: 12px;
`;
export const DateStyled = styled.time.attrs(() => ({
  className: 'msd__transaction__date'
}))`
  margin-top: 6px;
  color: #727583cc;

  font-size: 12px;
`;

export const ButtonTextStyled = styled.span.attrs(() => ({
  className: 'msd__transactions__button-text'
}))<{ isExpanded: boolean }>`
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

export const LogoWrapStyled = styled.div`
  display: flex;
  height: 42px;
  min-width: 42px;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d4df;
  border-radius: 6px;
  padding: 0 5px;
  svg {
    height: auto;
    margin-left: 1px;
  }
`;

export const InfoStyled = styled.div`
  margin-inline-start: 18px;
`;

export const TransactionDataStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DotStyled = styled.span`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 800;
  color: #727583cc;
`;

export const EditGiftStyled = styled.p`
  font-weight: 600;
  font-size: 12px;
  text-decoration: underline;
  color: #4eb7a1;

  &:hover {
    cursor: pointer;
  }

  ${media.small`
    text-align: start;
  `}
`;
