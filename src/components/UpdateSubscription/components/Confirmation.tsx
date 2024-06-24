import React from 'react';
import {
  ContentStyled,
  TextStyled,
  TitleStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { hidePopup, selectOfferData } from 'appRedux/popupSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { dateFormat, INFINITE_DATE } from 'util/planHelper';
import { updateList } from 'appRedux/planDetailsSlice';

const Confirmation = () => {
  const offerDetails = useAppSelector(selectOfferData);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ContentStyled>
      <img src={checkmarkIcon} alt='checkmark icon' />
      <TitleStyled>
        {t('unsubscribe-popup.success.title', 'Miss you already.')}
      </TitleStyled>
      <TextStyled>
        {t(
          'unsubscribe-popup.success.description',
          'You have been successfully unsubscribed. Your current plan will expire on'
        )}{' '}
        <b>
          {offerDetails?.expiresAt === INFINITE_DATE
            ? t('unsubscribe-popup.next-season-start', 'the next season start')
            : dateFormat(Number(offerDetails?.expiresAt))}
        </b>
        .
      </TextStyled>
      <Button
        width='auto'
        margin='30px auto 0 auto'
        onClickFn={() => {
          dispatch(hidePopup());
          dispatch(updateList());
        }}
      >
        {t('unsubscribe-popup.back-button', 'Back to My Account')}
      </Button>
    </ContentStyled>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Confirmation };
