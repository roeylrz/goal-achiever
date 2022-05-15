import React from 'react';
import classes from './Devider.module.scss';

const Devider = ({isHorizontal, noMargin = false, narrowMargin = false}) => {
  return (
    <div
      className={`${classes.Devider} ${isHorizontal && classes.Devider_horizontal} ${
        noMargin && classes.Devider_noMargin
      } ${narrowMargin && classes.Devider_narrowMargin}`}
    />
  );
};

export default Devider;
