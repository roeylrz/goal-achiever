import React from 'react';
import classes from './SideDrawer.module.scss';

const SideDrawer = ({ children }) => {
  return <div className={classes.SideDrawer}>{children}</div>;
};

export default SideDrawer;
