import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { BrandsComponent } from './shared/components/brands/brands.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'brands/:id', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'departments', loadChildren: () => import('./shared/components/departments/departments-module.module').then(m => m.DepartmentsModuleModule) },
  { path: 'clients', loadChildren: () => import('./shared/components/clients/clients.module').then(m => m.ClientsModule) },
  { path: 'stores', loadChildren: () => import('./shared/components/stores/stores.module').then(m => m.StoresModule) },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
