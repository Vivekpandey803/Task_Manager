import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer as BootstrapToastContainer } from 'react-bootstrap';

const ToastContainer = ({ showToast, message, type, onClose }) => {
  const [show, setShow] = useState(showToast);


  useEffect(() => {
    setShow(showToast);
  }, [showToast]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  return (
    <BootstrapToastContainer position="top-center" className="p-2 m-2 text-center ">
      <Toast show={show} onClose={handleClose} bg={type === 'success' ? 'success' : 'danger'} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </BootstrapToastContainer>
  );
};

export default ToastContainer;
