import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { BrandsComponent } from './shared/components/brands/brands.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ItemsComponent } from './shared/components/items/items.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'brands/:id', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'items/:id', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'departments', loadChildren: () => import('./shared/components/departments/departments-module.module').then(m => m.DepartmentsModuleModule) },
  { path: 'clients', loadChildren: () => import('./shared/components/clients/clients.module').then(m => m.ClientsModule) },
  { path: 'salesOpreations', loadChildren: () => import('./shared/components/sales-opreations/sales-opreations.module').then(m => m.SalesOpreationsModule) },
  { path: 'stores', loadChildren: () => import('./shared/components/stores/stores.module').then(m => m.StoresModule) },
  { path: 'employees', loadChildren: () => import('./shared/components/employees/employyes.module').then(m => m.EmployyesModule) },
  { path: 'reports', loadChildren: () => import('./shared/components/reports/reports.module').then(m => m.ReportsModule) },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
