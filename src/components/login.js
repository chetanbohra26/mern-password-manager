import React, { useState } from "react";

const Login = () => {
	const [isLogin, setLogin] = useState(true);
	const getLoginUI = () => {
		return (
			<>
				<div className="card-header h4 text-center">Login</div>
				<div className="card-body">
					<form action="">
						<div className="form-group mb-3">
							<label htmlFor="login-email" className="form-label">
								Email
							</label>
							<input
								type="email"
								id="login-email"
								className="form-control"
								placeholder="Enter registered email"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="login-password"
								className="form-label"
							>
								Password
							</label>
							<input
								type="password"
								id="login-password"
								className="form-control"
								placeholder="Enter password"
							/>
						</div>
						<div className="d-flex flex-column align-items-center">
							<button className="btn btn-dark">Login</button>
						</div>
					</form>
					<div className="d-flex flex-row justify-content-center align-items-center">
						<span>New User?</span>
						<button
							className="btn btn-link"
							onClick={() => setLogin(false)}
						>
							Register
						</button>
					</div>
				</div>
			</>
		);
	};

	const getRegisterUI = () => {
		return (
			<>
				<div className="card-header h4 text-center">Register</div>
				<div className="card-body">
					<form action="">
						<div className="form-group mb-3">
							<label
								htmlFor="register-username"
								className="form-label"
							>
								Username
							</label>
							<input
								type="text"
								id="register-username"
								className="form-control"
								placeholder="Pick username"
							/>
						</div>
						<div className="form-group mb-3">
							<label
								htmlFor="register-email"
								className="form-label"
							>
								Email
							</label>
							<input
								type="email"
								id="register-email"
								className="form-control"
								placeholder="Enter email"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="register-password"
								className="form-label"
							>
								Password
							</label>
							<input
								type="password"
								id="register-password"
								className="form-control"
								placeholder="Enter password"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="register-cpassword"
								className="form-label"
							>
								Password
							</label>
							<input
								type="password"
								id="register-cpassword"
								className="form-control"
								placeholder="Confirm password"
							/>
						</div>
						<div className="d-flex flex-column align-items-center">
							<button className="btn btn-dark">Register</button>
						</div>
					</form>
					<div className="d-flex flex-row justify-content-center align-items-center">
						<span>Existing User?</span>
						<button
							className="btn btn-link"
							onClick={() => setLogin(true)}
						>
							Login
						</button>
					</div>
				</div>
			</>
		);
	};

	return (
		<div className="d-flex flex-fill flex-column p-0 m-0">
			<div className="row g-0">
				<div className="col-xs-12 col-md-8 col-lg-6 mx-auto mt-4">
					<div className="card shadow mx-2 ">
						{isLogin ? getLoginUI() : getRegisterUI()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
