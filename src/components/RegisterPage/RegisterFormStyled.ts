import styled from 'styled-components';
import { ErrorColor } from 'styles/variables';

export const RecaptchaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  text-align: start;
`;

export const RecaptchaError = styled.div.attrs(() => ({
  className: 'msd__recaptcha__error'
}))`
  width: 100%;
  height: 13px;
  color: ${ErrorColor};
  font-size: 13px;
`;
