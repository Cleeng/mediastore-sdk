import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useMessage from 'hooks/useMessage';
import { updateCaptureAnswers } from 'api';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput';
import Loader from 'components/Loader';
import {
  ButtonStyled,
  ButtonWrapperStyled
} from 'components/MyAccountConsents/MyAccountConsentsStyled';
import { Address, AddressDetailsProps } from './AddressDetails.types';
import { WrapStyled, RowStyled, MessageStyled } from './AddressDetailsStyled';

const AddressDetails = ({
  data,
  isLoading,
  updateCaptureOption
}: AddressDetailsProps) => {
  const { t } = useTranslation();
  const [isSectionDisabled, setIsSectionDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);
  const [initialAddress, setInitialAddress] = useState<Address | null>(null);
  const { message, type, setMessage, resetMessage } = useMessage();

  useEffect(() => {
    if (data) {
      setAddress(data.answer);
      setInitialAddress(data.answer);
    }
  }, [data]);

  const onAddressChange =
    (key: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (address) {
        setAddress({
          ...address,
          [key]: e.target.value
        });
      }
    };

  const onCancel = () => {
    setAddress(initialAddress);
    setIsSectionDisabled(true);
  };

  const onSubmit = async () => {
    if (!address) {
      return;
    }

    setIsPending(true);
    try {
      await updateCaptureAnswers({
        ...address
      });

      updateCaptureOption({ key: 'address', value: address });
      setMessage({
        message: t(
          'address-details.success-message',
          'Your address details have been changed successfully'
        ),
        type: 'success'
      });

      setIsPending(false);
      setIsSectionDisabled(true);
    } catch (e) {
      setMessage({
        message: t(
          'address-details.error.submit',
          'Something went wrong. Try again later.'
        ),
        type: 'error'
      });
      setIsPending(false);
      setIsSectionDisabled(true);
    }
  };

  return isLoading ? (
    <Loader isMyAccount />
  ) : (
    <WrapStyled>
      {address && (
        <Card withBorder>
          {message && <MessageStyled $type={type}>{message}</MessageStyled>}
          <MyAccountInput
            id='address'
            label={t('address-details.label.address-line-1', 'Address Line 1')}
            value={address.address || ''}
            onChange={onAddressChange('address')}
            disabled={isSectionDisabled}
          />
          <MyAccountInput
            id='address2'
            label={t('address-details.label.address-line-2', 'Address Line 2')}
            value={address.address2 || ''}
            onChange={onAddressChange('address2')}
            disabled={isSectionDisabled}
          />
          <MyAccountInput
            id='city'
            label={t('address-details.label.city', 'City')}
            value={address.city || ''}
            onChange={onAddressChange('city')}
            disabled={isSectionDisabled}
          />
          <RowStyled>
            <MyAccountInput
              id='state'
              label={t('address-details.label.state', 'State')}
              value={address.state || ''}
              onChange={onAddressChange('state')}
              disabled={isSectionDisabled}
            />
            <MyAccountInput
              id='postCode'
              label={t(
                'address-details.label.zip-postal-code',
                'Zip/Postal code'
              )}
              value={address.postCode || ''}
              onChange={onAddressChange('postCode')}
              disabled={isSectionDisabled}
            />
          </RowStyled>
          <ButtonWrapperStyled>
            {isSectionDisabled ? (
              <ButtonStyled
                onClickFn={() => {
                  setIsSectionDisabled(false);
                  resetMessage();
                }}
                width='100%'
                variant='confirm'
              >
                {t('address-details.button.edit-address', 'Edit Address')}
              </ButtonStyled>
            ) : (
              <>
                <ButtonStyled variant='simple' onClickFn={() => onCancel()}>
                  {t('address-details.button.cancel', 'Cancel')}
                </ButtonStyled>
                <ButtonStyled
                  onClickFn={onSubmit}
                  disabled={isPending}
                  type='submit'
                  variant='confirm'
                >
                  {(isPending && <Loader buttonLoader color='#ffffff' />) ||
                    t('address-details.button.save', 'Save')}
                </ButtonStyled>
              </>
            )}
          </ButtonWrapperStyled>
        </Card>
      )}
    </WrapStyled>
  );
};

export default AddressDetails;
