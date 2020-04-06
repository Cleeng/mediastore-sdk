import styled from 'styled-components';
import {
  MyAccountTextGray,
  MyAccountTextDark2,
  MyAccountTextLightGray2,
  SubscriptionIconDefaultBg,
  SubscriptionIconDefaultColor,
  MyAccountContentColor
} from 'styles/variables';
import { mediaFrom } from 'styles/BreakPoints';

export const WrapStyled = styled.div`
  position: relative;

  margin-bottom: 20px;
`;

export const SubscriptionsStyled = styled.div``;

export const SubscriptionStyled = styled.div`
  &:not(:last-child) {
    margin-bottom: 18px;
    padding-bottom: 18px;

    border-bottom: 2px solid ${MyAccountContentColor};
  }
`;

export const SubscriptionInfoBoxStyled = styled.div`
  display: flex;
  align-items: flex-start;
  /* margin-bottom: 24px; */
`;

export const SubscriptionIcon = styled.div`
  padding: 12px 10px;
  margin-right: 10px;
  border-radius: 8px;
  flex: 0 0 36px;

  font-size: 16px;
  font-weight: 700;
  text-align: center;

  background-color: ${props =>
    props.bg ? props.bg : SubscriptionIconDefaultBg};
  color: ${props => (props.color ? props.color : SubscriptionIconDefaultColor)};

  ${mediaFrom.small`
    padding: 14px 10px;
    margin-right: 10px;
    flex: 0 0 50px;
  `}
`;

export const SubscriptionInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-grow: 1;
`;

export const SubscriptionTitleStyled = styled.div`
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${MyAccountTextDark2};

  ${mediaFrom.small`
    font-size: 14px;
    line-height: 17px;
  `}
`;

export const SubscriptionNextPaymentStyled = styled.div`
  font-size: 11px;
  line-height: 15px;
  font-style: italic;
  color: ${MyAccountTextGray};
`;

export const SubscriptionPriceStyled = styled.div`
  margin-left: 10px;
`;

export const SubscriptionPriceValueStyled = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
  color: ${MyAccountTextLightGray2};
`;

export const SubscriptionPricePeroidStyled = styled.div`
  font-size: 9px;
  color: ${MyAccountTextLightGray2};
  text-align: right;
`;

export const SubscriptionActionsStyled = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    height: 40px;
    border-radius: 20px;
    font-weight: 700;
    width: auto;
    padding: 0 10px;
    font-size: 14px;
  }

  ${mediaFrom.smallest`
    padding: 0 20px;
  `}

  ${mediaFrom.small`
    justify-content: flex-end;

    button {
      margin-left: 8px;
    }
  `}
`;
