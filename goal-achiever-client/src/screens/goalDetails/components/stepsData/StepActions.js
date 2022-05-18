import React, { useState, useMemo } from 'react';
import Button from '../../../../shared/components/formElements/Button';
import StepData from './StepData';
import classes from './StepActions.module.scss';

const StepActions = ({
  createStepHandler,
  onCancelNewStep,
  newStepInputHandler,
  createStepEnabled,
  completeAllSteps,
  goalCompleted
}) => {
  const [isEditingNewStep, setIsEditingNewStep] = useState(false);

  const editDisplay = useMemo(() => {
    return (
      <div className={classes.StepActions}>
        {isEditingNewStep ? (
          <>
            <StepData isNew={true} inputHandler={newStepInputHandler} />
            <Button
              disabled={!createStepEnabled}
              onClick={() => {
                createStepHandler();
                setIsEditingNewStep(false);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsEditingNewStep(false);
                onCancelNewStep();
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditingNewStep(true)}>
              Add new step
            </Button>
            <Button disabled={goalCompleted} main onClick={completeAllSteps}>
              Complete all steps
            </Button>
          </>
        )}
      </div>
    );
  }, [
    isEditingNewStep,
    newStepInputHandler,
    createStepEnabled,
    createStepHandler,
    onCancelNewStep,
    completeAllSteps,
    goalCompleted
  ]);
  return editDisplay;
};

export default StepActions;
