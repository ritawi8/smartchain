import crypto from 'crypto';

export function createHash(...inputs) {
	const hash = crypto.createHash('sha256');
	hash.update(
		inputs
			.map((i) => JSON.stringify(i))
			.sort()
			.join(' ')
	);
	return hash.digest('hex');
}
