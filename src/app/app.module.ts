import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbdSortableHeader } from './sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    TransactionsTableComponent,
    HeaderComponent,
    NgbdSortableHeader,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
