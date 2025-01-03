import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import getCaptureStatus from 'api/Customer/getCaptureStatus';
import { CaptureProps, CaptureSetting } from '../../types/Capture.types';
import CaptureForm from './CaptureForm/CaptureForm';

import {
  CaptureStyled,
  CaptureContentStyled,
  CaptureTitle
} from './CaptureStyled';

const noop = () => null;

const Capture = ({ onSuccess = noop }: CaptureProps) => {
  const { t } = useTranslation();
  const [captureSettings, setCaptureSettings] = useState<CaptureSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCaptureStatus().then(({ responseData }) => {
      const { shouldCaptureBeDisplayed, settings } = responseData;

      if (shouldCaptureBeDisplayed) {
        setCaptureSettings(settings);
        setIsLoading(false);
      } else {
        onSuccess();
      }
    });
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

export default Capture;
