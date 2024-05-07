import { useTranslation } from 'react-i18next';
import Card from 'components/Card';
import eventDispatcher, {
  MSSDK_EDIT_PAYMENT_BUTTON_CLICKED
} from 'util/eventDispatcher';
import { updatePaymentDetailsPopup } from 'redux/popupSlice';
import { useAppDispatch } from 'redux/store';
import { CardTypes, CardTypesKey } from './Payment.const';
import {
  CardStyled,
  CardTypeStyled,
  CardNumberStyled,
  CardExpirationStyled,
  CardExpirationLabel,
  CardExpirationDateStyled,
  CardEditStyled,
  CardInfoStyled,
  CardDetailsStyled,
  CardDetailsNameStyled,
  CardDetailsNameWrapStyled,
  CardInfoWrapStyled,
  HolderNameStyled
} from './PaymentCardStyled';
import VisuallyHidden from '../../styles/visuallyHidden';
import { PaymentCardProps } from './PaymentCard.types';

const PaymentCard = ({ details }: PaymentCardProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { paymentMethodSpecificParams, paymentMethod } = details;
  const getSpecificPaymentMethod = (): CardTypesKey => {
    if (paymentMethod === 'card') return paymentMethodSpecificParams.variant;
    return paymentMethod;
  };

  const card = CardTypes[getSpecificPaymentMethod()];

  const LogoComponent = card?.icon || null;
  const logoCaption = card?.caption;
  const methodTitle = card?.title || '';

  return (
    <Card withBorder>
      <CardStyled>
        <CardInfoWrapStyled>
          <CardInfoStyled>
            {LogoComponent && (
              <CardTypeStyled>
                <LogoComponent />
                {/* TODO: alternative implementation for GlobalStyles */}
                <VisuallyHidden />
                <figcaption className='visually-hidden'>
                  {logoCaption}
                </figcaption>
              </CardTypeStyled>
            )}
            <CardDetailsStyled>
              <CardDetailsNameWrapStyled>
                <CardDetailsNameStyled>{methodTitle}</CardDetailsNameStyled>
                {paymentMethod !== 'paypal' &&
                  paymentMethodSpecificParams?.lastCardFourDigits && (
                    <CardNumberStyled>
                      (**** {paymentMethodSpecificParams.lastCardFourDigits})
                    </CardNumberStyled>
                  )}
              </CardDetailsNameWrapStyled>
              {paymentMethod === 'paypal' && (
                <HolderNameStyled>
                  ({paymentMethodSpecificParams.holderName})
                </HolderNameStyled>
              )}
              {paymentMethod !== 'paypal' &&
                paymentMethodSpecificParams?.cardExpirationDate && (
                  <CardExpirationStyled>
                    <CardExpirationLabel>
                      {t('paymentcard.expiry-date', 'Expiry date')}
                    </CardExpirationLabel>
                    <CardExpirationDateStyled
                      dateTime={paymentMethodSpecificParams.cardExpirationDate}
                    >
                      {paymentMethodSpecificParams.cardExpirationDate}
                    </CardExpirationDateStyled>
                  </CardExpirationStyled>
                )}
            </CardDetailsStyled>
          </CardInfoStyled>
          <CardEditStyled
            type='button'
            onClick={() => {
              dispatch(
                updatePaymentDetailsPopup({
                  isOpen: true,
                  initPaymentMethod: details
                })
              );
              eventDispatcher(MSSDK_EDIT_PAYMENT_BUTTON_CLICKED, {
                detail: {
                  paymentMethod
                }
              });
            }}
          >
            {t('paymentcard.edit-payment-info', 'Edit payment info')}
          </CardEditStyled>
        </CardInfoWrapStyled>
      </CardStyled>
    </Card>
  );
};

export default PaymentCard;
