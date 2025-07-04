import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = { color: '#8c8c8c', textDecoration: 'none' };
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
			color: '#8c8c8c',
			zIndex: 1000,
			justifyContent: 'center',
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
			style={{
				color: '#8c8c8c',
				background: 'none',
				cursor: 'pointer',
				border: 'none',
				font: 'inherit',
				padding: 0,
				marginLeft: '0.5rem',
			}}>
			Logout
		</button>
	</nav>
);

export default DashboardNav;
