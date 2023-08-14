import React, { useState } from "react";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.find((user) => user.id === Number(id));
  console.log("USERS:::", users);
  console.log("Existing user::", existingUser, "id", id);
  const [values, setValues] = useState(existingUser);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        id,
        firstname: values.firstname,
        lastName: values.lastName,
        email: values.email,
        phoneNo: values.phoneNo,
        address: values.address,
        birthDate: values.birthDate,
        jobPosition: values.jobPosition,
        team: values.team,
        gender: values.gender,
      })
    );
    navigate("/employee");
  };

  // Rest of your component logic for handling updates
  return (
    <div className=" container mt-4">
      <EmployeeForm initialValues={existingUser} editMode={true} />
      {/* <form onSubmit={handleUpdate}>
        <div className="row mb-5">
          <div className="col-md-3 text-center">
            <h1>Edit Employee</h1>
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "#f1f1f1",
                marginLeft: "70px",
              }}
            >
              {values.selectedFile ? (
                <img
                  src={values.selectedFile}
                  alt="Uploaded"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <FaUserCircle size={80} style={{ margin: "35px" }} />
              )}
            </div>
          </div>
          <div className="col-md-2 mt-5">
            <div className="form-group">
              <label htmlFor="photo">Profile Image</label>
              <label
                htmlFor="upload-photo"
                className="btn btn-primary btn-block"
              >
                <FaUpload className="mr-1" /> Update Profile
                <input
                  type="file"
                  id="upload-photo"
                  name="photo"
                  className="form-control-file"
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-3">
            <h3 className="text-center">Basic Information</h3>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter First Name"
                value={values.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                value={values.birthDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email Address"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="MiddleName">Middle Name</label>
              <input
                type="text"
                className="form-control"
                id="MiddleName"
                name="MiddleName"
                placeholder="Enter Middle Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter Phone Number"
                value={values.phoneNo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="row justify-content-start">
            <div className="col-md-3">
              {" "}
              <h3 className=" text-center ">Working Hours</h3>
            </div>

            <div className="col-md-3">
              <label htmlFor="startTime">Start From</label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                name="startTime"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="endTime">Ends In</label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                name="endTime"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row justify-content-start">
            <div className="col-md-3">
              <h3 className=" text-center ">Jobs</h3>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="jobPosition">Job Position</label>
                <input
                  type="text"
                  className="form-control"
                  id="jobPosition"
                  name="jobPosition"
                  placeholder="Enter Job Position"
                  value={values.jobPosition}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="team">Team</label>
                <input
                  type="text"
                  className="form-control"
                  id="team"
                  name="team"
                  placeholder="Choose Team"
                  value={values.team}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3 p-2 ">
          Save & Update
        </button>
      </form> */}
    </div>
  );
};

export default Update;
