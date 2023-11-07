import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

import Navigation from './navigation';
import Dashboard from './dashboard';
import TransactionsWrapper from './transactions-wrapper';
import TransactionsList from './transactions-list';
import TransactionDetails from './transaction-details';
import { PATH } from './utilities/constants';
import './main.css';


function App() {
  return (
    <Router>
      <Navigation />

      <main>
        <Routes>
          <Route path={PATH.MAIN} element={<Dashboard />} />

          <Route
            path={PATH.TRANSACTIONS} element={<TransactionsWrapper />}
          >
            <Route index element={<TransactionsList />} />
            <Route path=":transactionId" element={<TransactionDetails />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function NoMatch() {
  return <div>404 - Page not found!</div>;
}
