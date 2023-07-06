import styled from 'styled-components';
import * as colors from 'styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const RecipientFormStyled = styled.form.attrs(() => ({
  className: 'msd__recipientForm'
}))`
  display: flex;
  flex-direction: column;
  max-width: 376px;
  background-color: white;
  border: 1px solid ${colors.LineColor};
  border-radius: 12px;
  width: 100%;
  max-width: 376px;
  align-self: center;
  margin-top: 18px;
  padding: 24px 18px;

  > div {
    margin-bottom: 2px;
  }

  .msd__error {
    color: #cb4477;
  }
`;
