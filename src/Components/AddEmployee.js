/*import { FaUserCircle, FaUpload } from "react-icons/fa";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import Validation from "./Validation";

function Employee() {
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
  });

  const [errors, setErrors] = useState(true);
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  }

  const users = useSelector((state) => state.users);

  const [dpImage, setDPImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleValidation(event) {
    event.preventDefault();
    console.log("validation", values);
    const validationErrors = Validation(values);

    setErrors(validationErrors);
    // console.log("selecteddddd", selectedFile);
    if (Object.keys(validationErrors).length === 0) {
      const id = users.length + 1;
      // Decode the Base64 string and show result just to make sure that everything is OK
      dispatch(addUser({ id, ...values, selectedFile: dpImage }));

      navigate("/employee");
    }
  }

  function handleValidationOnBlur(name, value) {
    console.log("value", name, value);
    const validationErrors = Validation({ ...values, [name]: value });

    setErrors({ ...errors, [name]: validationErrors[name] });
  }

  const handleUploadFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("FILEEE IMAGE", file);

    const image = await convertBase64(file);
    setDPImage(image);
    console.log("dp image:::::", image);
  };

  function convertBase64(file) {
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
  }

  function handleValidationEmail(event) {}
  return (
    <div className=" container mt-4">
      <form onSubmit={handleValidation}>
        <div className="row mb-5">
          <div className="col-md-3 text-center">
            <h1>Add Employee</h1>
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "#f1f1f1",
                marginLeft: "70px",
              }}
            >
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
              <label htmlFor="firstname">First Name</label>
              <input
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter First Name"
                // onChange={(e) => setFirstName(e.target.value)}
                onChange={handleInput}
              />
              {errors.firstname && (
                <p style={{ color: "red" }}>{errors.firstname}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                onChange={handleInput}
              />
              {errors.birthDate && (
                <p style={{ color: "red" }}>{errors.birthDate}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
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
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                className="form-control"
                id="gender"
                name="gender"
                onChange={handleInput}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
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
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address}</p>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
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
              />
              {errors.lastName && (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
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
              />
              {errors.phoneNo && (
                <p style={{ color: "red" }}>{errors.phoneNo}</p>
              )}
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
              <h3 className=" text-center">Jobs</h3>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="jobPosition">Job Position</label>
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
                />
                {errors.jobPosition && (
                  <p style={{ color: "red" }}>{errors.jobPosition}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="team">Team</label>
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
                />
                {errors.team && <p style={{ color: "red" }}>{errors.team}</p>}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3 p-2 ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Employee;
*/
import React from "react";
import EmployeeForm from "./EmployeeForm";

const AddEmployee = () => {
  return (
    <>
      <h1>Add Employee</h1>
      <div>
        <EmployeeForm editMode={false} />
      </div>
    </>
  );
};

export default AddEmployee;
