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
