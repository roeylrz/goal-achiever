import React from 'react';
import Button from '../../../../shared/components/formElements/Button';
import classes from './Footer.module.scss';

const Footer = ({}) => {
  return (
    <div className={classes.Footer}>
      <Button main>Save</Button>
      <Button>Cancel</Button>
    </div>
  );
};

export default Footer;
