import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/store';
import { hidePopup } from 'redux/popupSlice';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import Button from 'components/Button';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { ImageWrapper } from 'components/SwitchPlanPopup/SwitchPlanPopupStyled';

const FreeExtensionError = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <Close />
        </ImageWrapper>
        <TitleStyled>
          {t('free-extension.error.title', 'An error occurred.')}
        </TitleStyled>
        <TextStyled>
          {t(
            'free-extension.error.description',
            'We have been unable to extend your plan as an error occurred. Sorry for the inconvenience, please try again.'
          )}
        </TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled>
        <Button theme='confirm' onClickFn={() => dispatch(hidePopup())}>
          {t('free-extension.error.back-button', 'Back to My Account')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default FreeExtensionError;
