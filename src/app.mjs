import dotenv from 'dotenv';
import express from 'express';
import blockchainRoutes from './routes/blockchain-routes.mjs';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Servern är igång!');
});

app.use('/', blockchainRoutes);

export { app };
