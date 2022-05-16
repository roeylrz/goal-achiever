import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import useHttpClient from '../../../shared/hooks/http-hook';

const useHome = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();

  return { error, clearError };
};

export default useHome;
