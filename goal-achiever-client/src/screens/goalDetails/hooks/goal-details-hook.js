import { useReducer, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';
import useHttpClient from '../../../shared/hooks/http-hook';

const ON_GOAL_UPDATE = 'onGoalUpdate';
const ON_NEW_STEP_UPDATE = 'onStepsUpdate';
const ON_LOAD_DATA = 'onLoadData';

const initialState = {
  goal: {
    name: '',
    description: '',
    duedate: '',
    completed: false,
    steps: []
  },
  newStep: {
    name: '',
    description: '',
    duedate: ''
  },
  isDirty: false
};

const goalDetailsReducer = (state, action) => {
  switch (action.type) {
    case ON_GOAL_UPDATE:
      return {
        ...state,
        goal: action.goal,
        isDirty: true
      };
    case ON_NEW_STEP_UPDATE:
      return {
        ...state,
        newStep: action.newStep
      };
    case ON_LOAD_DATA:
      return {
        ...state,
        goal: action.goal,
        newStep: {
          name: '',
          description: '',
          duedate: ''
        }
      };
    default:
      break;
  }
};

const useGoalDetails = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const goalid = useParams().goalid;
  const [goalDataState, dispatchGoalDataState] = useReducer(
    goalDetailsReducer,
    initialState
  );

  const { token } = auth;
  const loadData = useCallback(async () => {
    const response = await sendRequest(`goals/${goalid}`, 'GET', null, token);
    if (!response.data.goal) return;
    const { Name, Description, DueDate, Completed, Steps } = response.data.goal;
    const goal = {
      name: Name,
      description: Description,
      duedate: DueDate ? DueDate : '',
      completed: Completed,
      steps: Steps
    };
    dispatchGoalDataState({
      type: ON_LOAD_DATA,
      goal
    });
  }, [goalid, token, sendRequest]);

  const createStep = useCallback(async () => {
    const newStepData = {
      GoalId: goalid,
      Name: goalDataState.newStep.name,
      Description: goalDataState.newStep.description,
      DueDate: new Date(goalDataState.newStep.duedate)
    };
    await sendRequest(`goalSteps/create`, 'PUT', newStepData, token);
    await loadData();
  }, [goalid, token, goalDataState, sendRequest, loadData]);

  const exructDataFromEvent = (event) =>
    event.type === 'click' ? event.target.checked : event.target.value;

  const onGoalDataChange = (event) => {
    const updatedGoal = { ...goalDataState.goal };
    updatedGoal[event.target.id] = exructDataFromEvent(event);
    dispatchGoalDataState({
      type: ON_GOAL_UPDATE,
      goal: updatedGoal
    });
  };

  const onStepDataChange = (event, stepIndex) => {
    const updatedSteps = [...goalDataState.goal.steps];
    updatedSteps[stepIndex][event.target.id] = exructDataFromEvent(event);
    const updatedGoal = { ...goalDataState.goal, Steps: updatedSteps };
    dispatchGoalDataState({
      type: ON_GOAL_UPDATE,
      goal: updatedGoal
    });
  };

  const onUpdateNewStep = (event) => {
    const updatedNewStep = { ...goalDataState.newStep };
    updatedNewStep[event.target.id] = exructDataFromEvent(event);
    dispatchGoalDataState({
      type: ON_NEW_STEP_UPDATE,
      newStep: updatedNewStep
    });
  };
  const onCancelNewStep = (event) => {
    const updatedNewStep = { ...goalDataState.newStep };
    updatedNewStep[event.target.id] = exructDataFromEvent(event);
    dispatchGoalDataState({
      type: ON_NEW_STEP_UPDATE,
      newStep: {
        name: '',
        description: '',
        duedate: ''
      }
    });
  };

  const completeAllSteps = async () => {
    await sendRequest(`goals/setcomplete/${goalid}`, 'PATCH', null, token);
    await loadData();
  };

  const createStepEnabled = goalDataState.newStep.name;

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    goalData: goalDataState.goal,
    error,
    createStepEnabled,
    onUpdateNewStep,
    clearError,
    loadData,
    onGoalDataChange,
    onStepDataChange,
    onCancelNewStep,
    createStep,
    completeAllSteps
  };
};

export default useGoalDetails;
