import { KeyboardEvent, useEffect, useState } from 'react';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { ReactComponent as CloseIcon } from 'assets/images/xmark.svg';

import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  InputComponentStyled,
  MessageStyled,
  InputElementWrapperStyled,
  InputElementStyled,
  CloseButtonStyled
} from './CouponInputStyled';

import { CouponInputProps } from './CouponInput.types';

const FADE_OUT_DELAY = 5000;

const CouponInput = ({
  value = '',
  fullWidth = false,
  couponDetails = {
    showMessage: false,
    message: '',
    messageType: MESSAGE_TYPE_SUCCESS
  },
  onSubmit,
  onChange,
  onClose,
  onInputToggle,
  t,
  couponLoading,
  source
}: CouponInputProps) => {
  const [suppressMessage, setSuppressMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | number | boolean>(
    false
  );
  const [isOpened, setIsOpened] = useState(false);

  const { showMessage, message, messageType } = couponDetails;

  const disableSuppressMessage = () => setSuppressMessage(false);

  const clearFadeOutTimeout = () => {
    if (typeof timeoutId === 'number' && timeoutId > 0) {
      clearTimeout(timeoutId);
      setTimeoutId(0);
    }
  };

  const scheduleFadeOut = () => {
    const timeoutIndex = setTimeout(() => {
      setSuppressMessage(true);
      setTimeoutId(true);
    }, FADE_OUT_DELAY);
    setTimeoutId(timeoutIndex);
  };

  const handleSubmit = async (
    event:
      | (Event & { target: HTMLInputElement })
      | KeyboardEvent<HTMLInputElement>
  ) => {
    const { target } = event as Event & {
      target: HTMLInputElement;
    };
    target.blur();
    await onSubmit(target.value);
    setSuppressMessage(false);
  };

  const onRedeemClick = async () => {
    if (!isOpened) {
      window.dispatchEvent(
        new CustomEvent('MSSDK:redeem-coupon-button-clicked', {
          detail: { source }
        })
      );
      onInputToggle();
      setIsOpened(true);
    } else {
      window.dispatchEvent(
        new CustomEvent('MSSDK:redeem-button-clicked', {
          detail: {
            coupon: value,
            source
          }
        })
      );
      await onSubmit(value);
    }
  };

  const onCloseClick = () => {
    if (isOpened) {
      setIsOpened(false);
      onClose();
    }
  };

  useEffect(() => {
    return () => {
      clearFadeOutTimeout();
    };
  }, []);

  useEffect(() => {
    disableSuppressMessage();
    clearFadeOutTimeout();
    if (showMessage) {
      scheduleFadeOut();
    }
  }, [showMessage, message, messageType]);

  return (
    <InputComponentStyled isOpened={isOpened} fullWidth={fullWidth}>
      <InputElementWrapperStyled>
        <CloseButtonStyled
          onClick={() => onCloseClick()}
          isInputOpened={isOpened}
        >
          {CloseIcon && <CloseIcon />}
        </CloseButtonStyled>
        <InputElementStyled
          isOpened={isOpened}
          placeholder={t('Your coupon') as string}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
          onFocus={() => {
            setSuppressMessage(true);
          }}
          autoComplete="off"
          value={value}
          onChange={event => onChange(event.target.value)}
          type="text"
          readOnly={couponLoading}
          fullWidth={fullWidth}
          aria-label={t('Your coupon') as string}
          aria-required={false}
        />
        <Button
          width="auto"
          onClickFn={async () => {
            await onRedeemClick();
          }}
        >
          <>
            {couponLoading && <Loader buttonLoader color="#ffffff" />}
            {!couponLoading && isOpened && t('Redeem')}
            {!couponLoading && !isOpened && t('Redeem coupon')}
          </>
        </Button>
      </InputElementWrapperStyled>
      {isOpened && (
        <MessageStyled
          showMessage={showMessage && !suppressMessage}
          messageType={messageType}
        >
          {message}
        </MessageStyled>
      )}
    </InputComponentStyled>
  );
};

export { CouponInput as PureCouponInput };
export default withTranslation()(labeling()(CouponInput));
