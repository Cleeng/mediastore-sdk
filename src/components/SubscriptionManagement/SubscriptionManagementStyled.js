import styled, { css } from 'styled-components';
import { media } from 'styles/BreakPoints';

export const SubscriptionManagementStyled = styled.section`
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

export const SubscriptionActionsStyled = styled.div`
  width: 100%;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  ${props =>
    props.isOpened &&
    css`
      max-height: 500px;
    `}

  ${media.small`
    button{
      font-size:11px;
      padding: 12px 15px;
    }
  `}
`;

export const ButtonTextStyled = styled.span`
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
    ${props =>
      props.isExpanded &&
      css`
        transform: scaleY(0.8) rotateX(180deg);
      `}
  }
`;
