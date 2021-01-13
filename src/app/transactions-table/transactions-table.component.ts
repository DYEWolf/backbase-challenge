import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactionsData;

  constructor(public transactionsService: TransactionsService) {}

  ngOnInit(): void {}
}
