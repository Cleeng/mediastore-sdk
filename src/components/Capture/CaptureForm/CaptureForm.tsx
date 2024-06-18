import { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'components/Input';
import EmailInput from 'components/EmailInput';
import DateInput from 'components/DateInput';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateCaptureAnswers } from 'api';
import { validateEmailField } from 'util/validators';
import { PHONE_NUMBER_REGEX } from 'util/regexConstants';
import {
  CaptureProps,
  CaptureSetting,
  CustomCaptureSetting
} from 'types/Capture.types';
import useInput from './useInput';
import {
  CaptureRowStyled,
  CaptureBoxStyled,
  CaptureQuestionStyled,
  CaptureError
} from './CaptureFormStyled';

// const PHONE_NUMBER_REGEX = /(^[+]?([0-9][-|" "]?){4,16})$/;

const isCustomSetting = (
  setting: CaptureSetting
): setting is CustomCaptureSetting => setting.key.startsWith('custom_');

type CustomSetting = CustomCaptureSetting & {
  values: Array<{ value: string; label: string }>;
  error?: string | null;
};

const CaptureForm = ({ settings, onSuccess }: CaptureProps) => {
  const { t } = useTranslation();
  const [processing, setProcessing] = useState(false);
  const [customSettings, setCustomSettings] = useState<CustomSetting[]>([]);
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
  const setIsError = (updatedErrorState: boolean) => {
    isError = updatedErrorState;
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

    const enabledCustomSettings: CustomSetting[] = settings.filter(
      (item) => isCustomSetting(item) && item.enabled
    ) as CustomSetting[];
    const transformedSettings: CustomSetting[] = enabledCustomSettings.map(
      (item) => ({
        ...item,
        value: item.answer ? item.answer : '',
        values: isCustomSetting(item)
          ? item.value.split(';').map((i) => {
              const value = i.trim();
              const label = value;
              return {
                value,
                label
              };
            })
          : []
      })
    );

    setCustomSettings(transformedSettings);
  }, []);

  const getSettingByKey = (key: string) => {
    return settings.find((setting) => setting.key === key);
  };

  const isEnabled = (key: string): boolean => {
    const setting = getSettingByKey(key);

    return setting?.enabled ?? false;
  };

  const isRequired = (key: string): boolean => {
    const setting = getSettingByKey(key);

    return setting?.required ?? false;
  };

  const validateNames = (inputName?: string) => {
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
      email.setError(message);
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
      return;
    }

    const isPhoneNumberValid = PHONE_NUMBER_REGEX.test(phoneNumber.value);

    if (!isPhoneNumberValid) {
      phoneNumber.setError(
        t('captureform.error.phone-number-invalid', 'Phone number is invalid')
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
    const newArr = customSettings.map((item) => {
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
    setCustomSettings(newArr);
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

  const handleCustomSetting = (
    key: string,
    option: { value: string; label?: string }
  ) => {
    const newArr = customSettings.map((item) => {
      return {
        ...item,
        value: item.key === key ? option.value : item.value
      };
    });
    setCustomSettings(newArr);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields();
    if (!isError) {
      const customAnswers = customSettings.map((item) => {
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
      <form onSubmit={handleSubmit} noValidate>
        {isEnabled('firstNameLastName') && (
          <CaptureRowStyled>
            <Input
              placeholder={t(
                'captureform.placeholder.first-name',
                'First Name'
              )}
              value={firstName.value}
              error={firstName.error}
              onChange={(val) => firstName.setValue(val)}
              onBlur={() => validateNames('firstName')}
              required={isRequired('firstNameLastName')}
            />
            <Input
              placeholder={t('captureform.placeholder.last-name', 'Last Name')}
              value={lastName.value}
              error={lastName.error}
              onChange={(val) => lastName.setValue(val)}
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
            onChange={(val: string) => email.setValue(val)}
            onBlur={() => validateEmail()}
            required={isRequired('email')}
          />
        )}
        {isEnabled('birthDate') && (
          <DateInput
            label={t('captureform.placeholder.date-of-birth', 'Date of Birth')}
            value={birthDate.value}
            error={birthDate.error}
            onChange={(val: string) => birthDate.setValue(val)}
            onBlur={() => validateBirthDate()}
            required={isRequired('birthDate')}
          />
        )}
        {isEnabled('companyName') && (
          <Input
            placeholder={t('captureform.placeholder.company', 'Company')}
            value={companyName.value}
            error={companyName.error}
            onChange={(val) => companyName.setValue(val)}
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
            onChange={(val) => phoneNumber.setValue(val)}
            onBlur={() => validatePhone()}
            required={isRequired('phoneNumber')}
          />
        )}
        {isEnabled('address') && (
          <div>
            <Input
              placeholder={t(
                'captureform.placeholder.addres-line-1',
                'Address line 1'
              )}
              value={address.value}
              error={address.error}
              onChange={(val) => address.setValue(val)}
              onBlur={() => validateAddress()}
              required={isRequired('address')}
            />
            <Input
              placeholder={t(
                'captureform.placeholder.address-line-2',
                'Address line 2'
              )}
              value={address2.value}
              onChange={(val) => address2.setValue(val)}
            />
            <Input
              placeholder={t('captureform.placeholder.city', 'City')}
              value={city.value}
              error={city.error}
              onChange={(val) => city.setValue(val)}
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
                onChange={(val) => state.setValue(val)}
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
                onChange={(val) => postCode.setValue(val)}
                onBlur={() => validateAddress()}
                required={isRequired('address')}
              />
            </CaptureRowStyled>
          </div>
        )}
        {customSettings.map((setting) => {
          if (setting.values.length === 1 && isEnabled(setting.key))
            return (
              <CaptureBoxStyled key={setting.key}>
                <CaptureQuestionStyled required={setting.required}>
                  {setting.question}
                </CaptureQuestionStyled>

                <Checkbox
                  id={setting.key}
                  key={setting.key}
                  onClickFn={() =>
                    handleCustomSetting(setting.key, {
                      value: setting.value ? '' : setting.values[0].value,
                      label: setting.value ? '' : setting.values[0].value
                    })
                  }
                  isChecked={setting.value === setting.values[0].value}
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
                  id={`${setting.key}-01`}
                  key={`${setting.key}-01`}
                  onClickFn={() =>
                    handleCustomSetting(setting.key, {
                      value: setting.values[0].value,
                      label: setting.values[0].value
                    })
                  }
                  isRadioButton
                  isChecked={setting.value === setting.values[0].value}
                >
                  {setting.values[0].value}
                </Checkbox>
                <Checkbox
                  id={`${setting.key}-02`}
                  key={`${setting.key}-02`}
                  onClickFn={() =>
                    handleCustomSetting(setting.key, {
                      value: setting.values[1].value,
                      label: setting.values[1].value
                    })
                  }
                  isRadioButton
                  isChecked={setting.value === setting.values[1].value}
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
                onChange={(val) =>
                  handleCustomSetting(setting.key, { value: val })
                }
                onBlur={() => validateCustomSettings()}
                required={setting.required}
              />
            );
          return <div />;
        })}
        <Button type='submit' size='big' theme='confirm' margin='10px 0'>
          {processing ? (
            <Loader buttonLoader color='#ffffff' />
          ) : (
            t('captureform.button.continue', 'Continue')
          )}
        </Button>
      </form>
    </>
  );
};

export default CaptureForm;
