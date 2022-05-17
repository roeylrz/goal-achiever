import React from 'react';
import Input from '../../../../shared/components/formElements/Input';
import { VALIDATOR_REQUIRE } from '../../../../shared/util/validators';
import classes from './GoalBasicData.module.scss';

const GoalBasicData = ({ inputHandler, goalData }) => {
  return (
    <div className={classes.GoalBasicData}>
      <h3>Goal details</h3>
      <Input
        id="name"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={goalData.Name}
        initialValid={true}
      />
      <Input
        element="texterea"
        id="description"
        type="text"
        label="Description"
        errorText="Please enter last name."
        initialValid={true}
        initialValue={goalData.Description}
        onInput={inputHandler}
      />

      <Input
        id="duedate"
        element="input"
        type="date"
        label="Due Date"
        initialValid={true}
        initialValue={goalData.DueDate}
        onInput={inputHandler}
      />
    </div>
  );
};

export default GoalBasicData;
