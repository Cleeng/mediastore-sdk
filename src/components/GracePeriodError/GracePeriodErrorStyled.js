import styled from 'styled-components';
import { media } from 'styles/BreakPoints';

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
  color: #515364;
  font-family: 'Open Sans', sans-serif;
  line-height: 17px;
  letter-spacing: 0.28px;
  margin-bottom: 38px;
  ${media.small`
    border-radius: 0;
    margin: -55px -46px 32px;
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
