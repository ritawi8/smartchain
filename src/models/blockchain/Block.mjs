import { createHash } from '../../utilities/hash.mjs';

export default class Block {
	constructor({ timestamp, hash, lastHash, data }) {
		this.timestamp = timestamp;
		this.hash = hash;
		this.lastHash = lastHash;
		this.data = data;
	}

	// Skapa genesis-blocket (första blocket i kedjan)
	static genesis() {
		return new this({
			timestamp: Date.now(),
			hash: 'genesis-hash',
			lastHash: '----',
			data: 'Genesis Block',
		});
	}

	// Skapa ett nytt block baserat på det senaste blocket
	static mineBlock({ previousBlock, data }) {
		const timestamp = Date.now();
		const lastHash = previousBlock.hash;
		const hash = createHash(timestamp, lastHash, data);
		return new this({ timestamp, hash, lastHash, data });
	}
}
