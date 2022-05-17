import React from 'react';
import StepData from './StepData';

const StepsData = ({ inputHandler, steps = [] }) => {
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
    </div>
  );
};

export default StepsData;
