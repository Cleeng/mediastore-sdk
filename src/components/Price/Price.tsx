import { Trans, useTranslation } from 'react-i18next';
import formatNumber from 'util/formatNumber';
import { selectOnlyOrder } from 'redux/orderSlice';
import { useAppSelector } from 'redux/store';
import {
  WrapperStyled,
  CurrencyStyled,
  PriceStyled,
  PeriodStyled,
  InnerWrapper,
  AdditionalLabelStyled,
  DiscountValue,
  PriceContainer,
  OriginalPrice,
  DiscountContainer
} from './PriceStyled';
import { addSpaceAfterNumber } from './utils';

type PriceProps = {
  currency: string;
  nextPaymentPrice: number | undefined;
  totalPrice: number;
  period: string | null;
  isTrialBadgeVisible?: boolean;
  isPromoPriceActive?: boolean;
};

const Price = ({
  currency,
  nextPaymentPrice,
  totalPrice,
  period,
  isTrialBadgeVisible,
  isPromoPriceActive
}: PriceProps) => {
  const { t } = useTranslation();
  const {
    discount: { applied: isDiscountApplied }
  } = useAppSelector(selectOnlyOrder);

  const shouldUseDiscountedValue =
    isDiscountApplied &&
    typeof nextPaymentPrice === 'number' &&
    nextPaymentPrice < totalPrice;
  const discountPercentageValue =
    Math.ceil((1 - (nextPaymentPrice || totalPrice) / totalPrice) * 100) || 100;
  const discountValue = isPromoPriceActive
    ? t('checkout-price-box.promo', 'Promo')
    : `-${discountPercentageValue}%`;

  return (
    <PriceContainer>
      {shouldUseDiscountedValue && !isTrialBadgeVisible && (
        <DiscountContainer>
          <OriginalPrice>
            <CurrencyStyled>{currency}</CurrencyStyled>
            {formatNumber(totalPrice)}
          </OriginalPrice>
          <DiscountValue>{discountValue}</DiscountValue>
        </DiscountContainer>
      )}
      <WrapperStyled>
        <InnerWrapper>
          <CurrencyStyled>{currency}</CurrencyStyled>
          <PriceStyled>{formatNumber(nextPaymentPrice || 0)}</PriceStyled>
          <AdditionalLabelStyled>
            <Trans i18nKey='price-additional-label'> </Trans>
          </AdditionalLabelStyled>
        </InnerWrapper>
        {period && (
          <PeriodStyled>/&nbsp;{addSpaceAfterNumber(period)}</PeriodStyled>
        )}
      </WrapperStyled>
    </PriceContainer>
  );
};

export default Price;
