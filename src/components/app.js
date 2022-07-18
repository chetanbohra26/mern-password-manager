import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./home";
import Footer from "./footer";
import Navbar from "./navbar";
import Login from "./login";
import Dashboard from "./dashboard";

import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="vh-100 d-flex flex-column">
			<Navbar />
			<ToastContainer />

			{/*div to fill up space to avoid content and navbar overlap*/}
			<div className="p-4 mt-2"></div>

			<div className="d-flex flex-fill flex-column container-fluid p-0">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<>not found</>} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
}

export default App;
