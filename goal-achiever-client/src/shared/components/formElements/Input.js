import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import classes from './Input.module.scss';

const CHANGE = 'change';
const TOUCH = 'touch';
const UPDATE_INITIAL_VALUE = 'updateInitialValue';

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
    case UPDATE_INITIAL_VALUE: {
      return {
        ...state,
        value: action.val
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
  rows = 3,
  checked
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

  useEffect(() => {
    if (initialValue) {
      dispatch({
        type: UPDATE_INITIAL_VALUE,
        val: initialValue
      });
    }
  }, [initialValue, dispatch]);

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
        placeholder={errorText && isInputValid ? errorText : placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        checked={checked}
      />
    ) : (
      <textarea
        id={id}
        placeholder={errorText && isInputValid ? errorText : placeholder}
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
    </div>
  );
};

export default Input;
