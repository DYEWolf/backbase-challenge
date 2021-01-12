import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { TransactionsService } from './transactions.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  transactions$: Observable<any>;

  logo = 'backbase';
  date = 1600387200000;
  color = "#12a580";

  constructor(public transactionsService: TransactionsService) {
    this.transactions$ = transactionsService.transactions$;
    console.log('here',this.transactions$)
  }

  addNewTransaction() {
    let color = this.color;
    let date = this.date;
    let name = this.logo;
    const obj = { "categoryCode": color, "dates": {"valueDate": date}, "merchant": {"name": name}}
    console.log(obj)
    this.transactionsService.addTransaction(obj)
  } 
  
}
