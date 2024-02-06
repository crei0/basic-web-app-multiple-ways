import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { NoMatchComponent } from './no-match/no-match.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'transactions', component: TransactionsListComponent },
    { path: 'transactions/:id', component: TransactionDetailsComponent},

    {path: '**', component: NoMatchComponent }
];
