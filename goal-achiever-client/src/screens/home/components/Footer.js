import React from 'react';
import Button from '../../../shared/components/formElements/Button';
import classes from './Footer.module.scss';

const Footer = ({ completeStepHandler }) => {
  return (
    <div className={classes.Footer}>
      <Button>EDIT STEP</Button>
      <Button main onClick={completeStepHandler}>
        FINISH STEP
      </Button>
    </div>
  );
};

export default Footer;
