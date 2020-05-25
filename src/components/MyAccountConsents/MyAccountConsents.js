/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import submitConsents from 'api/submitConsents';
import labeling from '../../containers/labeling';
import {
  ButtonStyled,
  CheckboxStyled,
  CardStyled,
  ButtonWrapperStyled,
  InfoStyled
} from './MyAccountConsentsStyled';

class MyAccountConsents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedConsents: [],
      isDisabled: true,
      isLoading: false,
      isSubmittingPending: false
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

  toggleState = state => (state === 'accepted' ? 'declined' : 'accepted');

  saveConsentsInState() {
    const { consents } = this.props;
    this.setState({
      updatedConsents: consents
    });
  }

  handleClick(item) {
    const { updatedConsents } = this.state;
    const itemIndex = updatedConsents.findIndex(el => el.name === item.name);
    const { onlyConsents, saveConsents } = this.props;
    this.setState(prevState => {
      const copyConsentObj = { ...prevState.updatedConsents[itemIndex] };
      copyConsentObj.state = this.toggleState(copyConsentObj.state);
      const stateCopy = [...prevState.updatedConsents];
      stateCopy[itemIndex] = copyConsentObj;
      if (onlyConsents) {
        saveConsents(stateCopy);
      }
      return { ...prevState, updatedConsents: stateCopy };
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
        isDisabled: true,
        isSubmittingPending: false
      });
      setConsents(updatedConsents);
    });
  }

  render() {
    const { t, consents, isLoading, onlyConsents } = this.props;
    const { updatedConsents, isDisabled, isSubmittingPending } = this.state;

    const sortedConsents = updatedConsents.slice().sort((a, b) => {
      return a.required === b.required ? 0 : a.required ? -1 : 1;
    });

    return isLoading ? (
      <Loader isMyAccount />
    ) : (
      <CardStyled onlyConsents={onlyConsents}>
        {sortedConsents.map(item => (
          <CheckboxStyled
            isMyAccount
            onClickFn={() => this.handleClick(item)}
            checked={item.state === 'accepted'}
            key={item.name}
            disabled={(isDisabled || item.required) && !onlyConsents}
            required={item.required}
            hide={onlyConsents && !item.required}
          >
            {t(item.label)}
          </CheckboxStyled>
        ))}
        {!onlyConsents && (
          <>
            <ButtonWrapperStyled>
              {isDisabled ? (
                <ButtonStyled
                  size="small"
                  fontWeight="700"
                  onClickFn={() => this.setState({ isDisabled: false })}
                  width="100%"
                >
                  {t('Update Terms')}
                </ButtonStyled>
              ) : (
                <>
                  <ButtonStyled
                    size="small"
                    theme="secondary"
                    fontWeight="700"
                    onClickFn={() =>
                      this.setState({
                        isDisabled: true,
                        updatedConsents: consents
                      })
                    }
                  >
                    {t('Cancel')}
                  </ButtonStyled>
                  <ButtonStyled
                    size="small"
                    theme="primary"
                    fontWeight="700"
                    fontSize="13px"
                    onClickFn={() => this.updateConsents()}
                    disabled={isSubmittingPending}
                  >
                    {(isSubmittingPending && t('Loading...')) || t('Save')}
                  </ButtonStyled>
                </>
              )}
            </ButtonWrapperStyled>
            <InfoStyled>
              * This term is mandatory for using myAccount
            </InfoStyled>
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
  onlyConsents: PropTypes.bool,
  saveConsents: PropTypes.func,
  t: PropTypes.func
};

MyAccountConsents.defaultProps = {
  consents: [],
  isLoading: false,
  onlyConsents: false,
  saveConsents: () => {},
  t: k => k
};

export { MyAccountConsents as PureMyAccountConsents };

export default withTranslation()(labeling()(MyAccountConsents));
