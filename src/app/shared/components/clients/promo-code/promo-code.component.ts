import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Client } from 'src/app/shared/models/clients';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css']
})
export class PromoCodeComponent implements OnInit {

  addPromoCodeForm: FormGroup
  clients: Client[] = []
  clients2: Client[] = []
  promocode: any[] = []


  constructor(private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.addPromoCodeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      offerPctg: new FormControl('', Validators.required),
      isActive: new FormControl('', Validators.required),
      promoTargetId: new FormControl([], Validators.required),
      allClients: new FormControl([], Validators.required)
    })
  }

  // add promocode

  onAddSelectClient(event: any){

  }

  removeFromClients(index: number){

  }

  addPromoCode(){

  }

}
