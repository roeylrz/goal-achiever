import React from 'react';
import StepData from './StepData';
import CreateStep from './CreateStep';

const StepsData = ({
  inputHandler,
  newStepInputHandler,
  createStepEnabled,
  onCancelNewStep,
  createStep,
  steps = []
}) => {
  const stepsData = steps.map(
    (step) => {
      return (
        <StepData key={step._id} inputHandler={inputHandler} stepData={step} />
      );
    },
    [steps, inputHandler]
  );
  return (
    <div>
      <h3>Steps</h3>
      {stepsData}
      <CreateStep
        createStepHandler={createStep}
        newStepInputHandler={newStepInputHandler}
        createStepEnabled={createStepEnabled}
        onCancelNewStep={onCancelNewStep}
      />
    </div>
  );
};

export default StepsData;
