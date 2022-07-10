import { createSlice } from "@reduxjs/toolkit";

import { getPayload } from "../utils/tokenHelper";

const initialState = {
	username: "",
	email: "",
	isVerified: false,
};

const loadedUser = getPayload();

export const userSlice = createSlice({
	name: "user",
	initialState: loadedUser || initialState,
	reducers: {
		addUser: (state, action) => {
			state = {
				...state,
				...action.payload,
			};
			return state;
		},
		removeUser: (state) => {
			state = { ...initialState };
			return state;
		},
	},
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
