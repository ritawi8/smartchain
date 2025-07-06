import React from 'react';

const Dashboard = () => {
	return (
		<div style={{ maxWidth: '800px', margin: '3rem auto', padding: '1.5rem' }}>
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
				Welcome to your Dashboard!
			</h2>
			<div
				style={{
					background: '#f9f9ff',
					borderRadius: '16px',
					boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
					padding: '2rem',
					marginTop: '2rem',
				}}>
				<p
					style={{
						fontSize: '1.1rem',
						color: '#666',
						lineHeight: '1.6',
						textAlign: 'center',
						marginBottom: '1.5rem',
					}}>
					Välkommen till SmartChain! Här kan du hantera dina
					blockchain-transaktioner och övervaka nätverket.
				</p>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: '1rem',
						marginTop: '2rem',
					}}>
					<div
						style={{
							background: 'white',
							padding: '1.5rem',
							borderRadius: '8px',
							textAlign: 'center',
							border: '1px solid #e0e0e0',
						}}>
						<h3 style={{ color: '#4f5bd5', marginBottom: '0.5rem' }}>
							Transaktioner
						</h3>
						<p style={{ color: '#666', fontSize: '0.9rem' }}>
							Visa alla transaktioner i nätverket
						</p>
					</div>
					<div
						style={{
							background: 'white',
							padding: '1.5rem',
							borderRadius: '8px',
							textAlign: 'center',
							border: '1px solid #e0e0e0',
						}}>
						<h3 style={{ color: '#4f5bd5', marginBottom: '0.5rem' }}>Skicka</h3>
						<p style={{ color: '#666', fontSize: '0.9rem' }}>
							Skicka nya transaktioner
						</p>
					</div>
					<div
						style={{
							background: 'white',
							padding: '1.5rem',
							borderRadius: '8px',
							textAlign: 'center',
							border: '1px solid #e0e0e0',
						}}>
						<h3 style={{ color: '#4f5bd5', marginBottom: '0.5rem' }}>Block</h3>
						<p style={{ color: '#666', fontSize: '0.9rem' }}>
							Visa blockchain-historik
						</p>
					</div>
					<div
						style={{
							background: 'white',
							padding: '1.5rem',
							borderRadius: '8px',
							textAlign: 'center',
							border: '1px solid #e0e0e0',
						}}>
						<h3 style={{ color: '#4f5bd5', marginBottom: '0.5rem' }}>Mina</h3>
						<p style={{ color: '#666', fontSize: '0.9rem' }}>Mina nya block</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
