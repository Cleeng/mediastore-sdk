/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { createPrimerSession } from 'api';

export const usePrimer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const getPrimerToken = async () => {
    try {
      const response = await createPrimerSession();
      setIsLoading(false);
      return response;
    } catch (error) {
      setSessionError('An error occurred!');
      setIsLoading(false);
      return null;
    }
  };

  return {
    getPrimerToken,
    isLoading,
    setIsLoading,
    sessionError,
    setSessionError
  };
};
