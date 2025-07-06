import React, { useState, useEffect } from 'react';

const BlockList = () => {
	const [blocks, setBlocks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBlocks = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch('/api/blocks');
				const data = await response.json();
				setBlocks(data.data || []);
			} catch {
				setError('Kunde inte hämta block');
			} finally {
				setLoading(false);
			}
		};
		fetchBlocks();
	}, []);

	if (loading) return <div>Laddar block...</div>;
	if (error) return <div style={{ color: 'red' }}>{error}</div>;

	return (
		<div style={{ maxWidth: 800, margin: '2rem auto', padding: '1.5rem' }}>
			<h2
				style={{
					textAlign: 'center',
					fontWeight: 600,
					fontSize: '2rem',
					marginBottom: '1.2rem',
					borderBottom: '1px solid #ccc',
					paddingBottom: '0.3rem',
					color: 'black',
				}}>
				Blocks
			</h2>
			{blocks.length === 0 ? (
				<div style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
					Inga block hittades
				</div>
			) : (
				<div
					style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
					{blocks.map((block, i) => (
						<div
							key={block.hash || i}
							style={{
								border: '1px solid #ddd',
								borderRadius: '8px',
								padding: '1.5rem',
								background: '#f9f9ff',
								marginBottom: '2rem',
							}}>
							<div
								style={{
									fontWeight: 700,
									fontSize: '1.1rem',
									marginBottom: 6,
								}}>
								Block #{block.index}
							</div>
							<div
								style={{ fontSize: '0.95rem', color: '#555', marginBottom: 2 }}>
								<span style={{ fontWeight: 700 }}>Hash:</span>
								<span style={{ fontFamily: 'monospace' }}>{block.hash}</span>
							</div>
							<div
								style={{ fontSize: '0.95rem', color: '#555', marginBottom: 2 }}>
								<span style={{ fontWeight: 700 }}>Previous:</span>
								<span style={{ fontFamily: 'monospace' }}>
									{block.lastHash || '----'}
								</span>
							</div>
							<div
								style={{ fontSize: '0.95rem', color: '#555', marginBottom: 8 }}>
								<span style={{ fontWeight: 700 }}>Timestamp:</span>
								{block.timestamp
									? new Date(block.timestamp).toLocaleString('sv-SE')
									: 'N/A'}
							</div>
							<div style={{ marginTop: 8 }}>
								<div style={{ fontWeight: 500, marginBottom: 2 }}>
									Transaktioner:
								</div>
								{block.data && block.data.length > 0 ? (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '0.3rem',
											marginTop: 4,
										}}>
										{block.data.map((tx, j) => (
											<div
												key={j}
												style={{
													fontSize: '1rem',
													color: '#222',
													textAlign: 'left',
													marginLeft: 0,
												}}>
												{tx.from} → {tx.to}:{' '}
												<span style={{ fontWeight: 600 }}>
													{tx.amount} coins
												</span>
											</div>
										))}
									</div>
								) : (
									<div style={{ color: '#888', fontSize: '0.95rem' }}>
										Inga transaktioner i detta block
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BlockList;
