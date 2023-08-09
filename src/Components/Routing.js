import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Employee from "../Pages/Employee";
import Teams from "../Pages/Teams";
import Project from "../Pages/Project";
import AddEmployee from "../Components/AddEmployee";
import Update from "./Update";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/employee" element={<Employee />}></Route>
      <Route path="/project" element={<Project />}></Route>
      <Route path="/team" element={<Teams />}></Route>
      <Route path="/AddEmployee" element={<AddEmployee />}></Route>
      <Route path="/edit/:id" element={<Update />}></Route>
    </Routes>
  );
}
export default Routing;
