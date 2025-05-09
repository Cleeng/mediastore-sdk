import { Trans, useTranslation } from 'react-i18next';
import { hidePopup, selectOfferData } from 'appRedux/popupSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import type { SwitchDetail } from 'appRedux/types';
import { selectUnsubscribe } from 'appRedux/unsubscribeSlice';
import { selectOffers } from 'appRedux/offersSlice';
import { dateFormat, INFINITE_DATE } from 'util/planHelper';
import eventDispatcher, {
  UNSUBSCRIBE_ACTION_CANCELLED
} from 'util/eventDispatcher';
import {
  ReasonsWrapper,
  StyledItem
} from 'components/UpdateSubscription/UpdateSubscriptionStyled';
import {
  ButtonWrapperStyled,
  ContentStyled,
  TextStyled,
  TitleStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import type { CancellationReason } from 'containers/PlanDetails/PlanDetails.types';

import { DEFAULT_CANCELLATION_REASONS, STEPS } from '../constants';

const Survey = ({
  scheduledSwitch,
  customCancellationReasons,
  checkedReason,
  shouldShowDowngrades,
  setCurrentStep,
  handleCheckboxClick,
  handleUnsubscribe
}: {
  customCancellationReasons: CancellationReason[] | undefined;
  checkedReason: string;
  shouldShowDowngrades: boolean;
  handleCheckboxClick: (value: string) => void;
  setCurrentStep: (step: STEPS) => void;
  scheduledSwitch: SwitchDetail | null;
  handleUnsubscribe: () => void;
}) => {
  const offerDetails = useAppSelector(selectOfferData);
  const dispatch = useAppDispatch();
  const { offers } = useAppSelector(selectOffers);
  const { loading: isLoading } = useAppSelector(selectUnsubscribe);

  const { t } = useTranslation();

  const formattedExpiresAt = dateFormat(Number(offerDetails?.expiresAt));
  const cancelUnsubscribeAction = () => {
    eventDispatcher(UNSUBSCRIBE_ACTION_CANCELLED);
    dispatch(hidePopup());
  };

  const toOfferId = scheduledSwitch !== null ? scheduledSwitch.toOfferId : null;

  const toOfferIdTitle =
    offers.find(({ longId }: { longId: string }) => longId === toOfferId)
      ?.title || '';
  const scheduledSwitchTitle = t(`offer-title-${toOfferId}`, toOfferIdTitle);
  const translatedTitle = t(
    `offer-title-${offerDetails?.offerId}`,
    offerDetails ? offerDetails.offerTitle : ''
  );

  const cancellationReasonsToShow = customCancellationReasons?.length
    ? customCancellationReasons
    : DEFAULT_CANCELLATION_REASONS;

  const handleGoBackButton = () => {
    if (shouldShowDowngrades) {
      setCurrentStep(STEPS.DOWNGRADES);
      return;
    }

    cancelUnsubscribeAction();
  };

  return (
    <>
      <ContentStyled>
        <TitleStyled>
          {t('unsubscribe-popup.survey.title', 'We’re sorry to see you go')}
        </TitleStyled>
        {offerDetails?.period === 'season' ? (
          <TextStyled>
            {t(
              'unsubscribe-popup.survey.access-info',
              'You will keep access to your seasonal subscription until {{formattedExpiresAt}}. Before you go, please let us know why you’re leaving.',
              {
                formattedExpiresAt:
                  offerDetails?.expiresAt === INFINITE_DATE
                    ? t(
                        'unsubscribe-popup.next-season-start',
                        'the next season start'
                      )
                    : dateFormat(offerDetails?.expiresAt)
              }
            )}
          </TextStyled>
        ) : (
          <TextStyled>
            {scheduledSwitch ? (
              t(
                'unsubscribe-popup.survey.switch-pending',
                'Your subscription switch is still pending. You will switch to {{scheduledSwitchTitle}} and be charged a new price.',
                { scheduledSwitchTitle }
              )
            ) : (
              <>
                {offerDetails?.inTrial
                  ? t(
                      'unsubscribe-popup.survey.free-trial',
                      'Your {{translatedTitle}} free trial will end on {{formattedExpiresAt}}.',
                      { translatedTitle, formattedExpiresAt }
                    )
                  : t(
                      'unsubscribe-popup.survey.subscription-paid',
                      'Your {{translatedTitle}} subscription is paid until {{formattedExpiresAt}}.',
                      { translatedTitle, formattedExpiresAt }
                    )}
              </>
            )}{' '}
            <Trans i18nKey='unsubscribe-popup.survey.info'>
              If you would like to proceed with cancelling your subscription,
              please select &lsquo;Unsubscribe&rsquo; below, and your
              subscription will be cancelled as of {{ formattedExpiresAt }}.
              Until then, you will continue to have access to all of your
              current subscription features. Before you go, please let us know
              why you&apos;re leaving.
            </Trans>
          </TextStyled>
        )}
        {cancellationReasonsToShow && (
          <ReasonsWrapper>
            {cancellationReasonsToShow.map(({ key, value }) => (
              <StyledItem key={key}>
                <Checkbox
                  id={key}
                  isRadioButton
                  onClickFn={() => handleCheckboxClick(value)}
                  isChecked={value === checkedReason}
                >
                  {t(key, value)}
                </Checkbox>
              </StyledItem>
            ))}
          </ReasonsWrapper>
        )}
      </ContentStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button variant='simple' onClickFn={handleGoBackButton}>
          {t('unsubscribe-popup.survey.go-back', 'Go back')}
        </Button>
        <Button
          variant='confirm'
          onClickFn={handleUnsubscribe}
          disabled={checkedReason === '' || isLoading}
        >
          {(isLoading && <Loader buttonLoader color='#ffffff' />) ||
            t('unsubscribe-popup.survey.unsubscribe', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Survey };
