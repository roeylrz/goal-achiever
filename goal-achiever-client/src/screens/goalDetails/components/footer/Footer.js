import React from 'react';
import Button from '../../../../shared/components/formElements/Button';
import classes from './Footer.module.scss';

const Footer = ({ onCancel, onSubmit, isSavingAllowed }) => {
  return (
    <div className={classes.Footer}>
      <Button main onClick={onSubmit} disabled={!isSavingAllowed}>
        Save
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default Footer;
