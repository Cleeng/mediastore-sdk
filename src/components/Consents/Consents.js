import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import { getConsents as fetchConsents } from 'api';
import Loader from 'components/Loader';
import {
  ConsentsWrapperStyled,
  ConsentsErrorStyled,
  InvisibleLegend,
  GeneralErrorStyled,
  FieldsetStyled
} from './ConsentsStyled';

const regexHrefOpenTag = new RegExp(/<a(.|\n)*?>/);
const regexHrefCloseTag = new RegExp(/<\/a(.|\n)*?>/);

const Consents = ({
  publisherId,
  error,
  disabledRegisterButton,
  onChangeFn,
  t
}) => {
  const [consentDefinitions, setConsentDefinitions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [consentsLabels, setConsentsLabels] = useState([]);
  const [consentLoaded, setConsentLoaded] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const getConsents = async pubId => {
    try {
      const consentsIncome = await fetchConsents(pubId);
      if (consentsIncome.responseData && consentsIncome.responseData.consents) {
        const consentsDetails = consentsIncome.responseData.consents.map(
          element => {
            return {
              name: element.name,
              version: element.version,
              required: element.required
            };
          }
        );
        const labels = consentsIncome.responseData.consents.map(
          element => element.label
        );
        const initArray = new Array(consentsDetails.length).fill(false);
        setConsentDefinitions(consentsDetails);
        setConsentLoaded(true);
        setConsentsLabels(labels);
        setChecked(initArray);
      } else if (consentsIncome.errors.includes('Invalid param pubId')) {
        setConsentLoaded(true);
        setGeneralError('noPublisherId');
        disabledRegisterButton();
      }
    } catch (getConsentsError) {
      return getConsentsError;
    }
    return false;
  };

  const validateConsents = () => {
    onChangeFn(checked, consentDefinitions);
  };

  useEffect(() => {
    if (publisherId) {
      getConsents(publisherId).then(() => {
        validateConsents();
      });
    }
  }, [publisherId]);

  const changeConsentState = consentID => {
    if (consentDefinitions.length > 0) {
      checked[consentID] = !checked[consentID];
      setChecked(checked);
    }
    validateConsents();
  };

  // eslint-disable-next-line no-unused-vars
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
  return (
    <ConsentsWrapperStyled>
      {!consentLoaded ? (
        <Loader />
      ) : (
        <FieldsetStyled>
          <InvisibleLegend>Consents </InvisibleLegend>
          {consentDefinitions.map((consent, index) => {
            return (
              <Checkbox
                onClickFn={() => changeConsentState(index)}
                checked={checked[index]}
                error={error}
                key={consentsLabels[index]}
                required={consent.required && !checked[index]}
              >
                {consentsLabels[index]}
              </Checkbox>
            );
          })}
        </FieldsetStyled>
      )}
      {error && <ConsentsErrorStyled>{error}</ConsentsErrorStyled>}
    </ConsentsWrapperStyled>
  );
};

Consents.propTypes = {
  publisherId: PropTypes.string,
  error: PropTypes.string,
  onChangeFn: PropTypes.func,
  disabledRegisterButton: PropTypes.func,
  t: PropTypes.func
};

Consents.defaultProps = {
  publisherId: '',
  error: '',
  onChangeFn: () => {},
  disabledRegisterButton: () => {},
  t: k => k
};

export default Consents;
