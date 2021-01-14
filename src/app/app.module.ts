import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { NgbdSortableHeader } from './sortable.directive';
import { PreviewScreenComponent } from './preview-screen/preview-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    TransactionsTableComponent,
    HeaderComponent,
    NgbdSortableHeader,
    PreviewScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [DecimalPipe, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
