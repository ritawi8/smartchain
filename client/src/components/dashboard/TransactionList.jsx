import React, { useState, useEffect } from 'react';
import { getTransactions } from '../../api/transactions';

const TransactionList = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				setLoading(true);
				const data = await getTransactions();
				setTransactions(data.transactions || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchTransactions();
	}, []);

	if (loading)
		return (
			<div
				style={{
					maxWidth: '500px',
					margin: '3rem auto',
					padding: '1.5rem',
					textAlign: 'center',
					color: '#666',
					fontSize: '1.1rem',
				}}>
				Laddar transaktioner...
			</div>
		);
	if (error)
		return (
			<div
				style={{
					maxWidth: '500px',
					margin: '3rem auto',
					padding: '1.5rem',
					color: '#e74c3c',
					background: '#fdf2f2',
					border: '1px solid #fecaca',
					borderRadius: '6px',
					textAlign: 'center',
				}}>
				Fel: {error}
			</div>
		);

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
				Transaction List
			</h2>
			<div
				style={{
					background: '#f9f9ff',
					borderRadius: '16px',
					boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
					padding: '2rem',
				}}>
				{transactions.length === 0 ? (
					<div
						style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
						No transactions
					</div>
				) : (
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
						{transactions.map((t, i) => (
							<div
								key={i}
								style={{
									border: '1px solid #e0e0e0',
									borderRadius: '8px',
									padding: '1rem',
									fontSize: '1rem',
									color: '#222',
									background: 'white',
									textAlign: 'center',
									boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
								}}>
								{t.from} → {t.to}:{' '}
								<span style={{ fontWeight: 600, color: '#4f5bd5' }}>
									{t.amount} coins
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TransactionList;
