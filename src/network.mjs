import PubNub from 'pubnub';

const CHANNELS = {
	BLOCKCHAIN: 'SMARTCHAIN',
};

const credentials = {
	publishKey: process.env.PUB_KEY,
	subscribeKey: process.env.SUB_KEY,
	secretKey: process.env.SEC_KEY,
	userId: process.env.USER_ID,
};

export default class Network {
	constructor({ blockchain }) {
		this.blockchain = blockchain;
		this.pubnub = new PubNub(credentials);

		this.pubnub.subscribe({ channels: [CHANNELS.BLOCKCHAIN] });

		this.pubnub.addListener({
			message: (msgObject) => {
				const { channel, message } = msgObject;
				if (channel === CHANNELS.BLOCKCHAIN) {
					const newChain = JSON.parse(message);
					// Här kan du lägga till logik för att ersätta din kedja om den är längre/giltig
					this.blockchain.replaceChain(newChain);
					console.log('Kedja mottagen och uppdaterad!');
				}
			},
		});
	}

	broadcastChain() {
		this.pubnub.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain.chain),
		});
	}
}
