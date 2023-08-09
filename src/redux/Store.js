import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducer = combineReducers({
  users: UserReducer,
});
const persistReducers = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
