import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				padding: '2rem',
				textAlign: 'center',
			}}>
			<div
				style={{
					background: 'rgba(255,255,255,0.95)',
					borderRadius: '16px',
					boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
					padding: '3rem',
					maxWidth: '600px',
					width: '100%',
				}}>
				<h1
					style={{
						fontSize: '3rem',
						fontWeight: 700,
						marginBottom: '1.5rem',
						color: '#222',
						textAlign: 'center',
					}}>
					Welcome to SmartChain
				</h1>
				<h2
					style={{
						fontSize: '1.3rem',
						fontWeight: 400,
						marginBottom: '3rem',
						color: '#666',
						lineHeight: '1.6',
					}}>
					You've just entered a world where you control your data, your assets,
					and your identity.
				</h2>

				<div
					style={{
						display: 'flex',
						gap: '1rem',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}>
					<button
						onClick={() => navigate('/login')}
						style={{
							padding: '1rem 2rem',
							borderRadius: '8px',
							border: 'none',
							background: '#4f5bd5',
							color: 'white',
							fontWeight: 600,
							fontSize: '1.1rem',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
							minWidth: '140px',
						}}>
						Sign in
					</button>
					<button
						onClick={() => navigate('/register')}
						style={{
							padding: '1rem 2rem',
							borderRadius: '8px',
							border: '2px solid #4f5bd5',
							background: 'transparent',
							color: '#4f5bd5',
							fontWeight: 600,
							fontSize: '1.1rem',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
							minWidth: '140px',
						}}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
};

export default StartPage;
