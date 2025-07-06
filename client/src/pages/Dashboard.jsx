import React from 'react';

const Dashboard = () => {
	return (
		<div style={{ maxWidth: '800px', margin: '3rem auto', padding: '1.5rem' }}>
			<h2
				style={{
					textAlign: 'center',
					fontWeight: 600,
					fontSize: '2rem',
					marginBottom: '1.2rem',
					borderBottom: '1px solid #ccc',
					paddingBottom: '0.3rem',
					color: '#222',
				}}>
				Welcome to your Dashboard!
			</h2>
			{/* Här kan du lägga till översikt, statistik, eller vad du vill visa först */}
		</div>
	);
};

export default Dashboard;
