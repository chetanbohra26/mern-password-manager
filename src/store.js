import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./sliceReducers/user";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
