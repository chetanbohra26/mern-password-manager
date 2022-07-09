import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginRequest, registerRequest } from "../utils/apiHelper";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const navigate = useNavigate();

	const [register, setRegister] = useState({
		username: "",
		email: "",
		pass: "",
		cpass: "",
	});

	const [login, setLogin] = useState({
		email: "",
		pass: "",
	});

	const handleLoginChange = ({ currentTarget: input }) => {
		const loginData = { ...login };
		loginData[input.name] = input.value;
		setLogin(loginData);
	};

	const handleRegisterChange = ({ currentTarget: input }) => {
		const registerData = { ...register };
		registerData[input.name] = input.value;
		setRegister(registerData);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const { email, pass } = login;
		const data = await loginRequest(email, pass);
		if (!data.success) {
			return toast.error(data.message);
		}

		console.log("Success:", data);
		if (data.token) {
			toast.success(data.message);
			localStorage.setItem("token", data.token);
			goToDashboard();
		} else {
			toast.error("Unkown error while logging in");
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		console.log("register");
		const { username, email, pass, cpass } = register;
		const data = await registerRequest(username, email, pass, cpass);

		if (!data.success) {
			return toast.error(data.message);
		}

		console.log("Success:", data);
		if (data.token) {
			toast.success(data.message);
			localStorage.setItem("token", data.token);
			goToDashboard();
		} else {
			toast.error("Unknown error while registering user");
		}
	};

	const goToDashboard = () => {
		navigate("/dashboard", { replace: true });
	};

	const getLoginUI = () => {
		return (
			<>
				<div className="card-header h4 text-center">Login</div>
				<div className="card-body">
					<form onSubmit={handleLogin}>
						<div className="form-group mb-3">
							<label htmlFor="login-email" className="form-label">
								Email
							</label>
							<input
								type="email"
								id="login-email"
								name="email"
								className="form-control"
								placeholder="Enter registered email"
								required
								value={login.email}
								onChange={handleLoginChange}
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
								name="pass"
								className="form-control"
								placeholder="Enter password"
								required
								value={login.pass}
								onChange={handleLoginChange}
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
							onClick={() => setIsLogin(false)}
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
					<form onSubmit={handleRegister}>
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
								name="username"
								className="form-control"
								placeholder="Pick username"
								required
								value={register.username}
								onChange={handleRegisterChange}
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
								name="email"
								className="form-control"
								placeholder="Enter email"
								required
								value={register.email}
								onChange={handleRegisterChange}
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
								name="pass"
								className="form-control"
								placeholder="Enter password"
								required
								value={register.pass}
								onChange={handleRegisterChange}
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
								name="cpass"
								className="form-control"
								placeholder="Confirm password"
								required
								value={register.cpass}
								onChange={handleRegisterChange}
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
							onClick={() => setIsLogin(true)}
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
