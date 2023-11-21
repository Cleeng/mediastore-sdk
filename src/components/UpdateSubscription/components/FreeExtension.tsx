import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { hidePopup } from 'redux/popupSlice';
import {
  fetchApplyRetentionAction,
  selectRetentionActions
} from 'redux/retentionActionsSlice';
import Button from 'components/Button';
import Loader from 'components/Loader';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import {
  ImageStyled,
  ImageWrapper
} from 'components/SwitchPlanPopup/SwitchPlanPopupStyled';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import checkmarkIcon from 'assets/images/checkmarkBase';

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

  const [isError, setIsError] = useState(false);
  const [isThankYouPage, setIsThankYouPage] = useState(false);

  const {
    isApplyLoading,
    retentionActions: {
      extensionDetails: { periodUnit, amount },
      offerId
    }
  } = useAppSelector(selectRetentionActions);

  const handleApplyRetentionAction = async () => {
    const result = await dispatch(fetchApplyRetentionAction(offerId));

    if (result?.error) {
      setIsError(true);
      return;
    }

    setIsThankYouPage(true);
  };

  if (isError) {
    return (
      <>
        <ContentStyled>
          <ImageWrapper>
            <Close />
          </ImageWrapper>
          <TitleStyled>
            {t('switchplan-popup.error-title', 'An error occurred.')}
          </TitleStyled>
          <TextStyled>
            {t(
              'switchplan-popup.error-description',
              'We have been unable to extend your plan as an error occurred. Sorry for the inconvenience, please try again.'
            )}
          </TextStyled>
        </ContentStyled>
        <ButtonWrapperStyled>
          <Button theme="confirm" onClickFn={() => dispatch(hidePopup())}>
            {t('switchplan-popup.back-button', 'Back to My Account')}
          </Button>
        </ButtonWrapperStyled>
      </>
    );
  }

  if (isThankYouPage) {
    return (
      <>
        <ContentStyled>
          <ImageWrapper>
            <ImageStyled src={checkmarkIcon} alt="checkmark icon" />
          </ImageWrapper>
          <TitleStyled>
            {t('switchplan-popup.success.header', 'Thank You!')}
          </TitleStyled>
          <TextStyled>
            {t(
              'free-extension.secondary-text',
              'You have successfully extened your plan'
            )}
          </TextStyled>
        </ContentStyled>
        <ButtonWrapperStyled>
          <Button theme="confirm" onClickFn={() => dispatch(hidePopup())}>
            {t('switchplan-popup.back-button', 'Back to My Account')}
          </Button>
        </ButtonWrapperStyled>
      </>
    );
  }

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
            <Button
              theme="confirm"
              size="normal"
              onClickFn={handleApplyRetentionAction}
            >
              {isApplyLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('free-extension.accept-button', 'I accept the offer')
              )}
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
