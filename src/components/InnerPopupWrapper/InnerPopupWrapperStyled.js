import styled, { css } from 'styled-components';
import {
  FontColor,
  LineColor,
  ConfirmColor,
  CardColor
} from 'styles/variables';
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

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__popup'
}))`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;

  ${media.small`
    height: 100%;
  `}
`;

export const DotsWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__popup__dots'
}))`
  display: flex;
  flex-direction: row;
  ${props =>
    props.currentStep &&
    css`
      span:nth-child(-n + ${props.currentStep}) {
        background: ${ConfirmColor};
      }
    `}
`;
export const HeaderStyled = styled.div.attrs(() => ({
  className: 'msd__popup__header'
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${FontColor};
  ${media.small`
    margin: 30px 0 0 0;
  `}
`;

export const DotStyled = styled.span.attrs(() => ({
  className: 'msd__popup__dot'
}))`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${LineColor};
  margin-right: 10px;
`;

export const HeaderTitleStyled = styled.h1.attrs(() => ({
  className: 'msd__popup__title'
}))`
  font-size: 14px;
  margin: 0;
`;

/* USE IT FOR CHILDREN */

export const ContentStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content'
}))`
  text-align: center;
  margin: auto;
  width: 80%;

  ${media.small`
    width: 90%;
  `}
`;

export const TitleStyled = styled.h1.attrs(() => ({
  className: 'msd__popup-content__title'
}))`
  font-size: 26px;
  color: ${FontColor};
  font-weight: 600;
  text-transform: ${props =>
    props.textTransform ? props.textTransform : 'capitalize'};
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

export const TextStyled = styled.p.attrs(() => ({
  className: 'msd__popup-content__text'
}))`
  color: ${FontColor};
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.5;
  margin: 24px 0;
`;

export const MailStyled = styled.span.attrs(() => ({
  className: 'msd__popup-content__mail'
}))`
  font-weight: 700;
`;

export const ButtonWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__buttons'
}))`
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

export const WarningMessageStyled = styled.p.attrs(() => ({
  className: 'msd__popup-content__warning'
}))`
  color: ${FontColor};
  opacity: 0.8;
  font-size: 11px;
  margin: 15px 0 0 0;
  text-align: center;
`;

export const DowngradesWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__downgrades-wrapper'
}))``;

export const OfferCardWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__downgrade-wrapper'
}))`
  background: ${CardColor};
  border: 1px solid ${LineColor};
  border-radius: 12px;

  padding: 15px;
  max-width: 550px;

  text-align: left;
  font-size: 13px;

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}

  margin: 10px auto 10px auto;
  &:last-child {
    margin: 10px auto 40px auto;
  }
  &:hover {
    transition: 0.3s ease-in-out;
    border: 1px solid #606376;
  }
`;
