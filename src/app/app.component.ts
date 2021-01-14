import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  transactions$: Observable<any>;
  transferData;

  balance = 5824.76;

  constructor(
    public transactionsService: TransactionsService,
    private modalService: ModalService
  ) {
    this.transactions$ = transactionsService.transactions$;
  }

  open() {
    this.modalService.open();
  }

  onTransferData(transferData) {
    if (transferData) {
      this.transferData = transferData;
      this.modalService.open();
    } else {
      this.transferData = null;
      this.modalService.open();
    }
  }

  onConfirmTransaction(confirm) {
    this.balance =
      this.balance - this.transferData.transaction.amountCurrency.amount;
    this.transactionsService.addTransaction(this.transferData);
  }
}
