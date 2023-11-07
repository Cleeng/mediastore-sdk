import {
  ButtonWrapperStyled,
  ContentStyled,
  TextStyled,
  TitleStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { hidePopup, selectOfferData } from 'redux/popupSlice';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { dateFormat, INFINITE_DATE } from 'util/planHelper';
import {
  ReasonsWrapper,
  StyledItem
} from 'components/UpdateSubscription/UpdateSubscriptionStyled';
import Checkbox from 'components/Checkbox';
import STEPS from 'components/UpdateSubscription/Unsubscribe.enum';
import Loader from 'components/Loader';
import { selectOffers } from 'redux/offersSlice';
import { CancellationReason } from 'containers/PlanDetails/PlanDetails.types';
import { SwitchDetail } from 'redux/types';

const Survey = ({
  scheduledSwitch,
  cancellationReasonsToShow,
  checkedReason,
  shouldShowDowngrades,
  isLoading,
  unsubscribe,
  handleCheckboxClick,
  handleButtonClick
}: {
  cancellationReasonsToShow: CancellationReason[];
  checkedReason: string;
  shouldShowDowngrades: boolean;
  isLoading: boolean;
  unsubscribe: () => Promise<void>;
  handleCheckboxClick: (value: string) => void;
  handleButtonClick: (step: STEPS) => void;
  scheduledSwitch: () => false | SwitchDetail;
}) => {
  const offerDetails = useAppSelector(selectOfferData);
  const dispatch = useAppDispatch();

  const { offers } = useAppSelector(selectOffers);

  const { t } = useTranslation();

  const formattedExpiresAt = dateFormat(Number(offerDetails?.expiresAt));
  const scheduledResult = scheduledSwitch();
  const cancelUnsubscribeAction = () => {
    window.dispatchEvent(new CustomEvent('MSSDK:unsubscribe-action-cancelled'));
    dispatch(hidePopup());
  };

  const toOfferId =
    scheduledResult !== false ? scheduledResult.toOfferId : null;

  const toOfferIdTitle = offers.find(
    ({ longId }: { longId: string }) => longId === toOfferId
  )?.title;
  const scheduledSwitchTitle = t(`offer-title-${toOfferId}`, toOfferIdTitle);
  const translatedTitle = t(
    `offer-title-${offerDetails?.offerId}`,
    offerDetails ? offerDetails.offerTitle : ''
  );

  return (
    <>
      <ContentStyled>
        <TitleStyled>
          {t('unsubscribe-popup.survey-title', 'We’re sorry to see you go')}
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
            {scheduledSwitch() ? (
              t(
                'unsubscribe-popup.survey.switch-pending',
                `Your subscription switch is still pending. You will switch to {{scheduledSwitchTitle}} and be charged a new price.`,
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
            <Trans i18nKey="unsubscribe-popup.survey.info">
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
                  isRadioButton
                  onClickFn={() => handleCheckboxClick(value)}
                  checked={value === checkedReason}
                >
                  <>{t(key, value)}</>
                </Checkbox>
              </StyledItem>
            ))}
          </ReasonsWrapper>
        )}
      </ContentStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button
          theme="simple"
          onClickFn={() =>
            shouldShowDowngrades
              ? handleButtonClick(STEPS.DOWNGRADES)
              : cancelUnsubscribeAction()
          }
        >
          {t('unsubscribe-popup.survey.go-back', 'Go back')}
        </Button>
        <Button
          theme="confirm"
          onClickFn={unsubscribe}
          disabled={checkedReason === '' || isLoading}
        >
          {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
            t('unsubscribe-popup.survey.unsubscribe', 'Unsubscribe')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Survey };
