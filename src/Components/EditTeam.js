import React, { useState } from "react";
import TeamForm from "./TeamForm";
import { updateTeam } from "../redux/TeamReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTeamPage = ({ teamid }) => {
  const { id } = useParams();
  const teams = useSelector((state) => state.teams);
  console.log("teamsstate", teams);
  const teamData = teams.find((team) => team.id === Number(id));
  console.log("teamData", teamData);
  const navigate = useNavigate();
  const [values, setValues] = useState(teamData);

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
      updateTeam({
        id,
        teamName: values.teamName,
        teamLeader: values.teamLeader,
        teamProject: values.teamProject,
        teamMembers: values.teamMembers,
        dateAssigned: values.Assigned,
        activityStatus: values.activityStatus,
      })
    );
    navigate("/employee");
  };

  return (
    <div>
      <TeamForm teamData={teamData} editMode={true} />
    </div>
  );
};

export default EditTeamPage;
