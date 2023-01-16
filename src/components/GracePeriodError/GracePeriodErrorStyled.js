import styled from 'styled-components';
import { media, mediaFrom } from 'styles/BreakPoints';

export const GracePeriodErrorStyled = styled.div.attrs(() => ({
  className: 'msd__grace-period-error'
}))`
  display: flex;
  align-items: center;
  gap: 13px;
  background-color: #ffd0d7;
  border: 1px solid #edb8c0;
  border-radius: 12px;
  padding: 14px 26px 15px 0;
  text-align: left;
  font-size: 11px;
  line-height: 17px;
  letter-spacing: 0.28px;
  ${media.small`
    border-radius: 0;
    margin: -35px;
    margin-bottom: 0;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.25px;
  `}
`;

export const WarningMessageStyled = styled.span.attrs(() => ({
  className: 'msd__grace-period-error-warning'
}))`
  text-decoration: underline;
  font-weight: bold;
`;

export const IconStyled = styled.div.attrs(() => ({
  className: 'msd__grace-period-error-alert-icon'
}))`
  padding-left: 23px;
`;

export const GracePeriodWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__grace-period-wrapper'
}))`
  ${mediaFrom.small`
     padding: 20px;
     padding-top: 0;
  `}
`;
