import styled, { css } from 'styled-components';
import { IconsColor, White, LineColor } from 'styles/variables';
import { mediaFrom } from 'styles/BreakPoints';
import Button from 'components/Button';

export const WrapStyled = styled.div`
  position: relative;

  margin-bottom: 20px;
`;

export const SubscriptionStyled = styled.div`
  background: ${White};
  border: 1px solid ${LineColor};
  border-radius: 12px;

  padding: 20px 18px;
  &:not(:last-child) {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;

export const SubscriptionActionsStyled = styled.div`
  display: flex;
  justify-content: flex-end;

  border-top: 1px solid ${IconsColor};
  margin-top: 17px;
`;
export const UnsubscribeButtonStyled = styled(Button)`
  margin: 15px 0 0 0;
  width: 48%;
  ${mediaFrom.small &&
    css`
      margin: 17px 0 0 5px;
      width: unset;
      max-width: unset;
    `}
`;

export const ResubscribeButtonStyled = styled(Button)`
  width: 100%;
  margin: 20px 0 0 0;
  ${mediaFrom.small &&
    css`
      margin: 17px 0 0 5px;
      width: unset;
      max-width: unset;
    `}
`;
