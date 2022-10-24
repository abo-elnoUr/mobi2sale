import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SalesOpreationsRoutingModule } from './sales-opreations-routing.module';
import { SalesOpreationsComponent } from './sales-opreations.component';
import { ExchangeVoucherComponent } from './exchange-voucher/exchange-voucher.component';
import { IndoorInvoiceComponent } from './indoor-invoice/indoor-invoice.component';
import { OrderExcgangeComponent } from './order-excgange/order-excgange.component';
import { SalesAreaComponent } from './sales-area/sales-area.component';
import { SalesRefundComponent } from './sales-refund/sales-refund.component';


@NgModule({
  declarations: [
    SalesOpreationsComponent,
    ExchangeVoucherComponent,
    IndoorInvoiceComponent,
    OrderExcgangeComponent,
    SalesAreaComponent,
    SalesRefundComponent
  ],
  imports: [
    CommonModule,
    SalesOpreationsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SalesOpreationsModule { }
