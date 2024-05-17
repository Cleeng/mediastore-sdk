import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'components/Input';
import EmailInput from 'components/EmailInput';
import DateInput from 'components/DateInput';
import Select from 'components/Select/Select';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateCaptureAnswers } from 'api';
import { validateEmailField } from 'util/validators';
import useInput from './useInput';
import {
  CaptureFormStyled,
  CaptureRowStyled,
  CaptureGroupStyled,
  CaptureBoxStyled,
  CaptureQuestionStyled,
  CaptureError
} from './CaptureFormStyled';

const CaptureForm = ({ settings, onSuccess }) => {
  const { t } = useTranslation();
  const [processing, setProcessing] = useState(false);
  const [customSettings, setCustomSetting] = useState([]);
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const birthDate = useInput('');
  const companyName = useInput('');
  const phoneNumber = useInput('');
  const address = useInput('');
  const address2 = useInput('');
  const city = useInput('');
  const state = useInput('');
  const postCode = useInput('');

  let isError = false;
  const setIsError = v => {
    isError = v;
  };

  useEffect(() => {
    for (let i = 0; i < settings.length; i += 1) {
      const item = settings[i];
      if (item.key === 'firstNameLastName' && item.answer) {
        firstName.setValue(item.answer.firstName);
        lastName.setValue(item.answer.lastName);
      }
      if (item.key === 'birthDate' && item.answer)
        birthDate.setValue(item.answer);
      if (item.key === 'companyName' && item.answer)
        companyName.setValue(item.answer);
      if (item.key === 'phoneNumber' && item.answer)
        phoneNumber.setValue(item.answer);
      if (item.key === 'address' && item.answer) {
        address.setValue(item.answer.address);
        address2.setValue(item.answer.address2);
        city.setValue(item.answer.city);
        state.setValue(item.answer.state);
        postCode.setValue(item.answer.postCode);
      }
    }
    const transformedSettings = settings
      .filter(item => {
        return item.key.startsWith('custom') && item.enabled;
      })
      .map(item => {
        return {
          ...item,
          value: item.answer ? item.answer : '',
          values: item.value
            ? item.value.split(';').map(i => {
                const value = i.trim();
                const label = value;
                return {
                  value,
                  label
                };
              })
            : []
        };
      });
    setCustomSetting(transformedSettings);
  }, []);

  const getSettingByKey = key => {
    return settings.find(setting => setting.key === key);
  };

  const isRequired = key => {
    const setting = getSettingByKey(key);
    return setting?.required;
  };

  const isEnabled = key => {
    const setting = getSettingByKey(key);
    return setting?.enabled;
  };

  const validateNames = inputName => {
    if (inputName === 'firstName' && !firstName.value) {
      firstName.setError(
        t('captureform.error.first-name', 'First Name is required')
      );
      setIsError(true);
    }

    if (inputName === 'lastName' && !lastName.value) {
      lastName.setError(
        t('captureform.error.last-name', 'Last Name is required')
      );
      setIsError(true);
    }

    if (!inputName) {
      validateNames('firstName');
      validateNames('lastName');
    }
  };

  const validateAddress = () => {
    if (!isRequired('address')) return;
    if (!address.value || !city || !state || !postCode) {
      setIsError(true);
    }
    if (!address.value)
      address.setError(t('captureform.error.address', 'Address is required'));
    if (!city.value)
      city.setError(t('captureform.error.city', 'City is required'));
    if (!state.value)
      state.setError(t('captureform.error.state', 'State is required'));
    if (!postCode.value)
      postCode.setError(
        t('captureform.error.post-code', 'Post code is required')
      );
  };

  const validateEmail = () => {
    const message = validateEmailField(email.value);
    if (message) {
      email.setError(t(message));
      setIsError(true);
    }
  };

  const validateCompany = () => {
    if (!companyName.value) {
      companyName.setError(
        t('captureform.error.company-name', 'Company name is required')
      );
      setIsError(true);
    }
  };

  const validatePhone = () => {
    if (!phoneNumber.value) {
      phoneNumber.setError(
        t('captureform.error.phone-number', 'Phone number is required')
      );
      setIsError(true);
    }
  };

  const validateBirthDate = () => {
    if (!birthDate.value) {
      birthDate.setError(
        t('captureform.error.birth-date', 'Birth date is required')
      );
      setIsError(true);
    }
  };

  const validateCustomSettings = () => {
    const newArr = customSettings.map(item => {
      if (item.enabled && item.required && !item.value) {
        setIsError(true);
        return {
          ...item,
          error: t(
            'captureform.error.custom-question',
            'Answer on that question is required'
          )
        };
      }
      return { ...item, error: '' };
    });
    setCustomSetting(newArr);
  };

  const validateFields = () => {
    setIsError(false);
    if (isEnabled('firstNameLastName') && isRequired('firstNameLastName'))
      validateNames();
    if (isEnabled('address') && isRequired('address')) validateAddress();
    if (isEnabled('email') && isRequired('email')) validateEmail();
    if (isEnabled('companyName') && isRequired('companyName'))
      validateCompany();
    if (isEnabled('phoneNumber') && isRequired('phoneNumber')) validatePhone();
    if (isEnabled('birthDate') && isRequired('birthDate')) validateBirthDate();
    validateCustomSettings();
  };

  const handleCustomSetting = (key, option) => {
    const newArr = customSettings.map(item => {
      return {
        ...item,
        value: item.key === key ? option.value : item.value
      };
    });
    setCustomSetting(newArr);
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateFields();
    if (!isError) {
      const customAnswers = customSettings.map(item => {
        return {
          questionId: item.key,
          question: item.question,
          value: item.value
        };
      });
      setProcessing(true);
      updateCaptureAnswers({
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        address2: address.value,
        city: city.value,
        state: state.value,
        postCode: postCode.value,
        email: email.value,
        birthDate: birthDate.value,
        companyName: companyName.value,
        phoneNumber: phoneNumber.value,
        customAnswers
      }).then(() => {
        setProcessing(false);
        onSuccess();
      });
    }
  };

  return (
    <>
      <CaptureFormStyled onSubmit={handleSubmit} noValidate>
        {isEnabled('firstNameLastName') && (
          <CaptureRowStyled>
            <Input
              placeholder={t(
                'captureform.placeholder.first-name',
                'First Name'
              )}
              value={firstName.value}
              error={firstName.error}
              onChange={val => firstName.setValue(val)}
              onBlur={() => validateNames('firstName')}
              required={isRequired('firstNameLastName')}
            />
            <Input
              placeholder={t('captureform.placeholder.last-name', 'Last Name')}
              value={lastName.value}
              error={lastName.error}
              onChange={val => lastName.setValue(val)}
              onBlur={() => validateNames('lastName')}
              required={isRequired('firstNameLastName')}
            />
          </CaptureRowStyled>
        )}
        {isEnabled('email') && (
          <EmailInput
            label={t('captureform.placeholder.confirm-email', 'Confirm Email')}
            value={email.value}
            error={email.error}
            onChange={val => email.setValue(val)}
            onBlur={() => validateEmail()}
            required={isRequired('email')}
          />
        )}
        {isEnabled('birthDate') && (
          <DateInput
            label={t('captureform.placeholder.date-of-birth', 'Date of Birth')}
            value={birthDate.value}
            error={birthDate.error}
            onChange={val => birthDate.setValue(val)}
            onBlur={() => validateBirthDate()}
            required={isRequired('birthDate')}
          />
        )}
        {isEnabled('companyName') && (
          <Input
            placeholder={t('captureform.placeholder.company', 'Company')}
            value={companyName.value}
            error={companyName.error}
            onChange={val => companyName.setValue(val)}
            onBlur={() => validateCompany()}
            required={isRequired('companyName')}
          />
        )}
        {isEnabled('phoneNumber') && (
          <Input
            placeholder={t(
              'captureform.placeholder.mobile-phone',
              'Mobile phone'
            )}
            value={phoneNumber.value}
            error={phoneNumber.error}
            onChange={val => phoneNumber.setValue(val)}
            onBlur={() => validatePhone()}
            required={isRequired('phoneNumber')}
          />
        )}
        {isEnabled('address') && (
          <CaptureGroupStyled>
            <Input
              placeholder={t(
                'captureform.placeholder.addres-line-1',
                'Address line 1'
              )}
              value={address.value}
              error={address.error}
              onChange={val => address.setValue(val)}
              onBlur={() => validateAddress()}
              required={isRequired('address')}
            />
            <Input
              placeholder={t(
                'captureform.placeholder.address-line-2',
                'Address line 2'
              )}
              value={address2.value}
              onChange={val => address2.setValue(val)}
            />
            <Input
              placeholder={t('captureform.placeholder.city', 'City')}
              value={city.value}
              error={city.error}
              onChange={val => city.setValue(val)}
              onBlur={() => validateAddress()}
              required={isRequired('address')}
            />
            <CaptureRowStyled>
              <Input
                placeholder={t(
                  'captureform.placeholder.state-region',
                  'State/Region'
                )}
                value={state.value}
                error={state.error}
                onChange={val => state.setValue(val)}
                onBlur={() => validateAddress()}
                required={isRequired('address')}
              />
              <Input
                placeholder={t(
                  'captureform.placeholder.zip-postal-code',
                  'ZIP/Postal code'
                )}
                value={postCode.value}
                error={postCode.error}
                onChange={val => postCode.setValue(val)}
                onBlur={() => validateAddress()}
                required={isRequired('address')}
              />
            </CaptureRowStyled>
          </CaptureGroupStyled>
        )}
        {customSettings.map(setting => {
          if (setting.values.length === 1 && isEnabled(setting.key))
            return (
              <CaptureBoxStyled key={setting.key}>
                <CaptureQuestionStyled required={setting.required}>
                  {setting.question}
                </CaptureQuestionStyled>
                <Checkbox
                  key={setting.key}
                  onClickFn={() =>
                    handleCustomSetting(setting.key, {
                      value: setting.value ? '' : setting.values[0].value,
                      label: setting.value ? '' : setting.values[0].value
                    })
                  }
                  checked={setting.value === setting.values[0].value}
                >
                  {setting.values[0].value}
                </Checkbox>
                <CaptureError>{setting.error}</CaptureError>
              </CaptureBoxStyled>
            );
          if (setting.values.length === 2 && isEnabled(setting.key))
            return (
              <CaptureBoxStyled key={setting.key}>
                <CaptureQuestionStyled required={setting.required}>
                  {setting.question}
                </CaptureQuestionStyled>
                <Checkbox
                  key={`${setting.key}-01`}
                  onClickFn={() =>
                    handleCustomSetting(setting.key, {
                      value: setting.values[0].value,
                      label: setting.values[0].value
                    })
                  }
                  isRadioButton
                  checked={setting.value === setting.values[0].value}
                >
                  {setting.values[0].value}
                </Checkbox>
                <Checkbox
                  key={`${setting.key}-02`}
                  onClickFn={() =>
                    handleCustomSetting(setting.key, {
                      value: setting.values[1].value,
                      label: setting.values[1].value
                    })
                  }
                  isRadioButton
                  checked={setting.value === setting.values[1].value}
                >
                  {setting.values[1].value}
                </Checkbox>
                <CaptureError>{setting.error}</CaptureError>
              </CaptureBoxStyled>
            );
          if (setting.values.length > 2 && isEnabled(setting.key))
            return (
              <CaptureBoxStyled key={setting.key}>
                <Select
                  label={setting.question}
                  name={setting.key}
                  value={
                    setting.value
                      ? { value: setting.value, label: setting.value }
                      : null
                  }
                  values={setting.values}
                  required={setting.required}
                  onChange={handleCustomSetting}
                />
                <CaptureError>{setting.error}</CaptureError>
              </CaptureBoxStyled>
            );
          if (isEnabled(setting.key))
            return (
              <Input
                key={setting.key}
                placeholder={setting.question}
                value={setting.value}
                error={setting.error}
                onChange={val =>
                  handleCustomSetting(setting.key, { value: val })
                }
                onBlur={() => validateCustomSettings()}
                required={setting.required}
              />
            );
          return <div />;
        })}
        <Button type="submit" size="big" theme="confirm" margin="10px 0">
          {processing ? (
            <Loader buttonLoader color="#ffffff" />
          ) : (
            t('captureform.button.continue', 'Continue')
          )}
        </Button>
      </CaptureFormStyled>
    </>
  );
};

CaptureForm.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.any),
  onSuccess: PropTypes.func
};

CaptureForm.defaultProps = {
  settings: [],
  onSuccess: () => null
};

export default CaptureForm;
