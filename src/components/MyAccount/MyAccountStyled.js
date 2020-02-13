import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { MyAccountMainColor } from 'styles/variables';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  padding-top: 54px;

  background-color: ${MyAccountMainColor};

  ${mediaFrom.small`
    flex-direction: row;

    padding: 12px;
  `}
`;

export const HeaderStyled = styled.div`
  padding: 0 26px;

  ${mediaFrom.small`
    width: 288px;
    padding: 30px 34px;
  `}
`;

export const OverlayStyled = styled.div`
  ${props =>
    props.overlay &&
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
        ${mediaFrom.small`
          min-height: unset;

          border-radius: 20px;
        `}
      }
    `}
`;
