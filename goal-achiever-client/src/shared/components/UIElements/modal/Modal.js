import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import classes from './Modal.module.scss';

const ModalOverlay = ({
  show,
  header,
  footer,
  children,
  onSubmit,
  onCancel
}) => {
  const content = (
    <React.Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <div className={`${classes.Modal} ${!show && classes.Modal_hide}`}>
        <header className={classes.Modal_header}>
          <h2>{header}</h2>
        </header>
        <form
          onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}
        >
          <div className={classes.Modal_content}>{children}</div>
          <footer className={classes.Modal_footer}>{footer}</footer>
        </form>
      </div>
    </React.Fragment>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default ModalOverlay;
