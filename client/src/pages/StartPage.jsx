import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1> Welcome to SmartChain</h1>
			<h2>
				You've just entered a world where you control your data, your assets,
				and your identity.
			</h2>

			<button onClick={() => navigate('/login')}>Log in</button>
			<button onClick={() => navigate('/register')}>Register</button>
		</div>
	);
};

export default StartPage;
