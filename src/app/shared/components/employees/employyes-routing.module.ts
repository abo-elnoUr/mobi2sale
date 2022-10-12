import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { EmployeesComponent } from './employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { SalesManComponent } from './sales-man/sales-man.component';

const routes: Routes = [
  {path: '', component: EmployeesComponent},
  {path: '', children: [
    {path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
    {path: 'salesMan', component: SalesManComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployyesRoutingModule { }
