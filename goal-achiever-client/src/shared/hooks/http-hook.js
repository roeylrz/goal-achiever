import { useState, useCallback } from 'react';
import axios from '../../config/axios-matrix-cabinet';

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      try {
        setIsLoading(true);
        const responseData = await axios(url, method, data, headers);
        return responseData;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(error.message);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
