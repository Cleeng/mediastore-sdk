import { useEffect, useRef, useState } from 'react';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { ReactComponent as CloseIcon } from 'assets/images/xmark.svg';
import { useTranslation } from 'react-i18next';
import eventDispatcher, {
  MSSDK_COUPON_FAILED,
  MSSDK_REDEEM_BUTTON_CLICKED,
  MSSDK_REDEEM_COUPON_BUTTON_CLICKED
} from 'util/eventDispatcher';
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
  value,
  fullWidth,
  couponDetails,
  onSubmit,
  onChange,
  onInputToggle,
  couponLoading,
  source
}: CouponInputProps) => {
  const [suppressMessage, setSuppressMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | number | boolean>(
    false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();
  const { showMessage, message, messageType, translationKey } = couponDetails;

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

  const handleRedeem = async () => {
    if (!isOpen) {
      eventDispatcher(MSSDK_REDEEM_COUPON_BUTTON_CLICKED, { source });
      if (onInputToggle) onInputToggle();
      setIsOpen(true);
    } else {
      eventDispatcher(MSSDK_REDEEM_BUTTON_CLICKED, { coupon: value, source });
      await onSubmit(value);
    }
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
      if (onInputToggle) onInputToggle();
      onChange('');
      setSuppressMessage(true);
    }
  };

  const handleAutoCouponError = () => setIsOpen(true);

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

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <FormComponentStyled
      $isOpen={isOpen}
      $fullWidth={fullWidth}
      onSubmit={async e => {
        e.preventDefault();
        await handleRedeem();
      }}
    >
      <InputElementWrapperStyled $isFocused={isFocused}>
        {isOpen && (
          <>
            <CloseButtonStyled
              type="button"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </CloseButtonStyled>
            <InputElementStyled
              type="text"
              placeholder={
                t('coupon-input.placeholder', 'Your coupon') as string
              }
              autoComplete="off"
              value={value}
              ref={inputRef}
              readOnly={couponLoading}
              $fullWidth={fullWidth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
              }
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              aria-label={
                t('coupon-input.placeholder', 'Your coupon') as string
              }
              aria-required={false}
            />
          </>
        )}
        <Button type="submit" width="auto" testid="redeem-btn">
          {couponLoading && <Loader buttonLoader color="#ffffff" />}
          {!couponLoading && isOpen && t('coupon-input.redeem', 'Redeem')}
          {!couponLoading &&
            !isOpen &&
            t('coupon-input.redeem-coupon', 'Redeem coupon')}
        </Button>
      </InputElementWrapperStyled>
      {isOpen && (
        <MessageStyled
          $showMessage={showMessage && !suppressMessage}
          $messageType={messageType}
        >
          {t(translationKey || '', message)}
        </MessageStyled>
      )}
    </FormComponentStyled>
  );
};

export default CouponInput;
