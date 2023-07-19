import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input/InputConstants';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { ReactComponent as CloseIcon } from 'assets/images/xmark.svg';
import { useTranslation } from 'react-i18next';
import { MSSDK_COUPON_FAILED } from 'util/eventDispatcher';
import {
  FormComponentStyled,
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
    messageType: MESSAGE_TYPE_SUCCESS,
    translationKey: ''
  },
  onSubmit,
  onChange,
  onClose,
  onInputToggle,
  couponLoading,
  source = ''
}: CouponInputProps) => {
  const [suppressMessage, setSuppressMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | number | boolean>(
    false
  );
  const [isOpened, setIsOpened] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();
  const {
    showMessage = false,
    message = '',
    messageType = '',
    translationKey = ''
  } = couponDetails;

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
      if (onInputToggle) onInputToggle();
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
    setIsFocused(false);
    if (isOpened) {
      setIsOpened(false);
      if (onClose) onClose();
    }
  };

  const handleAutoCouponError = () => setIsOpened(true);

  useEffect(() => {
    window.addEventListener(MSSDK_COUPON_FAILED, handleAutoCouponError);

    return () =>
      window.removeEventListener(MSSDK_COUPON_FAILED, handleAutoCouponError);
  }, []);

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
    <FormComponentStyled
      isOpened={isOpened}
      fullWidth={fullWidth}
      onSubmit={async e => {
        e.preventDefault();
        await onRedeemClick();
      }}
      onFocus={() => {
        // console.log('focus on outer form element');
        //   console.log('btnRef:', buttonRef.current);
        if (!isFocused) {
          buttonRef.current?.focus();
          console.log('focus set!');
          setIsFocused(true);
        }
      }}
    >
      <InputElementWrapperStyled
        isInputFocused={isInputFocused}
        isInputOpened={isOpened}
      >
        <CloseButtonStyled
          onClick={() => onCloseClick()}
          isInputOpened={isOpened}
          aria-label="close"
          type="button"
        >
          {CloseIcon && <CloseIcon />}
        </CloseButtonStyled>
        <InputElementStyled
          isOpened={isOpened}
          placeholder={t('coupon-input.placeholder', 'Your coupon') as string}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
          onFocus={() => {
            setSuppressMessage(true);
            setIsInputFocused(true);
          }}
          onBlur={() => setIsInputFocused(false)}
          autoComplete="off"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          type="text"
          readOnly={couponLoading}
          fullWidth={fullWidth}
          aria-label={t('coupon-input.placeholder', 'Your coupon') as string}
          aria-required={false}
        />
        <Button width="auto" testid="redeem-btn" type="submit" ref={buttonRef}>
          <>
            {couponLoading && <Loader buttonLoader color="#ffffff" />}
            {!couponLoading && isOpened && t('coupon-input.redeem', 'Redeem')}
            {!couponLoading &&
              !isOpened &&
              t('coupon-input.redeem-coupon', 'Redeem coupon')}
          </>
        </Button>
      </InputElementWrapperStyled>
      {isOpened && (
        <MessageStyled
          showMessage={showMessage && !suppressMessage}
          messageType={messageType}
        >
          {t(translationKey, message)}
        </MessageStyled>
      )}
    </FormComponentStyled>
  );
};

export default CouponInput;
