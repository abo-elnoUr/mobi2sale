import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';
import { AdditionVoucherComponent } from './addition-voucher/addition-voucher.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    StoresComponent,
    AdditionVoucherComponent,
    SuppliersComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoresRoutingModule
  ]
})
export class StoresModule { }
