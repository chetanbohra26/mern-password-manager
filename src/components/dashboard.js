import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
	const userStore = useSelector((state) => state.user);

	return (
		<div className="d-flex flex-column">
			<span>username: {userStore.username}</span>
			<span>email: {userStore.email}</span>
			<span>isVerified: {userStore.isVerified.toString()}</span>
		</div>
	);
};

export default Dashboard;
