import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Employee from "../Pages/Employee";
import Teams from "../Pages/Teams";
import Project from "../Pages/Project";
import AddEmployee from "../Components/AddEmployee";
import Update from "./Update";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";
import Login from "./Login";
import Signup from "./Signup";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route
        path="/employee"
        element={<Employee isEditMode={true} showRecentEmployees={false} />}
      ></Route>
      <Route path="/project" element={<Project />}></Route>
      <Route path="/team" element={<Teams />}></Route>
      <Route path="/AddEmployee" element={<AddEmployee />}></Route>
      <Route path="/edit/:id" element={<Update />}></Route>
      <Route path="/AddTeam" element={<AddTeam />}></Route>
      <Route path="/edit-team/:id" element={<EditTeam />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}
export default Routing;
