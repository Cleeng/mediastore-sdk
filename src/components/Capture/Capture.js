import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import CaptureForm from './CaptureForm/CaptureForm';

import {
  CaptureStyled,
  CaptureContentStyled,
  CaptureTitle
} from './CaptureStyled';

const Capture = ({ settings, redirectUrl }) => {
  const [captureSettings, setCaptureSettings] = useState(null);

  useEffect(() => {
    setCaptureSettings(settings);
  }, [captureSettings]);

  return (
    <CaptureStyled>
      <Header />
      <CaptureContentStyled>
        <CaptureTitle>Confirm Registration</CaptureTitle>
        {captureSettings ? (
          <CaptureForm settings={captureSettings} redirectUrl={redirectUrl} />
        ) : (
          <Loader />
        )}
      </CaptureContentStyled>
      <Footer isCheckout={false} />
    </CaptureStyled>
  );
};

Capture.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.any),
  redirectUrl: PropTypes.string
};

Capture.defaultProps = {
  settings: [],
  redirectUrl: ''
};

export default Capture;
