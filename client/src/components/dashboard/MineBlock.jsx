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
			if (!response.ok) throw new Error(data.message || 'Something went wrong');
			setResult('Block is mined! 🟢');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: '500px', margin: '3rem auto', padding: '1.5rem' }}>
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
				Mine Block
			</h2>
			<div
				style={{
					background: '#f9f9ff',
					borderRadius: '16px',
					boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
					padding: '2rem',
					textAlign: 'center',
				}}>
				<p
					style={{
						fontSize: '1.1rem',
						color: '#666',
						marginBottom: '2rem',
						lineHeight: '1.6',
					}}></p>
				<button
					onClick={handleMine}
					disabled={loading}
					style={{
						padding: '1rem 2rem',
						borderRadius: '8px',
						border: 'none',
						background: '#4f5bd5',
						color: 'white',
						fontWeight: 600,
						fontSize: '1.1rem',
						cursor: loading ? 'not-allowed' : 'pointer',
						transition: 'all 0.2s ease',
						minWidth: '200px',
					}}>
					{loading ? 'Mine...' : 'Mine new block'}
				</button>
				{result && (
					<div
						style={{
							color: '#27ae60',
							background: '#d5f4e6',
							border: '1px solid #a8e6cf',
							borderRadius: '6px',
							padding: '1rem',
							marginTop: '1.5rem',
							fontWeight: 500,
						}}>
						{result}
					</div>
				)}
				{error && (
					<div
						style={{
							color: '#e74c3c',
							background: '#fdf2f2',
							border: '1px solid #fecaca',
							borderRadius: '6px',
							padding: '1rem',
							marginTop: '1.5rem',
						}}>
						{error}
					</div>
				)}
			</div>
		</div>
	);
};

export default MineBlock;
