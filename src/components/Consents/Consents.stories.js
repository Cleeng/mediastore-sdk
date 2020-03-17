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
      publisherId: null
    };
  }

  componentDidMount() {
    this.setState({
      publisherId: '933103327'
    });
  }

  render() {
    const { publisherId } = this.state;
    const { error } = this.props;
    return <Consent error={error} publisherId={publisherId} />;
  }
}

WrapperComponent.propTypes = {
  error: PropTypes.string
};

WrapperComponent.defaultProps = {
  error: ''
};

storiesOf('Checkout/Consents', module)
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
