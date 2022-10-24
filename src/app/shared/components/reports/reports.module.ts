import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReportsRoutingModule } from './reports-routing.module';
import { ItemTransactionComponent } from './item-transaction/item-transaction.component';
import { SalesmanAccountComponent } from './salesman-account/salesman-account.component';
import { CashReceiptComponent } from './cash-receipt/cash-receipt.component';
import { ReportsComponent } from './reports.component';


@NgModule({
  declarations: [
    ReportsComponent,
    ItemTransactionComponent,
    SalesmanAccountComponent,
    CashReceiptComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ReportsModule { }
