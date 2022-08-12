import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import { confirmOTPRequest, sendMailOTPRequest } from "../utils/apiHelper";
import { setToken } from "../utils/tokenHelper";
import OtpInput from "./otpInput";
import { addUser } from "../sliceReducers/user";

const VerifyUser = () => {
	const userState = useSelector((state) => state.user);
	const [otp, setOtp] = useState("");
	const [isSendMailDisabled, setIsSendMailDisabled] = useState(false);
	const [isConfirmMailDisabled, setIsConfirmMailDisabled] = useState(false);
	const [isInputOtpVisible, setInputOtpVisible] = useState(false);
	const navigate = useNavigate();
	const userDispatch = useDispatch();

	useEffect(() => {
		if (userState.username === "") {
			return navigate("/login", { replace: true });
		}
		if (userState.isVerified) {
			return navigate("/dashboard", { replace: true });
		}
	}, [navigate, userState.username, userState.isVerified]);

	const handleSendOTP = async (e) => {
		e && e.preventDefault();
		setIsSendMailDisabled(true);

		const data = await sendMailOTPRequest();
		if (!data.success) {
			setIsSendMailDisabled(false);
			return toast.error(data.message);
		}
		toast.success(data.message);
		setInputOtpVisible(true);
		setIsSendMailDisabled(false);
	};

	const handleSubmitOTP = async (e) => {
		e.preventDefault();
		if (!otp || otp.length < 6) return;
		setIsConfirmMailDisabled(true);
		const data = await confirmOTPRequest(otp);
		if (!data.success) {
			setIsConfirmMailDisabled(false);
			return toast.error(data.message);
		}

		const token = data.token;
		if (!token) {
			setIsConfirmMailDisabled(false);
			return toast.error("Could not verify user");
		}
		initUserAndRedirect(token);
		toast.success(data.message);
	};

	const initUserAndRedirect = (token) => {
		try {
			setToken(token);
			const user = jwtDecode(token);

			if (user) {
				const payload = {
					username: user.username,
					email: user.email,
					isVerified: user.isVerified,
				};
				userDispatch(addUser(payload));
			}
			navigate("/dashboard", { replace: true });
		} catch (err) {
			setIsConfirmMailDisabled(false);
			toast.error("Error while loading user data");
		}
	};

	const getSendOtpUI = () => {
		return (
			<form onSubmit={handleSendOTP}>
				<div className="form-group mb-3">
					<label>User email</label>
					<input
						type="text"
						className="form-control"
						disabled
						value={userState?.email}
					/>
				</div>
				<div className="d-flex justify-content-center">
					<button
						className="btn btn-dark"
						disabled={isSendMailDisabled}
					>
						Verify OTP by mail
					</button>
				</div>
			</form>
		);
	};

	const getEnterOtpUI = () => {
		return (
			<>
				<form onSubmit={handleSubmitOTP}>
					<div className="d-flex flex-column align-items-center">
						<OtpInput
							inputLength={6}
							otpValue={otp}
							handleChangeOTP={setOtp}
						/>
						<button
							className="btn btn-dark mt-3"
							disabled={otp.length < 6 || isConfirmMailDisabled}
						>
							Submit OTP
						</button>
					</div>
				</form>
				<div className="d-flex justify-content-center">
					<button
						className="btn btn-link"
						onClick={() => handleSendOTP()}
						disabled={isSendMailDisabled}
					>
						Resend OTP
					</button>
				</div>
			</>
		);
	};

	return (
		<div className="d-flex flex-fill flex-column p-0 m-0 justify-content-center">
			<div className="row g-0">
				<div className="col-xs-12 col-sm-8 col-md-6 mx-auto">
					<div className="card shadow mx-2">
						<div className="card-header text-center h4">
							Verify User
						</div>
						<div className="card-body">
							{isInputOtpVisible
								? getEnterOtpUI()
								: getSendOtpUI()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyUser;
