import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'appRedux/store';
import { hidePopup } from 'appRedux/popupSlice';
import checkmarkIcon from 'assets/images/checkmarkBase';
import Button from 'components/Button';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import {
  ImageStyled,
  ImageWrapper
} from 'components/SwitchPlanPopup/SwitchPlanPopupStyled';

const FreeExtensionConfirmation = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <ImageStyled src={checkmarkIcon} alt='checkmark icon' />
        </ImageWrapper>
        <TitleStyled>
          {t('free-extension.success.header', 'Thank You!')}
        </TitleStyled>
        <TextStyled>
          {t(
            'free-extension.success.description',
            'You have successfully extended your plan'
          )}
        </TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled>
        <Button theme='confirm' onClickFn={() => dispatch(hidePopup())}>
          {t('free-extension.success.back-button', 'Back to My Account')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default FreeExtensionConfirmation;
