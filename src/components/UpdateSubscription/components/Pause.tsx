import React from 'react';
import {
  ButtonWrapperStyled,
  ContentStyled,
  TextStyled,
  TitleStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { hidePopup, showPopup } from 'appRedux/popupSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'appRedux/store';
import { SwitchSetting } from 'appRedux/types';

const Pause = ({
  pauseOffer,
  handleClick
}: {
  pauseOffer: SwitchSetting;
  handleClick: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ContentStyled>
      <TitleStyled>
        {t(
          'unsubscribe-popup.pause-title',
          'Would you like to pause your subscription instead?'
        )}
      </TitleStyled>
      <TextStyled>
        {t(
          'unsubscribe-popup.pause-question',
          'Need to step away? No problem.'
        )}
      </TextStyled>
      <TextStyled>
        {t(
          'unsubscribe-popup.pause-description',
          'Pause your subscription until the beginning of next season, you can resume at any time.'
        )}
      </TextStyled>
      <ButtonWrapperStyled $fillWrapper $customMargin='80px 0 0'>
        <Button
          variant='confirm'
          onClickFn={() =>
            dispatch(
              showPopup({
                type: 'pauseSubscription',
                data: {
                  offerData: {
                    ...pauseOffer
                  },
                  isPartOfCancellationFlow: true
                }
              })
            )
          }
        >
          {t('unsubscribe-popup.pause-button-text', 'Pause my subscription')}
        </Button>
      </ButtonWrapperStyled>
      <TextStyled>
        {t('unsubscribe-popup.still-cancel', 'Still want to cancel?')}
      </TextStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button variant='simple' onClickFn={() => dispatch(hidePopup())}>
          {t('unsubscribe-popup.back-button', 'Back to My Account')}
        </Button>
        <Button variant='primary' onClickFn={handleClick}>
          {t('unsubscribe-popup.unsubscribe-button-text', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </ContentStyled>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Pause };
