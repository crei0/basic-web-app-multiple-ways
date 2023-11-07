import { Outlet } from 'react-router-dom';

function TransactionsWrapper() {
    return (
        <>
            <h1>Transactions</h1>

            <Outlet />
        </>
    );
}

export default TransactionsWrapper;