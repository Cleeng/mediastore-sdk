import styled, { css } from 'styled-components';
import { media, mediaFrom } from 'styles/BreakPoints';
import { IconsColor } from 'styles/variables';
import Button from 'components/Button';

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__manage-box__actions-wrapper'
}))`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  border-top: 1px solid ${IconsColor};
  margin-top: 17px;
  padding-top: 17px;
`;

export const SubscriptionManagementStyled = styled.section.attrs(() => ({
  className: 'msd__manage-box'
}))`
  width: 100%;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ManageButtonWrapStyled = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    padding-right: 38px;
  }
`;

export const SubscriptionActionsStyled = styled.div.attrs(() => ({
  className: 'msd__manage-box__actions'
}))<{ $isOpened: boolean }>`
  width: 100%;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.$isOpened &&
    css`
      max-height: 500px;
    `}

  ${media.small`
    button{
      font-size:11px;
    }
  `}
`;

export const ButtonTextStyled = styled.span.attrs(() => ({
  className: 'msd__manage-box__button-text'
}))<{ $isExpanded: boolean }>`
  position: relative;
  line-height: 1.2;
  &:after {
    position: absolute;
    right: -17px;
    bottom: 0;
    font-size: 11px;
    transform: scaleY(0.8) rotate(0deg);
    transition: all 0.3s ease-in-out;
    content: '▼';
    ${(props) =>
      props.$isExpanded &&
      css`
        transform: scaleY(0.8) rotateX(180deg);
      `}
  }
`;

export const SimpleButtonStyled = styled(Button).attrs(() => ({
  className: 'msd__manage-box__button'
}))`
  width: 48%;

  text-transform: capitalize;

  &:disabled:hover {
    opacity: 0.9;
  }

  ${mediaFrom.small`
    margin: 0;
    width: unset;
    max-width: unset;
  `}
`;

export const FullWidthButtonStyled = styled(Button)`
  width: 100%;
  ${mediaFrom.small`
    width: unset;
    max-width: unset;
  `}
`;

export const CouponWrapStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
