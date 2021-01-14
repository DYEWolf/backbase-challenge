import { CurrencyPipe } from '@angular/common';
import { OnChanges } from '@angular/core';
import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit, OnChanges {
  totalAccountMoney = 5824.76;
  @Input() balance;
  transferForm: FormGroup;
  @Output() tranferData = new EventEmitter<any>();

  constructor(
    private currencyPipe: CurrencyPipe,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      fromAccount: [
        {
          value: 'Free Checking(4692) - $' + this.balance,
          disabled: true,
        },
      ],
      toAccount: ['', Validators.required],
      amount: ['', Validators.required],
    });

    // this.transferForm.valueChanges.subscribe((val) => {
    //   let number;
    //   let amount = val.amount;
    //   if (amount) {
    //     if (typeof amount === 'string') {
    //       amount = Number(amount.replace(/[^0-9\.]+/g, ''));
    //       console.log(number);
    //     }
    //     console.log(amount);
    //     let transformedAmount = this.currencyPipe.transform(amount);
    //     console.log(transformedAmount);
    //     this.transferForm.patchValue({ amount: transformedAmount });
    //   }
    // });
  }

  ngOnChanges() {
    this.updateBalance(this.balance);
  }

  private updateBalance(balance) {
    if (balance != 5824.76) {
      this.balance = balance;
      this.transferForm.setValue({
        fromAccount: 'Free Checking(4692) - $' + this.balance.toFixed(2),
        toAccount: '',
        amount: '',
      });
    }
  }

  validTransaction() {
    const balance = this.balance - this.transferForm.get('amount').value;
    if (balance > -500) return true;
    return false;
  }

  submitTransfer() {
    const isValidTransaction = this.validTransaction();
    if (isValidTransaction === true) {
      const date = Date.now();
      const amount = this.transferForm.get('amount').value;
      const name = this.transferForm.get('toAccount').value;
      let transactionObject = {
        categoryCode: '#c12020',
        dates: {
          valueDate: date,
        },
        transaction: {
          amountCurrency: {
            amount: amount,
            currencyCode: 'EUR',
          },
          type: 'Online Transfer',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: name,
          accountNumber: 'SI64397745065188826',
        },
      };
      this.tranferData.emit(transactionObject);
    } else {
      this.tranferData.emit(null);
    }
  }
}
