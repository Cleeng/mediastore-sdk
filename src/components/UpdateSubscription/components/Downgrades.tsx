import {
  ButtonWrapperStyled,
  ContentStyled,
  DowngradesWrapperStyled,
  OfferCardWrapperStyled,
  TextStyled,
  TitleStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { hidePopup, selectPopupManager, showPopup } from 'appRedux/popupSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { SwitchSetting } from 'appRedux/types';
import OfferSwitchCard from 'components/OfferSwitchCard';
import eventDispatcher, {
  UNSUBSCRIBE_ACTION_CANCELLED
} from 'util/eventDispatcher';

const Downgrades = ({
  downgrades,
  handleClick
}: {
  downgrades: SwitchSetting[];
  handleClick: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { updateSubscription } = useAppSelector(selectPopupManager);
  const offerId = updateSubscription?.offerData?.offerId || '';

  const handleBackToMyAccount = () => {
    eventDispatcher(UNSUBSCRIBE_ACTION_CANCELLED);
    dispatch(hidePopup());
  };

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
        {downgrades.map((downgradeOffer) => {
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
              <OfferSwitchCard
                toOfferId={downgradeOffer.toOfferId}
                baseOfferId={offerId}
              />
            </OfferCardWrapperStyled>
          );
        })}
      </DowngradesWrapperStyled>
      <TextStyled>
        {t('unsubscribe-popup.still-cancel', 'Still want to cancel?')}
      </TextStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button variant='simple' onClickFn={handleBackToMyAccount}>
          {t('unsubscribe-popup.back-button', 'Back to My Account')}
        </Button>
        <Button variant='confirm' onClickFn={handleClick}>
          {t('unsubscribe-popup.unsubscribe-button-text', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </ContentStyled>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Downgrades };
