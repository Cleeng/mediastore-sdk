import React from 'react';
import PropTypes from 'prop-types';
import getConsentsRequest from '../../api/getConsents';
import {
  ConsentsWrapperStyled,
  ConsentsErrorStyled,
  InvisibleLegend
} from './ConsentsStyled';
import Loader from '../Loader';
import Checkbox from '../Checkbox';

const regexHrefOpenTag = new RegExp(/<a(.|\n)*?>/);
const regexHrefCloseTag = new RegExp(/<\/a(.|\n)*?>/);

export class Consents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consentDefinitions: [],
      checked: [],
      consentsLabels: [],
      consentLoaded: false
    };
  }

  componentDidUpdate(prevProps) {
    const { publisherId } = this.props;

    if (prevProps.publisherId !== publisherId) {
      this.getConsents(publisherId).then(() => {
        this.validateConsents();
      });
    }
  }

  getConsents = async publisherId => {
    try {
      const consentsIncome = await getConsentsRequest(publisherId);
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
        const labels = consentsIncome.responseData.consents.map(element =>
          this.translateConsents(element.label)
        );
        const initArray = new Array(consentsDetails.length).fill(false);
        this.setState({
          consentDefinitions: consentsDetails,
          consentLoaded: true,
          consentsLabels: labels,
          checked: initArray
        });
      }
    } catch (error) {
      return error;
    }
    return false;
  };

  changeConsentState = consentID => {
    const { consentDefinitions, checked } = this.state;
    if (consentDefinitions.length > 0) {
      checked[consentID] = !checked[consentID];
      this.setState({ checked });
    }
    this.validateConsents();
  };

  validateConsents = () => {
    const { onChangeFn } = this.props;
    const { consentDefinitions, checked } = this.state;
    onChangeFn(checked, consentDefinitions);
  };

  translateConsents = consentContent => {
    const { t } = this.props;
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

  render() {
    const {
      checked,
      consentsLabels,
      consentDefinitions,
      consentLoaded
    } = this.state;
    const { error } = this.props;
    return (
      <ConsentsWrapperStyled>
        {!consentLoaded ? (
          <Loader />
        ) : (
          <fieldset>
            <InvisibleLegend>Consents </InvisibleLegend>
            {consentDefinitions.map((consent, index) => (
              <Checkbox
                onClickFn={() => this.changeConsentState(index)}
                checked={checked[index]}
                error={error}
                key={String(index)}
                required={consent.required && !checked[index]}
              >
                {consentsLabels[index]}
              </Checkbox>
            ))}
          </fieldset>
        )}
        {error && <ConsentsErrorStyled>{error}</ConsentsErrorStyled>}
      </ConsentsWrapperStyled>
    );
  }
}

Consents.propTypes = {
  publisherId: PropTypes.string,
  error: PropTypes.string,
  onChangeFn: PropTypes.func,
  t: PropTypes.func
};

Consents.defaultProps = {
  publisherId: '',
  error: '',
  onChangeFn: () => {},
  t: k => k
};

export default Consents;
