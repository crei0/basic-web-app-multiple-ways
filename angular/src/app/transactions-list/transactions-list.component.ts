import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { PATH, API_PATH } from '../utilities/constants';
import { NgForOf } from '@angular/common';
import { DisplayTransactionStateComponent } from '../display-transaction-state/display-transaction-state.component';
import { Transaction } from '../utilities/types';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [NgForOf, DisplayTransactionStateComponent, RouterLink],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent {
  path = PATH

  startFromTransactionIndex = 0;
  totalTransactionsCount = 0;
  numberOfTransactionsPerPage = 0;
  listOfTransactions: Transaction[] = [];

  isLoaded = false;
  error = '';

  constructor(private http: HttpClient) { }

  refreshTheTable(startFromTransactionIndex: number = 0): void {
    this.http.get<any>(API_PATH.TRANSACTIONS + '?startFromTransactionIndex=' + startFromTransactionIndex).subscribe(result => {
      this.isLoaded = true;
      this.listOfTransactions = result.listOfTransactions
      this.error = '';
    });
  }

  goToPage(targetPageIndex: number): void {
    // Clamp it
    this.refreshTheTable(Math.min(Math.max(targetPageIndex, 0), this.totalTransactionsCount));
  }

  ngOnInit() {
    this.refreshTheTable(0);
  }
}
