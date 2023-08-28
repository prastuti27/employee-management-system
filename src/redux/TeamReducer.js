import { createSlice } from "@reduxjs/toolkit";

import { teamList } from "../db";

const teamSlice = createSlice({
  name: "teams",
  initialState: teamList,
  reducers: {
    addTeam: (state, action) => {
      console.log("actionnn=>", action.payload);
      state.push(action.payload);
      // return [...state, action.payload];
    },
    deleteTeam: (state, action) => {
      const { id } = action.payload;
      const teamIndex = state.findIndex((team) => team.id === id);

      if (teamIndex !== -1) {
        state.splice(teamIndex, 1);
      }
    },

    updateTeam: (state, action) => {
      const {
        id,
        teamName,
        teamLeader,
        teamMembers,
        teamProject,
        dateAssigned,
        activityStatus,
      } = action.payload;

      const teamIndex = state.findIndex(
        (team) => Number(team.id) === Number(id)
      );

      if (teamIndex !== -1) {
        state.splice(teamIndex, 1, {
          id: parseInt(id),
          teamName,
          teamLeader,
          teamMembers,
          teamProject,
          dateAssigned,
          activityStatus,
        });
      }
    },
  },
});
export const { addTeam, deleteTeam, updateTeam } = teamSlice.actions;
export default teamSlice.reducer;
