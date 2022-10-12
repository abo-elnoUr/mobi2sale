import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/core/services/stores.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Supplier } from './../../../models/supplier';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  supplierReport: any = []
  supplierId : string = ''
  suppliers?: Supplier
  reportForm: FormGroup


  constructor(private _StoresService:StoresService, private _ActivatedRoute: ActivatedRoute) {
    this.supplierId = this._ActivatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {

    this.reportForm = new FormGroup({
      supplierId : new FormControl('', Validators.required),
      satrtDateFiltr : new FormControl(''),
      endtDateFiltr : new FormControl('')
    })

    // call functions
    this.getSupplierById()
  }

  // get supplier by id
  getSupplierById(){
    this._StoresService.getOneSupplier(this.supplierId).subscribe((suppplier) => {
      this.suppliers = suppplier
    })
  }

  // get supplier reports
  getReports(){
    this.reportForm.get('supplierId').setValue(this.supplierId)
    this._StoresService.getReports(this.reportForm.value).subscribe((reports) => {
      this.supplierReport = reports.data
      this.getSupplierById()
      this.reportForm.reset()
    })
  }



}
