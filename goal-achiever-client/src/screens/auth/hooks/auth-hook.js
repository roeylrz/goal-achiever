import { useReducer, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../../../shared/context/auth-context';
import useHttpClient from '../../../shared/hooks/http-hook';

const ON_CHANGE = 'onChange';
const ON_TOGGLE_LONGIN = 'toggleSelectRow';
const ON_VALID_CHECK = 'onValidCheck';

const initialState = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  inLoginMode: true,
  isLoginValid: false
};

const inputsReducer = (state, action) => {
  switch (action.type) {
    case ON_CHANGE:
      return {
        ...state,
        [action.id]: action.value
      };
    case ON_TOGGLE_LONGIN:
      return {
        ...state,
        inLoginMode: action.inLoginMode
      };
    case ON_VALID_CHECK:
      return {
        ...state,
        isLoginValid: action.isLoginValid
      };
    default:
      break;
  }
};

const useHome = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [standbyState, dispatchStandbyState] = useReducer(
    inputsReducer,
    initialState
  );

  useEffect(() => {
    const isLoginValid =
      standbyState.username &&
      standbyState.password.length >= 6 &&
      (standbyState.inLoginMode || standbyState.firstname);

    dispatchStandbyState({
      type: ON_VALID_CHECK,
      isLoginValid: isLoginValid
    });
  }, [
    standbyState.username,
    standbyState.password,
    standbyState.inLoginMode,
    standbyState.firstname
  ]);

  const authSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      let url = '/users/login';
      const paylaod = {
        UserName: standbyState.username,
        Password: standbyState.password
      };
      if (!standbyState.inLoginMode) {
        paylaod.FirstName = standbyState.firstname;
        paylaod.LastName = standbyState.lastname;
        url = '/users/signup';
      }
      const response = await sendRequest(url, 'POST', paylaod);
      const { FirstName, LastName, token, userId } = response.data;
      auth.login(userId, token, FirstName, LastName);
    },
    [standbyState, sendRequest, auth]
  );

  const switchLoginMode = () => {
    dispatchStandbyState({
      type: ON_TOGGLE_LONGIN,
      inLoginMode: !standbyState.inLoginMode
    });
  };

  const onChange = (event) => {
    dispatchStandbyState({
      type: ON_CHANGE,
      id: event.target.id,
      value: event.target.value
    });
  };

  return {
    inLoginMode: standbyState.inLoginMode,
    isLoginValid: standbyState.isLoginValid,
    error,
    onChange,
    authSubmitHandler,
    switchLoginMode,
    clearError
  };
};

export default useHome;
