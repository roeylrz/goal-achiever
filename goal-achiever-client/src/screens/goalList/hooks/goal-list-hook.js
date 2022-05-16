import { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import useHttpClient from '../../../shared/hooks/http-hook';

const useGoalList = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [goals, setGoals] = useState([]);

  const { token } = auth;
  const loadData = useCallback(async () => {
    const response = await sendRequest('goals', 'GET', null, token);
    setGoals(response.data.goals);
  }, [token, sendRequest]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { goals, error, clearError, loadData };
};

export default useGoalList;
