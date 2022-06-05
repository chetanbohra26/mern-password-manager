function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Password Manager Pro
				</a>

				<div className="d-flex">
					<button className="btn btn-outline-light" type="submit">
						Login
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
