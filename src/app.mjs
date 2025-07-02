import dotenv from 'dotenv';
import express from 'express';
import blockchainRoutes from './routes/blockchain-routes.mjs';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Servern är igång!');
});

app.use('/', blockchainRoutes);

export { app };
