import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

export default function LoginForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await login({
				username: formData.username,
				password: formData.password,
			});
			localStorage.setItem('token', response.token);
			alert('Welcome!');
			navigate('/dashboard');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				padding: '2rem',
			}}>
			<div
				style={{
					background: 'rgba(255,255,255,0.95)',
					borderRadius: '16px',
					boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
					padding: '3rem',
					maxWidth: '400px',
					width: '100%',
				}}>
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
					Sign in
				</h2>
				{error && (
					<div
						style={{
							color: '#e74c3c',
							background: '#fdf2f2',
							border: '1px solid #fecaca',
							borderRadius: '6px',
							padding: '0.8rem',
							marginBottom: '1.5rem',
							textAlign: 'center',
						}}>
						{error}
					</div>
				)}
				<form
					onSubmit={handleSubmit}
					style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: 500,
								color: '#333',
							}}>
							Username:
						</label>
						<input
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.9rem',
								borderRadius: '8px',
								border: '1px solid #ccc',
								fontSize: '1rem',
								boxSizing: 'border-box',
							}}
						/>
					</div>
					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: 500,
								color: '#333',
							}}>
							Password:
						</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.9rem',
								borderRadius: '8px',
								border: '1px solid #ccc',
								fontSize: '1rem',
								boxSizing: 'border-box',
							}}
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						style={{
							width: '100%',
							padding: '0.9rem',
							borderRadius: '8px',
							border: 'none',
							background: '#4f5bd5',
							color: 'white',
							fontWeight: 600,
							fontSize: '1.1rem',
							cursor: loading ? 'not-allowed' : 'pointer',
							transition: 'all 0.2s ease',
							marginTop: '0.5rem',
						}}>
						{loading ? 'Loggar in...' : 'Sign in'}
					</button>
				</form>
			</div>
		</div>
	);
}
