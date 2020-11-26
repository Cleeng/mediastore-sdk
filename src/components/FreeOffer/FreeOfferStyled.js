import styled from 'styled-components';
import SubscriptionIcon from 'components/SubscriptionIcon';
import {
  LineColor,
  BackgroundColor,
  MediumGrey,
  MainColor,
  BoldFont,
  SmallFont,
  MediumFont,
  LargeFont,
  ErrorColor
} from 'styles/variables';

export const WrapStyled = styled.div`
  padding: 50px 30px 86px 30px;
`;

export const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;

  margin: auto;
  padding: 40px 30px;

  border: 1px solid ${LineColor};
  border-radius: 12px;
  background: ${BackgroundColor};

  text-align: center;
  color: ${MainColor};
`;

export const TitleStyled = styled.h1`
  margin: 20px 0 15px 0;

  font-weight: ${BoldFont};
  font-size: ${LargeFont};
  line-height: 1.2em;
`;

export const DescriptionStyled = styled.h2`
  margin: 0 0 30px 0;

  font-size: ${MediumFont};
`;

export const SubTextStyled = styled.p`
  margin: 20px 0 0 0;

  font-size: ${SmallFont};
  color: ${MediumGrey};
`;

export const SubscriptionIconStyled = styled(SubscriptionIcon)`
  flex: 0 0 75px;
  min-width: 75px;

  margin: 0;
  padding: 23px 15px;

  font-size: ${LargeFont};
`;

export const ButtonWrapperStyled = styled.div`
  max-width: 200px;
`;

export const ErrorMessageStyled = styled.div`
  margin-top: 10px;
  color: ${ErrorColor};
  font-size: 12px;
  line-height: 1.3em;
`;
