import styled from 'styled-components';
import { ConfirmColor, MainColor } from 'styles/variables';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__profile-capture__wrapper'
}))``;

export const MessageStyled = styled.div.attrs(() => ({
  className: 'msd__profile-capture__message'
}))`
  color: ${ConfirmColor};
  text-align: center;
  margin: 5px 0 15px 0;
  font-size: 12px;
  position: relative;
`;

export const InputWrapStyled = styled.div`
  margin-bottom: 20px;
`;

export const InputLabelStyled = styled.div.attrs(() => ({
  className: 'msd__profile-capture__label'
}))`
  display: block;
  margin-bottom: 12px;
  color: ${MainColor};
  font-size: 13px;
`;
