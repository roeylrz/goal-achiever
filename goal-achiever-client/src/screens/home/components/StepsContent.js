import React from 'react';
import TitleValueDisplay from '../../../shared/components/formElements/TitleValueDisplay';
import classes from './StepsContent.module.scss';

const StepsContent = ({ nextStep = {} }) => {
  return (
    <div className={classes.StepsContent}>
      <p>Current step</p>
      <TitleValueDisplay title={'Name'} value={nextStep.Name} />
      <TitleValueDisplay title={'Description'} value={nextStep.Description} />
      <TitleValueDisplay title={'Due Date'} value={nextStep.DueDate} />
    </div>
  );
};

export default StepsContent;
