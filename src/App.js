import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";

function App() {
	return (
		<div className="vh-100 d-flex flex-column">
			<Navbar />
			<div className="d-flex flex-fill flex-column container-fluid">
				<Home />
			</div>

			<Footer />
		</div>
	);
}

export default App;
