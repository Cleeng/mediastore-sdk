import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/store';
import { hidePopup } from 'redux/popupSlice';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';

const STEPS = {
  PAUSE: 'PAUSE',
  DOWNGRADES: 'DOWNGRADES',
  SURVEY: 'SURVEY',
  CONFIRMATION: 'CONFIRMATION'
};

type FreeExtensionProps = {
  setCurrentStep: (step: string) => null;
};

const FreeExtension = ({ setCurrentStep }: FreeExtensionProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <ContentStyled>
      <>
        <TitleStyled>
          {t(
            'unsubscribe-popup.free-extension-instead',
            'How about a special offer just for you?'
          )}
        </TitleStyled>
        <TextStyled>
          {t(
            'unsubscribe-popup.plans-proposal',
            "No words can express how much we will miss you so we figured that we'll let this offer speak for itself"
          )}
        </TextStyled>
      </>
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
        <Button theme="confirm" onClickFn={() => setCurrentStep(STEPS.SURVEY)}>
          {t('unsubscribe-popup.unsubscribe-button-text', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </ContentStyled>
  );
};

export default FreeExtension;
