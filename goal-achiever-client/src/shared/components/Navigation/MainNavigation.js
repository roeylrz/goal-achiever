import React, { Fragment, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/auth-context';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLinks';

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn, logout } = auth;
  const mainNavigation = useMemo(() => {
    return (
      <Fragment>
        <MainHeader>
          <h2>Goal Achiever</h2>
          {isLoggedIn && <label onClick={logout}>Logout</label>}
        </MainHeader>
        {isLoggedIn && (
          <SideDrawer>
            <NavLinks />
          </SideDrawer>
        )}
      </Fragment>
    );
  }, [isLoggedIn, logout]);

  return mainNavigation;
};

export default MainNavigation;
