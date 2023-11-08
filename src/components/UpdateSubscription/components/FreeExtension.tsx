import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { hidePopup } from 'redux/popupSlice';
import { UpdateSubscription } from 'redux/types';
import Button from 'components/Button';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import AcceptButtonWrapperStyled from './FreeExtension.styled';

type FreeExtensionProps = {
  handleUnsubscribe: () => void;
};

const FreeExtension = ({ handleUnsubscribe }: FreeExtensionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { updateSubscription } = useAppSelector(state => state.popupManager);

  const {
    retentionActions: {
      extensionDetails: { periodUnit, amount }
    }
  } = updateSubscription || ({} as UpdateSubscription);

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
        <Button theme="confirm" size="normal" onClickFn={() => null}>
          {`${t(
            'free-extension.accept-offer-button-text-1',
            'Get {{amount}} {{periodUnit}}',
            { amount, periodUnit }
          )} ${t('free-extension.accept-offer-button-text-2', 'free')}`}
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
        <Button theme="confirm" onClickFn={handleUnsubscribe}>
          {t('free-extension.unsubscribe-button-text', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </ContentStyled>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { FreeExtension };
