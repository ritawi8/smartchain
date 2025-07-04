import React from 'react';
import DashboardNav from '../dashboard/DashboardNav';

const DashboardLayout = ({ children }) => (
	<div>
		<DashboardNav />
		<div style={{ paddingTop: '70px' }}>{children}</div>
	</div>
);

export default DashboardLayout;
