import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { OffersComponent } from './offers/offers.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    PromoCodeComponent,
    OffersComponent
  ],
  imports: [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  ClientsRoutingModule
  ]
})
export class ClientsModule { }
