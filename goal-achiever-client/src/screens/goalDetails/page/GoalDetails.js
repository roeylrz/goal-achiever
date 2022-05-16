import React, { useMemo } from 'react';
import useGoalDetails from '../hooks/goal-details-hook';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import Card from '../../../shared/components/UIElements/card/Card';
import Input from '../../../shared/components/formElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/util/validators';
import classes from './GoalDetails.module.scss';

const GoalDetails = () => {
  const { goalData, error, clearError, formState, inputHandler } =
    useGoalDetails();

  const content = useMemo(() => {
    return (
      <React.Fragment>
        <Input
          element="input"
          id="name"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter goal name."
          onInput={inputHandler}
        />
        <Input
          element="texterea"
          id="description"
          type="text"
          label="Description"
          errorText="Please enter last name."
          initialValid={true}
          onInput={inputHandler}
        />

        <Input
          id="duedate"
          element="input"
          type="date"
          label="Due Date"
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="password"
          placeholder="At least 6 digits"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
      </React.Fragment>
    );
  }, [inputHandler]);

  return (
    <form className={classes.GoalDetails}>
      {' '}
      <ErrorModal error={error} onClear={clearError} />
      {goalData && (
        <div className={classes.GoalDetails_card}>
          <Card headerLarge={goalData.Name} footer={null}>
            {content}
          </Card>
        </div>
      )}
    </form>
  );
};

export default GoalDetails;
