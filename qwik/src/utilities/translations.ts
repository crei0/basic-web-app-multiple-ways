import { TransactionState } from "./types";

export const transactionState = {
    [TransactionState.Unknown]: "Unknown",
    [TransactionState.ToBePaid]: "To be paid to the provider",
    [TransactionState.Paid]: "Paid to the provider",
    [TransactionState.Refunded]: "Already refunded to the provider"
};

export default {
    transactionState
}