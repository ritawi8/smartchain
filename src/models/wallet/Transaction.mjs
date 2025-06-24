import { v4 as uuidv4 } from 'uuid';

export default class Transaction {
	constructor({ from, to, amount }) {
		this.id = uuidv4();
		this.from = from; // Avsändare (kan vara adress eller användarnamn)
		this.to = to; // Mottagare
		this.amount = amount; // Belopp
		this.timestamp = Date.now();
	}

	// Enkel validering: beloppet måste vara positivt, det måste finnas avsändare och mottagare, och avsändaren måste ha tillräckligt saldo
	static validate(transaction, blockchain) {
		if (
			!transaction ||
			!transaction.from ||
			!transaction.to ||
			typeof transaction.amount !== 'number' ||
			transaction.amount <= 0
		) {
			return false;
		}

		// Kontrollera saldo (ej för belöningstransaktioner)
		if (transaction.from !== 'BLOCKCHAIN_REWARD') {
			const balance = blockchain.getBalanceOfAddress(transaction.from);
			if (balance < transaction.amount) {
				return false;
			}
		}

		return true;
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
