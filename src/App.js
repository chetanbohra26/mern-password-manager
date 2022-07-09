import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/home";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="vh-100 d-flex flex-column">
			<Navbar />
			<ToastContainer />
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
