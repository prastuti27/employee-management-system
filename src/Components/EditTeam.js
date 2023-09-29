import React, { useState, useEffect } from "react";
import TeamForm from "./TeamForm";
import { getTeams } from "../redux/TeamReducer";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTeam = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeams());
  }, []);
  const teams = useSelector((state) => state.teams.teams);
  const teamData = teams.find((team) => team.id === Number(id));

  const [values, setValues] = useState(teamData);
  console.log("teamDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", teamData);

  console.log("teamsstate", teams);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   dispatch(
  //     updateTeam({
  //       id,
  //       teamName: values.teamName,
  //       teamLeader: values.teamLeader,
  //       teamProject: values.teamProject,
  //       teamMembers: values.teamMembers,
  //       dateAssigned: values.Assigned,
  //       activityStatus: values.activityStatus,
  //     })
  //   );
  //   navigate("/employee");
  // };

  return (
    <div>
      <TeamForm teamData={teamData} editMode={true} />
    </div>
  );
};

export default EditTeam;
