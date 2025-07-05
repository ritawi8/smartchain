const API_BASE_URL = '/api/wallet';

export async function getTransactions() {
	console.log('Hämtar transaktioner från:', `${API_BASE_URL}/transactions`);
	const token = localStorage.getItem('token');
	console.log('Token som skickas:', token);
	const response = await fetch(`${API_BASE_URL}/transactions`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	console.log('Response från fetch:', response);
	const data = await response.json();
	console.log('Data från fetch:', data);
	if (!response.ok)
		throw new Error(data.message || 'Kunde inte hämta transaktioner');
	return data;
}
