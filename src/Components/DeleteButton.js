import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ onDelete }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirmDelete = () => {
    onDelete();
    setShow(false);
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        style={{ backgroundColor: "#f5e9e9", borderColor: "red" }}
        className="ms-2"
        onClick={handleShow}
      >
        <FaTrash style={{ color: "red" }} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="modal d-flex align-items-center justify-content-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this team?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
