import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { SalesOpreationsComponent } from './sales-opreations.component';
import { ExchangeVoucherComponent } from './exchange-voucher/exchange-voucher.component';
import { IndoorInvoiceComponent } from './indoor-invoice/indoor-invoice.component';
import { OrderExcgangeComponent } from './order-excgange/order-excgange.component';
import { SalesAreaComponent } from './sales-area/sales-area.component';
import { SalesRefundComponent } from './sales-refund/sales-refund.component';

const routes: Routes = [
  {path: '', component: SalesOpreationsComponent},
  {path: '', children: [
    {path: 'ExchangeVoucher', component: ExchangeVoucherComponent, canActivate: [AuthGuard]},
    {path: 'IndoorInvoice', component: IndoorInvoiceComponent, canActivate: [AuthGuard]},
    {path: 'OrderExcgange', component: OrderExcgangeComponent, canActivate: [AuthGuard]},
    {path: 'SalesArea', component: SalesAreaComponent, canActivate: [AuthGuard]},
    {path: 'SalesRefund', component: SalesRefundComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOpreationsRoutingModule { }
