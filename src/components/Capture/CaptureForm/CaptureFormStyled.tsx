import styled, { css } from 'styled-components';
import { media } from 'styles/BreakPoints';
import { ErrorColor } from 'styles/variables';

export const CaptureRowStyled = styled.div`
  display: flex;

  ${media.small`
    display: block;
  `}
`;

export const CaptureBoxStyled = styled.div`
  padding: 10px;
`;

export const CaptureQuestionStyled = styled.div<{ required: boolean }>`
  text-align: left;
  ${props =>
    props.required &&
    css`
      &::after {
        content: '*';
        margin-left: 4px;
        height: 9px;
        font-size: 12px;
        line-height: 12px;
        color: ${ErrorColor};
      }
    `}
`;

export const CaptureError = styled.div`
  width: 100%;
  height: 13px;
  margin-top: 8px;
  content: '';
  color: ${ErrorColor};
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  font-size: 13px;
  text-align: left;
`;
