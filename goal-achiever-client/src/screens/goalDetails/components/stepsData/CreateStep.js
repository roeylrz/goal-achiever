import React, { useState, useMemo } from 'react';
import Button from '../../../../shared/components/formElements/Button';
import StepData from './StepData';
import classes from './CreateStep.module.scss';

const CreateStep = ({
  createStepHandler,
  onCancelNewStep,
  newStepInputHandler,
  createStepEnabled
}) => {
  const [isEditingNewStep, setIsEditingNewStep] = useState(false);

  const editDisplay = useMemo(() => {
    return (
      <div className={classes.CreateStep}>
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
          <Button onClick={() => setIsEditingNewStep(true)}>
            Add new step
          </Button>
        )}
      </div>
    );
  }, [isEditingNewStep, newStepInputHandler, createStepEnabled]);
  return editDisplay;
};

export default CreateStep;
