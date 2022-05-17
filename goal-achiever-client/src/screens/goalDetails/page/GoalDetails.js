import React, { useMemo } from 'react';
import useGoalDetails from '../hooks/goal-details-hook';
import GoalBasicData from '../components/goalBasicData/GoalBasicData';
import StepsData from '../components/stepsData/StepsData';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import Card from '../../../shared/components/UIElements/card/Card';
import Devider from '../../../shared/components/UIElements/deviders/Devider';
import classes from './GoalDetails.module.scss';

const GoalDetails = () => {
  const { goalData, error, clearError, formState, inputHandler } =
    useGoalDetails();

  const goalDataContent = useMemo(() => {
    return (
      <div className={classes.GoalDetails_card}>
        <GoalBasicData goalData={goalData} inputHandler={inputHandler} />
        <Devider />
        <StepsData inputHandler={inputHandler} steps={goalData.Steps} />
      </div>
    );
  }, [goalData, inputHandler]);

  return (
    <form className={classes.GoalDetails}>
      <ErrorModal error={error} onClear={clearError} />
      {goalData && <Card footer={null}>{goalDataContent}</Card>}
    </form>
  );
};

export default GoalDetails;
