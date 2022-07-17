import { useState } from "react";

const Footer = () => {
	const [isVisible, setVisible] = useState(true);
	if (!isVisible) return;
	return (
		<>
			{/*div to fill up space to avoid content and footer overlap*/}
			<div className="p-2 m-2"></div>
			<p className="m-0 p-0 bg-dark text-light fixed-bottom d-flex align-items-center justify-content-center">
				Developed with ❤️ by Chetan Bohra{" "}
				<button
					className="btn btn-link text-decoration-none text-white p-0 ms-1"
					onClick={() => setVisible(false)}
				>
					[X]
				</button>
			</p>
		</>
	);
};

export default Footer;
