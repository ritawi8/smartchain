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
		<div style={{ maxWidth: 500, margin: '3rem auto' }}>
			<h2
				style={{
					textAlign: 'center',
					fontWeight: 700,
					fontSize: '2rem',
					marginBottom: '1.2rem',
					borderBottom: '1px solid #ccc',
					paddingBottom: '0.3rem',
					color: 'black',
				}}>
				Send Transaction
			</h2>
			<div
				style={{
					background: '#f9f9ff',
					borderRadius: '16px',
					boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
					padding: '2rem',
				}}>
				<form
					onSubmit={handleSubmit}
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
					}}>
					<input
						type='text'
						placeholder='Sender'
						value={from}
						onChange={(e) => setFrom(e.target.value)}
						required
						style={{
							padding: '0.9rem',
							borderRadius: 8,
							border: '1px solid #ccc',
							fontSize: '1rem',
						}}
					/>
					<input
						type='text'
						placeholder='Receiver'
						value={to}
						onChange={(e) => setTo(e.target.value)}
						required
						style={{
							padding: '0.9rem',
							borderRadius: 8,
							border: '1px solid #ccc',
							fontSize: '1rem',
						}}
					/>
					<input
						type='number'
						placeholder='Amount'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
						min={1}
						style={{
							padding: '0.9rem',
							borderRadius: 8,
							border: '1px solid #ccc',
							fontSize: '1rem',
						}}
					/>
					<button
						type='submit'
						disabled={loading}
						style={{
							padding: '0.9rem',
							borderRadius: 8,
							border: 'none',
							background: '#4f5bd5',
							color: 'white',
							fontWeight: 600,
							fontSize: '1.1rem',
							cursor: loading ? 'not-allowed' : 'pointer',
						}}>
						{loading ? 'Sending...' : 'Send'}
					</button>
					{error && (
						<div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
					)}
					{success && (
						<div style={{ color: 'green', textAlign: 'center' }}>{success}</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default SendTransactionForm;
