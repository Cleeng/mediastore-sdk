/* eslint-disable react/forbid-prop-types */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentMethod from 'components/PaymentMethod';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import UpdatePaymentDetailsPopup from 'components/UpdatePaymentDetailsPopup';
import GracePeriodError from 'components/GracePeriodError';
import {
  init as initPublisherConfig,
  selectAdyenConfiguration
} from 'redux/publisherConfigSlice';
import withAddPaymentDetailsFinalizationHandler from 'containers/WithAddPaymentDetailsFinalizationHandler';
import {
  POPUP_TYPES,
  selectPaymentDetailsPopup,
  selectPopupDetails,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { WrapStyled } from './PaymentInfoStyled';
import { PaymentInfoProps } from './PaymentInfo.types';

const PaymentInfo = ({
  adyenConfiguration: adyenConfigurationProp,
  displayGracePeriodError
}: PaymentInfoProps) => {
  const dispatch = useAppDispatch();

  const adyenConfigurationStore = useAppSelector(selectAdyenConfiguration);
  const { isOpen, currentType } = useAppSelector(selectPopupDetails);

  const { t } = useTranslation();

  const paymentDetailsPopup = useAppSelector(selectPaymentDetailsPopup);

  const adyenConfiguration = adyenConfigurationProp || adyenConfigurationStore;

  useEffect(() => {
    dispatch(initPublisherConfig({ adyenConfiguration }));

    if (displayGracePeriodError !== null) {
      dispatch(
        initPublisherConfig({
          displayGracePeriodError
        })
      );
    }

    return () => {
      dispatch(updatePaymentDetailsPopup({ isOpen: false }));
    };
  }, []);

  const isEditDeliveryDetailsPopupOpened =
    isOpen && currentType === POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP;

  return (
    <WrapStyled>
      <GracePeriodError />
      {paymentDetailsPopup.isOpen ? (
        <div data-testid="payment-info__update-payment-details-popup">
          <UpdatePaymentDetailsPopup />
        </div>
      ) : (
        <>
          {isEditDeliveryDetailsPopupOpened ? (
            <section>
              <Transactions />
            </section>
          ) : (
            <>
              <section>
                <SectionHeader>
                  <>
                    {t(
                      'paymentinfo.current-payment-method',
                      'Current payment method'
                    )}
                  </>
                </SectionHeader>
                <PaymentMethod />
              </section>
              <section>
                <SectionHeader marginTop="25px">
                  <>{t('paymentinfo.payment-history', 'Payment history')}</>
                </SectionHeader>
                <Transactions />
              </section>
            </>
          )}
        </>
      )}
    </WrapStyled>
  );
};

export default withAddPaymentDetailsFinalizationHandler(PaymentInfo);
