import React from 'react';
import Input from '../../../../shared/components/formElements/Input';
import { VALIDATOR_REQUIRE } from '../../../../shared/util/validators';
import classes from './StepData.module.scss';

const StepsData = ({ inputHandler, stepData }) => {
  return (
    <div className={classes.StepData}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={stepData.Name}
        initialValid={true}
      />
      <Input
        element="input"
        id="description"
        type="text"
        label="Description"
        errorText="Please enter last name."
        initialValid={true}
        initialValue={stepData.Description}
        onInput={inputHandler}
      />

      <Input
        id="duedate"
        element="input"
        type="date"
        label="Due Date"
        initialValid={true}
        initialValue={stepData.DueDate}
        onInput={inputHandler}
      />
      <Input
        checked={stepData.Completed}
        id="duedate"
        element="input"
        type="checkbox"
        label="Completed"
        initialValid={true}
        initialValue={true}
        onInput={inputHandler}
      />
    </div>
  );
};

export default StepsData;
