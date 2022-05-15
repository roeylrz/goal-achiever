import React from 'react';
import classes from './Card.module.scss';

const Card = ({ header, footer, children }) => {
  return (
    <div className={classes.Card}>
      {header && <h3 className={classes.Card_header}>{header}</h3>}
      <div className={classes.Card_main}>{children}</div>
      {footer && <div className={classes.Card_footer}>{footer}</div>}
    </div>
  );
};

export default Card;
