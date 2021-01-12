import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import TransactionsJSON from '../assets/mock/transactions.json';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  TRANSACTIONS = TransactionsJSON.data;

  private _transactions$ = new BehaviorSubject<any>([]);
  private _search$ = new Subject<void>();
  private _loading$ = new BehaviorSubject<boolean>(true);

  constructor() {
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

  addTransaction(transaction) {
    this.TRANSACTIONS.push(transaction);
    this._search$.next();
    console.log(this.TRANSACTIONS);
  }

  private _search(): Observable<any> {
    const transacactionsObj = JSON.parse(JSON.stringify(this.TRANSACTIONS));
    transacactionsObj.map((res) => {
      const imagePath = res.merchant.name.replace(/\s+/g, '-').toLowerCase();
      res.merchant.imageLogo = imagePath;
    });

    console.log(transacactionsObj);

    let transactions = transacactionsObj;
    console.log(transactions);
    return of(transactions);
  }
}
