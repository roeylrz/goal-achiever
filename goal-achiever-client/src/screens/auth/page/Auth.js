import React, { useMemo } from 'react';
import useHome from '../hooks/auth-hook';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import Footer from '../compoents/Footer';
import Card from '../../../shared/components/UIElements/card/Card';
import Input from '../../../shared/components/formElements/Input';
import classes from './Auth.module.scss';

const Auth = () => {
  const {
    error,
    inLoginMode,
    isLoginValid,
    clearError,
    switchLoginMode,
    authSubmitHandler,
    onChange
  } = useHome();

  const loginRequest = `Please ${inLoginMode ? 'login' : 'signup'}`;
  const content = useMemo(() => {
    return (
      <React.Fragment>
        {!inLoginMode && (
          <>
            <Input
              element="input"
              id="firstname"
              type="text"
              label="First Name"
              onChange={onChange}
              required={true}
            />
            <Input
              element="input"
              id="lastname"
              type="text"
              label="Last Name"
              errorText="Please enter last name."
              initialValid={true}
              onChange={onChange}
            />
          </>
        )}
        <Input
          id="username"
          element="input"
          type="text"
          label="Username"
          onChange={onChange}
          required={true}
        />
        <Input
          id="password"
          placeholder="At least 6 digits"
          element="input"
          type="password"
          label="Password"
          onChange={onChange}
          required={true}
        />
      </React.Fragment>
    );
  }, [inLoginMode, onChange]);

  return (
    <form className={classes.Auth} onSubmit={authSubmitHandler}>
      <ErrorModal error={error} onClear={clearError} />
      <Card
        headerLarge={loginRequest}
        footer={
          <Footer
            isValid={isLoginValid}
            inLoginMode={inLoginMode}
            switchLoginMode={switchLoginMode}
          />
        }
      >
        {content}
      </Card>
    </form>
  );
};

export default Auth;
