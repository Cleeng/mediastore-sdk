import styled from 'styled-components';
import { ConfirmColor } from 'styles/variables';

export const WrapStyled = styled.div``;

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  &:first-child {
    margin-right: 25px;
  }

  & > * {
    width: 100%;
    &:first-child {
      margin-right: 25px;
    }
  }
`;

export const MessageStyled = styled.div`
  color: ${ConfirmColor};
  text-align: center;
  margin: 5px 0 15px 0;
  font-size: 12px;
  position: relative;
`;
