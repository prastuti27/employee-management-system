// import React, { createElement, useCallback, useEffect } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addTeam } from "../redux/TeamReducer";
// import Validation from "./Validation";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   ListItemText,
//   Typography,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";

// const AddTeam = () => {
//   const [values, setValues] = useState({
//     teamName: "",
//     teamLeader: "",
//     teamProject: "",
//     teamMembers: [],
//     dateAssigned: "",
//     activityStatus: "",
//   });
//   const [checked, setChecked] = useState(false);

//   const [totalTeamMembers, setTotalTeamMembers] = useState([]);
//   const [errors, setErrors] = useState({});
//   const teams = useSelector((state) => state.teams);
//   const users = useSelector((state) => state.users);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxTeamMember = useCallback(
//     (event) => {
//       const { value } = event.target;
//       console.log("value target", value);
//       setValues((prevValues) => ({
//         ...prevValues,
//         teamMembers: value,
//       }));
//       setTotalTeamMembers(value);
//     },
//     [setTotalTeamMembers]
//   );

//   const handleValidation = (event) => {
//     event.preventDefault();
//     const validationErrors = Validation(values, "team");

//     console.log("value from validate", values, validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       const id = teams.length + 1;

//       dispatch(addTeam({ id, ...values }));

//       navigate("/team");
//     }
//   };

//   const handleValidationOnBlur = (name, value) => {
//     const validationErrors = Validation({ ...values, [name]: value }, "team");
//     setErrors({ ...errors, [name]: validationErrors[name] });
//   };

//   const getSelectValues = (select) => {
//     var result = [];
//     var options = select && select.options;
//     var opt;

//     for (var i = 0, iLen = options.length; i < iLen; i++) {
//       opt = options[i];

//       if (opt.selected) {
//         result.push(opt.value || opt.text);
//       }
//     }
//     return result;
//   };

//   const handleCheckboxChange = (userName, e) => {
//     const updatedTeamMembers = e.target
//       ? [...values.teamMembers, userName]
//       : values.teamMembers.filter((member) => member !== userName);

//     setValues((prevValues) => ({
//       ...prevValues,
//       teamMembers: updatedTeamMembers,
//     }));
//     // console.log("checked", teamOfMember);
//   };

//   return (
//     <div className="container mt-4">
//       <form onSubmit={handleValidation}>
//         <h1>Add Team</h1>

