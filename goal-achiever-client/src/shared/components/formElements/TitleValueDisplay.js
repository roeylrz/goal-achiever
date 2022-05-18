import React from 'react';
import moment from 'moment';
import classes from './TitleValueDisplay.module.scss';

const TitleValueDisplay = ({ title, value }) => {
  const valueToDisplay =
    Date.parse(value) && !Number.isInteger(value)
      ? moment(value).format('yyy-MM-DD')
      : value;
  return (
    <div className={classes.TitleValueDisplay}>
      <label className={classes.TitleValueDisplay_title}>{title}</label>
      <label className={classes.TitleValueDisplay_value}>
        {valueToDisplay || valueToDisplay === 0 ? valueToDisplay : 'N/A'}
      </label>
    </div>
  );
};

export default TitleValueDisplay;
