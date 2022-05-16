import React, { useMemo } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Home from './screens/home/page/Home';
import Auth from './screens/auth/page/Auth';
import GoalList from './screens/goalList/page/GoalList';
import GoalDetails from './screens/goalDetails/GoalDetails';
import * as routesConsts from './shared/httpRequests/routes';
import classes from './App.module.scss';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  const routes = useMemo(() => {
    return (
      (token && (
        <Routes>
          <Route path={routesConsts.HOME} element={<Home />} exact />
          <Route path={routesConsts.GOAL_LIST} element={<GoalList />} exact />
          <Route path={routesConsts.GOAL_DETAILS} element={<GoalDetails />} />
          <Route
            path="*"
            element={<Navigate replace to={routesConsts.HOME} />}
          />
        </Routes>
      )) || (
        <Routes>
          <Route path="/login" element={<Auth />} exact />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )
    );
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <div className={classes.App}>
        <BrowserRouter>
          <MainNavigation />
          <main
            className={`${classes.App_main} ${
              !!token && classes.App_main___loggedin
            }`}
          >
            {routes}
          </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
