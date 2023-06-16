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
          message: t('Your address details have been changed successfully'),
          type: 'success'
        });
        setIsPending(false);
        setIsSectionDisabled(true);
      })
      .catch(() => {
        setMessage({
          message: t('Something went wrong. Try again later.'),
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
            id="address"
            label={t('Address Line 1')}
            value={address.address || ''}
            onChange={e => onAddressChange('address', e.target.value)}
            disabled={isSectionDisabled}
          />
          <MyAccountInput
            id="address2"
            label={t('Address Line 2')}
            value={address.address2 || ''}
            onChange={e => onAddressChange('address2', e.target.value)}
            disabled={isSectionDisabled}
          />
          <MyAccountInput
            id="city"
            label={t('City')}
            value={address.city || ''}
            onChange={e => onAddressChange('city', e.target.value)}
            disabled={isSectionDisabled}
          />
          <RowStyled>
            <MyAccountInput
              id="state"
              label={t('State')}
              value={address.state || ''}
              onChange={e => onAddressChange('state', e.target.value)}
              disabled={isSectionDisabled}
            />
            <MyAccountInput
              id="postCode"
              label={t('Zip/Postal code')}
              value={address.postCode || ''}
              onChange={e => onAddressChange('postCode', e.target.value)}
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
                width="100%"
              >
                {t('Edit Address')}
              </ButtonStyled>
            ) : (
              <>
                <ButtonStyled theme="simple" onClickFn={() => onCancel()}>
                  {t('Cancel')}
                </ButtonStyled>
                <ButtonStyled
                  onClickFn={onSubmit}
                  disabled={isPending}
                  type="submit"
                  theme="confirm"
                >
                  {(isPending && <Loader buttonLoader color="#ffffff" />) ||
                    t('Save')}
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
  updateCaptureOption: () => {}
};

export default AddressDetails;
