import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addSiteRequest, getSitesRequest } from "../utils/apiHelper";
import { removeToken } from "../utils/tokenHelper";
import { removeUser } from "../sliceReducers/user";
import DashboardItem from "./dashboardItem";
import Modal from "./modal";

const Dashboard = () => {
	const userState = useSelector((state) => state.user);
	const userDispatch = useDispatch();
	const [sites, setSites] = useState();
	const [password, setPassword] = useState("");
	const [filter, setFilter] = useState("");
	const [isPassModalOpen, setPassModalOpen] = useState(true);
	const [isAddSiteModalOpen, setAddSiteModelOpen] = useState(false);
	const [site, setSite] = useState({ title: "", email: "", password: "" });
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

	const handleSiteAdd = async (e) => {
		e.preventDefault();
		const data = await addSiteRequest(
			site.title,
			site.email,
			site.password,
			password
		);

		if (!data.success) {
			if (data.status === 401) {
				removeToken();
				userDispatch(removeUser());
				navigate("/login", { replace: true });
			}
			return toast.error(data.message);
		}

		const resultSite = data.site;
		const newSites = [...sites];
		newSites.push(resultSite);
		setSites(newSites);
		setSite({ title: "", email: "", password: "" });
		toast.success(data.message);
		setAddSiteModelOpen(false);
	};

	useEffect(() => {
		if (userState.username === "") {
			return navigate("/login", { replace: true });
		}
	}, [navigate, userState]);

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (password.length === 0) return;
		loadSites();
	};

	const handleSiteInput = ({ target: input }) => {
		const newSite = { ...site };
		newSite[input.name] = input.value;
		setSite(newSite);
	};

	return (
		<>
			<Modal isOpen={isPassModalOpen}>
				<div className="card shadow">
					<h3 className="card-header text-center">Check Password</h3>
					<form onSubmit={handlePasswordSubmit}>
						<div className="card-body">
							<input
								type="password"
								className="form-control mb-2"
								placeholder="Enter password"
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
							/>
							<div className="d-flex justify-content-center">
								<button className="btn btn-dark">Submit</button>
							</div>
						</div>
					</form>
				</div>
			</Modal>
			<Modal
				isOpen={isAddSiteModalOpen}
				handleClose={() => setAddSiteModelOpen(false)}
			>
				<div className="card shadow">
					<h3 className="card-header text-center">Add site</h3>
					<div className="card-body">
						<form onSubmit={handleSiteAdd}>
							<div className="mb-2">
								<label htmlFor="addsite-title">Title</label>
								<input
									id="addsite-title"
									name="title"
									type="text"
									className="form-control"
									placeholder="Enter title for site"
									value={site.title}
									onChange={handleSiteInput}
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="addsite-email">Email</label>
								<input
									id="addsite-email"
									name="email"
									type="email"
									className="form-control"
									placeholder="Enter email to be used"
									value={site.email}
									onChange={handleSiteInput}
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="addsite-password">
									Password
								</label>
								<input
									id="addsite-password"
									name="password"
									type="password"
									className="form-control"
									placeholder="Enter password"
									value={site.password}
									onChange={handleSiteInput}
								/>
							</div>
							<div className="d-flex flex-column align-items-center mb-2">
								<button className="btn btn-dark">Submit</button>
							</div>
						</form>
						<div className="d-flex flex-column align-items-center">
							<button
								className="btn btn-danger mx-auto"
								onClick={() => setAddSiteModelOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</Modal>
			{sites && (
				<div className="container mt-2">
					<div className="row">
						<div className="col-xs-12 px-2 d-flex">
							<div className="card flex-fill">
								<button
									className="btn btn-dark"
									onClick={() => setAddSiteModelOpen(true)}
								>
									Add
								</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 px-2 d-flex mt-2">
							<input
								type="text"
								className="form-control"
								placeholder="Type to filter"
								value={filter}
								onChange={({ target }) =>
									setFilter(target.value)
								}
							/>
							<button
								className="btn btn-dark ms-2"
								onClick={() => setFilter("")}
							>
								❌
							</button>
						</div>
					</div>
				</div>
			)}
			{sites && sites.length !== 0 ? (
				<div className="container">
					<div className="row">
						{filter === ""
							? sites.map((site) => (
									<DashboardItem site={site} key={site.id} />
							  ))
							: sites
									.filter((site) =>
										site.title
											.toLowerCase()
											.includes(filter.toLowerCase())
									)
									.map((site) => (
										<DashboardItem
											site={site}
											key={site.id}
										/>
									))}
					</div>
				</div>
			) : (
				<div className="mx-auto my-auto">No data found</div>
			)}
		</>
	);
};

export default Dashboard;
