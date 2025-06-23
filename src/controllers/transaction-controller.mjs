import Transaction from '../models/wallet/Transaction.mjs';
import { transactionPool } from '../models/wallet/TransactionPool.mjs';
import { blockChain } from '../server.mjs';

export const mineTransactions = (req, res) => {
	// Hämta instanserna direkt från importerna
	const transactions = transactionPool.getTransactions();

	if (transactions.length === 0) {
		return res.status(400).json({ message: 'Inga transaktioner att mine:a' });
	}

	// Skapa belöningstransaktion
	const rewardTx = Transaction.reward('MINER_ADDRESS'); // byt ut mot riktig adress

	// Skapa nytt block med alla transaktioner + belöning
	const blockData = [...transactions, rewardTx];
	const newBlock = blockChain.addBlock(blockData);

	// Töm transaktionspoolen
	transactionPool.clear();

	// Returnera det nya blocket
	return res.json({ block: newBlock });
};

export const addTransaction = (req, res) => {
	const { from, to, amount } = req.body;

	// Enkel validering
	if (!from || !to || typeof amount !== 'number') {
		return res.status(400).json({ message: 'Felaktig data' });
	}

	// Skapa ny transaktion
	const transaction = new Transaction({ from, to, amount });

	// Lägg till i poolen
	transactionPool.addTransaction(transaction);

	res.status(201).json({ message: 'Transaktion tillagd!', transaction });
};

export const listAllTransactions = (req, res) => {
	res.json({ message: 'listAllTransactions fungerar!' });
};
