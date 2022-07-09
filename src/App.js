import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";

function App() {
	return (
		<div className="vh-100 d-flex flex-column">
			<Navbar />
			<div className="d-flex flex-fill flex-column container-fluid p-0">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<>not found</>} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
}

export default App;
