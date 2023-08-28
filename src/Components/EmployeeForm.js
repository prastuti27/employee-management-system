import React, { useState, useEffect } from "react";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import Validation from "./Validation";

const EmployeeForm = ({ editMode, initialValues }) => {
  const [values, setValues] = useState({
    firstname: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    birthDate: "",
    jobPosition: "",
    team: "",
    gender: "",
    ...initialValues,
  });

  const [errors, setErrors] = useState({});
  const users = useSelector((state) => state.users);
  const [dpImage, setDPImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);

  useEffect(() => {
    //  console.log("editeee", editMode, initialValues, values);
    if (editMode) {
      console.log("user", initialValues);
      setValues(initialValues);
      setDPImage(initialValues.selectedFile);
    }
  }, [editMode, initialValues]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values, "user");
    console.log("return error", validationErrors);
    setErrors(validationErrors);
    console.log("Validating FORM", validationErrors, event, editMode);
    if (Object.keys(validationErrors).length === 0) {
      const id = users.length + 1;
      const action = editMode ? updateUser : addUser;
      dispatch(action({ id, ...values, selectedFile: dpImage }));

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        navigate("/employee");
      }, 1000);
    } else {
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 1000);
    }
  };

  const handleValidationOnBlur = (name, value) => {
    const validationErrors = Validation({ ...values, [name]: value }, "user");
    setErrors({ ...errors, [name]: validationErrors[name] });
  };

  const handleUploadFileChange = async (e) => {
    const file = e.target.files[0];
    const image = await convertBase64(file);
    setDPImage(image);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  function handleValidationEmail(event) {}

  return (
    <div className=" container mt-4">
      <form onSubmit={handleValidation}>
        <div className="row mb-5">
          <div className="col-md-3 text-center">
            <div>
              {dpImage ? (
                <img
                  src={dpImage}
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
                  onChange={(e) => handleUploadFileChange(e)}
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
              <label htmlFor="firstname">
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter First Name"
                value={values.firstname}
                // onChange={(e) => setFirstName(e.target.value)}
                onChange={handleInput}
              />
              {errors.firstname && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.firstname}
                  </span>
                </small>
              )}
            </div>
            <div className="form-group mt-4">
              <label htmlFor="birthDate">
                Birth Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                value={values.birthDate}
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                onChange={handleInput}
              />
              {errors.birthDate && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.birthDate}
                  </span>
                </small>
              )}
            </div>
            <div className="form-group mt-4">
              <label htmlFor="email">
                Email Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={values.email}
                placeholder="Enter Email Address"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                onKeyDown={(e) => {
                  handleValidationEmail(e.target.value);
                  console.log("eventtt", e.target.value);
                }}
                onChange={handleInput}
              />
              {errors.email && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.email}
                  </span>
                </small>
              )}
            </div>
          </div>

          <div className="col-md-3 ">
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
            <div className="form-group mt-4">
              <label htmlFor="gender">
                Gender <span style={{ color: "red" }}>*</span>
              </label>
              <select
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                className="form-control"
                id="gender"
                name="gender"
                onChange={handleInput}
                value={values.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.gender}
                  </span>
                </small>
              )}
            </div>
            <div className="form-group mt-4">
              <label htmlFor="address ">
                Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                className="form-control"
                id="address"
                name="address"
                placeholder="Enter Address"
                onChange={handleInput}
                value={values.address}
              />
              {errors.address && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.address}
                  </span>
                </small>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                onChange={handleInput}
                value={values.lastName}
              />
              {errors.lastName && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.lastName}
                  </span>
                </small>
              )}
            </div>

            <div className="form-group mt-4">
              <label htmlFor="phoneNo">
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="tel"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter Phone Number"
                onChange={handleInput}
                value={values.phoneNo}
              />
              {errors.phoneNo && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.phoneNo}
                  </span>
                </small>
              )}
            </div>
          </div>
        </div>

        <div className="form-group mt-4">
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
        <div className="form-group mt-4">
          <div className="row justify-content-start">
            <div className="col-md-3">
              <h3 className=" text-center">Jobs</h3>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="jobPosition">
                  Job Position <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  onBlur={(event) =>
                    handleValidationOnBlur(
                      event.target.name,
                      event.target.value
                    )
                  }
                  type="text"
                  className="form-control"
                  id="jobPosition"
                  name="jobPosition"
                  placeholder="Enter Job Position"
                  onChange={handleInput}
                  value={values.jobPosition}
                />
                {errors.jobPosition && (
                  <small>
                    <span style={{ color: "red", fontSize: "0.9em" }}>
                      {errors.jobPosition}
                    </span>
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="form-group">
                <label htmlFor="team">
                  Team <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  onBlur={(event) =>
                    handleValidationOnBlur(
                      event.target.name,
                      event.target.value
                    )
                  }
                  type="text"
                  className="form-control"
                  id="team"
                  name="team"
                  placeholder="Choose Team"
                  // onChange={(e) => setTeam(e.target.value)}
                  onChange={handleInput}
                  value={values.team}
                />
                {errors.team && (
                  <small>
                    <span style={{ color: "red", fontSize: "0.9em" }}>
                      {errors.team}
                    </span>
                  </small>
                )}
              </div>
            </div>
          </div>
          <div>
            <small>
              <span style={{ color: "red" }}>*</span>denotes a required field
            </small>
          </div>
          <button type="submit" className="btn btn-success mt-3 p-2">
            {editMode ? "Update" : "Submit"}
          </button>
          {successAlert && (
            <div className="alert alert-success mt-3" role="alert">
              Team added successfully!
            </div>
          )}
          {failureAlert && (
            <div className="alert alert-danger mt-3" role="alert">
              Failed to add team. Please check the form fields.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
