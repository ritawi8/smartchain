import Transaction from '../models/wallet/Transaction.mjs';
import { transactionPool } from '../models/wallet/TransactionPool.mjs';
import { blockChain } from '../server.mjs';
import BlockModel from '../models/BlockModel.mjs'; // justera sökvägen om det behövs

export const mineTransactions = async (req, res) => {
	try {
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

		// Spara blocket i databasen!
		await BlockModel.create({
			timestamp: newBlock.timestamp,
			hash: newBlock.hash,
			lastHash: newBlock.lastHash,
			data: newBlock.data,
		});

		// Töm transaktionspoolen
		transactionPool.clear();

		// Returnera det nya blocket
		return res.json({ message: 'Block sparat!', block: newBlock });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Fel vid mining/block-sparande' });
	}
};

export const addTransaction = (req, res) => {
	const { from, to, amount } = req.body;
	const transaction = new Transaction({ from, to, amount });

	if (!Transaction.validate(transaction, blockChain)) {
		return res.status(400).json({ message: 'Ogiltig transaktion!' });
	}

	transactionPool.addTransaction(transaction);
	res.status(201).json({ message: 'Transaktion tillagd!', transaction });
};

export const listAllTransactions = (req, res) => {
	res.json({ message: 'listAllTransactions fungerar!' });
};
