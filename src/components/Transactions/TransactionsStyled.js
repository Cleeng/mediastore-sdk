/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { MyAccountTextGray, LineColor, MainColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const WrapStyled = styled.div`
  position: relative;

  margin-bottom: 20px;

  ${media.small`
    button{
      width: 100%;
    }
  `}
`;

export const InfoMessageStyled = styled.div`
  color: ${MyAccountTextGray};
  font-size: 13px;
`;

export const InsideWrapperStyled = styled.div`
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

export const TransactionListStyled = styled.div`
  height: 174px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  ${props =>
    props.length &&
    css`
      height: ${props.length === 1
        ? '33px'
        : props.length === 2
        ? '103px'
        : `${(props.length - 2) * 70 + 103}px`};
    `};
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

export const TitleStyled = styled.h3`
  color: ${MainColor};

  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
`;
export const SubTitleStyled = styled.div`
  margin-top: 6px;

  color: ${MainColor};

  font-size: 12px;
`;
export const IdStyled = styled.div`
  color: ${MainColor};

  font-size: 13px;
`;
export const DateStyled = styled.div`
  margin-top: 6px;

  color: ${MainColor};

  font-size: 12px;
`;
export const ButtonTextStyled = styled.span`
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
