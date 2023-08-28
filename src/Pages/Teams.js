import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { deleteTeam } from "../redux/TeamReducer";
import DeleteButton from "../Components/DeleteButton";

function Teams() {
  const teams = useSelector((state) => state.teams);
  console.log(" from team", teams);

  const handleDeleteTeam = (id) => {
    dispatch(deleteTeam({ id }));
  };

  const dispatch = useDispatch();

  console.log("teamemeber", teams);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="employee-header text-center display-6 mb-4">Teams</div>
      <div className="text-end mb-4">
        <Button
          onClick={() => navigate("/AddTeam")}
          id="navigate"
          variant="primary"
        >
          + Add Team
        </Button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark ">
          <tr className="text-center">
            <th>S.N</th>
            {/* <th>ID</th> */}
            <th>Team Name</th>
            <th>Team Leader</th>
            <th>Team Members</th>
            <th>Project</th>
            <th> Status</th>
            <th> Assigned Date</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams.map((team, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>

                <td>{team.teamName}</td>
                <td>{team.teamLeader}</td>
                <td className="d-flex">
                  {`${team.teamMembers[0]}`}
                  {team.teamMembers.length > 1 && (
                    <div
                      className="table-text-right tooltip-enable-mandatory"
                      data-toggle="tooltip"
                      data-container="#tableRoceMovement"
                      data-original-title={"${team.teamName}"}
                      title={team.teamMembers}
                      data-bs-placement="top"
                      data-html="true"
                      onmouseenter="tooltipEnterEvent($(this))"
                      onmouseleave="tooltipLeaveEvent($(this))"
                    >
                      <a className="viewteam-members"> ... view more</a>
                    </div>
                  )}

                  {/* <td></td> */}
                </td>

                <td>{team.teamProject}</td>
                <td>{team.activityStatus}</td>
                <td>{team.dateAssigned}</td>

                <td className="justify-content-space-between">
                  <Button
                    variant="warning"
                    size="sm"
                    className="mr-2"
                    onClick={() => navigate(`/edit-team/${team.id}`)}
                    id="navigate"
                  >
                    <FaEdit />
                  </Button>
                  <DeleteButton onDelete={() => handleDeleteTeam(team.id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Teams;
