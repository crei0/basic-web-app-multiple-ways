import React from 'react';
import { Link } from 'react-router-dom';

import { TransactionListData } from '../utilities/types';
import { API_PATH } from '../utilities/constants';
import { DisplayTransactionState } from '../partials'
import './transactions-list.css';

function TransactionsList(): React.ReactElement {
    const initialData: TransactionListData = {
        startFromTransactionIndex: 0,
        totalTransactionsCount: 0,
        numberOfTransactionsPerPage: 5,
        listOfTransactions: []
    }

    const [error, setError] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState(initialData);

    const {
        startFromTransactionIndex,
        totalTransactionsCount,
        numberOfTransactionsPerPage,
        listOfTransactions
    } = data;


    function goToPage(targetPageIndex: number): void {
        // Clamp it
        refreshTheTable(Math.min(Math.max(targetPageIndex, 0), totalTransactionsCount));
    }

    function refreshTheTable(startFromTransactionIndex: number = 0): void {
        fetch(API_PATH.TRANSACTIONS + '?startFromTransactionIndex=' + startFromTransactionIndex)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }

    React.useEffect(
        () => {
            refreshTheTable()
        }, []
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (listOfTransactions?.length > 0) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Transaction ID</td>
                            <td>State</td>
                            <td className='col-aligned-right'>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfTransactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td><Link to={transaction.id}>{transaction.id}</Link></td>
                                <td><DisplayTransactionState state={transaction.state} /></td>
                                <td className='col-aligned-right'>{transaction.amount} &euro;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ul id="controls">
                    <li id="page-counter">{totalTransactionsCount} transactions</li>
                    <li><button onClick={() => goToPage(0)}>|&lt;</button></li>
                    <li><button onClick={() => goToPage(startFromTransactionIndex - numberOfTransactionsPerPage)}>&lt;</button></li>
                    <li><button onClick={() => goToPage(startFromTransactionIndex + numberOfTransactionsPerPage)}>&gt;</button></li>
                    <li><button onClick={() => goToPage(totalTransactionsCount - numberOfTransactionsPerPage)}>&gt;|</button></li>
                </ul>
            </div >
        );
    } else {
        return <div>No transactions were found</div>;
    }
}

export default TransactionsList;