import { createPortal } from "react-dom";

const MyModal = ({ isOpen, children, handleClose }) => {
	const closeModalIfPropPassed = (e) => {
		if (e.target !== e.currentTarget) return;
		handleClose && handleClose();
	};

	if (!isOpen) return;
	return createPortal(
		<>
			<div
				className="position-fixed vh-100 vw-100 bg-dark opacity-75"
				style={{ zIndex: 1030 }}
			/>
			<div
				onClick={closeModalIfPropPassed}
				className="position-fixed vh-100 vw-100 d-flex align-items-center justify-content-center row g-0 px-2"
				style={{ zIndex: 1030 }}
			>
				<div className="col-xs-12 col-md-8 col-lg-6">{children}</div>
			</div>
		</>,
		document.getElementById("react-modal-backdrop")
	);
};

export default MyModal;
