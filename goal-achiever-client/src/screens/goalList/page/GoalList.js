import React, { useMemo } from 'react';
import useGoalList from '../hooks/goal-list-hook';
import * as routesConsts from '../../../shared/httpRequests/routes';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import GoalContent from '../components/GoalContent';
import CardList from '../../../shared/components/UIElements/card/CardList';
import Button from '../../../shared/components/formElements/Button';
import classes from './GoalList.module.scss';

const GoalList = () => {
  const { goals, error, clearError } = useGoalList();
  const goalsCountDisplay = `${goals.length} Goals`;
  const cardsData = useMemo(
    () =>
      goals.map((goal) => {
        if (!goal) return null;
        return {
          key: goal._id,
          headerMeduim: goal.Name,
          content: <GoalContent goal={goal} />,
          footer: (
            <Button to={`${routesConsts.GOAL_DETAILS}goal._id`}>EDIT</Button>
          )
        };
      }),
    [goals]
  );
  return (
    <div className={classes.GoalList}>
      <ErrorModal error={error} onClear={clearError} />
      <h2>{goalsCountDisplay}</h2>
      <CardList cardsData={cardsData} />
    </div>
  );
};

export default GoalList;
