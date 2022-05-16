import { useState, useContext, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';
import { useForm } from '../../../shared/hooks/form-hook';
import useHttpClient from '../../../shared/hooks/http-hook';

const useGoalDetails = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const goalid = useParams().goalid;
  const [goalData, setGoalData] = useState({});
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      dueDate: {
        value: null,
        isValid: false
      },
      steps: {
        value: [],
        isValid: false
      }
    },
    false
  );

  const { token } = auth;
  const loadData = useCallback(async () => {
    const response = await sendRequest(`goals/${goalid}`, 'GET', null, token);
    setGoalData(response.data.goal);
  }, [token, sendRequest]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { goalData, error, clearError, loadData, formState, inputHandler };
};

export default useGoalDetails;
