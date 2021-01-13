import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactionsData;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public transactionsService: TransactionsService) {}

  ngOnInit(): void {}

  onSort({ column, direction }: SortEvent) {
    this.transactionsService.sortColumn = column;
    this.transactionsService.sortDirection = direction;
  }
}
