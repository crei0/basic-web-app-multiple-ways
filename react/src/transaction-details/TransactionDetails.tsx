import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { PATH, API_PATH } from '../utilities/constants';
import { TransactionDetail } from '../utilities/types';
import { DisplayTransactionState } from '../partials';
import './transaction-details.css';

function TransactionsDetails() {
    const initialData: TransactionDetail = {
        id: '',
        state: 0,
        amount: 0,
        dateUnix: 0,
        cardHolder: '',
        notes: ''
    };

    const [error, setError] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState(initialData);

    let navigate = useNavigate();

    let urlParams = useParams();

    React.useEffect(
        () => {
            if (!urlParams?.transactionId) {
                navigate(PATH.TRANSACTIONS);
            } else {
                fetch(API_PATH.TRANSACTION_DETAILS + '/' + urlParams?.transactionId)
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
        }, []
    );

    if (error) {
        return (
            <div>Error: {error}</div>
        );
    } else if (!isLoaded) {
        return (
            <div>Loading...</div>
        );
    } else {
        if (data) {
            return (
                <div>
                    <Link to={PATH.TRANSACTIONS}>
                        Back
                    </Link>

                    <h2>Transaction: {data.id}</h2>
                    
                    <section id="details">
                        <div className='details-field'>State:</div>
                        <div className='details-value'><DisplayTransactionState state={data.state} /></div>

                        <div className='details-field'>Amount:</div>
                        <div className='details-value'>{data.amount} &euro;</div>

                        <div className='details-field'>Date:</div>
                        <div className='details-value'>{data.dateUnix}</div>

                        <div className='details-field'>Card holder:</div>
                        <div className='details-value'>{data.cardHolder}</div>

                        <div className='details-field'>Notes:</div>
                        <div className='details-value'>{data.notes}</div>
                    </section>
                </div>
            );
        }

        return (
            <div>Transaction data couldn't be found</div>
        );
    }
}

export default TransactionsDetails;