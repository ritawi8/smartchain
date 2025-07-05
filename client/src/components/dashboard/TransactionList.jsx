import React, { useState, useEffect } from 'react';
import { getTransactions } from '../../api/transactions';

const TransactionList = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	console.log('TransactionList komponenten laddas!');

	useEffect(() => {
		console.log('useEffect körs!');
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

	if (loading) return <div>Laddar transaktioner...</div>;
	if (error) return <div style={{ color: 'red' }}>Fel: {error}</div>;

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
				}}>
				Transaction List
			</h2>
			{transactions.length === 0 ? (
				<div style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
					Inga transaktioner hittades
				</div>
			) : (
				<div
					style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
					{transactions.map((t, i) => (
						<div
							key={i}
							style={{
								border: '1px solid #ddd',
								borderRadius: '6px',
								padding: '0.7rem 1rem',
								fontSize: '1rem',
								color: 'white',
								background: 'rgba(0,0,0,0.10)',
								textAlign: 'center',
							}}>
							{t.from} → {t.to}:{' '}
							<span style={{ fontWeight: 500 }}>{t.amount} coins</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TransactionList;
