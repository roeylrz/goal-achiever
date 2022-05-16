import { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import useHttpClient from '../../../shared/hooks/http-hook';

const useHome = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [goalsWithNextSteps, setGoalsWithNextStep] = useState([]);

  const { token } = auth;
  const loadData = useCallback(async () => {
    const response = await sendRequest(
      'goalSteps/nextsteps',
      'GET',
      null,
      token
    );
    setGoalsWithNextStep(response.data.updateResult);
  }, [token, sendRequest]);

  const completeStep = useCallback(
    async (stepid) => {
      await sendRequest(`goalSteps/complete/${stepid}`, 'PATCH', null, token);
      await loadData();
    },
    [token, loadData, sendRequest]
  );
  useEffect(() => {
    loadData();
  }, [loadData]);

  return { goalsWithNextSteps, error, clearError, loadData, completeStep };
};

export default useHome;
