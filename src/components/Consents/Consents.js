import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPublisherConsents,
  setChecked
} from 'redux/publisherConsentsSlice';
import {
  ConsentsWrapperStyled,
  ConsentsErrorStyled,
  InvisibleLegend,
  GeneralErrorStyled,
  FieldsetStyled
} from './ConsentsStyled';

const regexHrefOpenTag = new RegExp(/<a(.|\n)*?>/);
const regexHrefCloseTag = new RegExp(/<\/a(.|\n)*?>/);

const Consents = ({ error, onChangeFn, t }) => {
  const {
    publisherConsents,
    labels,
    checked,
    loading,
    error: generalError
  } = useSelector(state => state.publisherConsents);
  const { publisherId } = useSelector(state => state.publisherConfig);

  const dispatch = useDispatch();

  const validateConsents = () => {
    onChangeFn(checked, publisherConsents);
  };

  useEffect(() => {
    async function getConsents() {
      if (publisherId) {
        await dispatch(fetchPublisherConsents(publisherId));
        validateConsents();
      }
    }
    getConsents();
  }, [publisherId]);

  const changeConsentState = consentID => {
    dispatch(setChecked(consentID));
    validateConsents();
  };

  const translateConsents = consentContent => {
    const openTagContent = regexHrefOpenTag.exec(consentContent);
    const closeTagContent = regexHrefCloseTag.exec(consentContent);
    if (openTagContent) {
      let modifiedConsentContent = consentContent.replace(
        regexHrefOpenTag,
        '{{htmltag}}'
      );
      modifiedConsentContent = modifiedConsentContent.replace(
        regexHrefCloseTag,
        '{{endhtmltag}}'
      );
      return `${t(modifiedConsentContent, {
        htmltag: openTagContent[0],
        endhtmltag: closeTagContent[0]
      })}`;
    }
    return t(consentContent);
  };

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
              onClickFn={() => changeConsentState(index)}
              checked={checked[index]}
              error={error}
              key={labels[index]}
              required={consent.required && !checked[index]}
            >
              {translateConsents(labels[index])}
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
  onChangeFn: PropTypes.func,
  t: PropTypes.func
};

Consents.defaultProps = {
  error: '',
  onChangeFn: () => {},
  t: k => k
};

export default Consents;
