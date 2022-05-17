import React from 'react';
import Input from '../../../../shared/components/formElements/Input';
import classes from './StepData.module.scss';

const StepsData = ({
  inputHandler,
  stepData = {},
  stepIndex,
  isNew = false
}) => {
  const onInputChange = (event) => inputHandler(event, stepIndex);
  return (
    <div className={classes.StepData}>
      <Input
        required
        id="Name"
        element="input"
        type="text"
        label="Title"
        onChange={onInputChange}
        value={stepData.Name}
      />
      <Input
        element="input"
        id="Description"
        type="text"
        label="Description"
        value={stepData.Description}
        onChange={onInputChange}
      />

      <Input
        id="Duedate"
        element="input"
        type="date"
        label="Due Date"
        value={stepData.DueDate}
        onChange={onInputChange}
      />
      {!isNew && (
        <Input
          checked={stepData.Completed}
          id="Completed"
          element="input"
          type="checkbox"
          label="Completed"
          value={true}
          onInput={onInputChange}
        />
      )}
    </div>
  );
};

export default StepsData;
