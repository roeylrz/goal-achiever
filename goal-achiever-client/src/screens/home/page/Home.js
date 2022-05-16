import React, { useMemo } from 'react';
import useHome from '../hooks/home-hook';
import StepsContent from '../components/StepsContent';
import Footer from '../components/Footer';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import CardList from '../../../shared/components/UIElements/card/CardList';
import classes from './Home.module.scss';

const Home = () => {
  const { goalsWithNextSteps, error, clearError, completeStep } = useHome();
  const goalsCountDisplay = `${goalsWithNextSteps.length} Active Goals`;
  const cardsData = useMemo(
    () =>
      goalsWithNextSteps.map((goal) => {
        if (!goal) return null;
        return {
          key: goal._id,
          headerMeduim: goal.Name,
          content: <StepsContent nextStep={goal.Steps[0]} />,
          footer: (
            <Footer
              completeStepHandler={() => completeStep(goal.Steps[0]._id)}
            />
          )
        };
      }),
    [goalsWithNextSteps, completeStep]
  );
  return (
    <div className={classes.Home}>
      <ErrorModal error={error} onClear={clearError} />
      <h2>{goalsCountDisplay}</h2>
      <CardList cardsData={cardsData} />
    </div>
  );
};

export default Home;
