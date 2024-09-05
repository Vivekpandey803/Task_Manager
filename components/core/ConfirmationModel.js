// // components/ConfirmationModal.js
// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const ConfirmationModal = ({ show, onConfirm, onCancel, title, message }) => {
//   return (
//     <Modal
//       show={show}
//       onHide={onCancel}
//       backdrop="static"
//       dialogClassName="modal-dialog-centered" // Center modal vertically
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>{title}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{message}</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onCancel}>No</Button>
//         <Button variant="primary" onClick={onConfirm}>Yes</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ConfirmationModal;
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, onConfirm, onCancel, title, message }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;

