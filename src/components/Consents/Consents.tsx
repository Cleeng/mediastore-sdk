import { useEffect } from 'react';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  fetchPublisherConsents,
  setChecked
} from 'redux/publisherConsentsSlice';
import translateConsents from 'util/consentsHelper';
import {
  ConsentsWrapperStyled,
  ConsentsErrorStyled,
  InvisibleLegend,
  GeneralErrorStyled,
  FieldsetStyled
} from './ConsentsStyled';
import { ConsentsProps } from './Consents.types';

const Consents = ({ error, onChangeFn }: ConsentsProps) => {
  const {
    publisherConsents,
    checked,
    loading,
    error: generalError
  } = useAppSelector(state => state.publisherConsents);
  const { publisherId } = useAppSelector(state => state.publisherConfig);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getConsents() {
      if (publisherId) {
        const consents = await dispatch(fetchPublisherConsents(publisherId))
          .unwrap()
          .catch(err => {
            throw new Error(err);
          });

        consents.forEach((consent, index) => {
          if (consent.enabledByDefault) {
            dispatch(setChecked(index));
          }
        });
      } else {
        console.error('Unable to get publisherId from redux store');
      }
    }
    getConsents();
  }, [publisherId]);

  useEffect(() => {
    // validate consents
    onChangeFn(checked, publisherConsents);
  }, [checked, publisherConsents]);

  if (generalError === 'noPublisherId') {
    return (
      <GeneralErrorStyled data-testid="consents__general-error">
        {t(
          'consents-general-error',
          'Unable to fetch terms & conditions. Publisher is not recognized'
        )}
      </GeneralErrorStyled>
    );
  }
  if (loading) {
    return (
      <ConsentsWrapperStyled data-testid="consents__loader">
        <Loader />
      </ConsentsWrapperStyled>
    );
  }
  return (
    <ConsentsWrapperStyled>
      <FieldsetStyled>
        <InvisibleLegend>Consents </InvisibleLegend>
        {publisherConsents.map(({ label, required }, index) => {
          return (
            <Checkbox
              onClickFn={() => dispatch(setChecked(index))}
              checked={checked[index]}
              error={error}
              key={label}
              required={required && !checked[index]}
            >
              {translateConsents(label, t) + (required ? '*' : '')}
            </Checkbox>
          );
        })}
      </FieldsetStyled>
      {error && <ConsentsErrorStyled>{error}</ConsentsErrorStyled>}
    </ConsentsWrapperStyled>
  );
};

export default Consents;
