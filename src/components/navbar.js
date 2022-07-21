import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { removeToken } from "../utils/tokenHelper";
import { removeUser } from "../sliceReducers/user";

function Navbar() {
	const userState = useSelector((state) => state.user);
	const navigate = useNavigate();
	const userDispatch = useDispatch();

	const handleLogin = () => {
		navigate("/login");
	};

	const handleLogout = () => {
		removeToken();
		userDispatch(removeUser());
		navigate("/login", { replace: true });
		toast.success("Logged out successfully");
	};

	if (userState.username === "") return;

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/dashboard">
						Password Manager Pro
					</NavLink>

					<div className="d-flex">
						{userState.username === "" ? (
							<button
								className="btn btn-outline-light"
								onClick={handleLogin}
							>
								Login
							</button>
						) : (
							<>
								<span className="text-white h5 m-0 align-self-center me-2 d-none d-md-block">
									Hi, {userState.username}
								</span>
								<button
									className="btn btn-outline-danger"
									onClick={handleLogout}
								>
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			</nav>

			{/*div to fill up space to avoid content and navbar overlap*/}
			<div className="p-4 mt-2" />
		</>
	);
}

export default Navbar;
