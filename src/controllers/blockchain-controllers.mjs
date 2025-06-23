import Transaction from '../models/wallet/Transaction.mjs';
import blockchain from '../models/blockchain/Blockchain.mjs'; // eller din blockchain-instans
import transactionPool from '../models/wallet/TransactionPool.mjs'; // eller din pool-instans

// Mining-funktion
export const mineBlock = (req, res) => {
	const minerAddress = req.body.minerAddress || 'MINER-123'; // eller hämta från inloggad användare
	const transactions = transactionPool.getTransactions();

	if (transactions.length === 0) {
		return res.status(400).json({ message: 'Inga transaktioner att mine:a' });
	}

	// Skapa belöningstransaktion
	const rewardTx = Transaction.reward(minerAddress);

	// Skapa nytt block med alla transaktioner + belöning
	const blockData = [...transactions, rewardTx];
	const newBlock = blockchain.addBlock(blockData);

	// Töm transaktionspoolen
	transactionPool.clear();

	res.json(newBlock);
};
