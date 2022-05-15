import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.scss';

const Button = ({
  to = null,
  exact = true,
  main = false,
  onClick = null,
  children
}) => {
  const className = `${classes.Button} ${main && classes.Button_main}`;
  const onButtonClick = useCallback(
    (event) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );
  if (to) {
    return (
      <Link to={to} exact={exact} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button className={className} onClick={onButtonClick}>
      {children}
    </button>
  );
};

export default Button;
