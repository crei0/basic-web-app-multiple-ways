import React from 'react';

import { API_PATH } from '../utilities/constants';
import './dashboard.css';

function Dashboard() {
    const initialData = {
        totalTransactionsCount: 0
    };

    const [error, setError] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState(initialData);


    React.useEffect(
        () => {
            fetch(API_PATH.DASHBOARD)
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
        }, []
    );

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (data) {
            return (
                <div>
                    <h1>Dashboard</h1>

                    <div>
                        <div>Total transactions count:</div>
                        <div>{data.totalTransactionsCount}</div>
                    </div>
                </div>
            );
        }

        return (
            <div>Dashboard data couldn't be loaded</div>
        );
    }
}

export default Dashboard;