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
  onClose,
  onInputToggle,
  couponLoading,
  source = ''
}: CouponInputProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  console.log('isOpen', isOpen);
  return (
    <FormComponentStyled isOpen={isOpen} fullWidth={fullWidth}>
      <InputElementWrapperStyled>
        {isOpen && (
          <>
            <CloseButtonStyled type="button" aria-label="close">
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
        <Button
          type="button"
          width="auto"
          testid="redeem-btn"
          onClickFn={() => {
            setIsOpen(val => !val);
            // console.log(onInputToggle);
            if (onInputToggle) onInputToggle();
          }}
        >
          {isOpen && t('coupon-input.redeem', 'Redeem')}
          {!isOpen && t('coupon-input.redeem-coupon', 'Redeem coupon')}
        </Button>
      </InputElementWrapperStyled>
    </FormComponentStyled>
  );
};

export default CouponInput;
