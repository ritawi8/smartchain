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
		<div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
			<h2>Sign in</h2>
			{error && (
				<div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
			)}
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '15px' }}>
					<label>Username:</label>
					<input
						type='text'
						name='username'
						value={formData.username}
						onChange={handleChange}
						required
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>
				<div style={{ marginBottom: '15px' }}>
					<label>Password:</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>
				<button
					type='submit'
					disabled={loading}
					style={{
						width: '100%',
						padding: '10px',
						backgroundColor: 'whitesmoke',
						color: 'black',
						border: 'none',
						cursor: loading ? 'not-allowed' : 'pointer',
					}}>
					{loading ? 'Loggar in...' : 'Sign in '}
				</button>
			</form>
		</div>
	);
}
