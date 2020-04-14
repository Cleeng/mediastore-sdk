import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { MyAccountMainColor } from 'styles/variables';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  padding-top: 44px;

  background-color: ${MyAccountMainColor};

  ${mediaFrom.small`
    flex-direction: row;
    min-height: unset;

    padding: 12px;
  `}
`;

export const HeaderStyled = styled.div`
  padding: 0 26px;
  overflow: hidden;

  ${mediaFrom.small`
    width: 288px;
    padding: 30px 34px;
  `}
`;

export const OverlayStyled = styled.div`
  min-height: 100vh;
  ${mediaFrom.small`
    min-height: unset;
    height: 700px;
  `}
  ${props =>
    props.isOverlay &&
    css`
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;

      background-color: rgba(0, 0, 0, 0.72);

      ${mediaFrom.small`
          height: 100%;
      `}

      ${WrapperStyled} {
        width: 824px;
        height: 700px;
        ${mediaFrom.small`
          min-height: unset;

          border-radius: 20px;
        `};
      }
    `}
`;

export const ContentWrapperStyled = styled.div``;

export const ScrollBarWrapper = styled.div`
  width: 100%;
`;
