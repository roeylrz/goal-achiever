import React from 'react';
import Devider from '../deviders/Devider';
import classes from './Card.module.scss';

const Card = ({ headerLarge, headerMeduim, children }) => {
  return (
    <div className={classes.Card}>
      {headerLarge && <h1 className={classes.Card_header}>{headerLarge}</h1>}
      {headerMeduim && <h3 className={classes.Card_header}>{headerMeduim}</h3>}
      <div className={classes.Card_main}>
        <Devider isHorizontal={true} />
        {children}
      </div>
    </div>
  );
};

export default Card;
