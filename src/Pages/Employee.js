import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/UserReducer";
import { FaUserCircle } from "react-icons/fa";

function Employee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentViewUserDetail, setCurrentViewUserDetail] = useState();

  const [viewedUser, setViewedUser] = useState(null); // Store the selected user

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewedUser(null); // Reset the viewed user when the modal is closed
  };

  const handleShowViewModal = (user) => {
    setShowViewModal(true);
    setViewedUser(user); // Store the selected user when "View" button is clicked
  };

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setCurrentUserId(id);
  };

  const handleConfirmDelete = (id) => {
    dispatch(deleteUser({ id: id }));
    show && setShow(false);
  };
  console.log("userOfId", users);

  return (
    <div className="container">
      <div className="employee-header text-center display-3 mb-4">
        Manage Employees
      </div>
      <div className="text-end mb-4">
        <Button
          onClick={() => navigate("/AddEmployee")}
          id="navigate"
          variant="primary"
        >
          + Add Employee
        </Button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>S.N</th>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Phoneno</th>
            <th>Designation</th>
            <th>Current Team</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {/* <td>{user.id}</td> */}
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>{user.phoneNo}</td>
              <td>{user.jobPosition}</td>
              <td>{user.team}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleShowViewModal(user)}
                >
                  <FaEye />
                </Button>

                <Button
                  variant="warning"
                  size="sm"
                  className="mr-2"
                  onClick={() => navigate(`/edit/${user.id}`)}
                  id="navigate"
                >
                  <FaEdit />
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShow(Number(user.id))}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <Modal
          show={show}
          onHide={handleClose}
          className=" modal d-flex align-items-center justify-content-center"
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this employee?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleConfirmDelete(currentUserId)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showViewModal}
          onHide={handleCloseViewModal}
          className=" modal d-flex align-items-center justify-content-center"
        >
          <Modal.Header closeButton>
            <Modal.Title>View Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewedUser && (
              <div>
                <p>Email: {viewedUser.email}</p>
                <p>Phone: {viewedUser.phoneNo}</p>
                Display other details as needed
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </table>
    </div>
  );
}

export default Employee;
