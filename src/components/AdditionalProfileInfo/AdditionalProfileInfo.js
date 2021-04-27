import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import Loader from 'components/Loader';
import MyAccountInput from 'components/MyAccountInput';
import Select, { mapToSelectFormat } from 'components/Select/Select';
import Checkbox from 'components/Checkbox';
import useMessage from 'hooks/useMessage';
import { updateCaptureAnswers } from 'api';
import {
  ButtonStyled,
  ButtonWrapperStyled
} from 'components/MyAccountConsents/MyAccountConsentsStyled';
import {
  WrapStyled,
  MessageStyled,
  InputWrapStyled,
  InputLabelStyled
} from './AdditionalProfileInfoStyled';

const AdditionalProfileInfo = ({ data, isLoading, updateCaptureOption }) => {
  const [t] = useTranslation();
  const [isSectionDisabled, setIsSectionDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [customSettings, setCustomSettings] = useState(null);
  const [initialSettings, setInitialSettings] = useState(null);
  const [message, type, setMessage, resetMessage] = useMessage();

  useEffect(() => {
    if (data) {
      const newData = data.map(setting => {
        return {
          ...setting,
          value: setting.answer ? setting.answer : '',
          values: setting.value
            ? setting.value.split(';').map(v => v.trim())
            : []
        };
      });
      setCustomSettings(newData);
      setInitialSettings(newData);
    }
  }, [data]);

  const handleCustomSetting = (key, value) => {
    const newArr = customSettings.map(item => {
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

  const onSubmit = () => {
    setIsPending(true);
    const customAnswers = customSettings.map(setting => {
      return {
        questionId: setting.key,
        question: setting.question,
        value: setting.value
      };
    });
    updateCaptureAnswers({
      customAnswers
    })
      .then(() => {
        for (let i = 0; i < customSettings.length; i += 1) {
          updateCaptureOption({
            key: customSettings[i].key,
            value: customSettings[i].value
          });
        }
        setMessage({
          message: t('Your answers have been changed successfully'),
          type: 'success'
        });
        setIsPending(false);
        setIsSectionDisabled(true);
      })
      .catch(() => {
        setMessage({
          message: t('Something went wrong. Try again later.'),
          type: 'error'
        });
        setIsPending(false);
        setIsSectionDisabled(true);
      });
  };

  return isLoading ? (
    <Loader isMyAccount />
  ) : (
    <WrapStyled>
      {customSettings && (
        <Card withBorder>
          {message && <MessageStyled type={type}>{message}</MessageStyled>}
          {customSettings.map(setting => {
            if (setting.values.length === 0)
              return (
                <InputWrapStyled key={setting.key}>
                  <MyAccountInput
                    id={setting.key}
                    label={setting.question}
                    value={setting.value}
                    onChange={e =>
                      handleCustomSetting(setting.key, e.target.value)
                    }
                    disabled={isSectionDisabled}
                  />
                </InputWrapStyled>
              );
            if (setting.values.length === 1)
              return (
                <InputWrapStyled key={setting.key}>
                  <Checkbox
                    isMyAccount
                    onClickFn={(e, disabled) =>
                      !disabled &&
                      handleCustomSetting(
                        setting.key,
                        setting.value ? '' : setting.values[0]
                      )
                    }
                    checked={setting.value === setting.values[0]}
                    disabled={isSectionDisabled}
                  >
                    {setting.question}
                  </Checkbox>
                </InputWrapStyled>
              );
            if (setting.values.length === 2)
              return (
                <InputWrapStyled key={setting.key}>
                  <InputLabelStyled required={setting.required}>
                    {setting.question}
                  </InputLabelStyled>
                  <Checkbox
                    key={`${setting.key}-01`}
                    onClickFn={(e, disabled) =>
                      !disabled &&
                      handleCustomSetting(setting.key, setting.values[0])
                    }
                    isRadioButton
                    disabled={isSectionDisabled}
                    checked={setting.value === setting.values[0]}
                  >
                    {setting.values[0]}
                  </Checkbox>
                  <Checkbox
                    key={`${setting.key}-02`}
                    onClickFn={(e, disabled) =>
                      !disabled &&
                      handleCustomSetting(setting.key, setting.values[1])
                    }
                    isRadioButton
                    disabled={isSectionDisabled}
                    checked={setting.value === setting.values[1]}
                  >
                    {setting.values[1]}
                  </Checkbox>
                </InputWrapStyled>
              );
            return (
              <InputWrapStyled key={setting.key}>
                <Select
                  isMyAccount
                  id={setting.key}
                  key={setting.key}
                  label={setting.question}
                  name={setting.key}
                  value={
                    setting.value
                      ? { value: setting.value, label: setting.value }
                      : null
                  }
                  values={mapToSelectFormat(setting.values)}
                  disabled={isSectionDisabled}
                  onChange={(key, value) =>
                    handleCustomSetting(key, value.value)
                  }
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
                width="100%"
              >
                {t('Edit Profile')}
              </ButtonStyled>
            ) : (
              <>
                <ButtonStyled theme="simple" onClickFn={onCancel}>
                  {t('Cancel')}
                </ButtonStyled>
                <ButtonStyled
                  onClickFn={onSubmit}
                  disabled={isPending}
                  type="submit"
                  theme="confirm"
                >
                  {(isPending && <Loader buttonLoader color="#ffffff" />) ||
                    t('Save')}
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

AdditionalProfileInfo.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  updateCaptureOption: PropTypes.func
};

AdditionalProfileInfo.defaultProps = {
  isLoading: false,
  data: null,
  updateCaptureOption: () => {}
};
