import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  addOfferForm: FormGroup
  offers: any[] = []
  constructor() { }

  ngOnInit(): void {
    this.addOfferForm = new FormGroup({
      name : new FormControl('', Validators.required),
      offerPctg : new FormControl('', Validators.required),
      image : new FormControl('', Validators.required),
      isActive : new FormControl(false, Validators.required),
      offerType : new FormControl('', Validators.required),
      offerTargetId : new FormControl([], Validators.required),
    })
  }

  // add offer
  addOffer(){

  }

}
