import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Servern är igång!');
});

export { app };
