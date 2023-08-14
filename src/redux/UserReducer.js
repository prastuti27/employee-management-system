import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../Data";

const userSlice = createSlice({
  name: "users",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      console.log("actionnn=>", action);
      return [...state, action.payload];
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.splice(userIndex, 1);
      }
    },

    updateUser: (state, action) => {
      const {
        id,
        firstname,
        lastName,
        email,
        phoneNo,
        address,
        birthDate,
        jobPosition,
        team,
        selectedFile,
        gender,
      } = action.payload;

      const userIndex = state.findIndex(
        (user) => Number(user.id) === Number(id)
      );

      if (userIndex !== -1) {
        state.splice(userIndex, 1, {
          id: parseInt(id),
          firstname,
          lastName,
          email,
          phoneNo,
          address,
          birthDate,
          jobPosition,
          team,
          selectedFile,
          gender,
        });
      }
    },
  },
});
export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
