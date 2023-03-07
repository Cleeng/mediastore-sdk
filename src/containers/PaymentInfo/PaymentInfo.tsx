import { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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
  selectPaymentDetails,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { WrapStyled } from './PaymentInfoStyled';
import { PaymentInfoProps } from './PaymentInfo.types';

const PaymentInfo = ({
  adyenConfiguration: adyenConfigurationProp,
  t,
  displayGracePeriodError
}: PaymentInfoProps) => {
  const dispatch = useAppDispatch();

  const adyenConfigurationStore = useAppSelector(selectAdyenConfiguration);

  const paymentDetailsPopup = useAppSelector(selectPaymentDetails);

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

  return (
    <WrapStyled>
      <GracePeriodError />
      {paymentDetailsPopup.isOpen ? (
        <div data-testid="payment-info__update-payment-details-popup">
          <UpdatePaymentDetailsPopup />
        </div>
      ) : (
        <>
          <SectionHeader>{t('Current payment method')}</SectionHeader>
          <PaymentMethod />
          <SectionHeader marginTop="25px">{t('Payment history')}</SectionHeader>
          <Transactions />
        </>
      )}
    </WrapStyled>
  );
};

export default withTranslation()(
  labeling()(withAddPaymentDetailsFinalizationHandler(PaymentInfo))
);
