import React, { useState } from 'react';

const MineBlock = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('');
	const [error, setError] = useState('');

	const handleMine = async () => {
		setLoading(true);
		setResult('');
		setError('');
		try {
			const response = await fetch('/api/wallet/transactions/mine');
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.message || 'Något gick fel vid mining');
			setResult('Block minat! 🟢');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				maxWidth: 400,
				margin: '3rem auto',
				padding: '2rem',
				background: 'rgba(255,255,255,0.95)',
				borderRadius: 10,
				textAlign: 'center',
			}}>
			<h2 style={{ marginBottom: '1.5rem' }}>Mine Block</h2>
			<button
				onClick={handleMine}
				disabled={loading}
				style={{
					padding: '0.8rem 2rem',
					borderRadius: 6,
					border: 'none',
					background: '#4f5bd5',
					color: 'white',
					fontWeight: 600,
					fontSize: '1.1rem',
					cursor: loading ? 'not-allowed' : 'pointer',
				}}>
				{loading ? 'Minerar...' : 'Mina nytt block'}
			</button>
			{result && (
				<div style={{ color: 'green', marginTop: '1.2rem' }}>{result}</div>
			)}
			{error && (
				<div style={{ color: 'red', marginTop: '1.2rem' }}>{error}</div>
			)}
		</div>
	);
};

export default MineBlock;
