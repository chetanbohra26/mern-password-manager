import { useState } from "react";

import handleCopy from "../utils/copy";

const DashboardItem = ({ site }) => {
	const [isPassVisible, setPassVisible] = useState(false);

	return (
		<div
			className="p-2 d-flex flex-column col-xs-12 col-lg-6 col-xxl-4"
			key={site.id}
		>
			<div className="card shadow">
				<h4 className="card-header">{site.title}</h4>
				<div className="card-body">
					<div className="d-flex mb-1">
						<input
							type="email"
							value={site.email}
							className="form-control"
							disabled
						/>
						<button
							className="btn btn-dark ms-1"
							onClick={() => handleCopy(site.email)}
						>
							📋
						</button>
					</div>
					<div className="d-flex mb-1">
						<input
							type={isPassVisible ? "text" : "password"}
							value={site.password}
							className="form-control"
							disabled
						/>
						<button
							className="btn btn-dark mx-1"
							onClick={() => setPassVisible(!isPassVisible)}
						>
							👁
						</button>
						<button
							className="btn btn-dark"
							onClick={() => handleCopy(site.password)}
						>
							📋
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardItem;
