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
		<div>
			<h2>Transaction List</h2>
			{transactions.length === 0 ? (
				<div>Inga transaktioner hittades</div>
			) : (
				<ul>
					{transactions.map((t, i) => (
						<li key={i}>
							{t.from} → {t.to}: {t.amount} coins
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TransactionList;
