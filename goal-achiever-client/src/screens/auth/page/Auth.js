import React from 'react';
import { useForm } from '../../../shared/hooks/form-hook';
import Button from '../../../shared/components/formElements/Button';
import Card from '../../../shared/components/UIElements/card/Card';
import Input from '../../../shared/components/formElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/util/validators';
import classes from './Auth.module.scss';

const Auth = () => {
  const [formState, inputHandler] = useForm(
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

  const authSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes.Auth} onSubmit={authSubmitHandler}>
      <Card headerLarge={'Please Login'}>
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
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </Card>
    </form>
  );
};

export default Auth;
