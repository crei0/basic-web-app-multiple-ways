export enum TransactionState {
	Unknown,
	ToBePaid,
	Paid,
	Refunded
}

export interface Transaction {
	id: string;
	state: TransactionState;
	amount: number;
}

export interface TransactionDetail extends Transaction {
	dateUnix: number;
	cardHolder: String;
	notes?: String;
}

export interface TransactionListData {
	startFromTransactionIndex: number;
    totalTransactionsCount: number;
	numberOfTransactionsPerPage: 5;
    listOfTransactions: Transaction[];
}