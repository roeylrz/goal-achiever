import React from 'react';
import classes from './Card.module.scss';

const Card = ({ headerLarge, headerMeduim, footer, children }) => {
  return (
    <div className={classes.Card}>
      {headerLarge && <h1 className={classes.Card_header}>{headerLarge}</h1>}
      {headerMeduim && <h3 className={classes.Card_header}>{headerMeduim}</h3>}
      <div className={classes.Card_main}>{children}</div>
      {footer && <div className={classes.Card_footer}>{footer}</div>}
    </div>
  );
};

export default Card;
