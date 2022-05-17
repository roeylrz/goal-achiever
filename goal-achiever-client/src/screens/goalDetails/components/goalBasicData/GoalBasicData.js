import React from 'react';
import Input from '../../../../shared/components/formElements/Input';
import classes from './GoalBasicData.module.scss';

const GoalBasicData = ({ inputHandler, goalData }) => {
  return (
    <div className={classes.GoalBasicData}>
      <h3>Goal details</h3>
      <Input
        required
        id="name"
        element="input"
        type="text"
        label="Title"
        value={goalData.name}
        onChange={inputHandler}
      />
      <Input
        element="texterea"
        id="description"
        type="text"
        label="Description"
        value={goalData.description}
        onChange={inputHandler}
      />

      <Input
        id="duedate"
        element="input"
        type="date"
        label="Due Date"
        value={goalData.dueDate}
        onChange={inputHandler}
      />
      <Input
        checked={goalData.Completed}
        id="completed"
        element="input"
        type="checkbox"
        label="Completed"
        onClick={inputHandler}
      />
    </div>
  );
};

export default GoalBasicData;
