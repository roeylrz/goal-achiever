import React from 'react';
import TitleValueDisplay from '../../../shared/components/formElements/TitleValueDisplay';
import classes from './GoalContent.module.scss';

const GoalContent = ({ goal }) => {
  const DisplatStatus = ({ isCompleted }) => {
    let value = 'In progress';
    let className = classes.GoalContent_status;
    if (isCompleted) {
      value = 'Completed';
      className = `${className} ${classes.GoalContent_status___completed}`;
    }
    return <p className={className}>{value}</p>;
  };
  return (
    <div className={classes.GoalContent}>
      <DisplatStatus isCompleted={goal.Completed} />
      <TitleValueDisplay title={'Description'} value={goal.Description} />
      <TitleValueDisplay title={'Due Date'} value={goal.DueDate} />
      <TitleValueDisplay title={'Total Steps'} value={goal.Steps.length} />
    </div>
  );
};

export default GoalContent;
