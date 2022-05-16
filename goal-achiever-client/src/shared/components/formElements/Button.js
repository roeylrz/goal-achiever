import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.scss';

const Button = ({
  disabled,
  to = null,
  main = false,
  onClick = null,
  type = 'button',
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
      <Link to={to} exact className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={className}
      onClick={onButtonClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
