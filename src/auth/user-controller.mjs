import User from './UserModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hemlig_nyckel';

export const register = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).json({ message: 'Alla fält krävs' });

	const existing = await User.findOne({ username });
	if (existing)
		return res.status(400).json({ message: 'Användarnamnet är upptaget' });

	const hash = await bcrypt.hash(password, 10);
	const user = await User.create({ username, password: hash });
	res.status(201).json({
		message: 'Användare skapad',
		user: { username: user.username, role: user.role },
	});
};

export const login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user)
		return res.status(400).json({ message: 'Fel användarnamn eller lösenord' });

	const valid = await bcrypt.compare(password, user.password);
	if (!valid)
		return res.status(400).json({ message: 'Fel användarnamn eller lösenord' });

	const token = jwt.sign(
		{ id: user._id, username: user.username, role: user.role },
		JWT_SECRET,
		{ expiresIn: '1d' }
	);
	res.json({ message: 'Inloggad', token });
};
