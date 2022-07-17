import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getSitesRequest } from "../utils/apiHelper";
import { removeToken } from "../utils/tokenHelper";
import { removeUser } from "../sliceReducers/user";

const Dashboard = () => {
	const userState = useSelector((state) => state.user);
	const userDispatch = useDispatch();
	const [sites, setSites] = useState();
	const navigate = useNavigate();

	const loadSites = async () => {
		const data = await getSitesRequest("chetan97");
		if (!data.success) {
			if (data.status === 401) {
				removeToken();
				userDispatch(removeUser());
				navigate("/login");
			}

			return toast.error(data.message);
		}
		if (data && data.sites) {
			setSites(data.sites);
			toast.success(data.message);
		}
	};

	const loadSitesMemoized = useCallback(loadSites, [navigate, userDispatch]);

	useEffect(() => {
		if (userState.username === "") {
			navigate("/login", { replace: true });
		}

		loadSitesMemoized();
	}, [navigate, userState, loadSitesMemoized]);

	return (
		<div className="d-flex flex-column">
			{sites ? (
				<div>
					<h2 className="px-2 pt-2 text-center">Sites</h2>
					<div className="container">
						<div className="row">
							{sites.map((site) => (
								<div
									className="p-2 d-flex flex-column col-xs-12 col-lg-6 col-xxl-4"
									key={site.id}
								>
									<div className="card">
										<h4 className="card-header text-center">
											{site.title}
										</h4>
										<div className="card-body">
											<div className="d-flex mb-1">
												<input
													type="email"
													value={site.email}
													className="form-control"
													disabled
												/>
												<button className="btn btn-dark">
													Copy
												</button>
											</div>
											<div className="d-flex mb-1">
												<input
													type="password"
													value={site.password}
													className="form-control"
													disabled
												/>
												<button className="btn btn-dark">
													Copy
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				"Loading.."
			)}
		</div>
	);
};

export default Dashboard;
