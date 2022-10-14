import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DepartmentsComponent } from './departments.component';
import { DepartmentsModuleRoutingModule } from './departments-module-routing.module';
import { BrandsComponent } from './../brands/brands.component';
import { BranchRefundComponent } from './branch-refund/branch-refund.component';
import { DepartmentComponent } from './department/department.component';
import { SupDepartmentComponent } from './sup-department/sup-department.component';
import { BranchComponent } from './branch/branch.component';
import { BranchRefundToStoreComponent } from './branch-refund-to-store/branch-refund-to-store.component';


@NgModule({
  declarations: [
    DepartmentsComponent,
    BrandsComponent,
    BranchRefundComponent,
    DepartmentComponent,
    BranchComponent,
    SupDepartmentComponent,
    BranchRefundToStoreComponent
  ],
  imports: [
CommonModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  DepartmentsModuleRoutingModule
  ]
})
export class DepartmentsModuleModule { }
