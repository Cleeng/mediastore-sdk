import React from 'react';
import PropTypes from 'prop-types';
import getConsentsRequest from '../../api/getConsents';
import { ConsentsWrapperStyled, ConsentsErrorStyled } from './ConsentsStyled';
import Loader from '../Loader';
import Checkbox from '../Checkbox';

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
    const { offerId } = this.props;

    if (prevProps.offerId !== offerId) {
      this.getConsents(offerId).then(() => {
        this.validateConsents();
      });
    }
  }

  getConsents = async offerId => {
    try {
      const consentsIncome = await getConsentsRequest(offerId);
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
          consentDefinitions.map((consent, index) => (
            <Checkbox
              onClickFn={() => this.changeConsentState(index)}
              checked={checked[index]}
              error={error}
              key={String(index)}
              required={consent.required && !checked[index]}
            >
              {consentsLabels[index]}
            </Checkbox>
          ))
        )}
        {error && <ConsentsErrorStyled>{error}</ConsentsErrorStyled>}
      </ConsentsWrapperStyled>
    );
  }
}

Consents.propTypes = {
  offerId: PropTypes.string,
  error: PropTypes.string,
  onChangeFn: PropTypes.func
};

Consents.defaultProps = {
  offerId: '',
  error: '',
  onChangeFn: () => {}
};

export default Consents;
