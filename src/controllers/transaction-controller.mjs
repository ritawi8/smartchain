import Transaction from '../models/wallet/Transaction.mjs';

export function mineTransactions({
	blockchain,
	transactionPool,
	minerAddress,
}) {
	// 1. Hämta alla transaktioner från poolen
	const transactions = transactionPool.getTransactions();

	if (transactions.length === 0) {
		return null; // Inget att mine:a
	}

	// 2. Skapa belöningstransaktion
	const rewardTx = Transaction.reward(minerAddress);

	// 3. Skapa nytt block med alla transaktioner + belöning
	const blockData = [...transactions, rewardTx];
	const newBlock = blockchain.addBlock(blockData);

	// 4. Töm transaktionspoolen
	transactionPool.clear();

	// 5. Returnera det nya blocket
	return newBlock;
}

export const addTransaction = (req, res) => {
	res.json({ message: 'addTransaction fungerar!' });
};

export const listAllTransactions = (req, res) => {
	res.json({ message: 'listAllTransactions fungerar!' });
};
