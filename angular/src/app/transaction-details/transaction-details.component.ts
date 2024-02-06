import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { API_PATH, PATH } from '../utilities/constants';
import { TransactionDetail } from '../utilities/types';
import { DisplayTransactionStateComponent } from '../display-transaction-state/display-transaction-state.component';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [RouterLink, DisplayTransactionStateComponent],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  path = PATH;

  id: string | null = "";

  data: TransactionDetail = {
    id: '',
    state: 0,
    amount: 0,
    dateUnix: 0,
    cardHolder: '',
    notes: ''
  }
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.http.get<any>(API_PATH.TRANSACTION_DETAILS + '/' + this.id).subscribe(result => {
        // console.log('transaction-details.component.ts #34 > result', result);
        this.data = result
      });
    } else {
      this.router.navigate([PATH.TRANSACTIONS]);
    }
  }
}
