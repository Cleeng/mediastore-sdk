import { Trans } from "react-i18next";
import formatNumber from "util/formatNumber";
import {
  WrapperStyled,
  CurrencyStyled,
  PriceStyled,
  PeriodStyled,
  InnerWrapper,
  AdditionalLabelStyled,
  DiscountPercentage,
  PriceContainer,
  OriginalPrice,
  DiscountContainer,
} from "./PriceStyled";

const addSpaceAfterNumber = (str: string): string => {
  if (!/\d/.test(str.charAt(0))) {
    return str;
  }

  return `${str.charAt(0)} ${str.substring(1)}`;
};

type PriceProps = {
  currency: string;
  nextPaymentPrice: number | undefined;
  totalPrice: number;
  period: string | null;
};

const Price = ({
  currency,
  nextPaymentPrice,
  totalPrice,
  period,
}: PriceProps) => {
  const isDiscountApplied =
    typeof nextPaymentPrice === "number" && nextPaymentPrice < totalPrice;

  return (
    <PriceContainer>
      {isDiscountApplied && (
        <DiscountContainer>
          <OriginalPrice>
            <CurrencyStyled>{currency}</CurrencyStyled>
            {formatNumber(totalPrice)}
          </OriginalPrice>
          <DiscountPercentage>
            -
            {Math.ceil(1 - (nextPaymentPrice || totalPrice) / totalPrice) *
              10 || 100}
            %
          </DiscountPercentage>
        </DiscountContainer>
      )}
      <WrapperStyled>
        <InnerWrapper>
          <CurrencyStyled>{currency}</CurrencyStyled>
          <PriceStyled>
            {formatNumber(nextPaymentPrice || totalPrice)}
          </PriceStyled>
          <AdditionalLabelStyled>
            <Trans i18nKey="price-additional-label"> </Trans>
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
