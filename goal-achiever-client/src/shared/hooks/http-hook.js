import { useState, useCallback } from 'react';
import axios from '../../config/axios';

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, token = '', headers = {}) => {
      try {
        setIsLoading(true);
        const config = {
          method,
          data,
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`
          }
        };
        const responseData = await axios(url, config);
        return responseData;
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.errors
            ? error.response.data.errors
            : error.message;
        setError(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
