import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from 'components/Card';
import Loader from 'components/Loader';
import MyAccountInput from 'components/MyAccountInput';
import SelectLegacy, {
  mapToSelectFormat
} from 'components/SelectLegacy/SelectLegacy';
import Checkbox from 'components/Checkbox';
import useMessage from 'hooks/useMessage';
import { updateCaptureAnswers } from 'api';
import {
  ButtonStyled,
  ButtonWrapperStyled
} from 'components/MyAccountConsents/MyAccountConsentsStyled';
import {
  AdditionalProfileInfoProps,
  CustomSetting
} from 'types/AdditionalProfileInfo.types';
import {
  MessageStyled,
  WrapStyled,
  InputWrapStyled,
  InputLabelStyled
} from './AdditionalProfileInfoStyled';

const AdditionalProfileInfo = ({
  data,
  isLoading,
  updateCaptureOption
}: AdditionalProfileInfoProps) => {
  const { t } = useTranslation();
  const [isSectionDisabled, setIsSectionDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [customSettings, setCustomSettings] = useState<CustomSetting[]>([]);
  const [initialSettings, setInitialSettings] = useState<CustomSetting[]>([]);
  const { message, type, setMessage, resetMessage } = useMessage();

  useEffect(() => {
    if (data) {
      const newData: CustomSetting[] = data.map((setting) => {
        return {
          ...setting,
          value: setting.answer ? setting.answer : '',
          values: setting.value
            ? setting.value.split(';').map((v) => v.trim())
            : []
        };
      });
      setCustomSettings(newData);
      setInitialSettings(newData);
    }
  }, [data]);

  const handleCustomSetting = (key: string, value: string) => {
    if (!customSettings) {
      return;
    }

    const newArr = customSettings.map((item) => {
      return {
        ...item,
        value: item.key === key ? value : item.value
      };
    });
    setCustomSettings(newArr);
  };

  const onCancel = () => {
    setCustomSettings(initialSettings);
    setIsSectionDisabled(true);
  };

  const onSubmit = async () => {
    if (!customSettings) {
      return;
    }

    setIsPending(true);
    const customAnswers = customSettings.map((setting) => {
      return {
        questionId: setting.key,
        question: setting.question,
        value: setting.value
      };
    });

    try {
      await updateCaptureAnswers({
        customAnswers
      });

      customSettings.forEach((setting) =>
        updateCaptureOption({
          key: setting.key,
          value: setting.value
        })
      );

      setMessage({
        message: t(
          'additional-profile-info.success-message',
          'Your answers have been changed successfully'
        ),
        type: 'success'
      });

      setIsPending(false);
      setIsSectionDisabled(true);
    } catch (e) {
      setMessage({
        message: t(
          'additional-profile-info.error.submit',
          'Something went wrong. Try again later.'
        ),
        type: 'error'
      });

      setIsPending(false);
      setIsSectionDisabled(true);
    }
  };

  return isLoading ? (
    <Loader isMyAccount />
  ) : (
    <WrapStyled>
      {customSettings && (
        <Card withBorder>
          {message && <MessageStyled $type={type}>{message}</MessageStyled>}
          {customSettings.map((setting) => {
            const { key, question, value, values } = setting;

            if (setting.values.length === 0)
              return (
                <InputWrapStyled key={key}>
                  <MyAccountInput
                    id={key}
                    label={question}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCustomSetting(key, e.target.value)
                    }
                    disabled={isSectionDisabled}
                  />
                </InputWrapStyled>
              );
            if (setting.values.length === 1)
              return (
                <InputWrapStyled key={key}>
                  <Checkbox
                    isMyAccount
                    id={key}
                    onClickFn={(_, disabled) =>
                      !disabled &&
                      handleCustomSetting(key, value ? '' : setting.values[0])
                    }
                    isChecked={value === setting.values[0]}
                    disabled={isSectionDisabled}
                  >
                    {question}
                  </Checkbox>
                </InputWrapStyled>
              );
            if (setting.values.length === 2)
              return (
                <InputWrapStyled key={key}>
                  <InputLabelStyled>{question}</InputLabelStyled>
                  <Checkbox
                    key={`${key}-01`}
                    id={`${key}-01`}
                    onClickFn={(_, disabled) =>
                      !disabled && handleCustomSetting(key, values[0])
                    }
                    isRadioButton
                    disabled={isSectionDisabled}
                    isChecked={value === values[0]}
                  >
                    {values[0]}
                  </Checkbox>
                  <Checkbox
                    key={`${key}-02`}
                    id={`${key}-02`}
                    onClickFn={(_, disabled) =>
                      !disabled && handleCustomSetting(key, values[1])
                    }
                    isRadioButton
                    disabled={isSectionDisabled}
                    isChecked={value === values[1]}
                  >
                    {values[1]}
                  </Checkbox>
                </InputWrapStyled>
              );
            return (
              <InputWrapStyled key={key}>
                <SelectLegacy
                  isMyAccount
                  key={key}
                  label={question}
                  name={key}
                  value={value ? { value, label: value } : null}
                  values={mapToSelectFormat(values)}
                  disabled={isSectionDisabled}
                  onChange={(
                    settingKey: string,
                    settingValue: { value: string }
                  ) => handleCustomSetting(settingKey, settingValue.value)}
                />
              </InputWrapStyled>
            );
          })}
          <ButtonWrapperStyled>
            {isSectionDisabled ? (
              <ButtonStyled
                onClickFn={() => {
                  setIsSectionDisabled(false);
                  resetMessage();
                }}
                width='100%'
                theme='confirm'
              >
                {t(
                  'additional-profile-info.button.edit-profile',
                  'Edit Profile'
                )}
              </ButtonStyled>
            ) : (
              <>
                <ButtonStyled theme='simple' onClickFn={onCancel}>
                  {t('additional-profile-info.button.cancel', 'Cancel')}
                </ButtonStyled>
                <ButtonStyled
                  onClickFn={onSubmit}
                  disabled={isPending}
                  type='submit'
                  theme='confirm'
                >
                  {(isPending && <Loader buttonLoader color='#ffffff' />) ||
                    t('additional-profile-info.button.save', 'Save')}
                </ButtonStyled>
              </>
            )}
          </ButtonWrapperStyled>
        </Card>
      )}
    </WrapStyled>
  );
};

export default AdditionalProfileInfo;
