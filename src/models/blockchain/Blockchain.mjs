import Block from './Block.mjs';
import { createHash } from '../../utilities/hash.mjs';

export default class Blockchain {
	constructor() {
		// Starta kedjan med genesis-blocket
		this.chain = [Block.genesis()];
	}

	// Hämta senaste blocket i kedjan
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	// Lägg till ett nytt block i kedjan
	addBlock(data) {
		const previousBlock = this.getLatestBlock();
		const newBlock = Block.mineBlock({ previousBlock, data });
		this.chain.push(newBlock);
		return newBlock;
	}

	// Enkel validering: kontrollera att alla block pekar rätt bakåt
	static isValid(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}

		for (let i = 1; i < chain.length; i++) {
			const { timestamp, data, hash, lastHash } = chain[i];
			const prevHash = chain[i - 1].hash;

			if (lastHash !== prevHash) return false;

			const validHash = createHash(timestamp, lastHash, data);
			if (hash !== validHash) return false;
		}

		return true;
	}

	// Byt ut kedjan om den nya är längre och giltig
	replaceChain(newChain) {
		if (newChain.length > this.chain.length && Blockchain.isValid(newChain)) {
			this.chain = newChain;
			return true;
		}
		return false;
	}
}
