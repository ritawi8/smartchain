import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
	color: '#222',
	textDecoration: 'none',
	fontWeight: 600,
	fontSize: '1.1rem',
	padding: '0.5rem 1rem',
	borderRadius: '6px',
	transition: 'all 0.2s ease',
};
const dividerStyle = { color: '#8c8c8c', margin: '0 0.5rem' };

const DashboardNav = () => (
	<nav
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: '0.5rem',
			padding: '1rem 2rem',
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			background: 'white',
			color: '#222',
			zIndex: 1000,
			justifyContent: 'center',
			boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
		}}>
		<Link to='/dashboard' style={linkStyle}>
			Overview
		</Link>
		<span style={dividerStyle}>|</span>
		<Link to='/dashboard/transactions' style={linkStyle}>
			Transactions
		</Link>
		<span style={dividerStyle}>|</span>
		<Link to='/dashboard/sendtransaction' style={linkStyle}>
			Send Transaction
		</Link>
		<span style={dividerStyle}>|</span>
		<Link to='/dashboard/blocks' style={linkStyle}>
			Blocks
		</Link>
		<span style={dividerStyle}>|</span>
		<Link to='/dashboard/mine' style={linkStyle}>
			Mine Block
		</Link>
		<span style={dividerStyle}>|</span>
		<button
			onClick={() => {
				localStorage.removeItem('token');
				window.location.href = '/login';
			}}
			style={{
				color: '#222',
				background: 'none',
				cursor: 'pointer',
				border: 'none',
				font: 'inherit',
				padding: '0.5rem 1rem',
				borderRadius: '6px',
				fontWeight: 600,
				fontSize: '1.1rem',
				transition: 'all 0.2s ease',
			}}>
			Logout
		</button>
	</nav>
);

export default DashboardNav;
