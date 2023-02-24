import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsents, setChecked } from 'redux/consentsSlice';
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
    definitions: consentDefinitions,
    labels,
    checked,
    loading,
    error: generalError
  } = useSelector(state => state.consents);
  const { publisherId } = useSelector(state => state.publisherConfig);

  const dispatch = useDispatch();

  const validateConsents = () => {
    onChangeFn(checked, consentDefinitions);
  };

  useEffect(() => {
    async function getConsents() {
      if (publisherId) {
        await dispatch(fetchConsents(publisherId));
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
      <GeneralErrorStyled>
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
        {consentDefinitions.map((consent, index) => {
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
