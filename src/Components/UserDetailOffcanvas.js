import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Offcanvas, Button } from "react-bootstrap";

function UserDetailsOffcanvas({ show, onHide, viewedUser, navigate }) {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      aria-labelledby="offcanvasRightLabel"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasRightLabel">
          <h2>Employee Details</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {viewedUser && (
          <div>
            <div>
              {viewedUser.selectedFile ? (
                <img
                  src={viewedUser.selectedFile}
                  alt="Uploaded"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <FaUserCircle size={120} style={{ margin: "35px" }} />
              )}
            </div>
            <strong>
              <h3>
                {viewedUser.firstname} {viewedUser.lastName}
              </h3>
            </strong>
            <p> {viewedUser.email}</p>
            <p> Contact No.: {viewedUser.phoneNo}</p>
            <p> Team: {viewedUser.team}</p>
            <p> Address : {viewedUser.address}</p>
            <p> Designation : {viewedUser.jobPosition}</p>
            {/* Display other details as needed */}
            <Button
              variant="warning"
              size="sm"
              className="mr-2"
              onClick={() => navigate(`/edit/${viewedUser.id}`)}
              id="navigate"
            >
              Edit details
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default UserDetailsOffcanvas;
