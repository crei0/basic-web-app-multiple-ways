import {
    component$,
    useStylesScoped$,
    useSignal,
    $,
    useStore,
    useResource$,
    Resource
} from "@builder.io/qwik";

import type { TransactionListData } from '../../utilities/types';
import { API_PATH } from '../../utilities/constants';
import styles from "./transactions-list.css?inline";
import { DisplayTransactionState } from "~/components/partials";

export default component$(() => {
    useStylesScoped$(styles);

    const initialData: TransactionListData = {
        startFromTransactionIndex: 0,
        totalTransactionsCount: 0,
        numberOfTransactionsPerPage: 5,
        listOfTransactions: []
    }

    const error = useSignal('');
    const isLoaded = useSignal(false);
    const data = useSignal(initialData);

    const state = useStore({
        startFromTransactionIndex: 0,
        totalTransactionsCount: 0,
        numberOfTransactionsPerPage: 5,
        listOfTransactions: []
    });

    const dataResource = useResource$(async () => {
        const startFromTransactionIndex = 0;
        const result = await fetch(API_PATH.TRANSACTIONS + '?startFromTransactionIndex=' + startFromTransactionIndex)

        return result.json();
    });

    const goToPage = $((targetPageIndex: number) => {
        // Clamp it
        refreshTheTable(Math.min(Math.max(targetPageIndex, 0), state.totalTransactionsCount));
    });

    const refreshTheTable = $((startFromTransactionIndex: number = 0) => {
        fetch(API_PATH.TRANSACTIONS + '?startFromTransactionIndex=' + startFromTransactionIndex)
            .then(res => res.json())
            .then(
                (result) => {
                    isLoaded.value = true;
                    data.value = result;
                    error.value = '';
                },
                (error) => {
                    isLoaded.value = true;
                    error.value = error.message;
                }
            )
    });

    return (
        <div>
            <Resource
                value={dataResource}
                onPending={() => <div>Loading...</div>}
                onRejected={(reason) => <div>Error: {reason}</div>}
                onResolved={(data) => {
                    if (data.listOfTransactions.length > 0) {
                        return (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Transaction ID</td>
                                            <td>State</td>
                                            <td class='col-aligned-right'>Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.listOfTransactions.map(transaction => (
                                            <tr key={transaction.id}>
                                                <td><a href={transaction.id}>{transaction.id}</a></td>
                                                <td><DisplayTransactionState state={transaction.state} /></td>
                                                <td class='col-aligned-right'>{transaction.amount} &euro;</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <ul id="controls">
                                    <li id="page-counter">{data.totalTransactionsCount} transactions</li>
                                    <li><button onClick$={() => goToPage(0)}>|&lt;</button></li>
                                    <li><button onClick$={() => goToPage(data.startFromTransactionIndex - data.numberOfTransactionsPerPage)}>&lt;</button></li>
                                    <li><button onClick$={() => goToPage(data.startFromTransactionIndex + data.numberOfTransactionsPerPage)}>&gt;</button></li>
                                    <li><button onClick$={() => goToPage(data.totalTransactionsCount - data.numberOfTransactionsPerPage)}>&gt;|</button></li>
                                </ul>
                            </div>
                        );
                    } else {
                        return <div>No transactions were found</div>;
                    }
                }}
            />
        </div>
    );
});
