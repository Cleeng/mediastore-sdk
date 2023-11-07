import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/store';
import { hidePopup } from 'redux/popupSlice';
import Button from 'components/Button';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import AcceptButtonWrapperStyled from './FreeExtension.styled';
import STEPS from '../Unsubscribe.enum';

type FreeExtensionProps = {
  setCurrentStep: (step: STEPS | null) => void;
};

const FreeExtension = ({ setCurrentStep }: FreeExtensionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <ContentStyled>
      <>
        <TitleStyled>
          {t('free-extension.title', 'How about a special offer just for you?')}
        </TitleStyled>
        <TextStyled>
          {t(
            'free-extension.secondary-text',
            "No words can express how much we will miss you so we figured that we'll let this offer speak for itself"
          )}
        </TextStyled>
      </>
      <AcceptButtonWrapperStyled>
        <Button
          theme="confirm"
          size="normal"
          onClickFn={() => console.log('accept')}
        >
          {t('free-extension.accept-offer', 'Get X months free')}
        </Button>
      </AcceptButtonWrapperStyled>
      <TextStyled>
        {t(
          'free-extension.still-cancel-text',
          'Or still wants to cancel a subscription?'
        )}
      </TextStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
          {t('free-extension.back-button', 'Back to My Account')}
        </Button>
        <Button theme="confirm" onClickFn={() => setCurrentStep(STEPS.SURVEY)}>
          {t('free-extension.unsubscribe-button-text', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </ContentStyled>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { FreeExtension };
