import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput';
import Loader from 'components/Loader';
import useMessage from 'hooks/useMessage';
import { updateCaptureAnswers } from 'api';
import {
  ButtonStyled,
  ButtonWrapperStyled
} from 'components/MyAccountConsents/MyAccountConsentsStyled';

import { WrapStyled, RowStyled, MessageStyled } from './AddressDetailsStyled';

const AddressDetails = ({ data, isLoading, updateCaptureOption }) => {
  const { t } = useTranslation();
  const [isSectionDisabled, setIsSectionDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [address, setAddress] = useState(null);
  const [initialAddress, setInitialAddress] = useState(null);
  const [message, type, setMessage, resetMessage] = useMessage();

  useEffect(() => {
    if (data) {
      setAddress(data.answer);
      setInitialAddress(data.answer);
    }
  }, [data]);

  const onAddressChange = (key, newValue) => {
    setAddress({
      ...address,
      [key]: newValue
    });
  };

  const onCancel = () => {
    setAddress(initialAddress);
    setIsSectionDisabled(true);
  };

  const onSubmit = () => {
    setIsPending(true);
    updateCaptureAnswers({
      ...address
    })
      .then(() => {
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
      })
      .catch(() => {
        setMessage({
          message: t(
            'address-details.error.submit',
            'Something went wrong. Try again later.'
          ),
          type: 'error'
        });
        setIsPending(false);
        setIsSectionDisabled(true);
      });
  };

  return isLoading ? (
    <Loader isMyAccount />
  ) : (
    <WrapStyled>
      {address && (
        <Card withBorder>
          {message && <MessageStyled type={type}>{message}</MessageStyled>}
          <MyAccountInput
            id='address'
            label={t('address-details.label.address-line-1', 'Address Line 1')}
            value={address.address || ''}
            onChange={(e) => onAddressChange('address', e.target.value)}
            disabled={isSectionDisabled}
          />
          <MyAccountInput
            id='address2'
            label={t('address-details.label.address-line-2', 'Address Line 2')}
            value={address.address2 || ''}
            onChange={(e) => onAddressChange('address2', e.target.value)}
            disabled={isSectionDisabled}
          />
          <MyAccountInput
            id='city'
            label={t('address-details.label.city', 'City')}
            value={address.city || ''}
            onChange={(e) => onAddressChange('city', e.target.value)}
            disabled={isSectionDisabled}
          />
          <RowStyled>
            <MyAccountInput
              id='state'
              label={t('address-details.label.state', 'State')}
              value={address.state || ''}
              onChange={(e) => onAddressChange('state', e.target.value)}
              disabled={isSectionDisabled}
            />
            <MyAccountInput
              id='postCode'
              label={t(
                'address-details.label.zip-postal-code',
                'Zip/Postal code'
              )}
              value={address.postCode || ''}
              onChange={(e) => onAddressChange('postCode', e.target.value)}
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
              >
                {t('address-details.button.edit-address', 'Edit Address')}
              </ButtonStyled>
            ) : (
              <>
                <ButtonStyled theme='simple' onClickFn={() => onCancel()}>
                  {t('address-details.button.cancel', 'Cancel')}
                </ButtonStyled>
                <ButtonStyled
                  onClickFn={onSubmit}
                  disabled={isPending}
                  type='submit'
                  theme='confirm'
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

AddressDetails.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.any),
  updateCaptureOption: PropTypes.func
};

AddressDetails.defaultProps = {
  isLoading: false,
  data: {},
  updateCaptureOption: () => null
};

export default AddressDetails;
