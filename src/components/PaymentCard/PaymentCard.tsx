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
  const methodTitle = card?.title || '';

  return (
    <Card withBorder>
      <CardStyled>
        <CardInfoWrapStyled>
          <CardInfoStyled>
            {LogoComponent && (
              <CardTypeStyled>
                <LogoComponent />
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
                {paymentMethod === 'paypal' && (
                  <HolderNameStyled>
                    ({paymentMethodSpecificParams.holderName})
                  </HolderNameStyled>
                )}
              </CardDetailsNameWrapStyled>
              {paymentMethod !== 'paypal' &&
                paymentMethodSpecificParams?.cardExpirationDate && (
                  <CardExpirationStyled>
                    <CardExpirationLabel>
                      {t('Expiry date')}
                    </CardExpirationLabel>
                    <CardExpirationDateStyled>
                      {paymentMethodSpecificParams.cardExpirationDate}
                    </CardExpirationDateStyled>
                  </CardExpirationStyled>
                )}
            </CardDetailsStyled>
          </CardInfoStyled>
          <CardEditStyled
            onClick={() => {
              dispatch(
                updatePaymentDetailsPopup({
                  isOpen: true
                })
              );
              eventDispatcher(MSSDK_EDIT_PAYMENT_BUTTON_CLICKED, {
                detail: {
                  paymentMethod
                }
              });
            }}
          >
            {t('Edit payment info')}
          </CardEditStyled>
        </CardInfoWrapStyled>
      </CardStyled>
    </Card>
  );
};

export default PaymentCard;
