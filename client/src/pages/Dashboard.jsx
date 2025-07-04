import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../components/dashboard/DashboardNav';

const Dashboard = () => {
	const navigate = useNavigate();

	return (
		<div>
			<DashboardNav />
		</div>
	);
};

export default Dashboard;
