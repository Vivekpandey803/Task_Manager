import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddNewItemModal = ({ show, onClose, onSave, title, formData, onChange, formFields = [] }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {formFields.map((field, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={onChange}
                placeholder={field.placeholder}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={onSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewItemModal;
