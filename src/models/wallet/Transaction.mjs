import { v4 as uuidv4 } from 'uuid';

export default class Transaction {
	constructor({ from, to, amount }) {
		this.id = uuidv4();
		this.from = from; // Avsändare (kan vara adress eller användarnamn)
		this.to = to; // Mottagare
		this.amount = amount; // Belopp
		this.timestamp = Date.now();
	}

	// Enkel validering: beloppet måste vara positivt och det måste finnas avsändare och mottagare
	static validate(transaction) {
		return (
			transaction &&
			transaction.from &&
			transaction.to &&
			typeof transaction.amount === 'number' &&
			transaction.amount > 0
		);
	}

	// Skapa en belöningstransaktion till minern
	static reward(minerAddress, amount = 10) {
		return new Transaction({
			from: 'BLOCKCHAIN_REWARD',
			to: minerAddress,
			amount,
		});
	}
}
