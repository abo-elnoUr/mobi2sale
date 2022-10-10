import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { OffersComponent } from './offers/offers.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';

const routes: Routes = [
  {path: '', component: ClientsComponent},
  {path: '', children: [
    {path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
    {path: 'promoCode', component: PromoCodeComponent, canActivate: [AuthGuard]},
    {path: 'offers', component: OffersComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ClientsRoutingModule { }
