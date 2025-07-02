const API_BASE_URL = 'http://localhost:3000/api/users';

export async function register(userData) {
	const response = await fetch(`${API_BASE_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});
	const data = await response.json();
	if (!response.ok)
		throw new Error(data.message || 'Registrering misslyckades');
	return data;
}

export async function login(credentials) {
	const response = await fetch(`${API_BASE_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.message || 'Inloggning misslyckades');
	return data;
}
