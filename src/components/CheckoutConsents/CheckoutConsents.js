import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getCustomerConsents, submitConsents } from 'api';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import {
  CheckoutConsentsStyled,
  CheckoutConsentsContentStyled,
  CheckoutConsentsTitleStyled,
  CheckoutConsentsSubTitleStyled,
  CheckoutConsentsListStyled,
  CheckoutConsentsCheckbox,
  CheckoutConsentsError
} from './CheckoutConsentsStyled';

const CheckoutConsents = ({ onSuccess }) => {
  const [t] = useTranslation();
  const [consents, setConsents] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    getCustomerConsents().then(resp => {
      const consentsToAccept = resp.responseData.consents.filter(
        consent =>
          consent.newestVersion > consent.version ||
          consent.needsUpdate === true
      );
      if (consentsToAccept.length === 0) onSuccess();
      setConsents(consentsToAccept);
    });
  }, []);

  const handleClick = (e, isConsentDisabled, clicked) => {
    const updatedConsents = consents.map(consent => {
      if (consent.name === clicked.name) {
        return {
          ...consent,
          state: clicked.state === 'accepted' ? 'declined' : 'accepted'
        };
      }
      return consent;
    });
    setConsents(updatedConsents);
  };

  const validateConsents = () => {
    let isError = false;
    const updatedConsents = consents.map(consent => {
      if (consent.required && consent.state === 'declined') {
        isError = true;
        return {
          ...consent,
          error: t('This consent is required')
        };
      }
      return consent;
    });
    setConsents(updatedConsents);
    return !isError;
  };

  const updateConsents = () => {
    if (validateConsents()) {
      const payload = consents.map(consent => {
        return {
          name: consent.name,
          version: consent.newestVersion,
          state: consent.state
        };
      });
      setProcessing(true);
      submitConsents([], [], payload)
        .then(() => {
          setProcessing(false);
          onSuccess();
        })
        .catch(() => {
          setGeneralError(t('Something went wrong. Try again later'));
        });
    }
  };

  return (
    <>
      <CheckoutConsentsStyled>
        <Header />
        <CheckoutConsentsContentStyled>
          {consents ? (
            <>
              <CheckoutConsentsTitleStyled>
                {t('Terms & Conditions')}
              </CheckoutConsentsTitleStyled>
              <CheckoutConsentsSubTitleStyled>
                {t('Please accept Terms & Conditions')}
              </CheckoutConsentsSubTitleStyled>
              <CheckoutConsentsListStyled>
                {consents.map(consent => (
                  <CheckoutConsentsCheckbox key={consent.name}>
                    <Checkbox
                      isMyAccount
                      onClickFn={(e, isConsentDisabled) =>
                        handleClick(e, isConsentDisabled, consent)
                      }
                      checked={consent.state === 'accepted'}
                      required={consent.required}
                    >
                      {t(consent.label)}
                    </Checkbox>
                    <CheckoutConsentsError>
                      {consent.error}
                    </CheckoutConsentsError>
                  </CheckoutConsentsCheckbox>
                ))}
                {generalError && (
                  <CheckoutConsentsError center>
                    {generalError}
                  </CheckoutConsentsError>
                )}
              </CheckoutConsentsListStyled>
              <Button size="big" theme="confirm" onClickFn={updateConsents}>
                {processing ? (
                  <Loader buttonLoader color="#ffffff" />
                ) : (
                  t('Continue')
                )}
              </Button>
            </>
          ) : (
            <Loader />
          )}
        </CheckoutConsentsContentStyled>
        <Footer isCheckout={false} />
      </CheckoutConsentsStyled>
    </>
  );
};

CheckoutConsents.propTypes = {
  onSuccess: PropTypes.func
};

CheckoutConsents.defaultProps = {
  onSuccess: () => {}
};

export default CheckoutConsents;
