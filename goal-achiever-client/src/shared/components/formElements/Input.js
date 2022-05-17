import React from 'react';
import moment from 'moment';
import classes from './Input.module.scss';

const Input = ({
  id,
  type,
  placeholder,
  label,
  value,
  element,
  onChange,
  onClick,
  rows = 3,
  checked,
  required
}) => {
  let min = 0;
  let updateValue = value;
  if (type === 'date') {
    min = moment(new Date()).format('yyy-MM-DD');
    if (value) updateValue = moment(value).format('yyy-MM-DD');
  }
  const selectedElement =
    element === 'input' ? (
      <input
        onClick={onClick}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={updateValue}
        checked={checked}
        min={min}
      />
    ) : (
      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        value={value}
      />
    );

  return (
    <div className={`${classes.Input} ${required && classes.Input_require}`}>
      <label htmlFor={id}>{label}</label>
      {selectedElement}
    </div>
  );
};

export default Input;
