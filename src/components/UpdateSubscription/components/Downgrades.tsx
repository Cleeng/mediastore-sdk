import {
  ButtonWrapperStyled,
  ContentStyled,
  DowngradesWrapperStyled,
  OfferCardWrapperStyled,
  TextStyled,
  TitleStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { hidePopup, showPopup } from 'redux/popupSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/store';
import { SwitchSetting } from 'redux/types';
import OfferCard from 'components/OfferCard';
import {
  CurrencyFormat,
  currencyFormat,
  Period,
  periodMapper
} from 'util/planHelper';

function Downgrades({
  downgradesListFiltered,
  handleClick
}: {
  downgradesListFiltered: SwitchSetting[];
  handleClick: () => void;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ContentStyled>
      <>
        <TitleStyled>
          {t(
            'unsubscribe-popup.downgrade-instead',
            'How about a plan downgrade instead of cancellation?'
          )}
        </TitleStyled>
        <TextStyled>
          {t(
            'unsubscribe-popup.plans-proposal',
            'Here are the plans that might suit your needs:'
          )}
        </TextStyled>
      </>
      <DowngradesWrapperStyled>
        {downgradesListFiltered.map(downgradeOffer => {
          return (
            <OfferCardWrapperStyled
              onClick={() =>
                dispatch(
                  showPopup({
                    type: 'switchPlan',
                    data: {
                      offerData: {
                        ...downgradeOffer
                      },
                      isPartOfCancellationFlow: true
                    }
                  })
                )
              }
              key={downgradeOffer.toOfferId}
            >
              <OfferCard
                period={
                  periodMapper[downgradeOffer.period as Period]
                    ?.chargedForEveryText
                }
                offerType="S"
                title={downgradeOffer.title}
                currency={
                  currencyFormat[
                    downgradeOffer.nextPaymentPriceCurrency as CurrencyFormat
                  ]
                }
                price={Math.round(downgradeOffer.nextPaymentPrice * 100) / 100}
                offerId={downgradeOffer.toOfferId}
              />
            </OfferCardWrapperStyled>
          );
        })}
      </DowngradesWrapperStyled>
      <TextStyled>
        {t(
          'unsubscribe-popup.still-cancel',
          'Or still wants to cancel a subscription?'
        )}
      </TextStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
          {t('unsubscribe-popup.back-button', 'Back to My Account')}
        </Button>
        <Button theme="confirm" onClickFn={handleClick}>
          {t('unsubscribe-popup.unsubscribe-button-text', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </ContentStyled>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { Downgrades };
