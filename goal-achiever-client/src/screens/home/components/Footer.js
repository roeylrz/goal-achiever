import React from 'react';
import * as routesConsts from '../../../shared/httpRequests/routes';
import Button from '../../../shared/components/formElements/Button';
import classes from './Footer.module.scss';

const Footer = ({ completeStepHandler, goalId }) => {
  return (
    <div className={classes.Footer}>
      <Button to={`${routesConsts.GOAL_DETAILS}${goalId}`}>EDIT GOAL</Button>
      <Button main onClick={completeStepHandler}>
        FINISH STEP
      </Button>
    </div>
  );
};

export default Footer;
