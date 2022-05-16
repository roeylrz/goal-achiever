import React, { useMemo } from 'react';
import useHome from '../hooks/auth-hook';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import Footer from '../compoents/Footer';
import Card from '../../../shared/components/UIElements/card/Card';
import Input from '../../../shared/components/formElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/util/validators';
import classes from './Auth.module.scss';

const Auth = () => {
  const {
    error,
    clearError,
    formState,
    inputHandler,
    inLoginMode,
    switchLoginMode,
    authSubmitHandler
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
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter first name."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="lastname"
              type="text"
              label="Last Name"
              errorText="Please enter last name."
              initialValid={true}
              onInput={inputHandler}
            />
          </>
        )}
        <Input
          id="username"
          element="input"
          type="text"
          label="Username"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="password"
          placeholder="At least 6 digits"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
      </React.Fragment>
    );
  }, [inputHandler, inLoginMode]);

  return (
    <form className={classes.Auth} onSubmit={authSubmitHandler}>
      <ErrorModal error={error} onClear={clearError} />
      <Card
        headerLarge={loginRequest}
        footer={
          <Footer
            isValid={formState.isValid}
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
