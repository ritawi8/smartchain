import PubNub from 'pubnub';
import dotenv from 'dotenv';

dotenv.config();

const pubnub = new PubNub({
	publishKey: process.env.PUBNUB_PUBLISH_KEY,
	subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
	userId:
		process.env.PUBNUB_USER_ID || 'node-' + Math.floor(Math.random() * 10000),
});

const CHANNELS = {
	BLOCK: 'BLOCK',
	TRANSACTION: 'TRANSACTION',
};

export default class PubSub {
	constructor({ blockchain, transactionPool }) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;

		pubnub.subscribe({ channels: Object.values(CHANNELS) });

		pubnub.addListener({
			message: (msg) => this.handleMessage(msg),
		});
	}

	handleMessage({ channel, message }) {
		if (channel === CHANNELS.BLOCK) {
			this.blockchain.replaceChain(message.chain);
		} else if (channel === CHANNELS.TRANSACTION) {
			this.transactionPool.addTransaction(message.transaction);
		}
	}

	broadcastBlock(blockchain) {
		pubnub.publish({
			channel: CHANNELS.BLOCK,
			message: { chain: blockchain.chain },
		});
	}

	broadcastTransaction(transaction) {
		pubnub.publish({
			channel: CHANNELS.TRANSACTION,
			message: { transaction },
		});
	}
}
