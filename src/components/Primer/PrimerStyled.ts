import styled from 'styled-components';

export const PrimerContainer = styled.div`
  .PrimerCheckout__formField {
    text-align: start;
  }
`;

export const UpdateButtonStyled = styled.button`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  width: 100%;
  height: 50px;
  padding: 0px 12px;
  z-index: 1;
  border: none;
  text-align: center;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  font-size: 1.1rem;
  background: rgb(36, 42, 47);
  border-radius: 5px;
  box-shadow: none;

  &:hover {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    opacity: 0.75;
  }

  &:disabled {
    background-color: rgb(167, 170, 172);
    &:hover {
      opacity: unset;
      cursor: unset;
    }
  }
`;
