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
  // onClose,
  onInputToggle,
  couponLoading,
  source = ''
}: CouponInputProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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
      // await onSubmit(value);
      alert('coupon redeemed!');
    }
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
      if (onInputToggle) onInputToggle();
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
            />
          </>
        )}
        <Button type="submit" width="auto" testid="redeem-btn">
          {isOpen && t('coupon-input.redeem', 'Redeem')}
          {!isOpen && t('coupon-input.redeem-coupon', 'Redeem coupon')}
        </Button>
      </InputElementWrapperStyled>
    </FormComponentStyled>
  );
};

export default CouponInput;
