import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hemlig_nyckel';

export const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ message: 'Ingen token' });

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Ogiltig token' });
	}
};
