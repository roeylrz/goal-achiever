import React from 'react';
import StepData from './StepData';
import StepActions from './StepActions';

const StepsData = ({
  inputHandler,
  newStepInputHandler,
  createStepEnabled,
  onCancelNewStep,
  createStep,
  goalCompleted,
  completeAllSteps,
  steps = []
}) => {
  const stepsData = steps.map(
    (step, stepIndex) => {
      return (
        <StepData
          stepIndex={stepIndex}
          key={step._id}
          inputHandler={inputHandler}
          stepData={step}
        />
      );
    },
    [steps, inputHandler]
  );
  return (
    <div>
      <h3>Steps</h3>
      {stepsData}
      <StepActions
        completeAllSteps={completeAllSteps}
        goalCompleted={goalCompleted}
        createStepHandler={createStep}
        newStepInputHandler={newStepInputHandler}
        createStepEnabled={createStepEnabled}
        onCancelNewStep={onCancelNewStep}
      />
    </div>
  );
};

export default StepsData;
