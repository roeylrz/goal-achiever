import React, { useMemo } from 'react';
import useGoalList from '../hooks/goal-list-hook';
import GoalContent from '../components/GoalContent';
import CardList from '../../../shared/components/UIElements/card/CardList';
import classes from './GoalList.module.scss';

const GoalList = () => {
  const { goals } = useGoalList();
  const goalsCountDisplay = `${goals.length} Goals`;
  const cardsData = useMemo(
    () =>
      goals.map((goal) => {
        if (!goal) return null;
        return {
          key: goal._id,
          headerMeduim: goal.Name,
          content: <GoalContent goal={goal} />
        };
      }),
    [goals]
  );
  return (
    <div className={classes.GoalList}>
      <h2>{goalsCountDisplay}</h2>
      <CardList cardsData={cardsData} />
    </div>
  );
};

export default GoalList;