//         <div className="row ">
//           <div className="col-md-4  mt-5 ">
//             <h3 className="text-center ">Basic Information</h3>
//           </div>
//           <div className="col-md-4">
//             <div className="form-group">
//               <label htmlFor="teamName">Team Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="teamName"
//                 name="teamName"
//                 placeholder="Enter Team's Name"
//                 onBlur={(event) =>
//                   handleValidationOnBlur(event.target.name, event.target.value)
//                 }
//                 value={values.teamName}
//                 onChange={handleInput}
//               />
//               {errors.teamName && (
//                 <small>
//                   <span style={{ color: "red", fontSize: "0.9em" }}>
//                     {errors.teamName}
//                   </span>
//                 </small>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="teamLeader">Team Leader</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="teamLeader"
//                 name="teamLeader"
//                 placeholder="Enter Team's Leader"
//                 onBlur={(event) =>
//                   handleValidationOnBlur(event.target.name, event.target.value)
//                 }
//                 value={values.teamLeader}
//                 onChange={handleInput}
//               />
//               {errors.teamLeader && (
//                 <small>
//                   <span style={{ color: "red", fontSize: "0.9em" }}>
//                     {errors.teamLeader}
//                   </span>
//                 </small>
//               )}
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="form-group">
//               <label htmlFor="teamProject">Team Project </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="teamProject"
//                 name="teamProject"
//                 placeholder="Enter Team's Project"
//                 onBlur={(event) =>
//                   handleValidationOnBlur(event.target.name, event.target.value)
//                 }
//                 value={values.teamProject}
//                 onChange={handleInput}
//               />
//               {errors.teamProject && (
//                 <small>
//                   <span style={{ color: "red", fontSize: "0.9em" }}>
//                     {errors.teamProject}
//                   </span>
//                 </small>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-4 mt-5">
//             <h3 className="text-center">Members</h3>
//           </div>
//           <div className="col-md-8">
//             <label htmlFor="teamMembers" className="scrollMultipleOption">
//               Team Members
//             </label>
//             <div className="members_box">
//               <div className="form-group col-md-6">
//                 <FormControl variant="standard" style={{ width: "98%" }}>
//                   <InputLabel id="team-member-label">
//                     Select Team Members{" "}
//                   </InputLabel>
//                   <Select
//                     labelId="team-member-label"
//                     size="small"
//                     multiple
//                     value={totalTeamMembers}
//                     renderValue={(selected) => selected.join(", ")}
//                     onChange={handleCheckboxTeamMember}
//                     label="Select Team Members"
//                     MenuProps={{
//                       classes: { paper: "scroll-bar-teams" },
//                       PaperProps: {
//                         style: {
//                           maxHeight: "300px",
//                           width: "255px",
//                           overflowX: "auto",
//                         },
//                       },
//                     }}
//                   >
//                     {users.map((option) => (
//                       <MenuItem
//                         key={option.id}
//                         value={option.firstname + " " + option.lastName}
//                       >
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               size="8px"
//                               checked={totalTeamMembers.includes(
//                                 option.firstname + " " + option.lastName
//                               )}
//                             />
//                           }
//                           label={
//                             <ListItemText
//                               primary={
//                                 <Typography
//                                   variant="body2"
//                                   style={{ fontSize: "14px" }}
//                                 >
//                                   {option.firstname + " " + option.lastName}
//                                 </Typography>
//                               }
//                             />
//                           }
//                           htmlFor={`members_box-${option.id}`}
//                         />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 {errors.teamMembers && (
//                   <small>
//                     <span style={{ color: "red", fontSize: "0.9em" }}>
//                       {errors.teamMembers}
//                     </span>
//                   </small>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row  mt-5 ">
//           <div className="col-md-4  mt-5 ">
//             <h3 className="text-center ">Project Activity</h3>
//           </div>
//           <div className="col-md-4">
//             <div className="form-group">
//               <label htmlFor="dateAssigned">Date Assigned</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="dateAssigned"
//                 name="dateAssigned"
//                 placeholder="Assigned date"
//                 onBlur={(event) =>
//                   handleValidationOnBlur(event.target.name, event.target.value)
//                 }
//                 value={values.dateAssigned}
//                 onChange={handleInput}
//               />
//               {errors.dateAssigned && (
//                 <small>
//                   <span style={{ color: "red", fontSize: "0.9em" }}>
//                     {errors.dateAssigned}
//                   </span>
//                 </small>
//               )}
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="form-group">
//               <label htmlFor="activityStatus">Activity Status </label>
//               <select
//                 className="form-control"
//                 id="activityStatus"
//                 name="activityStatus"
//                 onBlur={(event) =>
//                   handleValidationOnBlur(event.target.name, event.target.value)
//                 }
//                 value={values.activityStatus}
//                 onChange={handleInput}
//               >
//                 <option value="">Select Status </option>
//                 <option value="ongoing">Ongoing</option>
//                 <option value="complete">Complete</option>
//               </select>
//               {errors.activityStatus && (
//                 <small>
//                   <span style={{ color: "red", fontSize: "0.9em" }}>
//                     {errors.activityStatus}
//                   </span>
//                 </small>
//               )}
//             </div>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-success mt-3 p-2 ">
//           Save Team
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTeam;

import React from "react";
import TeamForm from "./TeamForm";

const AddNewTeamPage = () => {
  return (
    <div>
      <TeamForm />
    </div>
  );
};

export default AddNewTeamPage;
