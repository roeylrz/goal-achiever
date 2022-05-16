import React, { useMemo } from 'react';
import Modal from './Modal';
import Button from '../../formElements/Button';

const ErrorModal = ({ error, onClear }) => {
  const extructErrors = useMemo(() => {
    if (error && Array.isArray(error)) {
      return (
        <ul style={{ listStyleType: 'none' }}>
          {error.map((error) => {
            const errorMessage = error.message ? error.message : error;
            return (
              <li style={{ margin: '10px 0' }} key={errorMessage}>
                {errorMessage}
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  }, [error]);
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{extructErrors}</p>
    </Modal>
  );
};

export default ErrorModal;
