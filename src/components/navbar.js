import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../utils/tokenHelper";
import { removeUser } from "../sliceReducers/user";
import { toast } from "react-toastify";

function Navbar() {
	const userState = useSelector((state) => state.user);
	const navigate = useNavigate();
	const userDispatch = useDispatch();

	const handleLogin = () => {
		navigate("/login");
	};

	const handleLogout = () => {
		userDispatch(removeUser());
		removeToken();
		navigate("/login");
		toast.success("Logged out successfully");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
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
						<button
							className="btn btn-outline-danger"
							onClick={handleLogout}
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
