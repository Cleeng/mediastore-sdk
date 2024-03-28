import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import getCaptureStatus from 'api/Customer/getCaptureStatus';
import CaptureForm from './CaptureForm/CaptureForm';

import {
  CaptureStyled,
  CaptureContentStyled,
  CaptureTitle
} from './CaptureStyled';

const Capture = ({ settings, onSuccess }) => {
  const { t } = useTranslation();
  const [captureSettings, setCaptureSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (settings.length) {
      setCaptureSettings(settings);
      setIsLoading(false);
    } else {
      getCaptureStatus().then(resp => {
        if (resp.responseData.shouldCaptureBeDisplayed === true) {
          setCaptureSettings(resp.responseData.settings);
          setIsLoading(false);
        } else {
          onSuccess();
        }
      });
    }
  }, []);

  return (
    <CaptureStyled>
      <Header />
      <CaptureContentStyled>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <CaptureTitle>
              {t('capture.confirm-registration', 'Confirm Registration')}
            </CaptureTitle>
            <CaptureForm settings={captureSettings} onSuccess={onSuccess} />
          </>
        )}
      </CaptureContentStyled>
      {!isLoading && captureSettings && <Footer isCheckout={false} />}
    </CaptureStyled>
  );
};

Capture.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.any),
  onSuccess: PropTypes.func
};

Capture.defaultProps = {
  settings: [],
  onSuccess: () => null
};

export default Capture;
