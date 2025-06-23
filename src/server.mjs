import { app } from './app.mjs';
import mongoose from 'mongoose';
import Blockchain from './models/blockchain/Blockchain.mjs';
import TransactionPool from './models/wallet/TransactionPool.mjs';

let PORT = process.env.PORT || 3000;

// Om du kör med npm run dev-node, generera en slumpad port
if (process.env.GENERATE_NODE_PORT === 'true') {
	PORT = 3000 + Math.floor(Math.random() * 1000); // t.ex. 3000-3999
}

app.listen(PORT, () => {
	console.log(`Servern körs på port ${PORT}`);
});

// Anslut till MongoDB
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('✅ Ansluten till MongoDB!'))
	.catch((err) => console.error('❌ Fel vid anslutning till MongoDB:', err));
