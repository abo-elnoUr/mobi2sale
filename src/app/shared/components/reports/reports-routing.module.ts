import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ReportsComponent } from './reports.component';
import { ItemTransactionComponent } from './item-transaction/item-transaction.component';
import { SalesmanAccountComponent } from './salesman-account/salesman-account.component';
import { CashReceiptComponent } from './cash-receipt/cash-receipt.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  {
    path: '', children: [
      { path: 'itemTrnsaction', component: ItemTransactionComponent, canActivate: [AuthGuard] },
      { path: 'salesmanAccount', component: SalesmanAccountComponent, canActivate: [AuthGuard] },
      { path: 'cashReceipt', component: CashReceiptComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
