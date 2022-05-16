import React from 'react';
import Button from '../../../shared/components/formElements/Button';
import classes from './Footer.module.scss';

const Footer = ({ isValid, inLoginMode, switchLoginMode }) => {
  const loginModeCaption = {
    submitButton: 'SIGNUP',
    changeModeButton: 'SWITCH TO LOGIN'
  };
  if (inLoginMode) {
    loginModeCaption.submitButton = 'LOGIN';
    loginModeCaption.changeModeButton = 'SWITCH TO SIGNUP';
  }

  return (
    <div className={classes.Footer}>
      <Button type="submit" disabled={!isValid}>
        {loginModeCaption.submitButton}
      </Button>
      <Button onClick={switchLoginMode}>
        {loginModeCaption.changeModeButton}
      </Button>
    </div>
  );
};

export default Footer;
