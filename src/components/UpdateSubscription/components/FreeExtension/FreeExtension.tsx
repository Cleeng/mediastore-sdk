import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { hidePopup } from 'appRedux/popupSlice';
import {
  fetchApplyRetentionAction,
  selectOnlyRetentionActions,
  selectRetentionActions
} from 'appRedux/retentionActionsSlice';
import Button from 'components/Button';
import Loader from 'components/Loader';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import FreeExtensionError from './FreeExtensionError';
import FreeExtensionConfirmation from './FreeExtensionConfirmation';

import {
  FreeExtensionWrapperStyled,
  TextWrapperStyled,
  FreeExtensionCardStyled,
  AcceptButtonWrapperStyled,
  FreeExtensionCardPeriodStyled
} from './FreeExtension.styled';

import { FreeExtensionProps } from './FreeExtension.types';

const FreeExtension = ({
  handleUnsubscribe,
  setIsFreeExtensionSecondStep
}: FreeExtensionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isError, setIsError] = useState(false);
  const [isThankYouPage, setIsThankYouPage] = useState(false);

  const { isApplyLoading } = useAppSelector(selectRetentionActions);

  const {
    extensionDetails: { periodUnit, amount },
    offerId
  } = useAppSelector(selectOnlyRetentionActions);

  const handleApplyRetentionAction = async () => {
    await dispatch(fetchApplyRetentionAction(offerId))
      .unwrap()
      .catch(() => {
        setIsError(true);
        setIsFreeExtensionSecondStep(true);
      });

    setIsThankYouPage(true);
    setIsFreeExtensionSecondStep(true);
  };

  const renderPeriodTextElement = () => {
    if (amount > 1) {
      return (
        <>
          {`${amount} ${t(
            `free-extension.period.${periodUnit}s`,
            '{{periodUnit}}s',
            {
              periodUnit
            }
          )}`}
        </>
      );
    }

    return (
      <>
        {`${amount} ${t(
          `free-extension.period.${periodUnit}`,
          '{{periodUnit}}',
          {
            periodUnit
          }
        )}`}
      </>
    );
  };

  if (isError) {
    return <FreeExtensionError />;
  }

  if (isThankYouPage) {
    return <FreeExtensionConfirmation />;
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
            <TextStyled id='free-extension-card-title'>
              {t('free-extension.card-title', 'FREE EXTENSION')}
            </TextStyled>
            <FreeExtensionCardPeriodStyled id='free-extension-period'>
              {renderPeriodTextElement()}
            </FreeExtensionCardPeriodStyled>
          </div>
          <AcceptButtonWrapperStyled>
            <Button
              theme='confirm'
              size='normal'
              onClickFn={handleApplyRetentionAction}
            >
              {isApplyLoading ? (
                <Loader buttonLoader color='#ffffff' />
              ) : (
                t('free-extension.accept-button', 'I accept the offer')
              )}
            </Button>
          </AcceptButtonWrapperStyled>
        </FreeExtensionCardStyled>
        <ButtonWrapperStyled $removeMargin>
          <Button theme='simple' onClickFn={() => dispatch(hidePopup())}>
            {t('free-extension.back-button', 'Back to My Account')}
          </Button>
          <LinkStyled as='button' onClick={handleUnsubscribe}>
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
