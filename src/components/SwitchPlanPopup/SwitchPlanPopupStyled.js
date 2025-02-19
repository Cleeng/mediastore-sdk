import styled, { css } from 'styled-components';
import SubscriptionIcon from 'components/SubscriptionIcon';
import { LineColor } from 'styles/variables';
import { isRTL } from 'styles/RTLHelper';

export const SubscriptionIconStyled = styled(SubscriptionIcon)`
  flex: 0 0 70px;
  max-width: 70px;
  height: 70px;

  margin: 0 20px;
  padding: 0;

  line-height: 70px;
  font-size: 30px;
  ${(props) =>
    props.gray &&
    css`
      filter: grayscale(80%);
    `}
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-top: 10px;
  margin: 20px auto 40px auto;
`;

export const ArrowStyled = styled.span`
  width: 13px;
  height: 13px;

  border-top: 2px solid ${LineColor};
  border-right: 2px solid ${LineColor};

  transform: translateX(-25%) rotate(45deg);

  ${isRTL() &&
  css`
    transform: translateX(-25%) rotate(225deg);
  `}
`;

export const ImageStyled = styled.img``;
