import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { StoresComponent } from './stores.component';
import { AdditionVoucherComponent } from './addition-voucher/addition-voucher.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: '', component: StoresComponent},
  {path: '', children: [
    {path: 'addtionVoucher', component: AdditionVoucherComponent, canActivate: [AuthGuard]},
    {path: 'suppliers', component: SuppliersComponent, canActivate: [AuthGuard]},
    {path: 'account/:id', component: AccountComponent, canActivate: [AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
