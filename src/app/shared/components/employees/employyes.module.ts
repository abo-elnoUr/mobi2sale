import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployyesRoutingModule } from './employyes-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { SalesManComponent } from './sales-man/sales-man.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    SalesManComponent
  ],
  imports: [
    CommonModule,
    EmployyesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class EmployyesModule { }
