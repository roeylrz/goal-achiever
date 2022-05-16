import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import classes from './Input.module.scss';

const CHANGE = 'change';
const TOUCH = 'touch';

const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case TOUCH: {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = ({
  id,
  type,
  placeholder,
  label,
  errorText,
  element,
  initialValid,
  initialValue,
  onInput,
  validators = [],
  rows = 3
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false
  });

  useEffect(() => {
    if (onInput) {
      onInput(id, inputState.value, inputState.isValid);
    }
  }, [id, onInput, inputState.value, inputState.isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: CHANGE,
      val: event.target.value,
      validators: validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: TOUCH
    });
  };

  const isInputValid = !inputState.isValid && inputState.isTouched;

  const selectedElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${classes.Input} ${isInputValid && classes.Input_invalid}`}
    >
      <label htmlFor={id}>{label}</label>
      {selectedElement}
      {isInputValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
