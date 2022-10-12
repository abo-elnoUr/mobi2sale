import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoresService } from 'src/app/core/services/stores.service';
import { ToastrService } from 'ngx-toastr';

import { Supplier } from './../../../models/supplier';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = []
  addSupplierForm: FormGroup
  editSupplierForm: FormGroup
  governorate: any[] = []
  countrys: any[] = []
  supplierId: string = ''
  imageUrl : string = 'http://algosys-001-site8.ctempurl.com/'
  supplier!: Supplier

  constructor(private _StoresService:StoresService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.addSupplierForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile1: new FormControl('', Validators.required),
      mobile2: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      taxRecordNumber: new FormControl('', Validators.required),
      tradeRecordNumber: new FormControl('', Validators.required),
      taxRecordUrl: new FormControl('', Validators.required),
      tradeRecordUrl: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    this.editSupplierForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile1: new FormControl('', Validators.required),
      mobile2: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      taxRecordNumber: new FormControl('', Validators.required),
      tradeRecordNumber: new FormControl('', Validators.required),
      taxRecordUrl: new FormControl('', Validators.required),
      tradeRecordUrl: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    // call functions
    this.getCountry()
    this.getSuppliers()
  }

  // get country
  getCountry(){
    this._StoresService.getCountry().subscribe((country) => {
      this.countrys = country
    })
  }

  // get all suppliers
  getSuppliers(){
    this._StoresService.getSuppliers().subscribe((supplier) => {
      this.suppliers = supplier
    })
  }

  // get one supplier
  getOneSupplier(id: string){
    this._StoresService.getOneSupplier(id).subscribe((supplier) => {
      this.supplierId = supplier.id
      this.supplier = supplier
      this.editSupplierForm.patchValue({
        name: supplier.name,
        email: supplier.email,
        mobile1: supplier.mobile1,
        mobile2: supplier.mobile2,
        phone: supplier.phone,
        fax: supplier.fax,
        taxRecordNumber: supplier.taxRecordNumber,
        tradeRecordNumber: supplier.tradeRecordNumber,
        taxRecordUrl: supplier.taxRecordUrl,
        tradeRecordUrl: supplier.tradeRecordUrl,
        address: supplier.address,
        countryId: supplier.countryId
      })
    })
  }


  // add supplier
  onAddSelectCountry(event: any){
    const contry = event.target.value
    this.addSupplierForm.get('countryId').setValue(contry)
  }

  onPickImageTax(event: any){
    const imgFile = event.target.files[0]
    this.addSupplierForm.get('taxRecordUrl').setValue(imgFile)

  }

  onPickImageTrade(event: any){
    const imgFile2 = event.target.files[0]
    this.addSupplierForm.get('tradeRecordUrl').setValue(imgFile2)
  }

  addSupplier(){
    const supplierForm = new FormData()
    supplierForm.append('name', this.addSupplierForm.get('name').getRawValue())
    supplierForm.append('email', this.addSupplierForm.get('email').getRawValue())
    supplierForm.append('mobile1', this.addSupplierForm.get('mobile1').getRawValue())
    supplierForm.append('mobile2', this.addSupplierForm.get('mobile2').getRawValue())
    supplierForm.append('phone', this.addSupplierForm.get('phone').getRawValue())
    supplierForm.append('fax', this.addSupplierForm.get('fax').getRawValue())
    supplierForm.append('taxRecordNumber', this.addSupplierForm.get('taxRecordNumber').getRawValue())
    supplierForm.append('tradeRecordNumber', this.addSupplierForm.get('tradeRecordNumber').getRawValue())
    supplierForm.append('taxRecordUrl', this.addSupplierForm.get('taxRecordUrl').getRawValue())
    supplierForm.append('tradeRecordUrl', this.addSupplierForm.get('tradeRecordUrl').getRawValue())
    supplierForm.append('address', this.addSupplierForm.get('address').getRawValue())
    supplierForm.append('countryId', this.addSupplierForm.get('countryId').getRawValue())

    this._StoresService.addSupplier(supplierForm).subscribe((supplier) => {
      this._ToastrService.success('supplier added 👍')
      this.getSuppliers()
      this.addSupplierForm.reset()
    },
    (error) => {
      switch (error.status) {
        case 500:
          this._ToastrService.error(error.error.errors as string);
          break
          case 400:
            for (const [key, value] of Object.entries(error.error.errors)) {
                  this._ToastrService.error(value as string);
            }
          break
      }
    },
    () => {})
  }


  // update supplier
  onEditSelectCountry(event: any){
    const contry = event.target.value
    this.editSupplierForm.get('countryId').setValue(contry)
  }

  onEditImageTax(event: any){
    const imgFile = event.target.files[0]
    this.editSupplierForm.get('taxRecordUrl').setValue(imgFile)

  }

  onEditImageTrade(event: any){
    const imgFile2 = event.target.files[0]
    this.editSupplierForm.get('tradeRecordUrl').setValue(imgFile2)
  }

  updateSupplier(){
    const supplierForm = new FormData()
    supplierForm.append('id', this.supplierId)
    supplierForm.append('name', this.editSupplierForm.get('name').getRawValue())
    supplierForm.append('email', this.editSupplierForm.get('email').getRawValue())
    supplierForm.append('mobile1', this.editSupplierForm.get('mobile1').getRawValue())
    supplierForm.append('mobile2', this.editSupplierForm.get('mobile2').getRawValue())
    supplierForm.append('phone', this.editSupplierForm.get('phone').getRawValue())
    supplierForm.append('fax', this.editSupplierForm.get('fax').getRawValue())
    supplierForm.append('taxRecordNumber', this.editSupplierForm.get('taxRecordNumber').getRawValue())
    supplierForm.append('tradeRecordNumber', this.editSupplierForm.get('tradeRecordNumber').getRawValue())
    supplierForm.append('taxRecordUrl', this.editSupplierForm.get('taxRecordUrl').getRawValue())
    supplierForm.append('tradeRecordUrl', this.editSupplierForm.get('tradeRecordUrl').getRawValue())
    supplierForm.append('address', this.editSupplierForm.get('address').getRawValue())
    supplierForm.append('countryId', this.editSupplierForm.get('countryId').getRawValue())

    this._StoresService.updateSupplier(supplierForm, this.supplierId).subscribe((supp) => {
      this._ToastrService.info('supplier updated 👏')
      this.getSuppliers()
      this.editSupplierForm.reset()
    },
    (error) => {
      switch (error.status) {
        case 500:
          this._ToastrService.error(error.error.errors as string);
          break
          case 400:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
        }
          break
      }
    },
    () => {})
  }


  // delete supplier
  deleteSupplier(id: string){
    this._StoresService.deleteSupplier(id).subscribe((del) => {
      this._ToastrService.error('supplier deleted 😭')
      this.getSuppliers()
    }, (error) => {
      this._ToastrService.error('error 😭')
    })
  }

}
