import { useEffect } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';

const clientToken = 'abc';

const options = {
  container: '#msd__primerWrapper'
};

const Primer = () => {
  useEffect(() => {
    const createDropIn = async () => {
      await PrimerSDK.showUniversalCheckout(clientToken, options);
    };
    createDropIn();
  }, []);

  return <div id='msd__primerWrapper' />;
};

export default Primer;
