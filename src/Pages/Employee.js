import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getEmployees, deleteEmployee } from "../redux/UserReducer";

import UserDetailsOffcanvas from "../Components/UserDetailOffcanvas";

function Employee({ isEditMode, totalUsersInTable }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  // const sortedList=(userList).sort((a,b) => b.post_added.localeCompare(a.post_added))
  const users = userList.users;
  const [show, setShow] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [viewedUser, setViewedUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [tableData, setTableData] = useState([]);

  const openOffcanvas = (user) => {
    setShowOffcanvas(true);
    setViewedUser(user);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setCurrentUserId(id);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await dispatch(deleteEmployee(id));
      await dispatch(getEmployees());
      show && setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //   let tempUsers = [];
  //   if (!isEditMode) {
  //     tempUsers = [...userList.users];
  //   } else {
  //     tempUsers = [...userList.users];
  //   }
  //   setTableData(tempUsers);

  //   totalUsersInTable > 0
  //     ? setTotalUsers(totalUsersInTable)
  //     : setTotalUsers(tempUsers.length);
  // }, [userList.users]);

  useEffect(() => {
    console.log("total employee", totalUsersInTable);
    totalUsersInTable > 0
      ? setTotalUsers(totalUsersInTable)
      : setTotalUsers(userList.users.length);
  }, [userList.users]);

  return (
    <div className="container">
      {isEditMode && (
        <>
          <div className="employee-header text-center display-6 mb-4">
            Employees
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
        </>
      )}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr className="text-center">
            <th>S.N</th>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Phoneno</th>
            <th>Designation</th>
            {/* <th>Current Team</th> */}
            {isEditMode && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {userList.users.map((user, index) => (
            <>
              {index < totalUsers && (
                <tr key={index} className="text-center">
                  <td>{index + 1} </td>
                  {/* <td>{user.id}</td> */}
                  <td>{user.firstname + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.jobPosition}</td>
                  {isEditMode && (
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        style={{
                          backgroundColor: "rgb(225 243 225)",
                          borderColor: "#34c134",
                        }}
                        // onClick={() => handleShowViewModal(user)}
                        onClick={() => openOffcanvas(user)}
                      >
                        <FaEye style={{ color: "#34c134" }} />
                      </Button>

                      <Button
                        variant="warning"
                        size="sm"
                        className="ms-2"
                        style={{
                          backgroundColor: "#e0e6ef",
                          borderColor: " #34acdd",
                        }}
                        onClick={() => navigate(`/edit/${user.id}`)}
                        id="navigate"
                      >
                        <FaEdit
                          style={{ color: "#34acdd" }}
                          className="faedit"
                        />
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        style={{
                          backgroundColor: "#f5e9e9",
                          borderColor: "red",
                        }}
                        className="ms-2"
                        onClick={() => {
                          handleShow(user.id);
                        }}
                      >
                        <FaTrash style={{ color: "red" }} className="Fatrash" />
                      </Button>
                    </td>
                  )}
                </tr>
              )}
            </>
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
              onClick={() => {
                handleConfirmDelete(currentUserId);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <UserDetailsOffcanvas
          show={showOffcanvas}
          onHide={closeOffcanvas}
          viewedUser={viewedUser}
          navigate={navigate}
        />
      </table>
    </div>
  );
}

export default Employee;
