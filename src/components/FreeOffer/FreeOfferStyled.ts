import styled from 'styled-components';
import SubscriptionIcon from 'components/SubscriptionIcon';
import {
  LineColor,
  BackgroundColor,
  MediumGrey,
  FontColor,
  BoldFont,
  SmallFont,
  MediumFont,
  LargeFont,
  ErrorColor
} from 'styles/variables';

export const WrapStyled = styled.div`
  padding: 50px 30px 86px 30px;
`;

export const CardStyled = styled.div.attrs(() => ({
  className: 'msd__checkout-card'
}))`
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
  color: ${FontColor};
`;

export const TitleStyled = styled.h1.attrs(() => ({
  className: 'msd__checkout-card__title'
}))`
  margin: 20px 0 15px 0;

  font-weight: ${BoldFont};
  font-size: ${LargeFont};
  line-height: 1.2em;
`;

export const DescriptionStyled = styled.p.attrs(() => ({
  className: 'msd__checkout-card__description'
}))`
  color: ${FontColor};
  font-size: ${MediumFont};
  font-weight: ${BoldFont};
  margin: 0 0 30px 0;
`;

export const PublisherDescriptionStyled = styled.p.attrs(() => ({
  className: 'msd__checkout-card__description'
}))`
  color: ${FontColor};
  font-size: ${SmallFont};
  font-weight: ${BoldFont};
  margin-bottom: 32px;
`;

export const SubTextStyled = styled.p.attrs(() => ({
  className: 'msd__checkout-card__subtext'
}))`
  margin: 20px 0 0 0;

  font-size: ${SmallFont};
  color: ${MediumGrey};
`;

export const SubscriptionIconStyled = styled(SubscriptionIcon).attrs(() => ({
  className: 'msd__checkout-card__icon'
}))<{ icon: string }>`
  flex: 0 0 75px;
  min-width: 75px;

  margin: 0;
  padding: 23px 15px;

  font-size: ${LargeFont};
`;

export const ButtonWrapperStyled = styled.div`
  max-width: 200px;
`;

export const ErrorMessageStyled = styled.div.attrs(() => ({
  className: 'msd__checkout-card__message--error'
}))`
  margin-top: 10px;
  color: ${ErrorColor};
  font-size: 12px;
  line-height: 1.3em;
`;
