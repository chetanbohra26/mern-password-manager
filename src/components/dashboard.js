import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getSitesRequest } from "../utils/apiHelper";
import { removeToken } from "../utils/tokenHelper";
import { removeUser } from "../sliceReducers/user";
import DashboardItem from "./dashboardItem";
import Modal from "./modal";

const Dashboard = () => {
	const userState = useSelector((state) => state.user);
	const userDispatch = useDispatch();
	const [sites, setSites] = useState();
	const [password, setPassword] = useState("");
	const [isPassModalOpen, setPassModalOpen] = useState(true);
	const navigate = useNavigate();

	const loadSites = async () => {
		const data = await getSitesRequest(password);
		if (!data.success) {
			if (data.status === 401) {
				removeToken();
				userDispatch(removeUser());
				navigate("/login", { replace: true });
			} else if (data.status === 404) {
				setSites([]);
				setPassModalOpen(false);
				return;
			}

			return toast.error(data.message);
		}
		if (data && data.sites) {
			setSites(data.sites);
			toast.success(data.message);
			setPassModalOpen(false);
		}
	};

	useEffect(() => {
		if (userState.username === "") {
			return navigate("/login", { replace: true });
		}
	}, [navigate, userState]);

	const handlePasswordSubmit = () => {
		if (password.length === 0) return;
		loadSites();
	};

	return (
		<>
			<Modal
				isOpen={isPassModalOpen}
				onModelClose={() => setPassModalOpen(false)}
			>
				<div className="card">
					<h3 className="card-header text-center">Check Password</h3>
					<div className="card-body">
						<input
							type="password"
							className="form-control mb-2"
							placeholder="Enter password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<button
							className="btn btn-dark"
							onClick={handlePasswordSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</Modal>
			<div className="d-flex flex-column flex-fill">
				{sites ? (
					sites.length !== 0 ? (
						<>
							<h2 className="px-2 pt-2 text-center">
								Stored Passwords
							</h2>
							<div className="container">
								<div className="row">
									{sites.map((site) => (
										<DashboardItem site={site} />
									))}
								</div>
							</div>
						</>
					) : (
						<div className="mx-auto my-auto">No data found</div>
					)
				) : (
					<div className="mx-auto my-auto">Loading...</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;
