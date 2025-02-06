import { useEffect } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';

const clientToken = 'abc';

const options = {
  container: '#msd__primerWrapper'
};

const Primer = () => {
  const createDropIn = async () => {
    await PrimerSDK.showUniversalCheckout(clientToken, options);
  };

  useEffect(() => {
    createDropIn();
  }, []);

  return <div id='msd__primerWrapper' />;
};

export default Primer;
