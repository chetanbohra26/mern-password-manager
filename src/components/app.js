import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { removeUser } from "../sliceReducers/user";
import { verifyTokenRequest } from "../utils/apiHelper";
import { removeToken } from "../utils/tokenHelper";
import Home from "./home";
import Navbar from "./navbar";
import Login from "./login";
import Dashboard from "./dashboard";

import "react-toastify/dist/ReactToastify.css";

function App() {
	const userState = useSelector((state) => state.user);
	const userDispatch = useDispatch();

	const checkToken = async () => {
		const data = await verifyTokenRequest();
		if (!data.success) {
			removeToken();
			userDispatch(removeUser());
			return toast.error(data.message);
		}
	};
	const checkTokenMemoized = useCallback(checkToken, [userDispatch]);

	useEffect(() => {
		if (userState.username !== "") {
			checkTokenMemoized();
		}
	}, [userState.username, checkTokenMemoized]);

	return (
		<div className="vh-100 d-flex flex-column">
			<Navbar />
			<ToastContainer theme="dark" />

			<div className="d-flex flex-fill flex-column container-fluid p-0">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<>not found</>} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
