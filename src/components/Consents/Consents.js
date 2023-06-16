import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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

const Consents = ({ error, onChangeFn }) => {
  const {
    publisherConsents,
    checked,
    loading,
    error: generalError
  } = useSelector(state => state.publisherConsents);
  const { publisherId } = useSelector(state => state.publisherConfig);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getConsents() {
      if (publisherId) {
        await dispatch(fetchPublisherConsents(publisherId));
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
        {t('Unable to fetch terms & conditions. Publisher is not recognized')}
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
        {publisherConsents.map((consent, index) => {
          return (
            <Checkbox
              onClickFn={() => dispatch(setChecked(index))}
              checked={checked[index]}
              error={error}
              key={consent.label}
              required={consent.required && !checked[index]}
            >
              {translateConsents(consent.label, t) +
                (consent.required ? '*' : '')}
            </Checkbox>
          );
        })}
      </FieldsetStyled>
      {error && <ConsentsErrorStyled>{error}</ConsentsErrorStyled>}
    </ConsentsWrapperStyled>
  );
};

Consents.propTypes = {
  error: PropTypes.string,
  onChangeFn: PropTypes.func
};

Consents.defaultProps = {
  error: '',
  onChangeFn: () => {}
};

export default Consents;
