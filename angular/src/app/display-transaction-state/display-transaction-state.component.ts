import { Component, Input } from '@angular/core';

import { TransactionState } from '../utilities/types';
import translations from '../utilities/translations';

@Component({
  selector: 'app-display-transaction-state',
  standalone: true,
  imports: [],
  templateUrl: './display-transaction-state.component.html',
  styleUrl: './display-transaction-state.component.css'
})
export class DisplayTransactionStateComponent {
  @Input() state: TransactionState | string = TransactionState.Unknown;

  text = translations.transactionState[TransactionState.Unknown];

  // TODO: To fix this

  // ngOnInit(){
  //   console.log('display-transaction-state.component.ts #20 > typeof this.state', typeof this.state);

  //   switch (this.state) {
  //     case TransactionState.Paid.toString():
  //       translations.transactionState[TransactionState.Paid]
  //       break;
    
  //     case TransactionState.Refunded.toString():
  //       translations.transactionState[TransactionState.Refunded]
  //       break;

  //     case TransactionState.ToBePaid.toString():
  //       translations.transactionState[TransactionState.ToBePaid]
  //       break;
  //   }
  // }
}
