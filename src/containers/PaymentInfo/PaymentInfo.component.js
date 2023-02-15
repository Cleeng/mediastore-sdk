/* eslint-disable react/forbid-prop-types */

import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import PaymentMethod from 'components/PaymentMethod';
import SectionHeader from 'components/SectionHeader';
import Transactions from 'components/Transactions';
import { PropTypes } from 'prop-types';
import UpdatePaymentDetailsPopup from 'components/UpdatePaymentDetailsPopup';
import { useSelector, useDispatch } from 'react-redux';
import GracePeriodError from 'components/GracePeriodError';
import { init as initPublisherConfig } from 'redux/publisherConfigSlice';
import withAddPaymentDetailsFinalizationHandler from 'containers/WithAddPaymentDetailsFinalizationHandler';
import { updatePaymentDetailsPopup } from 'redux/popupSlice';
import { WrapStyled } from './PaymentInfoStyled';

const PaymentInfoFn = ({
  popupManager,
  adyenConfiguration: adyenConfigurationProp,
  t,
  displayGracePeriodError
}) => {
  const dispatch = useDispatch();

  const { adyenConfiguration: adyenConfigurationStore } = useSelector(
    state => state.publisherConfig
  );

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
      {popupManager.paymentDetails.isOpen ? (
        <UpdatePaymentDetailsPopup />
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

PaymentInfoFn.propTypes = {
  popupManager: PropTypes.objectOf(PropTypes.any).isRequired,
  adyenConfiguration: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func,
  displayGracePeriodError: PropTypes.bool
};

PaymentInfoFn.defaultProps = {
  adyenConfiguration: null,
  t: k => k,
  displayGracePeriodError: null
};

export default withTranslation()(
  labeling()(withAddPaymentDetailsFinalizationHandler(PaymentInfoFn))
);
