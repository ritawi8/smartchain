import Transaction from '../../models/wallet/Transaction.mjs';

export default class Miner {
	constructor({ blockchain, transactionPool, BlockModel, pubsub }) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.BlockModel = BlockModel;
		this.pubsub = pubsub;
	}

	async mine(minerAddress = 'MINER_ADDRESS') {
		const transactions = this.transactionPool.getTransactions();
		if (transactions.length === 0) {
			return { error: 'Inga transaktioner att mine:a' };
		}

		// Skapa belöningstransaktion
		const rewardTx = Transaction.reward(minerAddress);
		const blockData = [...transactions, rewardTx];
		const newBlock = this.blockchain.addBlock(blockData);

		// Spara blocket i databasen
		await this.BlockModel.create({
			timestamp: newBlock.timestamp,
			hash: newBlock.hash,
			lastHash: newBlock.lastHash,
			data: newBlock.data,
		});

		// Töm transaktionspoolen
		this.transactionPool.clear();

		// Broadcast blocket
		if (this.pubsub) {
			this.pubsub.broadcastBlock(this.blockchain);
		}

		return { message: 'Block sparat!', block: newBlock };
	}
}
