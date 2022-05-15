import React, { Fragment } from 'react';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  return (
    <Fragment>
      <MainHeader>
        <h2>Goal Achiever</h2>
        <div>Logout</div>
      </MainHeader>
      <SideDrawer></SideDrawer>
    </Fragment>
  );
};

export default MainNavigation;
