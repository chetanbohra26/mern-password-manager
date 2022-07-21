import { useNavigate } from "react-router-dom";
import PulsyDiv from "../animations/float";

function Home(props) {
	const navigate = useNavigate();
	return (
		<div className="d-flex flex-fill flex-column justify-content-center">
			<div className="row g-0">
				<div className="col-xs-12 col-sm-6 col-lg-3 col-xl-2 mx-auto">
					<PulsyDiv>
						<img src="icon_lock.svg" alt="" className="w-100" />
					</PulsyDiv>
				</div>
			</div>
			<p className="fs-2 text-center mb-0">
				Welcome to Password Manager Pro
			</p>
			<p className="fs-4 text-center">
				Your single store for all passwords
			</p>
			<div className="d-flex justify-content-center">
				<button
					className="btn btn-dark"
					onClick={() => navigate("/dashboard")}
				>
					Get Started
				</button>
			</div>
		</div>
	);
}

export default Home;
