import styled from 'styled-components';

export const SubscriptionManagementStyled = styled.section`
  width: 100%;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ManageButtonWrapStyled = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    padding-right: 38px;
  }
`;

export const SubscriptionActionsStyled = styled.div`
  width: 100%;
`;

export const ButtonTextStyled = styled.span`
  position: relative;
  line-height: 1.2;
  &:after {
    position: absolute;
    right: -17px;
    bottom: 0;
    font-size: 11px;
    ${props => (props.isExpanded ? "content: '▲'" : "content: '▼'")};
  }
`;
