import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { hidePopup } from 'redux/popupSlice';
import { selectRetentionActions } from 'redux/retentionActionsSlice';
import Button from 'components/Button';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import {
  FreeExtensionWrapperStyled,
  TextWrapperStyled,
  FreeExtensionCardStyled,
  AcceptButtonWrapperStyled,
  FreeExtensionCardPeriodStyled
} from './FreeExtension.styled';

type FreeExtensionProps = {
  handleUnsubscribe: () => void;
};

const FreeExtension = ({ handleUnsubscribe }: FreeExtensionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    retentionActions: {
      extensionDetails: { periodUnit, amount }
    }
  } = useAppSelector(selectRetentionActions);

  return (
    <ContentStyled>
      <FreeExtensionWrapperStyled>
        <TextWrapperStyled>
          <TitleStyled>
            {t(
              'free-extension.title',
              'How about a special offer just for you?'
            )}
          </TitleStyled>
          <TextStyled>
            {t(
              'free-extension.secondary-text',
              "No words can express how much we will miss you so we figured that we'll let this offer speak for itself."
            )}
          </TextStyled>
        </TextWrapperStyled>
        <FreeExtensionCardStyled>
          <div>
            <TextStyled>
              {t('free-extension.card-title', 'FREE EXTENSION')}
            </TextStyled>
            <FreeExtensionCardPeriodStyled>
              {t('free-extension.period-text', '{{amount}} {{periodUnit}}', {
                amount,
                periodUnit
              })}
            </FreeExtensionCardPeriodStyled>
          </div>
          <AcceptButtonWrapperStyled>
            <Button theme="confirm" size="normal" onClickFn={() => null}>
              {t('free-extension.accept-button', 'I accept the offer')}
            </Button>
          </AcceptButtonWrapperStyled>
        </FreeExtensionCardStyled>
        <ButtonWrapperStyled $removeMargin>
          <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
            {t('free-extension.back-button', 'Back to My Account')}
          </Button>
          <LinkStyled as="button" onClick={handleUnsubscribe}>
            {t(
              'free-extension.unsubscribe-button',
              'I want to unsubscribe anyway'
            )}
          </LinkStyled>
        </ButtonWrapperStyled>
      </FreeExtensionWrapperStyled>
    </ContentStyled>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { FreeExtension };
