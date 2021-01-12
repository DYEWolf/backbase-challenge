import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  transferForm = new FormGroup({
    fromAccount: new FormControl('', Validators.required),
    toAccount: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  submitTransfer() {
    console.log(this.transferForm.value);
  }
}
