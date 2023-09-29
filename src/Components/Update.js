import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee, getEmployees } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";

const Update = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const users = useSelector((state) => state.users).users;
  const existingUser = users.find((user) => user.id === id);
  console.log("USERS:::", users);
  console.log("Existing user::", existingUser, "id", id);
  const [values, setValues] = useState(existingUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Rest of your component logic for handling updates
  return (
    <div className=" container mt-4">
      <EmployeeForm initialValues={existingUser} editMode={true} />
    </div>
  );
};

export default Update;
