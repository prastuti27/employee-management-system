import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, deleteUser } from "firebase/auth";

export const getEmployees = createAsyncThunk("users/getEmployees", async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const response = await getDocs(usersCollectionRef);
    const userList = [];
    response.forEach((doc) => {
      const users = doc.data();
      userList.push(users);

      console.log(users.createdAt);
    });
    return userList;
  } catch (err) {
    return err.message;
  }
});

export const deleteEmployee = createAsyncThunk(
  "users/deleteEmployee",
  async (id) => {
    const auth = getAuth();
    console.log("currentUser", auth.currentUser);
    let selectedUesrUID;
    const usersCollectionRef = collection(db, "users");
    const response = await getDocs(usersCollectionRef);

    response.forEach((doc) => {
      const user = doc.data();

      if (user.id === id) {
        selectedUesrUID = doc.id;
      }
    });

    deleteDoc(doc(db, "users", selectedUesrUID))
      .then(() => {})
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  }
);

export const editEmployee = createAsyncThunk(
  "users/editEmployee",
  async (values, thunkAPI) => {
    try {
      console.log("ASHDKASHDKUASHDKAUHSDKUASHD", values);
      const usersCollectionRef = collection(db, "users");
      const response = await getDocs(usersCollectionRef);
      const updatedUserData = values.payload;

      let selectedUserUID;

      response.forEach((doc) => {
        const user = doc.data();
        console.log("doctor", doc.data());

        if (user.id === values.id) {
          selectedUserUID = doc.id;
        }
      });

      if (selectedUserUID) {
        console.log("editemp", doc(db, "users", selectedUserUID));
        await updateDoc(doc(db, "users", selectedUserUID), updatedUserData);
      } else {
        throw new Error("User not found");
      }

      return updatedUserData;
    } catch (error) {
      console.error("Error editing user:", error);
    }
  }
);

const initialState = {
  users: [],
  status: "idle",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   state.users.push(action.payload); // Correct way to update the state
    // },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.users.findIndex(
        (user) => user.id === updatedUser.id
      );

      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.status = "fulfilled";
      console.log("action payload", action.payload);
      const list = action.payload;
      const timeStamp = list.map((el) => el.createdAt);
      console.log("asdasdadwe", timeStamp);
      const sort = list
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log("sdslijasdlij;asdjiaskjdljklasdjklas;djkl;sad", sort);
      state.users = sort;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.status = "fulfilled";
      console.log("User updated");
    });

    builder.addCase(editEmployee.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
