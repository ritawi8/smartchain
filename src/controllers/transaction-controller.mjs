import Transaction from '../models/wallet/Transaction.mjs';
import { transactionPool } from '../models/wallet/TransactionPool.mjs';
import { blockChain } from '../server.mjs';
import BlockModel from '../models/blockchain/BlockModel.mjs';
import { pubsub } from '../server.mjs';
import Miner from '../models/miner/Miner.mjs';

export const mineTransactions = async (req, res) => {
	try {
		const miner = new Miner({
			blockchain: blockChain,
			transactionPool,
			BlockModel,
			pubsub,
		});
		const result = await miner.mine('MINER_ADDRESS');
		if (result.error) {
			return res.status(400).json({ message: result.error });
		}
		res.json(result);
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
	pubsub.broadcastTransaction(transaction);

	res.status(201).json({ message: 'Transaktion tillagd!', transaction });
};

export const listAllTransactions = (req, res) => {
	const transactions = transactionPool.getTransactions();
	res.json({ transactions });
};
