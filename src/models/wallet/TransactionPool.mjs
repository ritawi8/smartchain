import Transaction from './Transaction.mjs';

export default class TransactionPool {
	constructor() {
		this.transactions = [];
	}

	// Lägg till en transaktion i poolen
	addTransaction(transaction) {
		this.transactions.push(transaction);
	}

	// Ta bort alla transaktioner (t.ex. efter mining)
	clear() {
		this.transactions = [];
	}

	// Hämta alla transaktioner
	getTransactions() {
		return this.transactions;
	}

	// Kolla om en transaktion redan finns (t.ex. via id)
	transactionExists(id) {
		return this.transactions.some((tx) => tx.id === id);
	}
}
