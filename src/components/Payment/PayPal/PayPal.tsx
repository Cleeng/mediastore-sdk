import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'appRedux/store';
import { selectOnlyOrder } from 'appRedux/orderSlice';
import { selectOnlyOffer } from 'appRedux/offerSlice';
import { selectDeliveryDetails } from 'appRedux/deliveryDetailsSlice';
import PaypalLogo from 'assets/images/paymentMethods/PayPalColor.svg';
import Button from 'components/Button';
import { getStandardCopy } from 'util/paymentMethodHelper';
import Checkbox from 'components/Checkbox';
import { selectTermsUrl } from 'appRedux/publisherConfigSlice';
import {
  PayPalContentStyled,
  CopyStyled,
  CheckboxWrapperStyled
} from './PayPalStyled';
import { PayPalProps } from './PayPal.types';

const PayPal = ({
  isMyAccount = false,
  totalPrice,
  offerId,
  onSubmit,
  isLoading
}: PayPalProps) => {
  const { t } = useTranslation();

  const order = useAppSelector(selectOnlyOrder);
  const offer = useAppSelector(selectOnlyOffer);
  const termsUrl = useAppSelector(selectTermsUrl);

  const { isGift } = useAppSelector(selectDeliveryDetails);

  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    const checkbox: HTMLInputElement | null =
      document.querySelector(`#paypal-input`);

    const checkboxLabel: HTMLInputElement | null =
      document.querySelector(`.paypal-inputLabel`);

    if (!checkbox?.checked) {
      checkboxLabel?.classList.add('adyen-checkout__bank-checkbox--error');
      return;
    }

    onSubmit();
  };

  return (
    <PayPalContentStyled>
      <CopyStyled>
        {/* my account */}
        {!offerId && (
          <>
            {t(
              'paypal.update-payment-details',
              "We'll redirect you to PayPal to update your payment details."
            )}
            <br />
            <br />
            {t(
              'paypal.fee-note',
              'Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
            )}
          </>
        )}
        {/* checkout */}
        {offerId &&
          totalPrice !== 0 &&
          t(
            'paypal.complete-purchase',
            "We'll redirect you to PayPal to complete your purchase."
          )}
        {offerId?.charAt(0) === 'S' &&
          totalPrice === 0 &&
          t(
            'paypal.fee-note-complete-purchase',
            "We'll redirect you to PayPal to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments."
          )}
      </CopyStyled>
      <CheckboxWrapperStyled>
        <Checkbox
          className='adyen-checkout__bank-checkbox paypal-inputLabel'
          id='paypal-input'
          isChecked={isChecked}
          onClickFn={(event: ChangeEvent<HTMLInputElement> | undefined) => {
            if (!event) {
              return;
            }

            event.target.parentElement?.classList.remove(
              'adyen-checkout__bank-checkbox--error'
            );

            setIsChecked(event.target.checked);
          }}
          termsUrl={termsUrl}
          isPayPal
        >
          {getStandardCopy(isMyAccount, offer, order, isGift)}
        </Checkbox>
      </CheckboxWrapperStyled>
      <Button
        theme='paypal'
        onClickFn={handleSubmit}
        disabled={isLoading}
        size='big'
        margin='20px auto auto auto'
        fontSize='15px'
        fontWeight='400'
      >
        <PaypalLogo />
      </Button>
    </PayPalContentStyled>
  );
};

export default PayPal;
