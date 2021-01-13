import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import TransactionsJSON from '../assets/mock/transactions.json';

import { SortColumn, SortDirection } from './sortable.directive';

interface State {
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(transactions, column: SortColumn, direction: string) {
  if (direction === '' || column === '') {
    return transactions;
  } else {
    return [...transactions].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(transaction, term: string, pipe: PipeTransform) {
  return transaction.merchant.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  TRANSACTIONS = TransactionsJSON.data;

  private _transactions$ = new BehaviorSubject<any>([]);
  private _search$ = new Subject<void>();
  private _loading$ = new BehaviorSubject<boolean>(true);

  private _state: State = {
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(20),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._transactions$.next(result);
        console.log('subs', this._transactions$);
        console.log(result);
      });

    this._search$.next();
  }

  get transactions$() {
    return this._transactions$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  addTransaction(transaction) {
    this.TRANSACTIONS.push(transaction);
    this._search$.next();
    console.log(this.TRANSACTIONS);
  }

  private _search(): Observable<any> {
    const { searchTerm, sortColumn, sortDirection } = this._state;

    let transacactionsObj = JSON.parse(JSON.stringify(this.TRANSACTIONS));
    transacactionsObj.map((res) => {
      const imagePath = res.merchant.name.replace(/\s+/g, '-').toLowerCase();
      res.merchant.imageLogo = imagePath;
    });

    // 1. sort
    let transactions = sort(transacactionsObj, sortColumn, sortDirection);

    // 2. filter
    transactions = transactions.filter((transaction) =>
      matches(transaction, searchTerm, this.pipe)
    );

    console.log(transacactionsObj);
    console.log(transactions);

    // let transactions = transacactionsObj;
    console.log(transactions);
    return of(transactions);
  }
}
