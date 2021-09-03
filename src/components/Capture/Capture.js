import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
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

const Capture = ({ settings, redirectUrl }) => {
  const [t] = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const [captureSettings, setCaptureSettings] = useState(null);

  useEffect(() => {
    if (settings.length) {
      setCaptureSettings(settings);
    } else {
      getCaptureStatus().then(resp => {
        if (resp.responseData.shouldCaptureBeDisplayed === true) {
          setCaptureSettings(resp.responseData.settings);
        } else {
          const currentRedirection = redirectUrl.shift();
          setRedirect({
            redirectUrl: currentRedirection,
            state: { redirectUrl }
          });
        }
      });
    }
  }, []);

  return (
    <>
      {redirect ? (
        <Redirect
          to={{
            pathname: redirect.redirectUrl,
            state: redirect.state
          }}
        />
      ) : (
        <CaptureStyled>
          <Header />
          <CaptureContentStyled>
            <CaptureTitle>{t('Confirm Registration')}</CaptureTitle>
            {captureSettings ? (
              <CaptureForm
                settings={captureSettings}
                redirectUrl={redirectUrl}
              />
            ) : (
              <Loader />
            )}
          </CaptureContentStyled>
          <Footer isCheckout={false} />
        </CaptureStyled>
      )}
    </>
  );
};

Capture.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.any),
  redirectUrl: PropTypes.arrayOf(PropTypes.any)
};

Capture.defaultProps = {
  settings: [],
  redirectUrl: []
};

export default Capture;
