import { useEffect } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';

// Client token will be fetched from the server
const CLIENT_TOKEN = 'abc';
const CONTAINER = '#msd__primerWrapper';

const options = {
  container: CONTAINER
};

const Primer = () => {
  useEffect(() => {
    const createDropIn = async () => {
      await PrimerSDK.showUniversalCheckout(CLIENT_TOKEN, options);
    };
    createDropIn();
  }, []);

  return <div id='msd__primerWrapper' />;
};

export default Primer;
