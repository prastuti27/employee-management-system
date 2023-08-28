import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeam, updateTeam } from "../redux/TeamReducer";
import Validation from "./Validation";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const TeamForm = ({ editMode, teamData }) => {
  const [values, setValues] = useState({
    teamName: editMode ? teamData.teamName : "",
    teamLeader: editMode ? teamData.teamLeader : "",
    teamProject: editMode ? teamData.teamProject : "",
    teamMembers: editMode ? teamData.teamMembers : [],
    dateAssigned: editMode ? teamData.dateAssigned : "",
    activityStatus: editMode ? teamData.activityStatus : "",
  });
  const teams = useSelector((state) => state.teams);
  const users = useSelector((state) => state.users);
  const [showPresentTeamMembers, setShowPresentTeamMembers] = useState(users);
  const [checked, setChecked] = useState(false);

  const [totalTeamMembers, setTotalTeamMembers] = useState(
    editMode ? teamData.teamMembers : []
  );
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);

  const handleInput = (event) => {
    console.log("event", event.target, values);
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log("values from input", values);
  };
  const handleCheckboxTeamMember = useCallback(
    (event) => {
      const { value } = event.target;
      console.log("value target", value);
      setValues((prevValues) => ({
        ...prevValues,
        teamMembers: value,
      }));

      setTotalTeamMembers(value);
    },
    [setTotalTeamMembers]
  );

  const handleValidation = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values, "team");
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (editMode) {
        dispatch(updateTeam({ id: teamData.id, ...values }));
      } else {
        console.log("values", values);
        const id = teams.length + 1;
        const updatedAddTeam = { id, ...values };
        console.log("updatedTeam", updatedAddTeam);

        dispatch(addTeam(updatedAddTeam));
      }
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        navigate("/team");
      }, 1000);
    } else {
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 1000);
    }
  };
  const handleValidationOnBlur = (name, value) => {
    const validationErrors = Validation({ ...values, [name]: value }, "team");
    setErrors({ ...errors, [name]: validationErrors[name] });
  };
  useEffect(() => {
    if (editMode) {
      setValues({
        teamName: teamData.teamName,
        teamLeader: teamData.teamLeader,
        teamProject: teamData.teamProject,
        teamMembers: teamData.teamMembers,
        dateAssigned: teamData.dateAssigned,
        activityStatus: teamData.activityStatus,
      });
    }
  }, [editMode, teamData]);

  const getSelectValues = (select) => {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  };

  const handleCheckboxChange = (userName, e) => {
    const updatedTeamMembers = e.target
      ? [...values.teamMembers, userName]
      : values.teamMembers.filter((member) => member !== userName);

    setValues((prevValues) => ({
      ...prevValues,
      teamMembers: updatedTeamMembers,
    }));
    // console.log("checked", teamOfMember);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleValidation}>
        <h1>{editMode ? "Edit Team" : "Add Team"}</h1>
        <div className="row mt-4 ">
          <div className="col-md-4  mt-5 ">
            <h3 className="text-center ">Basic Information</h3>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="teamName">
                Team Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="teamName"
                name="teamName"
                placeholder="Enter Team's Name"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                value={values.teamName}
                onChange={handleInput}
              />
              {errors.teamName && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.teamName}
                  </span>
                </small>
              )}
            </div>

            <div className="form-group mt-4">
              <label htmlFor="teamLeader">
                Team Leader <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="teamLeader"
                name="teamLeader"
                placeholder="Enter Team's Leader"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                value={values.teamLeader}
                onChange={handleInput}
              />
              {errors.teamLeader && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.teamLeader}
                  </span>
                </small>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="teamProject">
                Team Project <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="teamProject"
                name="teamProject"
                placeholder="Enter Team's Project"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                value={values.teamProject}
                onChange={handleInput}
              />
              {errors.teamProject && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.teamProject}
                  </span>
                </small>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4 mt-5">
            <h3 className="text-center">Members</h3>
          </div>
          <div className="col-md-8">
            <label htmlFor="teamMembers" className="scrollMultipleOption">
              Team Members <span style={{ color: "red" }}>*</span>
            </label>
            <div className="members_box">
              <div className="form-group col-md-6">
                <FormControl variant="standard" style={{ width: "98%" }}>
                  <InputLabel id="team-member-label">
                    Select Team Members{" "}
                  </InputLabel>
                  <Select
                    labelId="team-member-label"
                    size="small"
                    multiple
                    value={totalTeamMembers}
                    renderValue={(selected) => selected.join(", ")}
                    onChange={handleCheckboxTeamMember}
                    label="Select Team Members"
                    MenuProps={{
                      classes: { paper: "scroll-bar-teams" },
                      PaperProps: {
                        style: {
                          maxHeight: "300px",
                          width: "255px",
                          overflowX: "auto",
                        },
                      },
                    }}
                  >
                    {users.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.firstname + " " + option.lastName}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="8px"
                              checked={totalTeamMembers.includes(
                                option.firstname + " " + option.lastName
                              )}
                            />
                          }
                          label={
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  style={{ fontSize: "14px" }}
                                >
                                  {option.firstname + " " + option.lastName}
                                </Typography>
                              }
                            />
                          }
                          htmlFor={`members_box-${option.id}`}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {errors.teamMembers && (
                  <small>
                    <span style={{ color: "red", fontSize: "0.9em" }}>
                      {errors.teamMembers}
                    </span>
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row  mt-5 ">
          <div className="col-md-4  mt-4 ">
            <h3 className="text-center ">Project Activity</h3>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="dateAssigned">
                Date Assigned <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="dateAssigned"
                name="dateAssigned"
                placeholder="Assigned date"
                onBlur={(event) => {
                  console.log("event from date", event.target);
                  handleValidationOnBlur(event.target.name, event.target.value);
                }}
                value={values.dateAssigned}
                onChange={handleInput}
              />
              {errors.dateAssigned && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.dateAssigned}
                  </span>
                </small>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="activityStatus">
                Activity Status <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                id="activityStatus"
                name="activityStatus"
                onBlur={(event) =>
                  handleValidationOnBlur(event.target.name, event.target.value)
                }
                value={values.activityStatus}
                onChange={handleInput}
              >
                <option value="">
                  Select Status<span style={{ color: "red" }}>*</span>{" "}
                </option>
                <option value="ongoing">Ongoing</option>
                <option value="complete">Complete</option>
              </select>
              {errors.activityStatus && (
                <small>
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.activityStatus}
                  </span>
                </small>
              )}
            </div>
          </div>

          <small className="mt-4">
            <span style={{ color: "red" }}>*</span>denotes a required field
          </small>
        </div>

        <button type="submit" className="btn btn-success  mt-3 p-2">
          {editMode ? "Update Team" : "Save Team"}
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
      </form>
    </div>
  );
};

export default TeamForm;
