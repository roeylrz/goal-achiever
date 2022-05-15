import React, { useMemo } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './screens/auth/page/Auth';
import classes from './App.module.scss';

const App = () => {
  const routes = useMemo(() => {
    return (
      <Routes>
        <Route path="/login" element={<Auth />} exact />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }, []);
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <MainNavigation />
        <main className={`${classes.App_main}`}>{routes}</main>
      </BrowserRouter>
    </div>
  );
};

export default App;
