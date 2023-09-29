import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  try {
    const teamCollectionRef = collection(db, "teams");
    const response = await getDocs(teamCollectionRef);
    const teamList = [];
    response.forEach((doc) => {
      const teams = doc.data();
      teamList.push(teams);
    });
    return teamList;
  } catch (err) {
    return err.message;
  }
});

export const deleteSelectedTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (id) => {
    const auth = getAuth();
    console.log("currentUser", auth.currentUser);
    let selectedUesrUID;
    const teamsCollectionRef = collection(db, "teams");
    const response = await getDocs(teamsCollectionRef);

    response.forEach((doc) => {
      const team = doc.data();

      if (team.id === id) {
        selectedUesrUID = doc.id;
      }
    });

    deleteDoc(doc(db, "teams", selectedUesrUID))
      .then(() => {})
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  }
);

export const editTeam = createAsyncThunk(
  "teams/editTeam",
  async (values, thunkAPI) => {
    try {
      console.log("valuessssss", values);
      const teamsCollectionRef = collection(db, "teams");
      const response = await getDocs(teamsCollectionRef);
      const updatedTeamData = values.values;
      console.log("updatedTeam", updatedTeamData);

      let selectedTeamDoc;

      response.forEach((doc) => {
        const team = doc.data();

        if (team.id === values.id) {
          selectedTeamDoc = doc.id;
          console.log("selectedTeamDoc", selectedTeamDoc);
        }
        console.log("teammmmmmmmmmmmm", team);
      });

      if (selectedTeamDoc) {
        console.log(
          "kakaksdjalisdjalsidjaslidjaslidjalidjalisdj",
          selectedTeamDoc
        );
        await updateDoc(doc(db, "teams", selectedTeamDoc), updatedTeamData);
      } else {
        throw new Error("Team not found");
      }

      return updatedTeamData;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  teams: [],
  status: "idle",
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      console.log("actionnn=>", action.payload);
      state.teams.push(action.payload);
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
  extraReducers: (builder) => {
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.status = "fulfilled";
      console.log("actionpayload", action.payload);
      state.teams = action.payload;
    });
    builder.addCase(deleteSelectedTeam.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(deleteSelectedTeam.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});
export const { addTeam, updateTeam } = teamSlice.actions;
export default teamSlice.reducer;
