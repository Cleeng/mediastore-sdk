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
  const [t] = useTranslation();
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

  const validateNames = () => {
    if (!firstName.value) firstName.setError(t('First Name is required'));
    if (!lastName.value) lastName.setError(t('Last Name is required'));
    if (!firstName.value || !lastName.value) setIsError(true);
  };

  const validateAddress = () => {
    if (!isRequired('address')) return;
    if (!address.value || !city || !state || !postCode) {
      setIsError(true);
    }
    if (!address.value) address.setError(t('Address is required'));
    if (!city.value) city.setError(t('City is required'));
    if (!state.value) state.setError(t('State is required'));
    if (!postCode.value) postCode.setError(t('Post code is required'));
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
      companyName.setError(t('Company name is required'));
      setIsError(true);
    }
  };

  const validatePhone = () => {
    if (!phoneNumber.value) {
      phoneNumber.setError(t('Phone number is required'));
      setIsError(true);
    }
  };

  const validateBirthDate = () => {
    if (!birthDate.value) {
      birthDate.setError(t('Birth date is required'));
      setIsError(true);
    }
  };

  const validateCustomSettings = () => {
    const newArr = customSettings.map(item => {
      if (item.enabled && item.required && !item.value) {
        setIsError(true);
        return {
          ...item,
          error: t('Answer on that question is required')
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
              placeholder={t('First Name')}
              value={firstName.value}
              error={firstName.error}
              onChange={val => firstName.setValue(val)}
              onBlur={() => validateNames()}
              required={isRequired('firstNameLastName')}
            />
            <Input
              placeholder={t('Last Name')}
              value={lastName.value}
              error={lastName.error}
              onChange={val => lastName.setValue(val)}
              onBlur={() => validateNames()}
              required={isRequired('firstNameLastName')}
            />
          </CaptureRowStyled>
        )}
        {isEnabled('email') && (
          <EmailInput
            label={t('Confirm Email')}
            value={email.value}
            error={email.error}
            onChange={val => email.setValue(val)}
            onBlur={() => validateEmail()}
            required={isRequired('email')}
          />
        )}
        {isEnabled('birthDate') && (
          <DateInput
            label={t('Date of Birth')}
            value={birthDate.value}
            error={birthDate.error}
            onChange={val => birthDate.setValue(val)}
            onBlur={() => validateBirthDate()}
            required={isRequired('birthDate')}
          />
        )}
        {isEnabled('companyName') && (
          <Input
            placeholder={t('Company')}
            value={companyName.value}
            error={companyName.error}
            onChange={val => companyName.setValue(val)}
            onBlur={() => validateCompany()}
            required={isRequired('companyName')}
          />
        )}
        {isEnabled('phoneNumber') && (
          <Input
            placeholder={t('Mobile phone')}
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
              placeholder={t('Address line 1')}
              value={address.value}
              error={address.error}
              onChange={val => address.setValue(val)}
              onBlur={() => validateAddress()}
              required={isRequired('address')}
            />
            <Input
              placeholder={t('Address line 2')}
              value={address2.value}
              onChange={val => address2.setValue(val)}
            />
            <Input
              placeholder={t('City')}
              value={city.value}
              error={city.error}
              onChange={val => city.setValue(val)}
              onBlur={() => validateAddress()}
              required={isRequired('address')}
            />
            <CaptureRowStyled>
              <Input
                placeholder={t('State/Region')}
                value={state.value}
                error={state.error}
                onChange={val => state.setValue(val)}
                onBlur={() => validateAddress()}
                required={isRequired('address')}
              />
              <Input
                placeholder={t('ZIP/Postal code')}
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
          {processing ? <Loader buttonLoader color="#ffffff" /> : t('Continue')}
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
  onSuccess: () => {}
};

export default CaptureForm;
