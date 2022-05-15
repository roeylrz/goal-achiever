import MainNavigation from './shared/components/Navigation/MainNavigation';
import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.App}>
      <MainNavigation />
      <main className={classes.App_main}>Created react app !</main>
    </div>
  );
};

export default App;
