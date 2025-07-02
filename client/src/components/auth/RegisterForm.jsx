import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';

export default function RegisterForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
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

		// Validera lösenord
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			setLoading(false);
			return;
		}

		try {
			await register({
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});

			alert('Account created successfully!');
			navigate('/'); // Gå tillbaka till startsidan
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
			<h2>Create account</h2>
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
					<label>E-mail:</label>
					<input
						type='email'
						name='email'
						value={formData.email}
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

				<div style={{ marginBottom: '15px' }}>
					<label>Confirm password:</label>
					<input
						type='password'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>

				<button
					type='submit'
					disabled={loading}
					style={{
						width: '107%',
						padding: '10px',
						backgroundColor: loading ? '#ccc' : '#007bff',
						color: 'white',
						border: 'none',
						cursor: loading ? 'not-allowed' : 'pointer',
					}}>
					{loading ? 'Creating account...' : 'Create account'}
				</button>
			</form>
		</div>
	);
}
