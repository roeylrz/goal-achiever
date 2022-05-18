import { useReducer, useContext, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  isSavingAllowed: false
};

const goalDetailsReducer = (state, action) => {
  switch (action.type) {
    case ON_GOAL_UPDATE:
      return {
        ...state,
        goal: action.goal,
        isSavingAllowed: action.isSavingAllowed
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
  const navigate = useNavigate();
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

  const isSaveAllowed = (currentGoalState) => {
    if (!currentGoalState || !currentGoalState.name) {
      return false;
    }
    return currentGoalState.steps.filter((step) => !step.Name).length === 0;
  };

  const onGoalDataChange = useCallback(
    (event) => {
      const updatedGoal = { ...goalDataState.goal };
      updatedGoal[event.target.id] = exructDataFromEvent(event);
      isSaveAllowed(updatedGoal);
      dispatchGoalDataState({
        type: ON_GOAL_UPDATE,
        goal: updatedGoal,
        isSavingAllowed: isSaveAllowed(updatedGoal)
      });
    },
    [goalDataState]
  );

  const onStepDataChange = useCallback(
    (event, stepIndex) => {
      const updatedSteps = [...goalDataState.goal.steps];
      updatedSteps[stepIndex][event.target.id] = exructDataFromEvent(event);
      const updatedGoal = { ...goalDataState.goal, steps: updatedSteps };
      dispatchGoalDataState({
        type: ON_GOAL_UPDATE,
        goal: updatedGoal,
        isSavingAllowed: isSaveAllowed(updatedGoal)
      });
    },
    [goalDataState]
  );

  const onUpdateNewStep = (event) => {
    const updatedNewStep = { ...goalDataState.newStep };
    updatedNewStep[event.target.id] = exructDataFromEvent(event);
    dispatchGoalDataState({
      type: ON_NEW_STEP_UPDATE,
      newStep: updatedNewStep
    });
  };
  const onCancelNewStep = useCallback(
    (event) => {
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
    },
    [goalDataState]
  );

  const completeAllSteps = async () => {
    await sendRequest(`goals/setcomplete/${goalid}`, 'PATCH', null, token);
    await loadData();
  };

  const onCancel = () => navigate(-1);

  const onSave = useCallback(async () => {
    const payload = {
      Name: goalDataState.goal.name,
      Description: goalDataState.goal.description,
      DueDate: goalDataState.goal.duedate,
      Steps: goalDataState.goal.steps
    };
    await sendRequest(`goals/update/${goalid}`, 'PATCH', payload, token);
    navigate(-1);
  }, [token, goalid, goalDataState, sendRequest, navigate]);

  const createStepEnabled = goalDataState.newStep.name;

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    goalData: goalDataState.goal,
    error,
    createStepEnabled,
    isSavingAllowed: goalDataState.isSavingAllowed,
    onUpdateNewStep,
    clearError,
    loadData,
    onGoalDataChange,
    onStepDataChange,
    onCancelNewStep,
    createStep,
    completeAllSteps,
    onCancel,
    onSave
  };
};

export default useGoalDetails;
