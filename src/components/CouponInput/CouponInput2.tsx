import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
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
} from './CouponInputStyled2';

import { CouponInputProps } from './CouponInput2.types';

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

  const { t } = useTranslation();
  // const { showMessage, message, messageType, translationKey } = couponDetails;
  const { showMessage, message, messageType, translationKey } = couponDetails;

  useEffect(() => {
    console.log('translationKey: ', translationKey);
  });

  const handleRedeem = async () => {
    if (!isOpen) {
      window.dispatchEvent(
        new CustomEvent('MSSDK:redeem-coupon-button-clicked', {
          detail: { source }
        })
      );
      if (onInputToggle) onInputToggle();
      setIsOpen(true);
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
      // alert('redeemed');
    }
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
      if (onInputToggle) onInputToggle();
      // onChangeFn('');
    }
  };

  return (
    <FormComponentStyled
      isOpen={isOpen}
      fullWidth={fullWidth}
      onSubmit={async e => {
        e.preventDefault();
        await handleRedeem();
      }}
    >
      <InputElementWrapperStyled>
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
              readOnly={couponLoading}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
              }
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
          showMessage={showMessage && !suppressMessage}
          messageType={messageType}
        >
          {t(translationKey || '', message)}
        </MessageStyled>
      )}
    </FormComponentStyled>
  );
};

export default CouponInput;
