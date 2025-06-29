import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getCustomerConsents, submitConsents } from 'api';
import translateConsents from 'util/consentsHelper';
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
  CheckoutConsentsListItem,
  CheckoutConsentsError
} from './CheckoutConsentsStyled';

const CheckoutConsents = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [consents, setConsents] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    getCustomerConsents()
      .then((resp) => {
        const consentsToAccept = resp.responseData.consents.filter(
          (consent) =>
            consent.newestVersion > consent.version ||
            consent.needsUpdate === true
        );
        if (consentsToAccept.length === 0) onSuccess();
        else setConsents(consentsToAccept);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleClick = (e, isConsentDisabled, clicked) => {
    const updatedConsents = consents.map((consent) => {
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
    const updatedConsents = consents.map((consent) => {
      if (consent.required && consent.state === 'declined') {
        isError = true;
        return {
          ...consent,
          error: t(
            'checkout-consents.error.required',
            'This consent is required'
          )
        };
      }
      return consent;
    });
    setConsents(updatedConsents);
    return !isError;
  };

  const updateConsents = () => {
    if (validateConsents()) {
      const payload = consents.map((consent) => {
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
          setGeneralError(
            t(
              'checkout-consents.error.submit',
              'Something went wrong. Try again later'
            )
          );
        });
    }
  };

  return (
    <>
      <CheckoutConsentsStyled>
        <Header />
        <CheckoutConsentsContentStyled>
          {isLoading || !consents ? (
            <Loader />
          ) : (
            <>
              <CheckoutConsentsTitleStyled>
                {t('checkout-consents.title', 'Terms & Conditions')}
              </CheckoutConsentsTitleStyled>
              <CheckoutConsentsSubTitleStyled>
                {t(
                  'checkout-consents.subtitle',
                  'Please accept Terms & Conditions'
                )}
              </CheckoutConsentsSubTitleStyled>
              <CheckoutConsentsListStyled>
                {consents.map((consent) => (
                  <CheckoutConsentsListItem key={consent.name}>
                    <Checkbox
                      isMyAccount
                      id={consent.name}
                      onClickFn={(e, isConsentDisabled) =>
                        handleClick(e, isConsentDisabled, consent)
                      }
                      isChecked={consent.state === 'accepted'}
                      required={consent.required}
                    >
                      {translateConsents(consent.label, consent.name, t)}
                    </Checkbox>
                    <CheckoutConsentsError>
                      {consent.error}
                    </CheckoutConsentsError>
                  </CheckoutConsentsListItem>
                ))}
                {generalError && (
                  <CheckoutConsentsError center>
                    {generalError}
                  </CheckoutConsentsError>
                )}
              </CheckoutConsentsListStyled>
              <Button size='big' variant='confirm' onClickFn={updateConsents}>
                {processing ? (
                  <Loader buttonLoader color='#ffffff' />
                ) : (
                  t('checkout-consents.button.continue', 'Continue')
                )}
              </Button>
            </>
          )}
        </CheckoutConsentsContentStyled>
        {!isLoading && consents && <Footer isCheckout={false} />}
      </CheckoutConsentsStyled>
    </>
  );
};

CheckoutConsents.propTypes = {
  onSuccess: PropTypes.func
};

CheckoutConsents.defaultProps = {
  onSuccess: () => null
};

export default CheckoutConsents;
