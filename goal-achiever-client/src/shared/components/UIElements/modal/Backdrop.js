import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.scss';

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={classes.Backdrop} onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
