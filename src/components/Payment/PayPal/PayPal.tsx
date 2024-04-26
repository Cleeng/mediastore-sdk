import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/store';
import { selectOnlyOrder } from 'redux/orderSlice';
import { selectOnlyOffer } from 'redux/offerSlice';
import { selectDeliveryDetails } from 'redux/deliveryDetailsSlice';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/PayPalColor.svg';
import Button from 'components/Button';
import { getStandardCopy } from 'util/paymentMethodHelper';
import CheckboxLegacy from 'components/CheckboxLegacy';
import { selectTermsUrl } from 'redux/publisherConfigSlice';
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
    const checkbox = document.querySelector(
      `.checkbox-paypal`
    ) as HTMLInputElement;

    if (!checkbox?.checked) {
      checkbox.classList.add('adyen-checkout__bank-checkbox--error');
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
        <CheckboxLegacy
          className="adyen-checkout__bank-checkbox checkbox-paypal"
          checked={isChecked}
          onClickFn={e => {
            e.target.parentElement.classList.remove(
              'adyen-checkout__bank-checkbox--error'
            );

            setIsChecked(!e.target.checked);
          }}
          termsUrl={termsUrl}
          isPayPal
        >
          {getStandardCopy(isMyAccount, offer, order, isGift)}
        </CheckboxLegacy>
      </CheckboxWrapperStyled>
      <Button
        theme="paypal"
        onClickFn={handleSubmit}
        disabled={isLoading}
        size="big"
        margin="20px auto auto auto"
        fontSize="15px"
        fontWeight="400"
      >
        <PaypalLogo />
      </Button>
    </PayPalContentStyled>
  );
};

export default PayPal;
