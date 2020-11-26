/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import submitConsents from 'api/Customer/submitConsents';
import labeling from 'containers/labeling';
import {
  ButtonStyled,
  CheckboxStyled,
  CardStyled,
  ButtonWrapperStyled
} from './MyAccountConsentsStyled';

class MyAccountConsents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedConsents: [],
      isSectionDisabled: true,
      isLoading: false,
      isSubmittingPending: false,
      showButtonToUpdate: true
    };
  }

  componentDidMount() {
    const { consents } = this.props;
    if (consents.length !== 0) {
      this.saveConsentsInState();
    }
  }

  componentDidUpdate(prevProps) {
    const { consents } = this.props;
    if (prevProps.consents !== consents) {
      this.saveConsentsInState();
    }
  }

  handleClick(e, isConsentDisabled, item) {
    const { showConsentsOnly, saveConsents } = this.props;
    if (e.target.tagName.toLowerCase() === 'a') return; // enable to open link
    if (isConsentDisabled || (!showConsentsOnly && item.required)) return;
    const { updatedConsents } = this.state;
    const itemIndex = updatedConsents.findIndex(el => el.name === item.name);
    this.setState(prevState => {
      const copyConsentObj = { ...prevState.updatedConsents[itemIndex] };
      copyConsentObj.state = this.toggleState(copyConsentObj.state);
      const stateCopy = [...prevState.updatedConsents];
      stateCopy[itemIndex] = copyConsentObj;
      if (showConsentsOnly) {
        saveConsents(stateCopy);
      }
      return { ...prevState, updatedConsents: stateCopy };
    });
  }

  toggleState = state => (state === 'accepted' ? 'declined' : 'accepted');

  saveConsentsInState() {
    const { consents } = this.props;
    const showButtonToUpdate = consents.find(el => !el.required);
    this.setState({
      updatedConsents: consents,
      showButtonToUpdate: !!showButtonToUpdate
    });
  }

  updateConsents() {
    const { updatedConsents } = this.state;
    const { setConsents } = this.props;
    const payload = updatedConsents.map(item => {
      return {
        name: item.name,
        version: item.newestVersion,
        state: item.state
      };
    });
    this.setState({
      isSubmittingPending: true
    });
    submitConsents([], [], payload).then(() => {
      this.setState({
        isSectionDisabled: true,
        isSubmittingPending: false
      });
      setConsents(updatedConsents);
    });
  }

  render() {
    const { t, consents, isLoading, showConsentsOnly } = this.props;
    const {
      updatedConsents,
      isSectionDisabled,
      isSubmittingPending,
      showButtonToUpdate
    } = this.state;

    const sortedConsents = updatedConsents.slice().sort((a, b) => {
      return a.required === b.required ? 0 : a.required ? -1 : 1;
    });

    return isLoading ? (
      <Loader isMyAccount />
    ) : (
      <CardStyled showConsentsOnly={showConsentsOnly} withBorder>
        {sortedConsents.map(item => (
          <CheckboxStyled
            isMyAccount
            onClickFn={(e, isConsentDisabled) =>
              this.handleClick(e, isConsentDisabled, item)
            }
            checked={item.state === 'accepted'}
            key={item.name}
            disabled={(isSectionDisabled || item.required) && !showConsentsOnly}
            required={item.required}
            hide={showConsentsOnly && !item.required}
          >
            {t(item.label)}
          </CheckboxStyled>
        ))}
        {!showConsentsOnly && (
          <>
            {showButtonToUpdate && (
              <ButtonWrapperStyled>
                {isSectionDisabled ? (
                  <ButtonStyled
                    onClickFn={() =>
                      this.setState({ isSectionDisabled: false })
                    }
                    width="100%"
                  >
                    {t('Update Terms')}
                  </ButtonStyled>
                ) : (
                  <>
                    <ButtonStyled
                      theme="simple"
                      onClickFn={() =>
                        this.setState({
                          isSectionDisabled: true,
                          updatedConsents: consents
                        })
                      }
                    >
                      {t('Cancel')}
                    </ButtonStyled>
                    <ButtonStyled
                      theme="confirm"
                      onClickFn={() => this.updateConsents()}
                      disabled={isSubmittingPending}
                    >
                      {(isSubmittingPending && t('Loading...')) || t('Save')}
                    </ButtonStyled>
                  </>
                )}
              </ButtonWrapperStyled>
            )}
          </>
        )}
      </CardStyled>
    );
  }
}

MyAccountConsents.propTypes = {
  consents: PropTypes.arrayOf(PropTypes.object),
  setConsents: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  showConsentsOnly: PropTypes.bool,
  saveConsents: PropTypes.func,
  t: PropTypes.func
};

MyAccountConsents.defaultProps = {
  consents: [],
  isLoading: false,
  showConsentsOnly: false,
  saveConsents: () => {},
  t: k => k
};

export { MyAccountConsents as PureMyAccountConsents };

export default withTranslation()(labeling()(MyAccountConsents));
