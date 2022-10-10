import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StoresService } from 'src/app/core/services/stores.service';

import { AdditionVoucher } from './../../../models/additionVoucher';
import { Employee } from './../../../models/employee';
import { Supplier } from './../../../models/supplier';
import { SubDepartment } from './../../../models/subDepartment';

@Component({
  selector: 'app-addition-voucher',
  templateUrl: './addition-voucher.component.html',
  styleUrls: ['./addition-voucher.component.css']
})
export class AdditionVoucherComponent implements OnInit {

  addAdditionVoucherForm: FormGroup
  additionVoucher: AdditionVoucher[] = []
  employees: Employee[] = []
  supliers: Supplier[] = []
  stores: SubDepartment[] = []
  categoryes :any[] = []

  constructor(private _StoresService:StoresService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.addAdditionVoucherForm = new FormGroup({
      storeId: new FormControl('', Validators.required),
      employeeId: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      serialNo: new FormControl('', Validators.required),
      details: new FormControl([{itemId : new FormControl(),quantity:  new FormControl()}], Validators.required),
    });

    //  call functions
    this.getSuppliers()
    this.getAllSubDepartments()
    this.getEmployees()
    this.getCategory()
  }

  // get all employees
  getEmployees(){
    this._StoresService.getEmployees().subscribe((emp) => {
      this.employees = emp
    })
  }

  // get all suppliers
  getSuppliers(){
    this._StoresService.getSuppliers().subscribe((supplier) => {
      this.supliers = supplier
    })
  }

  // get all stores
  getAllSubDepartments(){
    this._StoresService.getAllSubDepartments().subscribe((stores) => {
      this.stores = stores
    })
  }

  // get all category
  getCategory(){
    this._StoresService.getAllCategory().subscribe((categ) => {
      this.categoryes = categ
    })
  }


  // add addition voucher
  onAddSelectEmp(event: any){
    const emp = event.target.value
    this.addAdditionVoucherForm.get('employeeId').setValue(emp)
  }

  onAddSelectSup(event: any){
    const sup = event.target.value
    this.addAdditionVoucherForm.get('supplierId').setValue(sup)
  }

  onAddSelectStore(event: any){
    const store = event.target.value
    this.addAdditionVoucherForm.get('storeId').setValue(store)
  }

  addAdditionVoucher(){
    console.log(this.addAdditionVoucherForm.value);

  }

}
