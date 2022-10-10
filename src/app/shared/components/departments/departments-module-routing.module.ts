import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { DepartmentsComponent } from './departments.component';
import { BranchRefundComponent } from './branch-refund/branch-refund.component';
import { BranchComponent } from './branch/branch.component';
import { DepartmentComponent } from './department/department.component';
import { SupDepartmentComponent } from './sup-department/sup-department.component';

const routes: Routes = [
  {path: '', component: DepartmentsComponent},
  {path: '', children: [
    {path: 'department', component: DepartmentComponent, canActivate: [AuthGuard]},
    {path: 'subDepartment', component: SupDepartmentComponent, canActivate: [AuthGuard]},
    {path: 'branch', component: BranchComponent, canActivate: [AuthGuard]},
    {path: 'branchRefund', component: BranchRefundComponent, canActivate: [AuthGuard]}
  ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class DepartmentsModuleRoutingModule { }
