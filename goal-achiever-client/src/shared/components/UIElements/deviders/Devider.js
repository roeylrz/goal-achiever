import React from 'react';
import classes from './Devider.module.scss';

const Devider = ({ isHorizontal }) => {
  return (
    <div
      className={`${classes.Devider} ${
        isHorizontal && classes.Devider_horizontal
      }`}
    />
  );
};

export default Devider;
