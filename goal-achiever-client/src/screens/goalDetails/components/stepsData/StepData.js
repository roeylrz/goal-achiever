import React from 'react';
import Input from '../../../../shared/components/formElements/Input';
import classes from './StepData.module.scss';

const StepsData = ({ inputHandler, stepData = {}, isNew = false }) => {
  return (
    <div className={classes.StepData}>
      <Input
        required
        id="name"
        element="input"
        type="text"
        label="Title"
        onChange={inputHandler}
        value={stepData.Name}
      />
      <Input
        element="input"
        id="description"
        type="text"
        label="Description"
        value={stepData.Description}
        onChange={inputHandler}
      />

      <Input
        id="duedate"
        element="input"
        type="date"
        label="Due Date"
        value={stepData.DueDate}
        onChange={inputHandler}
      />
      {!isNew && (
        <Input
          checked={stepData.Completed}
          id="completed"
          element="input"
          type="checkbox"
          label="Completed"
          value={true}
          onInput={inputHandler}
        />
      )}
    </div>
  );
};

export default StepsData;
