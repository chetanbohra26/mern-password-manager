import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					Password Manager Pro
				</NavLink>

				<div className="d-flex">
					<button
						className="btn btn-outline-light"
						onClick={handleLogin}
					>
						Login
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
