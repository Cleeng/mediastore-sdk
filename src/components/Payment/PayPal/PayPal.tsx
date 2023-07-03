import { useTranslation } from 'react-i18next';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/PayPalColor.svg';
import Button from 'components/Button';
import { PayPalContentStyled, CopyStyled } from './PayPalStyled';
import { PayPalProps } from './PayPal.types';

const PayPal = ({ totalPrice, offerId, onSubmit, isLoading }: PayPalProps) => {
  const { t } = useTranslation();
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
      <Button
        theme="paypal"
        onClickFn={onSubmit}
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
