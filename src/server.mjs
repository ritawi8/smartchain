import { app } from './app.mjs';
import mongoose from 'mongoose';
import blockchainRoutes from './routes/blockchain-routes.mjs';
import transactionRoutes from './routes/transaction-routes.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';
import { transactionPool } from './models/wallet/TransactionPool.mjs';
import PubSub from './pubsub.mjs';
import userRoutes from './auth/user-routes.mjs';
import User from './auth/UserModel.mjs';
import { connectDB } from './database/connection.mjs';

export const blockChain = new Blockchain();

const DEFAULT_PORT = 3000;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

// Sätt PORT beroende på om du vill ha flera noder
let PORT = DEFAULT_PORT;
if (process.env.GENERATE_NODE_PORT === 'true') {
	PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

app.use('/api/blocks', blockchainRoutes);
app.use('/api/wallet', transactionRoutes);
app.use('/api/users', userRoutes);

// Synkronisering mellan noder (valfritt, kan kommenteras bort om du inte kör flera noder)
const synchronize = async () => {
	let response = await fetch(`${ROOT_NODE}/api/blocks`);
	if (response) {
		const result = await response.json();
		blockChain.replaceChain(result.data);
	}

	response = await fetch(`${ROOT_NODE}/api/wallet/transactions`);
	if (response) {
		const result = await response.json();
		if (typeof transactionPool.replaceMap === 'function') {
			transactionPool.replaceMap(result.data);
		}
	}
};

app.listen(PORT, () => {
	console.log(
		`Servern är startad på adress ${PORT} och kör i läget ${
			process.env.NODE_ENV || 'development'
		}`
	);

	if (PORT !== DEFAULT_PORT) {
		synchronize();
	}
});

// Anslut till MongoDB
await connectDB();

const pubsub = new PubSub({ blockchain: blockChain, transactionPool });
export { pubsub };
