import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text } from '@storybook/addon-knobs';
import Consent from './Consents';

class WrapperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: null
    };
  }

  componentDidMount() {
    this.setState({
      offerId: 'S144753252_UA'
    });
  }

  render() {
    const { offerId } = this.state;
    const { error } = this.props;
    return <Consent error={error} offerId={offerId} />;
  }
}

WrapperComponent.propTypes = {
  error: PropTypes.string
};

WrapperComponent.defaultProps = {
  error: ''
};

storiesOf('Consents', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        width: 400,
        backgroundColor: 'white',
        padding: '20px 20px 50px 20px'
      }}
    >
      {story()}
    </div>
  ))
  .add('All options', () => <WrapperComponent error={text('error', '')} />);
