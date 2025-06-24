import express from 'express';
import { register, login } from './user-controller.mjs';
import User from './UserModel.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/all', async (req, res) => {
	const users = await User.find();
	res.json(users);
});

export default router;
