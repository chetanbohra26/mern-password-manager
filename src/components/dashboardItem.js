import { useState } from "react";
import { toast } from "react-toastify";

import handleCopy from "../utils/copy";
import Modal from "./modal";

const DashboardItem = ({ site, onSiteUpdate, onSiteDelete }) => {
	const [isPassVisible, setPassVisible] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [updatedSite, setUpdatedSite] = useState({ ...site });

	const openEditItemModal = () => {
		setUpdatedSite({ ...site });
		setEditModalOpen(true);
	};

	const handleItemEditInput = ({ target: input }) => {
		const newUpdatedSite = { ...updatedSite };
		newUpdatedSite[input.name] = input.value;
		setUpdatedSite(newUpdatedSite);
	};

	const handleItemEditSubmit = async (e) => {
		e.preventDefault();
		const result = await onSiteUpdate(updatedSite);
		if (!result.success) {
			return toast.error(result.message || "Error while updating item");
		}
		toast.success(result.message);
		setEditModalOpen(false);
	};

	const handleItemDeleteSubmit = async () => {
		const result = await onSiteDelete(site.id);
		if (!result.success) {
			return toast.error(result.message || "Error while deleting item");
		}
		toast.success(result.message);
		setDeleteModalOpen(false);
	};

	return (
		<>
			<Modal isOpen={isEditModalOpen}>
				<div className="card">
					<h4 className="card-header">Update Item</h4>
					<div className="card-body">
						<form onSubmit={handleItemEditSubmit}>
							<div className="form-group mb-3">
								<label
									htmlFor="item-edit-title"
									className="form-label"
								>
									Title
								</label>
								<input
									id="item-edit-title"
									name="title"
									type="text"
									className="form-control"
									placeholder="Enter updated title"
									value={updatedSite.title}
									onChange={handleItemEditInput}
									required
								/>
							</div>
							<div className="form-group mb-3">
								<label
									htmlFor="item-edit-email"
									className="form-label"
								>
									Email
								</label>
								<input
									id="item-edit-email"
									name="email"
									type="email"
									className="form-control"
									placeholder="Enter updated email"
									value={updatedSite.email}
									onChange={handleItemEditInput}
									required
								/>
							</div>
							<div className="form-group mb-3">
								<label
									htmlFor="item-edit-pass"
									className="form-label"
								>
									Password
								</label>
								<input
									id="item-edit-pass"
									name="password"
									type="password"
									className="form-control"
									placeholder="Enter updated password"
									value={updatedSite.password}
									onChange={handleItemEditInput}
									required
								/>
							</div>
							<div className="d-flex justify-content-center mb-2">
								<button className="btn btn-dark mx-1">
									Update
								</button>
							</div>
						</form>
						<div className="d-flex justify-content-center">
							<button
								className="btn btn-secondary text-decoration-none mx-1"
								onClick={() => setEditModalOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				isOpen={isDeleteModalOpen}
				handleClose={() => setDeleteModalOpen(false)}
			>
				<div className="card">
					<h4 className="card-header text-center">Delete Item</h4>
					<div className="card-body">
						<p className="text-center fs-5 m-0 mb-2">
							Are you sure you want to delete this item?
						</p>
						<p className="text-center h4 m-0 mb-3">{site.title}</p>
						<div className="d-flex justify-content-center">
							<button
								className="btn btn-danger mx-1"
								onClick={handleItemDeleteSubmit}
							>
								Delete
							</button>
							<button
								className="btn btn-secondary mx-1"
								onClick={() => setDeleteModalOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</Modal>
			<div
				className="p-2 d-flex flex-column col-xs-12 col-lg-6 col-xxl-4"
				key={site.id}
			>
				<div className="card shadow">
					<div className="card-header d-flex align-items-center">
						<div className="flex-fill text-break h4">
							{site.title}
						</div>
						<button
							className="btn btn-link text-decoration-none px-1"
							onClick={openEditItemModal}
						>
							✏️
						</button>
						<button
							className="btn btn-link text-decoration-none px-1"
							onClick={() => setDeleteModalOpen(true)}
						>
							❌
						</button>
					</div>
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
		</>
	);
};

export default DashboardItem;
