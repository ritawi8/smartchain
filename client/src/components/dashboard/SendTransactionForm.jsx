import React, { useState } from 'react';

const SendTransactionForm = ({ onSuccess }) => {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const token = localStorage.getItem('token');
			const response = await fetch('/api/wallet/transactions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ from, to, amount: Number(amount) }),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || 'Något gick fel');
			setSuccess('Transaktionen skickades!');
			setFrom('');
			setTo('');
			setAmount('');
			if (onSuccess) onSuccess();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				maxWidth: 400,
				margin: '2rem auto',
				padding: '2rem',
				background: 'rgba(255,255,255,0.95)',
				borderRadius: 10,
				boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}>
			<h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
				Send Transaction
			</h2>
			<input
				type='text'
				placeholder='Från'
				value={from}
				onChange={(e) => setFrom(e.target.value)}
				required
				style={{ padding: '0.7rem', borderRadius: 5, border: '1px solid #ccc' }}
			/>
			<input
				type='text'
				placeholder='Till'
				value={to}
				onChange={(e) => setTo(e.target.value)}
				required
				style={{ padding: '0.7rem', borderRadius: 5, border: '1px solid #ccc' }}
			/>
			<input
				type='number'
				placeholder='Belopp'
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				required
				min={1}
				style={{ padding: '0.7rem', borderRadius: 5, border: '1px solid #ccc' }}
			/>
			<button
				type='submit'
				disabled={loading}
				style={{
					padding: '0.7rem',
					borderRadius: 5,
					border: 'none',
					background: '#4f5bd5',
					color: 'white',
					fontWeight: 600,
					cursor: loading ? 'not-allowed' : 'pointer',
				}}>
				{loading ? 'Skickar...' : 'Skicka'}
			</button>
			{error && (
				<div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
			)}
			{success && (
				<div style={{ color: 'green', textAlign: 'center' }}>{success}</div>
			)}
		</form>
	);
};

export default SendTransactionForm;
