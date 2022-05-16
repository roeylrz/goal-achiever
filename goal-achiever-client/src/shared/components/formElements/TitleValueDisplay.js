import React from 'react';
import classes from './TitleValueDisplay.module.scss';

const TitleValueDisplay = ({ title, value }) => {
  return (
    <div className={classes.TitleValueDisplay}>
      <label className={classes.TitleValueDisplay_title}>{title}</label>
      <label className={classes.TitleValueDisplay_value}>
        {value || value === 0 ? value : 'N/A'}
      </label>
    </div>
  );
};

export default TitleValueDisplay;
