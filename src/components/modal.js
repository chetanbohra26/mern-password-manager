import { createPortal } from "react-dom";

const MyModal = ({ isOpen, children }) => {
	if (!isOpen) return;
	return createPortal(
		<>
			<div
				className="position-fixed vh-100 vw-100 d-flex align-items-center justify-content-center"
				style={{ zIndex: 1030 }}
			>
				{children}
			</div>
			<div
				className="position-fixed vh-100 vw-100 bg-dark opacity-75"
				style={{ zIndex: 1029 }}
			/>
		</>,
		document.getElementById("react-modal-backdrop")
	);
};

export default MyModal;
