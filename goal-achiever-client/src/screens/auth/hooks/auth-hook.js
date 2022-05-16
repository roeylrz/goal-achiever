import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import { useForm } from '../../../shared/hooks/form-hook';
import useHttpClient from '../../../shared/hooks/http-hook';

const useHome = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [inLoginMode, setInLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      let url = '/users/login';
      const paylaod = {
        UserName: formState.inputs.username.value,
        Password: formState.inputs.password.value
      };
      if (!inLoginMode) {
        paylaod.FirstName = formState.inputs.firstname.value;
        paylaod.LastName = formState.inputs.lastname.value;
        url = '/users/signup';
      }
      const response = await sendRequest(url, 'POST', paylaod);
      const { FirstName, LastName, token, userId } = response.data;
      auth.login(userId, token, FirstName, LastName);
    },
    [formState, sendRequest, auth, inLoginMode]
  );

  const switchLoginMode = () => {
    if (!inLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstname: '',
          lastname: ''
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstname: {
            value: '',
            isValid: false
          },
          lastname: {
            value: '',
            isValid: true
          }
        },
        false
      );
    }
    setInLoginMode((prevMode) => !prevMode);
  };

  return {
    error,
    formState,
    inputHandler,
    inLoginMode,
    setInLoginMode,
    authSubmitHandler,
    switchLoginMode,
    clearError
  };
};

export default useHome;
